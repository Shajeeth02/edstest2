/**
 * Footer Block
 */

export default function decorate(block) {
  console.log('Footer decorate called');
  const rows = [...block.children];
  console.log('Footer rows:', rows.length);
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

  console.log('Menu links before fallback:', menuLinks.length);

  // Fallback for localhost when footer document doesn't load
  if (menuLinks.length === 0) {
    console.log('Using fallback footer data');
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

  const html = `
    <div class="footer-container">
      <nav class="footer-nav">
        ${menuLinks.map(link => `
          <a href="${link.url}">${link.text}</a>
        `).join('')}
      </nav>
      ${copyright ? `<p class="footer-copyright">${copyright}</p>` : ''}
    </div>
  `;

  console.log('Setting footer HTML:', html.substring(0, 100) + '...');
  block.innerHTML = html;
  console.log('Footer decoration complete');
}
