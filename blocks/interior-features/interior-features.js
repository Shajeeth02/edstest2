/**
 * Interior Features Block - 2 Column Layout
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Helper function to get high-res image URL
  function getHighResUrl(imgSrc) {
    const url = new URL(imgSrc, window.location.origin);
    url.searchParams.set('width', '2400');
    url.searchParams.set('format', 'webply');
    url.searchParams.set('optimize', 'medium');
    return url.toString();
  }

  const features = [];
  let currentFeature = {};

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();

      if (label.includes('image')) {
        if (Object.keys(currentFeature).length > 0) {
          features.push(currentFeature);
        }
        const img = cells[1].querySelector('img');
        currentFeature = { image: img ? getHighResUrl(img.src) : '' };
      } else if (label.includes('title')) {
        currentFeature.title = cells[1].textContent.trim();
      } else if (label.includes('description')) {
        currentFeature.description = cells[1].innerHTML.trim();
      }
    }
  });

  if (Object.keys(currentFeature).length > 0) {
    features.push(currentFeature);
  }

  const featuresHTML = `
    <div class="interior-features-grid">
      ${features.map(feature => `
        <div class="interior-feature-item">
          ${feature.image ? `
            <div class="interior-feature-image">
              <img src="${feature.image}" alt="${feature.title}">
            </div>
          ` : ''}
          <div class="interior-feature-content">
            ${feature.title ? `<h3 class="interior-feature-title">${feature.title}</h3>` : ''}
            ${feature.description ? `<div class="interior-feature-description">${feature.description}</div>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  block.innerHTML = featuresHTML;
}
