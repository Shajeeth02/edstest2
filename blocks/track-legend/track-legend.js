/**
 * Track Legend Block - Pure Vanilla JS Infinite Loop
 * Smooth continuous scrolling carousel
 */
export default function decorate(block) {
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
  
  // Duplicate images for seamless loop
  const allImages = [...images, ...images, ...images];
  
  const trackHTML = `
    <div class="track-legend-content">
      ${heading ? `<h2 class="track-heading">${heading}</h2>` : ''}
      ${subheading ? `<p class="track-subheading">${subheading}</p>` : ''}
    </div>
    <div class="track-carousel-wrapper">
      <div class="track-carousel-container">
        <div class="track-carousel-track">
          ${allImages.map((src, index) => `
            <div class="track-slide" data-index="${index}">
              <img src="${src}" alt="Koenigsegg ${index + 1}">
            </div>
          `).join('')}
        </div>
      </div>
      <div class="track-controls">
        <button class="track-nav track-prev" aria-label="Scroll left">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <button class="track-nav track-next" aria-label="Scroll right">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  `;
  
  block.innerHTML = trackHTML;
  
  // Initialize infinite scroll
  const track = block.querySelector('.track-carousel-track');
  const slides = block.querySelectorAll('.track-slide');
  const prevBtn = block.querySelector('.track-prev');
  const nextBtn = block.querySelector('.track-next');
  
  if (slides.length === 0) return;
  
  let scrollSpeed = 0.5; // pixels per frame
  let animationFrame;
  let isHovered = false;
  let currentScroll = 0;
  
  // Calculate total width
  const slideWidth = slides[0].offsetWidth;
  const gap = 20; // matches CSS gap
  const totalWidth = (slideWidth + gap) * images.length;
  
  function animate() {
    if (!isHovered) {
      currentScroll += scrollSpeed;
      
      // Reset scroll when we've moved one full set
      if (currentScroll >= totalWidth) {
        currentScroll = 0;
      }
      
      track.style.transform = `translateX(-${currentScroll}px)`;
    }
    
    animationFrame = requestAnimationFrame(animate);
  }
  
  function scrollTo(direction) {
    const scrollAmount = slideWidth + gap;
    
    if (direction === 'next') {
      currentScroll += scrollAmount;
    } else {
      currentScroll -= scrollAmount;
    }
    
    // Keep scroll within bounds
    if (currentScroll >= totalWidth) {
      currentScroll = 0;
    } else if (currentScroll < 0) {
      currentScroll = totalWidth - scrollAmount;
    }
    
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${currentScroll}px)`;
    
    setTimeout(() => {
      track.style.transition = '';
    }, 500);
  }
  
  // Event listeners
  prevBtn.addEventListener('click', () => scrollTo('prev'));
  nextBtn.addEventListener('click', () => scrollTo('next'));
  
  // Pause on hover
  block.addEventListener('mouseenter', () => {
    isHovered = true;
  });
  
  block.addEventListener('mouseleave', () => {
    isHovered = false;
  });
  
  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  let isDragging = false;
  let startScroll = 0;
  
  block.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    isDragging = true;
    startScroll = currentScroll;
  });
  
  block.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const touchCurrentX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchCurrentX;
    
    currentScroll = startScroll + diff;
    
    // Keep within bounds
    if (currentScroll < 0) currentScroll = 0;
    if (currentScroll >= totalWidth) currentScroll = totalWidth - 1;
    
    track.style.transform = `translateX(-${currentScroll}px)`;
  });
  
  block.addEventListener('touchend', (e) => {
    isDragging = false;
    touchEndX = e.changedTouches[0].screenX;
    
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        scrollTo('next');
      } else {
        scrollTo('prev');
      }
    }
  });
  
  // Mouse drag support (desktop)
  let mouseStartX = 0;
  let mouseIsDragging = false;
  let mouseStartScroll = 0;
  
  track.addEventListener('mousedown', (e) => {
    mouseStartX = e.clientX;
    mouseIsDragging = true;
    mouseStartScroll = currentScroll;
    track.style.cursor = 'grabbing';
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!mouseIsDragging) return;
    
    const diff = mouseStartX - e.clientX;
    currentScroll = mouseStartScroll + diff;
    
    // Keep within bounds
    if (currentScroll < 0) currentScroll = 0;
    if (currentScroll >= totalWidth) currentScroll = totalWidth - 1;
    
    track.style.transform = `translateX(-${currentScroll}px)`;
  });
  
  document.addEventListener('mouseup', () => {
    if (mouseIsDragging) {
      mouseIsDragging = false;
      track.style.cursor = 'grab';
    }
  });
  
  // Start animation
  animate();
  
  // Cleanup on unmount
  block.addEventListener('DOMNodeRemoved', () => {
    cancelAnimationFrame(animationFrame);
  });
}
