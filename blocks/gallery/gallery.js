/**
 * Gallery Block
 */
export default function decorate(block) {
  const rows = [...block.children];
  let title = '';
  const albums = [];
  let currentAlbum = {};

  // Helper function to get high-res image URL
  function getHighResUrl(imgSrc) {
    const url = new URL(imgSrc, window.location.origin);
    url.searchParams.set('width', '2400');
    url.searchParams.set('format', 'webply');
    url.searchParams.set('optimize', 'medium');
    return url.toString();
  }

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();

      if (label === 'title') {
        title = cells[1].textContent.trim();
      } else if (label.includes('album') && label.includes('title')) {
        if (Object.keys(currentAlbum).length > 0) {
          albums.push(currentAlbum);
        }
        currentAlbum = { title: cells[1].textContent.trim(), images: [] };
      } else if (label.includes('album') && label.includes('thumbnail')) {
        const img = cells[1].querySelector('img');
        if (img) currentAlbum.thumbnail = getHighResUrl(img.src);
      } else if (label.includes('album') && label.includes('image')) {
        const img = cells[1].querySelector('img');
        if (img) currentAlbum.images.push(getHighResUrl(img.src));
      }
    }
  });
  
  if (Object.keys(currentAlbum).length > 0) {
    albums.push(currentAlbum);
  }
  
  block.innerHTML = `
    <div class="gallery-container">
      ${title ? `<h2 class="gallery-title animate-fade-up">${title}</h2>` : ''}
      <div class="gallery-albums">
        ${albums.map((album, idx) => `
          <div class="gallery-album animate-scale-in animate-delay-${Math.min(idx + 1, 5)}" data-album="${idx}">
            <img src="${album.thumbnail}" alt="${album.title}">
            <h3>${album.title}</h3>
          </div>
        `).join('')}
      </div>
      <div class="gallery-modal" style="display: none;">
        <div class="modal-content">
          <span class="modal-close">&times;</span>
          <div class="modal-images"></div>
        </div>
      </div>
    </div>
  `;
  
  // Add click handlers
  const albumDivs = block.querySelectorAll('.gallery-album');
  const modal = block.querySelector('.gallery-modal');
  const modalImages = block.querySelector('.modal-images');
  const closeBtn = block.querySelector('.modal-close');
  
  albumDivs.forEach((div, idx) => {
    div.addEventListener('click', () => {
      modalImages.innerHTML = albums[idx].images.map(src => 
        `<img src="${src}" alt="${albums[idx].title}">`
      ).join('');
      modal.style.display = 'flex';
    });
  });
  
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}
