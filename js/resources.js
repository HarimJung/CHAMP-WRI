/**
 * Resources page — filtering by topic, region, and search text
 */
(function() {
  'use strict';

  const grid = document.getElementById('resources-grid');
  const topicFilter = document.getElementById('filter-topic');
  const regionFilter = document.getElementById('filter-region');
  const searchInput = document.getElementById('filter-search');
  const resultsCount = document.getElementById('results-count');

  if (!grid) return;

  const typeColors = {
    'PDF': 'badge-pdf',
    'Guide': 'badge-guide',
    'Briefing': 'badge-briefing',
    'Expert Note': 'badge-expert',
    'Case Study': 'badge-case-study'
  };

  function createResourceCard(resource) {
    const card = document.createElement('article');
    card.className = 'resource-card card fade-in is-visible';
    card.setAttribute('role', 'article');

    const badgeClass = typeColors[resource.type] || 'badge-guide';
    const actionText = resource.type === 'PDF' ? 'Download' : 'Read more';
    const dateFormatted = new Date(resource.date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    card.innerHTML =
      '<div class="card-body">' +
        '<span class="badge ' + badgeClass + '">' + resource.type + '</span>' +
        '<h3 class="card-title">' + resource.title + '</h3>' +
        '<p class="card-text">' + resource.description + '</p>' +
        '<time class="card-date" datetime="' + resource.date + '">' + dateFormatted + '</time>' +
      '</div>' +
      '<div class="card-footer">' +
        '<a href="' + resource.url + '" class="btn btn-secondary">' + actionText + ' &rarr;</a>' +
      '</div>';

    return card;
  }

  function renderResources() {
    const topic = topicFilter ? topicFilter.value : 'All';
    const region = regionFilter ? regionFilter.value : 'All';
    const search = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = sampleResources.filter(function(r) {
      if (topic !== 'All' && r.topic !== topic) return false;
      if (region !== 'All' && r.region !== region) return false;
      if (search && !r.title.toLowerCase().includes(search) && !r.description.toLowerCase().includes(search)) return false;
      return true;
    });

    grid.innerHTML = '';
    if (filtered.length === 0) {
      grid.innerHTML = '<p class="no-results">No resources match your filters. Try adjusting your search criteria.</p>';
    } else {
      filtered.forEach(function(r) {
        grid.appendChild(createResourceCard(r));
      });
    }

    if (resultsCount) {
      resultsCount.textContent = filtered.length + ' resource' + (filtered.length !== 1 ? 's' : '');
    }
  }

  if (topicFilter) topicFilter.addEventListener('change', renderResources);
  if (regionFilter) regionFilter.addEventListener('change', renderResources);
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', function() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(renderResources, 300);
    });
  }

  // Initial render
  renderResources();
})();
