/**
 * Video Block - Hover to Play
 * Supports: YouTube, Vimeo, Direct MP4
 */

function getVideoType(url) {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  }
  if (url.includes('vimeo.com')) {
    return 'vimeo';
  }
  return 'mp4';
}

function getYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function getVimeoId(url) {
  const regExp = /vimeo.*\/(\d+)/i;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export default function decorate(block) {
  // Helper function to get high-res image URL
  function getHighResUrl(imgSrc) {
    const url = new URL(imgSrc, window.location.origin);
    url.searchParams.set('width', '2400');
    url.searchParams.set('format', 'webply');
    url.searchParams.set('optimize', 'medium');
    return url.toString();
  }

  console.log('🎥 Video Block: Initializing...');

  const rows = [...block.children];

  let videoUrl = '';
  let thumbnailSrc = '';

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();

      if (label.includes('video') || label.includes('url')) {
        const link = cells[1].querySelector('a');
        videoUrl = link ? link.href : cells[1].textContent.trim();
      } else if (label.includes('thumbnail') || label.includes('poster')) {
        const img = cells[1].querySelector('img');
        thumbnailSrc = img ? getHighResUrl(img.src) : cells[1].textContent.trim();
      }
    }
  });

  console.log('🎥 Video URL:', videoUrl);
  console.log('🎥 Thumbnail:', thumbnailSrc);

  // Check if thumbnail exists, if not try to get any image from the block
  if (!thumbnailSrc) {
    const anyImg = block.querySelector('img');
    if (anyImg) {
      thumbnailSrc = getHighResUrl(anyImg.src);
      console.log('🎥 Found thumbnail from img tag:', thumbnailSrc);
    } else {
      console.warn('⚠️ No thumbnail found! Add a thumbnail image to your Video block in your EDS document.');
    }
  }

  const videoType = getVideoType(videoUrl);
  console.log('🎥 Video Type:', videoType);
  let videoHTML = '';

  if (videoType === 'youtube') {
    const videoId = getYouTubeId(videoUrl);
    videoHTML = `
      <div class="video-container">
        <img src="${thumbnailSrc}" alt="Video thumbnail" class="video-thumbnail">
        <div class="play-button"></div>
        <iframe
          class="video-iframe"
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
          style="opacity: 0;">
        </iframe>
      </div>
    `;
  } else if (videoType === 'vimeo') {
    const videoId = getVimeoId(videoUrl);
    videoHTML = `
      <div class="video-container">
        <img src="${thumbnailSrc}" alt="Video thumbnail" class="video-thumbnail">
        <div class="play-button"></div>
        <iframe
          class="video-iframe"
          src="https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1&controls=0"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
          style="opacity: 0;">
        </iframe>
      </div>
    `;
  } else {
    videoHTML = `
      <div class="video-container">
        <img src="${thumbnailSrc}" alt="Video thumbnail" class="video-thumbnail">
        <div class="play-button"></div>
        <video class="hover-video" muted loop playsinline>
          <source src="${videoUrl}" type="video/mp4">
        </video>
      </div>
    `;
  }

  block.innerHTML = videoHTML;

  const container = block.querySelector('.video-container');
  const thumbnail = block.querySelector('.video-thumbnail');
  const playButton = block.querySelector('.play-button');
  const video = block.querySelector('.hover-video');
  const iframe = block.querySelector('.video-iframe');

  if (container) {
    console.log('🎥 Video Block: Event listeners attached');

    container.addEventListener('mouseenter', () => {
      console.log('🎥 Mouse Enter: Playing video');
      if (thumbnail) thumbnail.style.opacity = '0';
      if (playButton) playButton.style.opacity = '0';

      if (video) {
        video.style.opacity = '1';
        video.play();
      } else if (iframe) {
        iframe.style.opacity = '1';
      }
    });

    container.addEventListener('mouseleave', () => {
      console.log('🎥 Mouse Leave: Pausing video');
      if (thumbnail) thumbnail.style.opacity = '1';
      if (playButton) playButton.style.opacity = '1';

      if (video) {
        video.style.opacity = '0';
        video.pause();
      } else if (iframe) {
        iframe.style.opacity = '0';
      }
    });
  }

  console.log('🎥 Video Block: Initialization complete');
}
