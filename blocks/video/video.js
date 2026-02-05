/**
 * Video Block
 */
export default function decorate(block) {
  const rows = [...block.children];
  
  let videoSrc = '';
  let posterSrc = '';
  let heading = '';
  
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();
      const value = cells[1].textContent.trim();
      
      if (label.includes('video') || label.includes('source')) {
        videoSrc = value;
      } else if (label.includes('poster') || label.includes('thumbnail')) {
        posterSrc = value;
      } else if (label.includes('heading') || label.includes('title')) {
        heading = value;
      }
    }
  });
  
  block.innerHTML = `
    <div class="video-container">
      ${heading ? `<h2 class="video-heading">${heading}</h2>` : ''}
      <div class="video-wrapper">
        <video 
          ${posterSrc ? `poster="${posterSrc}"` : ''}
          loop
          muted
          playsinline
          preload="metadata"
        >
          <source src="${videoSrc}" type="video/mp4">
        </video>
        <div class="video-overlay">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="38" stroke="white" stroke-width="2" opacity="0.8"/>
            <path d="M32 26L56 40L32 54V26Z" fill="white" opacity="0.9"/>
          </svg>
        </div>
      </div>
    </div>
  `;
  
  const video = block.querySelector('video');
  const overlay = block.querySelector('.video-overlay');
  const wrapper = block.querySelector('.video-wrapper');
  
  if (video) {
    wrapper.addEventListener('mouseenter', () => {
      video.play();
      overlay.style.opacity = '0';
    });
    
    wrapper.addEventListener('mouseleave', () => {
      video.pause();
      overlay.style.opacity = '1';
    });
    
    wrapper.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        overlay.style.opacity = '0';
      } else {
        video.pause();
        overlay.style.opacity = '1';
      }
    });
  }
}
