/**
 * Hero Carousel - Vanilla JS Fade Effect
 */
export default function decorate(block) {
  const images = block.querySelectorAll('img');
  if (images.length === 0) return;

  // Helper function to get high-res image URL
  function getHighResUrl(imgSrc) {
    const url = new URL(imgSrc, window.location.origin);
    // Request larger image size for better quality
    url.searchParams.set('width', '2400');
    url.searchParams.set('format', 'webply');
    url.searchParams.set('optimize', 'medium');
    return url.toString();
  }

  const carouselHTML = `
    <div class="hero-carousel-container">
      <div class="hero-slides">
        ${Array.from(images).map((img, i) => {
          const highResSrc = getHighResUrl(img.src);
          return `
          <div class="hero-slide ${i === 0 ? 'active' : ''}">
            <img
              src="${highResSrc}"
              alt="${img.alt || 'Koenigsegg'}"
              loading="eager"
              decoding="auto"
              fetchpriority="high">
          </div>
        `;
        }).join('')}
      </div>
      <button class="hero-nav prev" aria-label="Previous">‹</button>
      <button class="hero-nav next" aria-label="Next">›</button>
      <div class="hero-dots">
        ${Array.from(images).map((_, i) => `
          <button class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></button>
        `).join('')}
      </div>
    </div>
  `;
  
  block.innerHTML = carouselHTML;
  
  const slides = block.querySelectorAll('.hero-slide');
  const dots = block.querySelectorAll('.dot');
  const prevBtn = block.querySelector('.prev');
  const nextBtn = block.querySelector('.next');
  let currentIndex = 0;
  let autoplayInterval;
  
  function showSlide(index) {
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    currentIndex = (index + slides.length) % slides.length;
    
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }
  
  function nextSlide() {
    showSlide(currentIndex + 1);
  }
  
  function prevSlide() {
    showSlide(currentIndex - 1);
  }
  
  function startAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 5000);
  }
  
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoplay();
    startAutoplay();
  });
  
  nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoplay();
    startAutoplay();
  });
  
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      showSlide(parseInt(dot.dataset.index));
      stopAutoplay();
      startAutoplay();
    });
  });
  
  let hasLeft = false;
  block.addEventListener('mouseenter', () => {
    if (hasLeft) {
      hasLeft = false;
      stopAutoplay();
    }
  });
  block.addEventListener('mouseleave', () => {
    hasLeft = true;
    startAutoplay();
  });
  
  startAutoplay();
}
