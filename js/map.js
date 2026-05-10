/**
 * Interactive World Map — D3.js + TopoJSON
 * Renders country paths from world-atlas data
 * Colors endorsers teal, non-endorsers light gray
 * Hover: neon-green + tooltip, subtle border reveal
 * Click: slide-in sidebar with country details
 * Dot View: capital city dots on neutral base map
 */
(function() {
  'use strict';

  var COLORS = {
    endorser: '#207B6A',
    nonEndorser: '#F0F0F0',
    hover: '#DBFE0C',
    ocean: '#ffffff',
    dotBase: '#F5F5F5'
  };

  var mapContainer = document.getElementById('map-container');
  var mapLoading = document.getElementById('map-loading');
  var sidebar = document.getElementById('country-sidebar');
  var tooltip = document.getElementById('map-tooltip');
  var listViewBtn = document.getElementById('list-view-btn');
  var mapViewBtn = document.getElementById('map-view-btn');
  var dotViewBtn = document.getElementById('dot-view-btn');
  var mapView = document.getElementById('map-view');
  var listView = document.getElementById('list-view');
  var regionTabs = document.querySelectorAll('.region-tab');

  if (!mapContainer) return;

  var currentRegion = 'All';
  var currentView = 'map'; // 'map', 'dot', 'list'
  var svg, path, projection;

  // Build the D3 map
  function initMap() {
    var width = mapContainer.clientWidth;
    var height = Math.min(width * 0.55, 600);

    projection = d3.geoNaturalEarth1()
      .scale(width / 5.5)
      .translate([width / 2, height / 2]);

    path = d3.geoPath().projection(projection);

    svg = d3.select('#map-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', '0 0 ' + width + ' ' + height)
      .attr('role', 'img')
      .attr('aria-label', 'Interactive world map showing CHAMP endorsing countries highlighted in teal')
      .attr('class', 'world-map-svg');

    // Ocean background
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', COLORS.ocean)
      .attr('rx', 8);

    // Fetch TopoJSON
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(function(res) { return res.json(); })
      .then(function(world) {
        if (mapLoading) mapLoading.style.display = 'none';

        var countries = topojson.feature(world, world.objects.countries);

        svg.selectAll('path.country')
          .data(countries.features)
          .enter()
          .append('path')
          .attr('class', 'country')
          .attr('d', path)
          .attr('data-id', function(d) { return d.id; })
          .attr('data-name', function(d) {
            var e = endorserByNumeric[d.id];
            return e ? e.name : (d.properties && d.properties.name) || '';
          })
          .attr('fill', function(d) {
            return endorserByNumeric[d.id] ? COLORS.endorser : COLORS.nonEndorser;
          })
          .attr('stroke', 'none')
          .attr('stroke-width', 0)
          .attr('tabindex', function(d) { return endorserByNumeric[d.id] ? '0' : '-1'; })
          .attr('role', function(d) { return endorserByNumeric[d.id] ? 'button' : 'presentation'; })
          .attr('aria-label', function(d) {
            var e = endorserByNumeric[d.id];
            return e ? e.name + ', CHAMP endorser since ' + e.joinedYear : '';
          })
          .on('mouseenter', handleMouseEnter)
          .on('mousemove', handleMouseMove)
          .on('mouseleave', handleMouseLeave)
          .on('click', handleClick)
          .on('keydown', function(event, d) {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              handleClick(event, d);
            }
          });

        // Add EU badge near Brussels
        var euCoords = projection([4.35, 50.85]);
        if (euCoords) {
          var euGroup = svg.append('g')
            .attr('class', 'eu-badge')
            .attr('transform', 'translate(' + euCoords[0] + ',' + (euCoords[1] - 15) + ')')
            .attr('tabindex', '0')
            .attr('role', 'button')
            .attr('aria-label', 'European Union, CHAMP endorser since 2025')
            .style('cursor', 'pointer')
            .on('click', function(event) {
              openSidebar(endorserByIso2['EU']);
            })
            .on('keydown', function(event) {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openSidebar(endorserByIso2['EU']);
              }
            });

          euGroup.append('rect')
            .attr('x', -14)
            .attr('y', -10)
            .attr('width', 28)
            .attr('height', 20)
            .attr('rx', 4)
            .attr('fill', '#263A6A');

          euGroup.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .attr('fill', '#DBFE0C')
            .attr('font-size', '10px')
            .attr('font-weight', '700')
            .attr('font-family', 'Barlow, sans-serif')
            .text('EU');
        }

        // Build dot view layer
        buildDotView();

        // Build list view table
        buildListView();
        applyRegionFilter();
      })
      .catch(function(err) {
        if (mapLoading) {
          mapLoading.textContent = 'Map data could not be loaded. Please view the list below.';
        }
        console.error('Map load error:', err);
        buildListView();
      });
  }

  function handleMouseEnter(event, d) {
    var endorser = endorserByNumeric[d.id];
    if (!endorser) return;

    d3.select(this)
      .attr('fill', COLORS.hover)
      .attr('stroke', '#163331')
      .attr('stroke-width', 0.8);

    if (tooltip) {
      tooltip.textContent = endorser.name;
      tooltip.classList.add('is-visible');
    }
  }

  function handleMouseMove(event) {
    if (tooltip && tooltip.classList.contains('is-visible')) {
      var rect = mapContainer.getBoundingClientRect();
      tooltip.style.left = (event.clientX - rect.left + 12) + 'px';
      tooltip.style.top = (event.clientY - rect.top - 30) + 'px';
    }
  }

  function handleMouseLeave(event, d) {
    var endorser = endorserByNumeric[d.id];
    var fillColor = COLORS.nonEndorser;
    if (currentView === 'dot') {
      fillColor = COLORS.dotBase;
    } else if (endorser) {
      fillColor = COLORS.endorser;
    }
    d3.select(this)
      .attr('fill', fillColor)
      .attr('stroke', 'none')
      .attr('stroke-width', 0);

    if (tooltip) {
      tooltip.classList.remove('is-visible');
    }
  }

  function handleClick(event, d) {
    var endorser = endorserByNumeric[d.id];
    if (!endorser) return;
    openSidebar(endorser);
  }

  // Dot View
  function buildDotView() {
    var dotLayer = svg.append('g')
      .attr('class', 'dot-layer')
      .style('display', 'none');

    champEndorsers.forEach(function(endorser) {
      if (typeof endorser.capital_lat === 'undefined' || typeof endorser.capital_lng === 'undefined') return;
      var coords = projection([endorser.capital_lng, endorser.capital_lat]);
      if (!coords) return;

      // Ring behind dot
      dotLayer.append('circle')
        .attr('class', 'dot-ring')
        .attr('cx', coords[0])
        .attr('cy', coords[1])
        .attr('r', 7)
        .attr('fill', 'none')
        .attr('stroke', '#207B6A')
        .attr('stroke-width', 1)
        .attr('opacity', 0.2)
        .attr('data-region', endorser.region);

      // Main dot
      dotLayer.append('circle')
        .attr('class', 'dot-point')
        .attr('cx', coords[0])
        .attr('cy', coords[1])
        .attr('r', 4)
        .attr('fill', '#207B6A')
        .attr('opacity', 0.85)
        .attr('data-name', endorser.name)
        .attr('data-region', endorser.region)
        .style('cursor', 'pointer')
        .on('mouseenter', function(event) {
          d3.select(this).attr('r', 6).attr('fill', '#DBFE0C');
          if (tooltip) {
            tooltip.textContent = endorser.name;
            tooltip.classList.add('is-visible');
          }
        })
        .on('mousemove', function(event) {
          if (tooltip && tooltip.classList.contains('is-visible')) {
            var rect = mapContainer.getBoundingClientRect();
            tooltip.style.left = (event.clientX - rect.left + 12) + 'px';
            tooltip.style.top = (event.clientY - rect.top - 30) + 'px';
          }
        })
        .on('mouseleave', function(event) {
          d3.select(this).attr('r', 4).attr('fill', '#207B6A');
          if (tooltip) {
            tooltip.classList.remove('is-visible');
          }
        })
        .on('click', function(event) {
          openSidebar(endorser);
        });
    });
  }

  // View switching
  function setView(view) {
    currentView = view;
    var allBtns = [mapViewBtn, dotViewBtn, listViewBtn];
    allBtns.forEach(function(btn) {
      if (btn) {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    if (view === 'map') {
      mapView.style.display = 'block';
      listView.style.display = 'none';
      if (mapViewBtn) {
        mapViewBtn.classList.add('is-active');
        mapViewBtn.setAttribute('aria-pressed', 'true');
      }
      // Show country colors, hide dots
      svg.selectAll('path.country').attr('fill', function(d) {
        return endorserByNumeric[d.id] ? COLORS.endorser : COLORS.nonEndorser;
      });
      svg.select('.eu-badge').style('display', null);
      svg.select('.dot-layer').style('display', 'none');
      applyRegionFilter();
    } else if (view === 'dot') {
      mapView.style.display = 'block';
      listView.style.display = 'none';
      if (dotViewBtn) {
        dotViewBtn.classList.add('is-active');
        dotViewBtn.setAttribute('aria-pressed', 'true');
      }
      // All countries neutral, show dots
      svg.selectAll('path.country')
        .attr('fill', COLORS.dotBase)
        .attr('opacity', 1)
        .attr('pointer-events', 'none');
      svg.select('.eu-badge').style('display', 'none');
      svg.select('.dot-layer').style('display', null);
      applyDotRegionFilter();
    } else if (view === 'list') {
      mapView.style.display = 'none';
      listView.style.display = 'block';
      if (listViewBtn) {
        listViewBtn.classList.add('is-active');
        listViewBtn.setAttribute('aria-pressed', 'true');
      }
    }
  }

  function applyDotRegionFilter() {
    svg.selectAll('.dot-point, .dot-ring').each(function() {
      var el = d3.select(this);
      var region = el.attr('data-region');
      if (currentRegion === 'All') {
        el.style('display', null);
      } else {
        el.style('display', region === currentRegion ? null : 'none');
      }
    });
  }

  // Sidebar
  function openSidebar(endorser) {
    if (!sidebar || !endorser) return;

    document.getElementById('sidebar-name').textContent = endorser.name;
    document.getElementById('sidebar-region').textContent = endorser.region;
    document.getElementById('sidebar-status').textContent = endorser.status + ' — ' + endorser.joinedYear;

    // Commitments
    var commitList = document.getElementById('sidebar-commitments');
    commitList.innerHTML = '';
    var commitments = [
      'Enhance multilevel governance for climate action',
      'Strengthen subnational engagement in NDC processes',
      'Promote inclusive climate partnerships'
    ];
    commitments.forEach(function(c) {
      var li = document.createElement('li');
      li.textContent = c;
      commitList.appendChild(li);
    });

    // Country story link
    var storySection = document.getElementById('sidebar-story');
    if (storySection) {
      if (endorser.storyUrl) {
        storySection.style.display = '';
        var storyLink = storySection.querySelector('a');
        if (storyLink) storyLink.href = endorser.storyUrl;
      } else {
        storySection.style.display = 'none';
      }
    }

    // Related resources
    var relatedResources = document.getElementById('sidebar-resources');
    relatedResources.innerHTML = '';
    var regionResources = sampleResources.filter(function(r) {
      return r.region === endorser.region || r.region === 'All';
    }).slice(0, 3);
    regionResources.forEach(function(r) {
      var a = document.createElement('a');
      a.href = 'resources.html';
      a.className = 'sidebar-resource-link';
      a.textContent = r.title;
      relatedResources.appendChild(a);
    });

    sidebar.classList.add('is-open');
    sidebar.setAttribute('aria-hidden', 'false');
    document.body.classList.add('sidebar-open');

    // Focus trap
    var closeBtn = document.getElementById('sidebar-close');
    if (closeBtn) closeBtn.focus();
    trapFocus(sidebar);
  }

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove('is-open');
    sidebar.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('sidebar-open');
    releaseFocus();
  }

  // Focus trap for sidebar (accessibility)
  var previousFocus = null;
  var focusTrapHandler = null;

  function trapFocus(element) {
    previousFocus = document.activeElement;
    var focusable = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    focusTrapHandler = function(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
      if (e.key === 'Escape') {
        closeSidebar();
      }
    };
    document.addEventListener('keydown', focusTrapHandler);
  }

  function releaseFocus() {
    if (focusTrapHandler) {
      document.removeEventListener('keydown', focusTrapHandler);
      focusTrapHandler = null;
    }
    if (previousFocus) {
      previousFocus.focus();
      previousFocus = null;
    }
  }

  // Close sidebar button
  var closeBtn = document.getElementById('sidebar-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSidebar);
  }

  // Sidebar overlay close
  var sidebarOverlay = document.getElementById('sidebar-overlay');
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // Region filter tabs
  regionTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      regionTabs.forEach(function(t) {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      this.classList.add('is-active');
      this.setAttribute('aria-selected', 'true');
      currentRegion = this.dataset.region;
      if (currentView === 'dot') {
        applyDotRegionFilter();
      } else {
        applyRegionFilter();
      }
      updateListFilter();
    });

    tab.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  function applyRegionFilter() {
    if (!svg) return;

    svg.selectAll('path.country')
      .attr('opacity', function(d) {
        if (currentRegion === 'All') return 1;
        var endorser = endorserByNumeric[d.id];
        if (!endorser) return 0.3;
        return endorser.region === currentRegion ? 1 : 0.3;
      })
      .attr('pointer-events', function(d) {
        if (currentRegion === 'All') return 'auto';
        var endorser = endorserByNumeric[d.id];
        if (!endorser) return 'none';
        return endorser.region === currentRegion ? 'auto' : 'none';
      });

    // Update list view
    updateListFilter();
  }

  // List view
  function buildListView() {
    var tbody = document.getElementById('endorser-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';
    var sorted = champEndorsers.slice().sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });

    sorted.forEach(function(e) {
      var tr = document.createElement('tr');
      tr.dataset.region = e.region;
      tr.innerHTML =
        '<td>' + e.name + '</td>' +
        '<td><span class="badge badge-region">' + e.region + '</span></td>' +
        '<td>' + e.status + '</td>' +
        '<td>' + e.joinedYear + '</td>';
      tr.style.cursor = 'pointer';
      tr.setAttribute('tabindex', '0');
      tr.setAttribute('role', 'button');
      tr.setAttribute('aria-label', 'View details for ' + e.name);
      tr.addEventListener('click', function() { openSidebar(e); });
      tr.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openSidebar(e);
        }
      });
      tbody.appendChild(tr);
    });
  }

  function updateListFilter() {
    var rows = document.querySelectorAll('#endorser-table-body tr');
    rows.forEach(function(row) {
      if (currentRegion === 'All') {
        row.style.display = '';
      } else {
        row.style.display = row.dataset.region === currentRegion ? '' : 'none';
      }
    });
  }

  // Wire up view toggle buttons
  if (mapViewBtn) {
    mapViewBtn.addEventListener('click', function() { setView('map'); });
  }
  if (dotViewBtn) {
    dotViewBtn.addEventListener('click', function() { setView('dot'); });
  }
  if (listViewBtn) {
    listViewBtn.addEventListener('click', function() { setView('list'); });
  }

  // Responsive resize
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (mapContainer && svg) {
        var w = mapContainer.clientWidth;
        var h = Math.min(w * 0.55, 600);
        svg.attr('width', w).attr('height', h).attr('viewBox', '0 0 ' + w + ' ' + h);
        projection.scale(w / 5.5).translate([w / 2, h / 2]);
        svg.selectAll('path.country').attr('d', path);
        svg.select('rect').attr('width', w).attr('height', h);
        // Reposition EU badge
        var euCoords = projection([4.35, 50.85]);
        if (euCoords) {
          svg.select('.eu-badge')
            .attr('transform', 'translate(' + euCoords[0] + ',' + (euCoords[1] - 15) + ')');
        }
        // Reposition dots
        svg.selectAll('.dot-point, .dot-ring').each(function() {
          var el = d3.select(this);
          var name = el.attr('data-name');
          if (!name) {
            // ring — find matching point by position
            return;
          }
        });
        // Re-render dots by rebuilding
        svg.select('.dot-layer').remove();
        buildDotView();
        if (currentView === 'dot') {
          svg.select('.dot-layer').style('display', null);
          applyDotRegionFilter();
        }
      }
    }, 250);
  });

  // Init
  initMap();
})();
