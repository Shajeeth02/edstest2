/**
 * Track Legend - Infinite Horizontal Scroll
 */
export default function decorate(block) {
  // Helper function to get high-res image URL
  function getHighResUrl(imgSrc) {
    const url = new URL(imgSrc, window.location.origin);
    url.searchParams.set('width', '2400');
    url.searchParams.set('format', 'webply');
    url.searchParams.set('optimize', 'medium');
    return url.toString();
  }

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
        if (img) images.push(getHighResUrl(img.src));
      }
    }
  });
  
  const allImages = [...images, ...images, ...images];
  
  const trackHTML = `
    <div class="track-content">
      ${heading ? `<h6>${heading}</h6>` : ''}
      ${subheading ? `<h3>${subheading}</h3>` : ''}
    </div>
    <div class="track-carousel">
      <div class="track-scroll">
        ${allImages.map(src => `
          <div class="track-item">
            <img src="${src}" alt="Koenigsegg">
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  block.innerHTML = trackHTML;
  
  const scroll = block.querySelector('.track-scroll');
  if (!scroll) return;
  
  let scrollPos = 0;
  let isHovered = false;
  let isDragging = false;
  let startX;
  let scrollLeft;
  
  function animate() {
    if (!isHovered && !isDragging) {
      scrollPos += 1;
      const itemWidth = scroll.querySelector('.track-item').offsetWidth + 20;
      const resetPoint = (itemWidth * images.length);
      
      if (scrollPos >= resetPoint) {
        scrollPos = 0;
      }
      
      scroll.style.transform = `translateX(-${scrollPos}px)`;
    }
    requestAnimationFrame(animate);
  }
  
  scroll.addEventListener('mouseenter', () => { isHovered = true; });
  scroll.addEventListener('mouseleave', () => { isHovered = false; });
  
  scroll.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - scroll.offsetLeft;
    scrollLeft = scrollPos;
    scroll.style.cursor = 'grabbing';
  });
  
  scroll.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scroll.offsetLeft;
    const walk = (startX - x);
    scrollPos = scrollLeft + walk;
  });
  
  scroll.addEventListener('mouseup', () => {
    isDragging = false;
    scroll.style.cursor = 'grab';
  });
  
  scroll.addEventListener('mouseleave', () => {
    isDragging = false;
    scroll.style.cursor = 'grab';
  });
  
  animate();
}
