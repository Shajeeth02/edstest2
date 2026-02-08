/**
 * Scroll-triggered animations using Intersection Observer
 */

/**
 * Initialize scroll animations for elements with animate-* classes
 */
export function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.animate-fade-in, .animate-fade-up, .animate-slide-left, .animate-slide-right, .animate-scale-in, .animate-zoom-in'
  );

  if (!animatedElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Trigger slightly before element is fully visible
    threshold: 0.15 // Trigger when 15% of element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optionally unobserve after animation to prevent re-triggering
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Add animation classes to block elements
 * @param {Element} block - The block element to animate
 * @param {Object} config - Animation configuration
 */
export function animateBlock(block, config = {}) {
  const {
    headings = 'animate-fade-up',
    text = 'animate-fade-in',
    images = 'animate-zoom-in',
    stagger = false
  } = config;

  // Animate headings
  const headingElements = block.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headingElements.forEach((heading, index) => {
    heading.classList.add(headings);
    if (stagger && index > 0) {
      heading.classList.add(`animate-delay-${Math.min(index, 5)}`);
    }
  });

  // Animate text paragraphs
  const textElements = block.querySelectorAll('p, .text, .description');
  textElements.forEach((textEl, index) => {
    textEl.classList.add(text);
    if (stagger && index > 0) {
      textEl.classList.add(`animate-delay-${Math.min(index + 1, 5)}`);
    }
  });

  // Animate images
  const imageElements = block.querySelectorAll('img, picture, .image');
  imageElements.forEach((img, index) => {
    // Don't animate if it's part of another animated container
    if (!img.closest('.animate-fade-in, .animate-fade-up, .animate-zoom-in')) {
      img.classList.add(images);
      if (stagger && index > 0) {
        img.classList.add(`animate-delay-${Math.min(index, 5)}`);
      }
    }
  });
}

/**
 * Add staggered animation to child elements
 * @param {Element} container - Container element
 * @param {string} animationClass - Animation class to apply
 */
export function staggerChildren(container, animationClass = 'animate-fade-up') {
  const children = container.children;
  Array.from(children).forEach((child, index) => {
    child.classList.add(animationClass);
    child.classList.add(`animate-delay-${Math.min(index + 1, 5)}`);
  });
}
