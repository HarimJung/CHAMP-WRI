/**
 * Interactive World Map — D3.js + TopoJSON
 * Renders country paths from world-atlas data
 * Colors endorsers teal, non-endorsers gray
 * Hover: neon-green + tooltip
 * Click: slide-in sidebar with country details
 */
(function() {
  'use strict';

  const COLORS = {
    endorser: '#207B6A',
    nonEndorser: '#E5E7EB',
    hover: '#DBFE0C',
    ocean: '#ffffff',
    border: '#ffffff'
  };

  const mapContainer = document.getElementById('map-container');
  const mapLoading = document.getElementById('map-loading');
  const sidebar = document.getElementById('country-sidebar');
  const tooltip = document.getElementById('map-tooltip');
  const listViewBtn = document.getElementById('list-view-btn');
  const mapViewBtn = document.getElementById('map-view-btn');
  const mapView = document.getElementById('map-view');
  const listView = document.getElementById('list-view');
  const regionTabs = document.querySelectorAll('.region-tab');

  if (!mapContainer) return;

  let currentRegion = 'All';
  let svg, path, projection;

  // Build the D3 map
  function initMap() {
    const width = mapContainer.clientWidth;
    const height = Math.min(width * 0.55, 600);

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

        const countries = topojson.feature(world, world.objects.countries);

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
          .attr('stroke', COLORS.border)
          .attr('stroke-width', 0.5)
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
      .attr('stroke-width', 1.5);

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
    d3.select(this)
      .attr('fill', endorser ? COLORS.endorser : COLORS.nonEndorser)
      .attr('stroke-width', 0.5);

    if (tooltip) {
      tooltip.classList.remove('is-visible');
    }
  }

  function handleClick(event, d) {
    var endorser = endorserByNumeric[d.id];
    if (!endorser) return;
    openSidebar(endorser);
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
      applyRegionFilter();
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

  // Toggle map / list view
  if (listViewBtn) {
    listViewBtn.addEventListener('click', function() {
      mapView.style.display = 'none';
      listView.style.display = 'block';
      listViewBtn.classList.add('is-active');
      mapViewBtn.classList.remove('is-active');
      listViewBtn.setAttribute('aria-pressed', 'true');
      mapViewBtn.setAttribute('aria-pressed', 'false');
    });
  }

  if (mapViewBtn) {
    mapViewBtn.addEventListener('click', function() {
      mapView.style.display = 'block';
      listView.style.display = 'none';
      mapViewBtn.classList.add('is-active');
      listViewBtn.classList.remove('is-active');
      mapViewBtn.setAttribute('aria-pressed', 'true');
      listViewBtn.setAttribute('aria-pressed', 'false');
    });
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
      }
    }, 250);
  });

  // Init
  initMap();
})();
