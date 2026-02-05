/**
 * Features Block - 3 Column Grid
 * Matches original HTML structure
 */
export default function decorate(block) {
  const rows = [...block.children];
  
  const features = [];
  let currentFeature = {};
  
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();
      const value = cells[1].textContent.trim();
      
      if (label.includes('number')) {
        if (Object.keys(currentFeature).length > 0) {
          features.push(currentFeature);
        }
        currentFeature = { number: value };
      } else if (label.includes('title')) {
        currentFeature.title = value;
      } else if (label.includes('image')) {
        const img = cells[1].querySelector('img');
        currentFeature.image = img ? img.src : '';
      } else if (label.includes('description')) {
        currentFeature.description = value;
      }
    }
  });
  
  if (Object.keys(currentFeature).length > 0) {
    features.push(currentFeature);
  }
  
  const featuresHTML = `
    <div class="feature-grid">
      ${features.map(feature => `
        <div class="feature-box">
          <div class="feature-number">
            <span>${feature.number}</span>
            ${feature.image ? `<img src="${feature.image}" alt="${feature.title}">` : ''}
          </div>
          <div class="feature-title">${feature.title}</div>
          <p>${feature.description}</p>
        </div>
      `).join('')}
    </div>
  `;
  
  block.innerHTML = featuresHTML;
}
