const FALLBACK_RATIO = 0.72;

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
  }
}

function renderGallery(galleryData) {
  gallery.innerHTML = '';

  galleryData.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.style.aspectRatio = `${FALLBACK_RATIO}`;

    const frame = document.createElement('div');
    frame.className = 'card-inner';

    const img = document.createElement('img');
    img.src = item.afterImage;
    img.alt = `Gallery image ${index + 1}`;
    img.dataset.before = item.beforeImage;
    img.dataset.after = item.afterImage;
    img.dataset.show = 'after';

    img.addEventListener('load', () => {
      if (img.naturalWidth && img.naturalHeight) {
        const rotatedRatio = img.naturalHeight / img.naturalWidth;
        card.style.aspectRatio = `${rotatedRatio}`;
      }
    });

    card.addEventListener('click', () => {
      const showingAfter = img.dataset.show === 'after';
      img.src = showingAfter ? img.dataset.before : img.dataset.after;
      img.dataset.show = showingAfter ? 'before' : 'after';
    });

    card.addEventListener('mouseenter', () => {
      viewerNote.style.display = 'block';
    });

    card.addEventListener('mouseleave', () => {
      viewerNote.style.display = 'none';
    });

    frame.appendChild(img);
    card.appendChild(frame);
    gallery.appendChild(card);
  });
}

loadGallery();

// Recreated files for conflict-safe PR

// Recreated files for conflict-safe PR
