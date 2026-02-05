/**
 * Hero Carousel Block - Pure Vanilla JS
 * No external dependencies
 */
export default function decorate(block) {
  const images = block.querySelectorAll('img');
  
  if (images.length === 0) return;
  
  const carouselHTML = `
    <div class="hero-carousel-container">
      <div class="hero-carousel-track">
        ${Array.from(images).map((img, index) => `
          <div class="hero-slide ${index === 0 ? 'active' : ''}">
            <img src="${img.src}" alt="${img.alt || 'Koenigsegg'}" class="carousel-image">
          </div>
        `).join('')}
      </div>
      <button class="hero-nav hero-prev" aria-label="Previous slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <button class="hero-nav hero-next" aria-label="Next slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="hero-pagination"></div>
    </div>
  `;
  
  block.innerHTML = carouselHTML;
  
  // Initialize carousel
  const slides = block.querySelectorAll('.hero-slide');
  const prevBtn = block.querySelector('.hero-prev');
  const nextBtn = block.querySelector('.hero-next');
  const pagination = block.querySelector('.hero-pagination');
  
  let currentIndex = 0;
  let autoplayInterval;
  
  // Create pagination dots
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `hero-dot ${index === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    pagination.appendChild(dot);
  });
  
  const dots = block.querySelectorAll('.hero-dot');
  
  function goToSlide(index) {
    // Remove active class from current slide
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    // Update index
    currentIndex = index;
    
    // Add active class to new slide
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
    
    // Reset autoplay
    resetAutoplay();
  }
  
  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }
  
  function prevSlide() {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  }
  
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }
  
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }
  
  // Event listeners
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Pause on hover
  block.addEventListener('mouseenter', stopAutoplay);
  block.addEventListener('mouseleave', startAutoplay);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  
  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  block.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  block.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }
  
  // Start autoplay
  startAutoplay();
}
