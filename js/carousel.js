document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.coverflow-carousel');

    carousels.forEach(carousel => {
        const slides = Array.from(carousel.querySelectorAll('.cf-slide'));
        const btnLeft = carousel.querySelector('.cf-arrow-left');
        const btnRight = carousel.querySelector('.cf-arrow-right');
        
        let currentIndex = 0;
        let autoplayTimer;

        function updateCarousel() {
            slides.forEach(s => s.className = 'cf-slide');

            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            const nextIndex = (currentIndex + 1) % slides.length;

            slides[currentIndex].classList.add('active');
            slides[prevIndex].classList.add('prev');
            slides[nextIndex].classList.add('next');
        }

        function slideNext() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }

        function slidePrev() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        }

        slides.forEach((slide) => {
            const overlay = slide.querySelector('.cf-overlay');
            if(overlay) {
                overlay.addEventListener('click', () => {
                    if (slide.classList.contains('next')) slideNext();
                    if (slide.classList.contains('prev')) slidePrev();
                });
            }
        });

        if(btnRight) btnRight.addEventListener('click', slideNext);
        if(btnLeft) btnLeft.addEventListener('click', slidePrev);

        function startAutoplay() {
            autoplayTimer = setInterval(slideNext, 4000);
        }

        function stopAutoplay() {
            clearInterval(autoplayTimer);
        }

        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
        carousel.addEventListener('touchstart', stopAutoplay, {passive: true});

        updateCarousel();
        startAutoplay();
    });
});