/**
 * Header Block - Fixed Navigation with Close on Backdrop Click & Scroll
 */
export default function decorate(block) {
  console.log('🔍 Block HTML:', block.innerHTML);
  console.log('🔍 Block element:', block);

  const rows = [...block.children];
  const navItems = [];
  let logoSrc = '/icons/koenigsegg_vert_grey.svg'; // Default logo

  console.log('🔍 Header: Total rows found:', rows.length);

  // Parse navigation items and logo from the authored content
  rows.forEach((row, index) => {
    const cells = [...row.children];
    console.log(`🔍 Row ${index}: ${cells.length} cells`);

    if (cells.length >= 1) {
      const label = cells[0].textContent.trim().toLowerCase();
      console.log(`🔍 Row ${index} - Label: "${label}"`);

      // Check for logo
      if (label === 'logo' && cells.length >= 2) {
        const img = cells[1].querySelector('img');
        const value = cells[1].textContent.trim();
        logoSrc = img ? img.src : value;
        console.log(`🔍 Logo found: ${logoSrc}`);
      } else if (label !== 'header' && label !== 'logo' && label) {
        // Regular navigation items
        const text = cells[0].textContent.trim();
        const url = cells.length >= 2 ? cells[1].textContent.trim() : '#';
        console.log(`🔍 Nav item: "${text}" -> "${url}"`);
        // Check if URL is external (starts with http/https)
        const isExternal = url.startsWith('http://') || url.startsWith('https://');
        navItems.push({ text, url: url || '#', isExternal });
      }
    }
  });

  console.log('🔍 Total nav items parsed:', navItems.length, navItems);

  const headerHTML = `
    <div class="header-container">
      <a href="/" class="header-logo">
        <img src="${logoSrc}" alt="Koenigsegg" />
      </a>

      <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <nav class="header-nav">
        ${navItems.map(item => `
          <a href="${item.url}" class="nav-link"${item.isExternal ? ' target="_blank"' : ''}>${item.text}</a>
        `).join('')}
      </nav>
    </div>
  `;

  block.innerHTML = headerHTML;
  
  // Initialize hamburger menu
  const hamburger = block.querySelector('.hamburger');
  const nav = block.querySelector('.header-nav');
  const body = document.body;
  
  function closeMenu() {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  
  function toggleMenu() {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    
    hamburger.setAttribute('aria-expanded', !isOpen);
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    body.classList.toggle('menu-open');
  }
  
  // Toggle menu on hamburger click
  hamburger.addEventListener('click', toggleMenu);
  
  // Close menu when clicking backdrop (the ::before element area)
  nav.addEventListener('click', (e) => {
    // Only close if clicking the nav itself (backdrop), not the links
    if (e.target === nav) {
      closeMenu();
    }
  });
  
  // Close menu when clicking nav link
  const navLinks = block.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      closeMenu();
    }
  });
  
  // Close menu when scrolling
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Close if scrolled more than 50px
    if (nav.classList.contains('active') && Math.abs(currentScroll - lastScroll) > 50) {
      closeMenu();
    }
    
    lastScroll = currentScroll;
  });
}
