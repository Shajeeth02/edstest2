/**
 * Image Optimization - Lazy Loading & WebP Support
 */

export function optimizeImages() {
  // Get all images
  const images = document.querySelectorAll('img');

  images.forEach((img) => {
    // Add lazy loading
    if (!img.loading) {
      img.loading = 'lazy';
    }

    // Add decoding async for better performance
    if (!img.decoding) {
      img.decoding = 'async';
    }

    // Optimize image URLs with query parameters
    if (img.src && img.src.includes('hlx.page')) {
      const url = new URL(img.src);

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
  });
}

// Run on DOM content loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', optimizeImages);
} else {
  optimizeImages();
}

// Re-run when new images are added
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeName === 'IMG') {
        optimizeImages();
      } else if (node.querySelectorAll) {
        const imgs = node.querySelectorAll('img');
        if (imgs.length > 0) {
          optimizeImages();
        }
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
