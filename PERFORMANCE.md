# Performance Optimization Guide

This document outlines all performance optimizations implemented to achieve 100/100 PageSpeed score.

## Implemented Optimizations

### 1. Image Optimization
- **Auto WebP Conversion**: All images converted to WebP format via `format=webply` parameter
- **Responsive Sizing**: Images sized based on viewport with `width` parameter
- **Lazy Loading**: All non-LCP images use `loading="lazy"`
- **Async Decoding**: Images use `decoding="async"` for better performance
- **LCP Optimization**: Hero images use `fetchpriority="high"` and `loading="eager"`

**Implementation**: `scripts/image-optimization.js`

### 2. Resource Hints
- **Preconnect**: DNS resolution for external domains
- **DNS Prefetch**: Early DNS lookup for fonts
- **Modulepreload**: Critical scripts preloaded
- **Preload**: Critical CSS preloaded

**Implementation**: `head.html`

### 3. Critical Rendering Path
- **LCP Blocks**: Hero carousel marked as LCP for priority loading
- **Font Display**: Fonts use `font-display: swap` to prevent FOIT
- **Lazy CSS**: Non-critical styles loaded asynchronously

**Implementation**: `scripts/scripts.js`, `styles/fonts.css`

### 4. JavaScript Optimization
- **Module Bundling**: ES modules for better tree-shaking
- **Deferred Loading**: Non-critical scripts loaded in `loadDelayed()`
- **Event Delegation**: Efficient event handling
- **Minimal Blocking**: Scripts load as ES modules (async by default)

### 5. Cache Optimization
All static assets cached by AEM Edge Delivery CDN:
- Images: 1 year
- Scripts: 1 year with immutable
- Styles: 1 year with immutable
- Fonts: 1 year with immutable

## Performance Metrics Target

- **Performance**: 100/100
- **Accessibility**: 90+/100
- **Best Practices**: 90+/100
- **SEO**: 90+/100

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## Testing

Test performance using:
```bash
# PageSpeed Insights
https://pagespeed.web.dev/

# Lighthouse CLI
npx lighthouse <url> --view
```

## Monitoring

Monitor performance in production:
1. Chrome DevTools > Lighthouse tab
2. PageSpeed Insights
3. WebPageTest
4. Real User Monitoring (RUM) via AEM

## Additional Optimizations

### Future Improvements
1. **Image CDN**: Use dedicated image CDN for better compression
2. **HTTP/3**: Enable when available on hosting
3. **Service Worker**: Implement for offline support and caching
4. **Code Splitting**: Further split JavaScript bundles
5. **CSS Purging**: Remove unused CSS

### Maintenance
- Run PageSpeed Insights monthly
- Monitor Core Web Vitals in Search Console
- Update image sizes when design changes
- Review bundle sizes after major updates
