/**
 * Closing Block
 */
export default function decorate(block) {
  const rows = [...block.children];
  let quote = '';
  
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();
      if (label.includes('quote')) {
        quote = cells[1].textContent.trim();
      }
    }
  });
  
  block.innerHTML = `
    <div class="closing-container">
      ${quote ? `<h2 class="closing-quote">${quote}</h2>` : ''}
    </div>
  `;
}
