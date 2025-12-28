// MOUSE HOVER

(() => {
  const OFFSET_X = 16;
  const OFFSET_Y = 16;

  const preview = document.getElementById('cursor-preview');
  const imgEl = preview.querySelector('img');

  function onEnter(e) {
    const src = e.currentTarget.dataset.img;
    if (!src) return;
    imgEl.src = src;
    imgEl.alt = ''; // optional alt, could add dataset for this too
    preview.style.opacity = '1';
    preview.style.visibility = 'visible';
  }

  function onLeave() {
    preview.style.opacity = '0';
    preview.style.visibility = 'hidden';
    preview.style.transform = 'translate(-9999px, -9999px)';
  }

  function onMove(e) {
    const w = preview.offsetWidth;
    const h = preview.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let x = e.clientX + OFFSET_X;
    let y = e.clientY + OFFSET_Y;

    if (x + w > vw) x = e.clientX - w - OFFSET_X;
    if (y + h > vh) y = e.clientY - h - OFFSET_Y;

    preview.style.transform = `translate(${x}px, ${y}px)`;
  }

  document.querySelectorAll('.img-hover[data-img]').forEach(el => {
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousemove', onMove);
  });
})();

document.querySelectorAll('.img-hover[data-img]').forEach(el => {
  const img = new Image();
  img.src = el.dataset.img;
});