/**
 * SAM — Photographer & Colorist 
 * Main JavaScript File
 */

// ==========================================
// 1. UI Click Sound Effect
// ==========================================
const clickAudio = new Audio('https://sahil-aditya.github.io/Creative_Gallery/images/click.mp3');
clickAudio.preload = 'auto'; 

const playUiSound = () => {
  const soundClone = clickAudio.cloneNode();
  soundClone.play().catch(error => console.warn('Audio blocked by browser autoplay policy:', error));
};
document.addEventListener('click', playUiSound);


// ==========================================
// 2. Touch Meteor Effect
// ==========================================
const touchMeteor = document.getElementById('touchMeteor');
let meteorX = window.innerWidth * 0.5, meteorY = window.innerHeight * 0.5;
let targetX = meteorX, targetY = meteorY, lastTouchPoint = null;

const animateMeteor = () => {
  meteorX += (targetX - meteorX) * 0.28;
  meteorY += (targetY - meteorY) * 0.28;
  if (touchMeteor) {
    touchMeteor.style.left = `${meteorX}px`;
    touchMeteor.style.top = `${meteorY}px`;
  }
  requestAnimationFrame(animateMeteor);
};
animateMeteor();

const updateTouchPoint = (x, y) => {
  targetX = x; targetY = y; lastTouchPoint = { x, y };
  if (touchMeteor) touchMeteor.classList.add('active');
};
const hideTouchMeteor = () => { 
  lastTouchPoint = null; 
  if (touchMeteor) touchMeteor.classList.remove('active'); 
};

document.addEventListener('touchstart', (e) => { if (e.touches[0]) updateTouchPoint(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
document.addEventListener('touchmove', (e) => { if (e.touches[0]) updateTouchPoint(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
document.addEventListener('touchend', hideTouchMeteor, { passive: true });
document.addEventListener('touchcancel', hideTouchMeteor, { passive: true });
document.addEventListener('scroll', () => { if (lastTouchPoint) updateTouchPoint(lastTouchPoint.x, lastTouchPoint.y); }, { passive: true });


// ==========================================
// 3. Social Links Sanitizer & Scroll Reveal
// ==========================================
const sanitizeSocialLinks = () => {
  document.querySelectorAll('[data-social-link]').forEach((link) => {
    const href = (link.getAttribute('href') || '').trim();
    if (!href || href === '#' || href.toLowerCase() === 'null' || href.toLowerCase() === 'undefined') {
      link.style.display = 'none';
    }
  });
};
sanitizeSocialLinks();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));


// ==========================================
// 4. Instant Sequential Gallery Loader
// ==========================================
const FALLBACK_RATIO = 0.72; 
const gallery = document.getElementById('gallery'); 
const viewerNote = document.getElementById('viewerNote');

async function loadGallery() {
  if (!gallery) return; 

  try {
    const response = await fetch('images.json');
    if (!response.ok) throw new Error(`Failed to load images.json: ${response.status}`);

    const data = await response.json();
    const galleryData = Array.isArray(data.gallery) ? data.gallery : [];
    renderGallery(galleryData);
  } catch (error) {
    console.error(error);
    gallery.innerHTML = '<p class="error">Unable to load gallery at the moment.</p>';
  }
}

function renderGallery(galleryData) {
  gallery.innerHTML = '';

  const leftCol = document.createElement('div');
  leftCol.className = 'masonry-col';
  const rightCol = document.createElement('div');
  rightCol.className = 'masonry-col';

  gallery.appendChild(leftCol);
  gallery.appendChild(rightCol);

  galleryData.forEach((item, index) => {
    if (!item.beforeImage || !item.afterImage) return;

    const card = document.createElement('article');
    card.className = 'card loading';
    card.setAttribute('tabindex', '0');
    card.style.aspectRatio = `${FALLBACK_RATIO}`;
    card.style.order = index; 

    const frame = document.createElement('div');
    frame.className = 'card-inner';
    frame.style.position = 'relative';
    frame.style.width = '100%';
    frame.style.height = '100%';

    const baseImgStyles = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; filter: blur(20px); transform: scale(1.05); transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), filter 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);';

    const beforeImg = document.createElement('img');
    beforeImg.alt = `Raw visual ${index + 1}`;
    beforeImg.className = 'before-img';
    beforeImg.style.cssText = baseImgStyles;
    beforeImg.decoding = 'async'; 

    const afterImg = document.createElement('img');
    afterImg.alt = `Gallery image ${index + 1}`;
    afterImg.className = 'after-img';
    afterImg.style.cssText = baseImgStyles;
    afterImg.style.zIndex = '1';
    afterImg.decoding = 'async';

    let showingAfter = true;
    const toggleImage = () => {
      showingAfter = !showingAfter;
      afterImg.style.opacity = showingAfter ? '1' : '0';
      beforeImg.style.opacity = showingAfter ? '0' : '1';
    };

    card.addEventListener('click', toggleImage);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleImage(); }
    });

    if (viewerNote) {
      card.addEventListener('mouseenter', () => viewerNote.style.display = 'block');
      card.addEventListener('mouseleave', () => viewerNote.style.display = 'none');
    }

    // --- Success Handler ---
    afterImg.onload = () => {
      card.classList.remove('loading');
      
      if (afterImg.naturalWidth && afterImg.naturalHeight) {
        card.style.aspectRatio = `${afterImg.naturalWidth / afterImg.naturalHeight}`;
      }

      afterImg.style.opacity = '1';
      afterImg.style.filter = 'blur(0px)';
      afterImg.style.transform = 'scale(1)';
      beforeImg.style.filter = 'blur(0px)';
      beforeImg.style.transform = 'scale(1)';

      setTimeout(() => {
        afterImg.style.transition = 'opacity 0.25s ease-in-out';
        beforeImg.style.transition = 'opacity 0.25s ease-in-out';
      }, 800);
    };

    // --- Auto-Retry Failsafe ---
    let retryCount = 0;
    afterImg.onerror = () => {
      if (retryCount < 2) {
        retryCount++;
        // If the browser drops the connection, try again 1.5s later
        setTimeout(() => {
          afterImg.src = item.afterImage;
          beforeImg.src = item.beforeImage;
        }, 1500);
        return; 
      }
      
      card.classList.remove('loading');
      afterImg.style.opacity = '1';
      afterImg.style.filter = 'blur(0px)';
      afterImg.style.transform = 'scale(1)';
      afterImg.alt = "Image failed to load";
    };

    frame.appendChild(beforeImg);
    frame.appendChild(afterImg);
    card.appendChild(frame);

    if (index % 2 === 0) leftCol.appendChild(card);
    else rightCol.appendChild(card);

    // --- Instant Execution ---
    // All images are requested immediately as the loop runs. 
    // The browser natively prioritizes them by index sequence.
    beforeImg.src = item.beforeImage;
    afterImg.src = item.afterImage;
  });
}

loadGallery();


// ==========================================
// 5. Aggressive Local Caching (Service Worker)
// ==========================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('Premium Caching Enabled:', registration.scope);
      })
      .catch(error => {
        console.log('Caching failed:', error);
      });
  });
}
  
