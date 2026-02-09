/**
 * Header Block - Fixed Navigation with Close on Backdrop Click & Scroll
 */
export default function decorate(block) {
  const rows = [...block.children];
  const navItems = [];
  let logoSrc = '/icons/koenigsegg_vert_grey.svg'; // Default logo

  // Parse navigation items and logo from the authored content
  rows.forEach((row) => {
    const cells = [...row.children];

    if (cells.length >= 1) {
      const label = cells[0].textContent.trim().toLowerCase();

      // Check for logo
      if (label === 'logo' && cells.length >= 2) {
        const img = cells[1].querySelector('img');
        const value = cells[1].textContent.trim();
        logoSrc = img ? img.src : value;
      } else if (label !== 'header' && label !== 'logo' && label) {
        // Regular navigation items
        const text = cells[0].textContent.trim();
        const url = cells.length >= 2 ? cells[1].textContent.trim() : '#';
        // Check if URL is external (starts with http/https)
        const isExternal = url.startsWith('http://') || url.startsWith('https://');
        navItems.push({ text, url: url || '#', isExternal });
      }
    }
  });

  // Fallback navigation items if none were loaded
  if (navItems.length === 0) {
    navItems.push(
      { text: 'Megacars', url: '#track-legend', isExternal: false },
      { text: 'Technology', url: '#features', isExternal: false },
      { text: 'About', url: '#specs', isExternal: false },
      { text: 'History', url: '#performance', isExternal: false },
      { text: 'Dealer locator', url: '#', isExternal: false },
      { text: 'Shop', url: '#', isExternal: false },
      { text: 'Contact', url: '#', isExternal: false },
      { text: 'Careers', url: '#', isExternal: false },
      { text: 'Press', url: '#', isExternal: false },
      { text: 'Factory tours', url: '#', isExternal: false }
    );
  }

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
