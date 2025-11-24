document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        const img = e.target.closest('.carousel-item img');
        if (!img) return;

    const overlay = document.createElement('div');
    overlay.style = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:9999';
    const big = document.createElement('img');
    big.src = img.src;
    big.style.maxWidth = '90%'; big.style.maxHeight = '90%';

    overlay.appendChild(big);
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  });
});