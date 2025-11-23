// 1. Get the main elements
    const artList = document.querySelector('.art-list');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // 2. Define the amount to scroll by (e.g., the width of one art-box plus the gap)
    const artBox = document.querySelector('.art-box');
    const SCROLL_STEP = artBox ? artBox.offsetWidth + 20 : 320; 

    function scrollCarousel(direction) {
        if (direction === 'left') {
            artList.scrollLeft -= SCROLL_STEP;
        } else if (direction === 'right') {
            artList.scrollLeft += SCROLL_STEP;
        }
    }

    // 3. Attach event listeners to the buttons
    prevBtn.addEventListener('click', () => {
        scrollCarousel('left');
    });

    nextBtn.addEventListener('click', () => {
        scrollCarousel('right');
    });

    // Optional: Drag functionality (already correct)
    let isDown = false;
    let startX;
    let scrollLeft;

    artList.addEventListener('mousedown', (e) => {
        isDown = true;
        artList.classList.add('active');
        startX = e.pageX - artList.offsetLeft;
        scrollLeft = artList.scrollLeft;
    });

    artList.addEventListener('mouseleave', () => {
        isDown = false;
        artList.classList.remove('active');
    });

    artList.addEventListener('mouseup', () => {
        isDown = false;
        artList.classList.remove('active');
    });

    artList.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - artList.offsetLeft;
        const walk = (x - startX) * 1.5;
        artList.scrollLeft = scrollLeft - walk;
    });

    artList.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - artList.offsetLeft;
        scrollLeft = artList.scrollLeft;
    }, { passive: true });

    artList.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - artList.offsetLeft;
        const walk = (x - startX) * 1.5;
        artList.scrollLeft = scrollLeft - walk;
    }, { passive: false });