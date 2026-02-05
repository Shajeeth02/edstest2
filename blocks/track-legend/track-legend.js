/**
 * Track Legend Block - AEM EDS
 */
export default async function decorate(block) {
  const rows = [...block.children];
  let heading = '';
  let subheading = '';
  const images = [];
  
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();
      if (label.includes('heading') && !label.includes('sub')) {
        heading = cells[1].textContent.trim();
      } else if (label.includes('subheading')) {
        subheading = cells[1].textContent.trim();
      } else if (label.includes('image')) {
        const img = cells[1].querySelector('img');
        if (img) images.push(img.src);
      }
    }
  });
  
  const carouselHTML = `
    <div class="track-legend-container">
      ${heading ? `<h2 class="track-legend-heading">${heading}</h2>` : ''}
      ${subheading ? `<p class="track-legend-subheading">${subheading}</p>` : ''}
      <div class="splide" id="track-legend">
        <div class="splide__track">
          <ul class="splide__list">
            ${images.map(src => `
              <li class="splide__slide">
                <img src="${src}" alt="Track">
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
  
  block.innerHTML = carouselHTML;
  await loadSplide();
  
  if (typeof Splide !== 'undefined') {
    new Splide('#track-legend', {
      type: 'loop',
      perPage: 3,
      perMove: 1,
      gap: '2rem',
      autoplay: true,
      interval: 3000,
      arrows: true,
      pagination: false,
      breakpoints: {
        768: { perPage: 1 }
      }
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
