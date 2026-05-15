const overlay = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.content-figure img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    overlay.classList.add('open');
  });
});

overlay.addEventListener('click', () => overlay.classList.remove('open'));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') overlay.classList.remove('open');
});
