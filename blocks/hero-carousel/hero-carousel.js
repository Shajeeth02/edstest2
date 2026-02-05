/**
 * Hero Carousel Block - AEM EDS
 */
export default async function decorate(block) {
  const images = block.querySelectorAll('img');
  
  const carouselHTML = `
    <div class="splide" id="hero-carousel">
      <div class="splide__track">
        <ul class="splide__list">
          ${Array.from(images).map(img => `
            <li class="splide__slide">
              <img src="${img.src}" alt="${img.alt || 'Koenigsegg'}">
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;
  
  block.innerHTML = carouselHTML;
  await loadSplide();
  
  if (typeof Splide !== 'undefined') {
    new Splide('#hero-carousel', {
      type: 'fade',
      autoplay: true,
      interval: 5000,
      arrows: true,
      pagination: true,
      speed: 1000,
    }).mount();
  }
}

async function loadSplide() {
  if (window.Splide) return;
  const cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.href = 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css';
  document.head.appendChild(cssLink);
  
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
