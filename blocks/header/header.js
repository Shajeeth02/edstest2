/**
 * Header Block - Fixed Navigation with Close on Backdrop Click & Scroll
 */
export default function decorate(block) {
  const headerHTML = `
    <div class="header-container">
      <a href="/" class="header-logo">
        <img src="/icons/koenigsegg-logo.svg" alt="Koenigsegg" />
      </a>
      
      <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
      
      <nav class="header-nav">
        <a href="/megacars" class="nav-link">Megacars</a>
        <a href="/technology" class="nav-link">Technology</a>
        <a href="/about" class="nav-link">About</a>
        <a href="/history" class="nav-link">History</a>
        <a href="/dealer-locator" class="nav-link">Dealer locator</a>
        <a href="https://gear.koenigsegg.com" class="nav-link" target="_blank">Shop</a>
        <a href="/contact" class="nav-link">Contact</a>
        <a href="https://careers.koenigsegg.com" class="nav-link" target="_blank">Careers</a>
        <a href="https://news.cision.com/koenigsegg" class="nav-link" target="_blank">Press</a>
        <a href="/factory-tours" class="nav-link">Factory tours</a>
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
