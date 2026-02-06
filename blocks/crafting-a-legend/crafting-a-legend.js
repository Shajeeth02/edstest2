/**
 * Crafting a Legend Block - Quote Style Layout
 */
export default function decorate(block) {
  const rows = [...block.children];

  let heading = '';
  let quote = '';
  let author = '';

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();

      if (label.includes('heading')) {
        heading = cells[1].textContent.trim();
      } else if (label.includes('quote')) {
        quote = cells[1].innerHTML.trim();
      } else if (label.includes('author')) {
        author = cells[1].textContent.trim();
      }
    }
  });

  block.innerHTML = `
    <div class="crafting-a-legend-container">
      ${heading ? `<h2 class="crafting-a-legend-heading">${heading}</h2>` : ''}
      ${quote ? `
        <blockquote class="crafting-a-legend-quote">
          ${quote}
          ${author ? `<cite class="crafting-a-legend-author">— ${author}</cite>` : ''}
        </blockquote>
      ` : ''}
    </div>
  `;
}
