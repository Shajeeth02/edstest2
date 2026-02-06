/**
 * Design Philosophy Block
 */
export default function decorate(block) {
  const rows = [...block.children];

  let heading = '';
  let description = '';
  let imageSrc = '';

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();

      if (label.includes('heading')) {
        heading = cells[1].textContent.trim();
      } else if (label.includes('description')) {
        description = cells[1].innerHTML.trim();
      } else if (label.includes('image')) {
        const img = cells[1].querySelector('img');
        imageSrc = img ? img.src : '';
      }
    }
  });

  block.innerHTML = `
    <div class="design-philosophy-container">
      <div class="design-philosophy-content">
        ${heading ? `<h2 class="design-philosophy-heading">${heading}</h2>` : ''}
        ${description ? `<div class="design-philosophy-description">${description}</div>` : ''}
      </div>
      ${imageSrc ? `
        <div class="design-philosophy-image">
          <img src="${imageSrc}" alt="${heading}">
        </div>
      ` : ''}
    </div>
  `;
}
