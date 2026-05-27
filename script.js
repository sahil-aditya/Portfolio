const FALLBACK_RATIO = 0.72; // Assumes a standard portrait dimension width/height

const gallery = document.getElementById('gallery'); 
const viewerNote = document.getElementById('viewerNote');

async function loadGallery() {
  try {
    const response = await fetch('images.json');
    if (!response.ok) {
      throw new Error(`Failed to load images.json: ${response.status}`);
    }

    const data = await response.json();
    const galleryData = Array.isArray(data.gallery) ? data.gallery : [];
    renderGallery(galleryData);
  } catch (error) {
    console.error(error);
    gallery.innerHTML = '<p class="error">Unable to load gallery at the moment.</p>';
  }
}

async function renderGallery(galleryData) {
  // Clear out any existing content
  gallery.innerHTML = '';

  // 1. Create Left/Right columns for Desktop Masonry
  const leftCol = document.createElement('div');
  leftCol.className = 'masonry-col';
  
  const rightCol = document.createElement('div');
  rightCol.className = 'masonry-col';

  gallery.appendChild(leftCol);
  gallery.appendChild(rightCol);

  const sequentialQueue = [];

  // 2. Build the DOM nodes and assign classes (Instantly creates skeletons)
  galleryData.forEach((item, index) => {
    // Soft error check: skip if data is completely missing
    if (!item.beforeImage || !item.afterImage) return;

    const card = document.createElement('article');
    card.className = 'card loading';
    card.setAttribute('tabindex', '0');
    card.style.aspectRatio = `${FALLBACK_RATIO}`;
    card.style.order = index; // Ensures mobile flex layout stacks 1, 2, 3, 4 properly

    const frame = document.createElement('div');
    frame.className = 'card-inner';
    frame.style.position = 'relative';
    frame.style.width = '100%';
    frame.style.height = '100%';

    // Inject Dual-Image for smooth cinematic toggling without network delays
    const baseImgStyles = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; filter: blur(20px); transform: scale(1.05); transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), filter 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);';

    const beforeImg = document.createElement('img');
    beforeImg.dataset.src = item.beforeImage; // data-src used for lazy load
    beforeImg.alt = `Raw visual ${index + 1}`;
    beforeImg.className = 'before-img';
    beforeImg.style.cssText = baseImgStyles;

    const afterImg = document.createElement('img');
    afterImg.dataset.src = item.afterImage;
    afterImg.alt = `Gallery image ${index + 1}`;
    afterImg.className = 'after-img';
    afterImg.style.cssText = baseImgStyles;
    afterImg.style.zIndex = '1';

    // Click/Keydown Logic
    let showingAfter = true;
    const toggleImage = () => {
      showingAfter = !showingAfter;
      afterImg.style.opacity = showingAfter ? '1' : '0';
      beforeImg.style.opacity = showingAfter ? '0' : '1';
    };

    card.addEventListener('click', toggleImage);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleImage();
      }
    });

    // Viewer Note Logic
    if (viewerNote) {
      card.addEventListener('mouseenter', () => {
        viewerNote.style.display = 'block';
      });
      card.addEventListener('mouseleave', () => {
        viewerNote.style.display = 'none';
      });
    }

    // Append images to frame, frame to card
    frame.appendChild(beforeImg);
    frame.appendChild(afterImg);
    card.appendChild(frame);

    // Alternate sorting into columns
    if (index % 2 === 0) {
      leftCol.appendChild(card);
    } else {
      rightCol.appendChild(card);
    }

    // Push into sequence queue for waterfall loading
    sequentialQueue.push({ card, beforeImg, afterImg });
  });

  // 3. Execute Sequential Loading
  for (const { card, beforeImg, afterImg } of sequentialQueue) {
    await new Promise((resolve) => {
      
      // The 4-Second Failsafe Timeout
      const timeoutFallback = setTimeout(() => {
        resolve(); 
      }, 4000);

      const handleCompletion = () => {
        clearTimeout(timeoutFallback);
        resolve();
      };

      afterImg.onload = () => {
        card.classList.remove('loading');
        
        // Dynamic Aspect Ratio Calculation
        if (afterImg.naturalWidth && afterImg.naturalHeight) {
          const ratio = afterImg.naturalWidth / afterImg.naturalHeight;
          card.style.aspectRatio = `${ratio}`;
        }

        // Cinematic De-blur Reveal
        afterImg.style.opacity = '1';
        afterImg.style.filter = 'blur(0px)';
        afterImg.style.transform = 'scale(1)';
        beforeImg.style.filter = 'blur(0px)';
        beforeImg.style.transform = 'scale(1)';

        // Reset transition to normal speed for responsive tapping
        setTimeout(() => {
          afterImg.style.transition = 'opacity 0.25s ease-in-out';
          beforeImg.style.transition = 'opacity 0.25s ease-in-out';
        }, 800);

        handleCompletion();
      };

      afterImg.onerror = () => {
        card.classList.remove('loading');
        handleCompletion();
      };

      // Trigger the download by moving data-src to src
      beforeImg.src = beforeImg.dataset.src;
      afterImg.src = afterImg.dataset.src;
    });
  }
}

// Initialize
loadGallery();
                      
