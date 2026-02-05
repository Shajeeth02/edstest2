/**
 * Story Block - AEM EDS
 */
export default function decorate(block) {
  const rows = [...block.children];
  let image = '';
  let heading = '';
  let text = '';
  
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();
      if (label.includes('image')) {
        const img = cells[1].querySelector('img');
        if (img) image = img.src;
      } else if (label.includes('heading')) {
        heading = cells[1].textContent.trim();
      } else if (label.includes('text')) {
        text = cells[1].textContent.trim();
      }
    }
  });
  
  block.innerHTML = `
    <div class="story-container">
      <div class="story-image">
        <img src="${image}" alt="${heading}">
      </div>
      <div class="story-content">
        <h2>${heading}</h2>
        <p>${text}</p>
      </div>
    </div>
  `;
}
