/**
 * Full Width Image Block
 */
export default function decorate(block) {
  const rows = [...block.children];
  let imageSrc = '';

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
      if (label.includes('image')) {
        const img = cells[1].querySelector('img');
        if (img) imageSrc = getHighResUrl(img.src);
      }
    }
  });
  
  block.innerHTML = `
    <div class="full-width-container">
      ${imageSrc ? `<img src="${imageSrc}" alt="Full Width">` : ''}
    </div>
  `;
}
