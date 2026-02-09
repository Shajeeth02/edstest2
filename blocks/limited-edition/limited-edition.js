/**
 * Limited Edition Block
 */
export default function decorate(block) {
  const rows = [...block.children];
  let heading = '';
  let description = '';
  
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();
      if (label.includes('heading')) {
        heading = cells[1].textContent.trim();
      } else if (label.includes('description')) {
        description = cells[1].textContent.trim();
      }
    }
  });
  
  block.innerHTML = `
    <div class="limited-container">
      ${heading ? `<h2 class="limited-heading">${heading}</h2>` : ''}
      ${description ? `<p class="limited-description">${description}</p>` : ''}
    </div>
  `;
}
