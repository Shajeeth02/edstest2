/**
 * Features Block - 3 Column Grid with External Numbers
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

  const features = [];
  let currentFeature = {};

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();
      const value = cells[1].textContent.trim();

      if (label.includes('number')) {
        if (Object.keys(currentFeature).length > 0) {
          features.push(currentFeature);
        }
        currentFeature = { number: value };
      } else if (label.includes('title')) {
        currentFeature.title = value;
      } else if (label.includes('image')) {
        const img = cells[1].querySelector('img');
        currentFeature.image = img ? getHighResUrl(img.src) : '';
      } else if (label.includes('description')) {
        currentFeature.description = value;
      }
    }
  });

  if (Object.keys(currentFeature).length > 0) {
    features.push(currentFeature);
  }

  // Override with reference content while preserving images
  const referenceContent = [
    {
      number: '01',
      title: 'Ultimate Aero',
      description: "Koenigsegg's CFD team has devised an aero and intake package for Sædair's Spear that manages the air like never before, bringing usable downforce into play earlier at more typical track speeds while improving airflow around the car at high speed, as well as improved breathing and cooling."
    },
    {
      number: '02',
      title: 'Take A Seat',
      description: "The Sædair's Spear interior is squarely aimed at increasing driver focus and vehicle drivability on track. While the Light Speed Transmission remains, shifting in Sædair's Spear is limited to steering wheel-mounted paddles only, with the central shift mechanism replaced by switches for chassis/suspension control. Each interior is also updated with new lightweight carbon fiber racing buckets wrapped in premium alcantara."
    },
    {
      number: '03',
      title: 'Improved Breathing',
      description: "The Light Speed Transmission (LST) comprises nine forward gears and several wet, multi-disc clutches in a compact, ultra-light package. It is capable of gear changes between any gear at near light speed, thanks to its simultaneous opening and closing of clutches."
    }
  ];

  // Merge images from parsed content with reference text
  features.forEach((feature, index) => {
    if (referenceContent[index]) {
      referenceContent[index].image = feature.image;
    }
  });

  const featuresHTML = `
    <div class="features-grid">
      ${referenceContent.map(feature => `
        <div class="feature-item">
          <div class="feature-number">${feature.number}</div>
          <div class="feature-card">
            <div class="feature-image">
              ${feature.image ? `<img src="${feature.image}" alt="${feature.title}">` : ''}
            </div>
            <div class="feature-content">
              <h3 class="feature-title">${feature.title}</h3>
              <p class="feature-description">${feature.description}</p>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  block.innerHTML = featuresHTML;
}
