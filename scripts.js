const overlay = document.createElement('div');
overlay.className = 'lightbox-overlay';

const lightboxImg = document.createElement('img');
overlay.appendChild(lightboxImg);

const prevBtn = document.createElement('button');
const nextBtn = document.createElement('button');
prevBtn.className = 'lightbox-prev';
nextBtn.className = 'lightbox-next';
prevBtn.textContent = '‹';
nextBtn.textContent = '›';
overlay.appendChild(prevBtn);
overlay.appendChild(nextBtn);

document.body.appendChild(overlay);

let currentGroup = [];
let currentIndex = 0;

function openLightbox(imgs, index) {
  currentGroup = imgs;
  currentIndex = index;
  lightboxImg.src = currentGroup[currentIndex].src;
  lightboxImg.alt = currentGroup[currentIndex].alt;
  overlay.classList.add('open');
  const showNav = currentGroup.length > 1;
  prevBtn.style.display = showNav ? 'block' : 'none';
  nextBtn.style.display = showNav ? 'block' : 'none';
}

function navigate(dir) {
  currentIndex = (currentIndex + dir + currentGroup.length) % currentGroup.length;
  lightboxImg.src = currentGroup[currentIndex].src;
  lightboxImg.alt = currentGroup[currentIndex].alt;
}

document.querySelectorAll('.content-figure img').forEach(img => {
  img.addEventListener('click', () => {
    const collage = img.closest('.image-collage');
    if (collage) {
      const imgs = Array.from(collage.querySelectorAll('img')).sort((a, b) => {
        const ai = a.dataset.groupIndex !== undefined ? parseInt(a.dataset.groupIndex) : Infinity;
        const bi = b.dataset.groupIndex !== undefined ? parseInt(b.dataset.groupIndex) : Infinity;
        return ai - bi;
      });
      openLightbox(imgs, imgs.indexOf(img));
    } else {
      openLightbox([img], 0);
    }
  });
});

overlay.addEventListener('click', () => overlay.classList.remove('open'));
prevBtn.addEventListener('click', e => { e.stopPropagation(); navigate(-1); });
nextBtn.addEventListener('click', e => { e.stopPropagation(); navigate(1); });

document.addEventListener('keydown', e => {
  if (!overlay.classList.contains('open')) return;
  if (e.key === 'Escape') overlay.classList.remove('open');
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
});