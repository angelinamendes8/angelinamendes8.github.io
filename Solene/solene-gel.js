function scrollCarousel(direction) {
            const container = document.getElementById('prints-carousel');
            // Scroll by 80% of the container's width for a smooth, item-by-item feel
            const scrollAmount = container.clientWidth * 0.8; 
            
            if (direction === 'next') {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            } else if (direction === 'prev') {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        }