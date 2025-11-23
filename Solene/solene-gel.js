// 1. Get the main elements
    const artList = document.querySelector('.art-list');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // 2. Define the amount to scroll by (e.g., the width of one art-box plus the gap)
    // We'll calculate this dynamically based on the first item's dimensions.
    const artBox = document.querySelector('.art-box');
    const scrollAmount = artBox ? artBox.offsetWidth + 20 : 320; // 300px width + 20px gap

    /**
     * Handles the scrolling functionality for the carousel.
     * @param {string} direction - 'left' for previous, 'right' for next.
     */
    function scrollCarousel(direction) {
        if (direction === 'left') {
            // Scroll to the left by the calculated amount
            artList.scrollLeft -= scrollAmount;
        } else if (direction === 'right') {
            // Scroll to the right by the calculated amount
            artList.scrollLeft += scrollAmount;
        }
    }

    // 3. Attach event listeners to the buttons
    prevBtn.addEventListener('click', () => {
        scrollCarousel('left');
    });

    nextBtn.addEventListener('click', () => {
        scrollCarousel('right');
    });

    // Optional: Add drag functionality (for better user experience, like a touch device)
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
        const walk = (x - startX) * 1.5; // Scroll faster
        artList.scrollLeft = scrollLeft - walk;
    });

    // Handle touch events for mobile devices
    artList.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - artList.offsetLeft;
        scrollLeft = artList.scrollLeft;
    }, { passive: true }); // passive: true for better scrolling performance

    artList.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - artList.offsetLeft;
        const walk = (x - startX) * 1.5;
        artList.scrollLeft = scrollLeft - walk;
    }, { passive: false }); // passive: false to allow e.preventDefault() if needed, though scroll behavior handles it