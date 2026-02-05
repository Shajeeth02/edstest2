/**
 * Features Block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const features = [];
  let currentFeature = {};
  
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();
      const value = cells[1];
      
      if (label.includes('number')) {
        if (Object.keys(currentFeature).length > 0) {
          features.push(currentFeature);
        }
        currentFeature = { number: cells[1].textContent.trim() };
      } else if (label.includes('title')) {
        currentFeature.title = cells[1].textContent.trim();
      } else if (label.includes('image')) {
        const img = cells[1].querySelector('img');
        if (img) currentFeature.image = img.src;
      } else if (label.includes('description')) {
        currentFeature.description = cells[1].textContent.trim();
      }
    }
  });
  
  if (Object.keys(currentFeature).length > 0) {
    features.push(currentFeature);
  }
  
  block.innerHTML = `
    <div class="features-grid">
      ${features.map(f => `
        <div class="feature-item">
          <div class="feature-number">${f.number}</div>
          <h3 class="feature-title">${f.title}</h3>
          ${f.image ? `<img src="${f.image}" alt="${f.title}">` : ''}
          <p class="feature-description">${f.description}</p>
        </div>
      `).join('')}
    </div>
  `;
}
