/**
 * Full Width Image Block
 */
export default function decorate(block) {
  const rows = [...block.children];
  let imageSrc = '';
  
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();
      if (label.includes('image')) {
        const img = cells[1].querySelector('img');
        if (img) imageSrc = img.src;
      }
    }
  });
  
  block.innerHTML = `
    <div class="full-width-container">
      ${imageSrc ? `<img src="${imageSrc}" alt="Full Width">` : ''}
    </div>
  `;
}
