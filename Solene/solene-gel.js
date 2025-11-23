function scrollCarousel(direction) {
            const container = document.getElementById('prints-carousel');
            // Calculate the width of one item + its margin (4 items visible on large screens)
            // On mobile, we scroll one item at a time (approx 80% of container width)
            const scrollAmount = container.clientWidth * 0.8; 
            
            if (direction === 'next') {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            } else if (direction === 'prev') {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        }