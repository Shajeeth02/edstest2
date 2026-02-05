/**
 * Video Block - Hover to Play
 */
export default function decorate(block) {
  const rows = [...block.children];
  
  let heading = '';
  let videoSrc = '';
  let posterSrc = '';
  
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();
      
      if (label.includes('heading')) {
        heading = cells[1].textContent.trim();
      } else if (label.includes('video')) {
        const link = cells[1].querySelector('a');
        videoSrc = link ? link.href : cells[1].textContent.trim();
      } else if (label.includes('poster')) {
        const img = cells[1].querySelector('img');
        posterSrc = img ? img.src : cells[1].textContent.trim();
      }
    }
  });
  
  const videoHTML = `
    ${heading ? `<h2>${heading}</h2>` : ''}
    <div class="video-container">
      <img src="${posterSrc}" alt="Video thumbnail" class="video-thumbnail">
      <video class="hover-video" muted loop>
        <source src="${videoSrc}" type="video/mp4">
      </video>
    </div>
  `;
  
  block.innerHTML = videoHTML;
  
  const container = block.querySelector('.video-container');
  const video = block.querySelector('.hover-video');
  const thumbnail = block.querySelector('.video-thumbnail');
  
  if (container && video) {
    container.addEventListener('mouseenter', () => {
      video.style.opacity = '1';
      thumbnail.style.opacity = '0';
      video.play();
    });
    
    container.addEventListener('mouseleave', () => {
      video.style.opacity = '0';
      thumbnail.style.opacity = '1';
      video.pause();
    });
  }
}
