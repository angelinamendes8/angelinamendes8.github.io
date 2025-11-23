// Get the carousel container element
        const carouselContainer = document.getElementById('art-list');
        // Get the navigation buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        // Function to handle the horizontal scrolling of the carousel
        function scrollCarousel(direction) {
            // Calculate the scroll amount based on the visible width (80% for partial scroll, which feels smooth)
            const scrollAmount = carouselContainer.clientWidth * 0.8; 
            
            if (direction === 'next') {
                carouselContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            } else if (direction === 'prev') {
                carouselContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        }

        // Attach event listeners to the buttons
        prevBtn.addEventListener('click', () => scrollCarousel('prev'));
        nextBtn.addEventListener('click', () => scrollCarousel('next'));

        // Optional: Implement keyboard controls for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                scrollCarousel('prev');
            } else if (e.key === 'ArrowRight') {
                scrollCarousel('next');
            }
        });