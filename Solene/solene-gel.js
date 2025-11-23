document.addEventListener('DOMContentLoaded', () => {
            const carouselContainer = document.getElementById('art-list');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');

            if (!carouselContainer || !prevBtn || !nextBtn) return; 

            // Function to handle the horizontal scrolling of the carousel
            function scrollCarousel(direction) {
                const firstArtBox = carouselContainer.querySelector('.art-box');
                if (!firstArtBox) return; 

                // Get the computed style for gap (1.5rem or 24px in the CSS)
                const gapStyle = window.getComputedStyle(carouselContainer).gap;
                // Parse the gap value (assuming it's in px for simplicity, or hardcode 24 if relying strictly on CSS above)
                // We'll hardcode 24px (1.5rem) as per the CSS defined above.
                const gap = 24; 
                
                // Calculate scroll amount: Card width + gap
                const scrollAmount = firstArtBox.offsetWidth + gap; 
                
                if (direction === 'next') {
                    // Smoothly scroll to the right
                    carouselContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                } else if (direction === 'prev') {
                    // Smoothly scroll to the left
                    carouselContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
                
                // Update button state after a short delay for smooth scrolling animation
                setTimeout(updateButtonState, 300);
            }

            // Function to update the disabled state of the buttons
            function updateButtonState() {
                const scrollLeft = carouselContainer.scrollLeft;
                const clientWidth = carouselContainer.clientWidth;
                const scrollWidth = carouselContainer.scrollWidth;

                // Disable previous button if scrolled to the far left (with a 1px tolerance)
                prevBtn.disabled = scrollLeft <= 1; 

                // Disable next button if scrolled to the far right (with a 1px tolerance)
                const isScrolledEnd = (scrollLeft + clientWidth) >= (scrollWidth - 1); 
                nextBtn.disabled = isScrolledEnd;
            }

            // Attach event listeners
            prevBtn.addEventListener('click', () => scrollCarousel('prev'));
            nextBtn.addEventListener('click', () => scrollCarousel('next'));

            // Update button state on manual scroll and resize
            carouselContainer.addEventListener('scroll', updateButtonState);
            window.addEventListener('resize', updateButtonState);

            // Initialize button state on load
            updateButtonState();
        });