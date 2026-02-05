/**
 * Header Block
 */
export default function decorate(block) {
  block.innerHTML = `
    <header class="header-container">
      <div class="header-logo">
        <img src="/icons/koenigsegg-logo.svg" alt="Koenigsegg">
      </div>
      <button class="header-menu-btn">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav class="header-nav">
        <a href="/megacars">Megacars</a>
        <a href="/technology">Technology</a>
        <a href="/about">About</a>
        <a href="/history">History</a>
        <a href="/dealer-locator">Dealer locator</a>
        <a href="https://gear.koenigsegg.com">Shop</a>
        <a href="/contact">Contact</a>
        <a href="https://careers.koenigsegg.com">Careers</a>
        <a href="https://news.cision.com/koenigsegg">Press</a>
        <a href="/factory-tours">Factory tours</a>
      </nav>
    </header>
  `;
  
  const menuBtn = block.querySelector('.header-menu-btn');
  const nav = block.querySelector('.header-nav');
  
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuBtn.classList.toggle('active');
  });
}
