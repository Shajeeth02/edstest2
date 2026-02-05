/**
 * Specifications Block
 */
export default function decorate(block) {
  const rows = [...block.children];
  let title = '';
  const specs = [];
  let linkText = '';
  let linkURL = '';
  
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();
      
      if (label === 'title') {
        title = cells[1].textContent.trim();
      } else if (label.includes('spec') && label.includes('value')) {
        const specNum = label.match(/\d+/)[0];
        if (!specs[specNum - 1]) specs[specNum - 1] = {};
        specs[specNum - 1].value = cells[1].textContent.trim();
      } else if (label.includes('spec') && label.includes('label') && !label.includes('sub')) {
        const specNum = label.match(/\d+/)[0];
        if (!specs[specNum - 1]) specs[specNum - 1] = {};
        specs[specNum - 1].label = cells[1].textContent.trim();
      } else if (label.includes('sublabel')) {
        const specNum = label.match(/\d+/)[0];
        if (!specs[specNum - 1]) specs[specNum - 1] = {};
        specs[specNum - 1].sublabel = cells[1].textContent.trim();
      } else if (label.includes('link text')) {
        linkText = cells[1].textContent.trim();
      } else if (label.includes('link url')) {
        linkURL = cells[1].textContent.trim();
      }
    }
  });
  
  block.innerHTML = `
    <div class="specs-container">
      ${title ? `<h2 class="specs-title">${title}</h2>` : ''}
      <div class="specs-grid">
        ${specs.filter(s => s).map(spec => `
          <div class="spec-item">
            <div class="spec-value">${spec.value}</div>
            <div class="spec-label">${spec.label}</div>
            ${spec.sublabel ? `<div class="spec-sublabel">${spec.sublabel}</div>` : ''}
          </div>
        `).join('')}
      </div>
      ${linkText && linkURL ? `<a href="${linkURL}" class="specs-link">${linkText}</a>` : ''}
    </div>
  `;
}
