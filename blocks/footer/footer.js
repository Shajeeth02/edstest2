/**
 * Footer Block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const menuLinks = [];
  let copyright = '';
  
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 3) {
      const text = cells[1].textContent.trim();
      const url = cells[2].textContent.trim();
      menuLinks.push({ text, url });
    } else if (cells.length === 2) {
      const label = cells[0].textContent.trim().toLowerCase();
      if (label.includes('copyright')) {
        copyright = cells[1].textContent.trim();
      }
    }
  });
  
  block.innerHTML = `
    <div class="footer-container animate-fade-in">
      <nav class="footer-nav">
        ${menuLinks.map(link => `
          <a href="${link.url}">${link.text}</a>
        `).join('')}
      </nav>
      ${copyright ? `<p class="footer-copyright">${copyright}</p>` : ''}
    </div>
  `;
}
