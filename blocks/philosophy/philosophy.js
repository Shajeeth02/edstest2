/**
 * Philosophy Block
 */
export default function decorate(block) {
  const rows = [...block.children];
  let heading = '';
  let quote = '';
  
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();
      if (label.includes('heading')) {
        heading = cells[1].textContent.trim();
      } else if (label.includes('quote')) {
        quote = cells[1].textContent.trim();
      }
    }
  });
  
  block.innerHTML = `
    <div class="philosophy-container">
      ${heading ? `<h2 class="philosophy-heading">${heading}</h2>` : ''}
      ${quote ? `<blockquote class="philosophy-quote">${quote}</blockquote>` : ''}
    </div>
  `;
}
