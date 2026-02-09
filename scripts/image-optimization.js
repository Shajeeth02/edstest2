/**
 * Image Optimization - Lazy Loading & WebP Support
 * Optimized for performance with minimal overhead
 */

const optimizedImages = new WeakSet();

function optimizeImage(img) {
  // Skip if already optimized
  if (optimizedImages.has(img)) return;

  // Mark as optimized
  optimizedImages.add(img);

  // Skip if not loaded yet
  if (!img.src) return;

  // Check if image is from AEM/HLX domain
  const isHlxImage = img.src.includes('hlx.page') ||
                     img.src.includes('hlx.live') ||
                     img.src.includes('aem.page') ||
                     img.src.includes('aem.live');

  if (!isHlxImage) return;

  try {
    const url = new URL(img.src);

    // Only optimize if not already optimized
    if (!url.searchParams.has('format') || !url.searchParams.has('width')) {
      // Set optimal format
      if (!url.searchParams.has('format')) {
        url.searchParams.set('format', 'webply');
      }

      // Set optimal width based on container
      if (!url.searchParams.has('width')) {
        const containerWidth = img.parentElement?.offsetWidth || window.innerWidth;
        const optimalWidth = Math.min(containerWidth * window.devicePixelRatio, 2400);
        url.searchParams.set('width', Math.round(optimalWidth));
      }

      // Set optimization level
      if (!url.searchParams.has('optimize')) {
        url.searchParams.set('optimize', 'medium');
      }

      img.src = url.toString();
    }
  } catch (e) {
    // Ignore invalid URLs
  }
}

export function optimizeImages() {
  const images = document.querySelectorAll('img');
  images.forEach(optimizeImage);
}

// Run once after page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', optimizeImages, { once: true });
} else {
  optimizeImages();
}

// Observe only for new images, not re-process existing ones
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeName === 'IMG') {
        optimizeImage(node);
      } else if (node.querySelectorAll) {
        node.querySelectorAll('img').forEach(optimizeImage);
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
