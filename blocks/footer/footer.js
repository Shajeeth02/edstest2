/**
 * Footer Block
 */

export default function decorate(block) {
  const rows = [...block.children];
  const menuLinks = [];
  let copyright = '';

  // Parse rows from footer document
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

  // Fallback for localhost when footer document doesn't load
  if (menuLinks.length === 0) {
    menuLinks.push(
      { text: 'Megacars', url: '/megacars' },
      { text: 'Technology', url: '/technology' },
      { text: 'About', url: '/about' },
      { text: 'History', url: '/history' },
      { text: 'Dealer locator', url: '/dealer-locator' },
      { text: 'Shop', url: 'https://gear.koenigsegg.com' }
    );
    copyright = '© 2024 Koenigsegg. All rights reserved.';
  }

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
