(function () {
    'use strict';

    function setLanguage(lang) {
        document.body.className = 'lang-' + lang;
        
        var btnEn = document.getElementById('btn-en');
        var btnPl = document.getElementById('btn-pl');
        if (btnEn) btnEn.classList.remove('active');
        if (btnPl) btnPl.classList.remove('active');
        
        var active = document.getElementById('btn-' + lang);
        if (active) active.classList.add('active');

        localStorage.setItem('portfolio_lang', lang);
    }

    function copyEmail() {
        var email = 'milosz.12.seweryn@gmail.com';
        var emailGroup = document.getElementById('footer-email-trigger');
        if (!emailGroup) {
            emailGroup = document.querySelector('.social-group[onclick="copyEmail()"]');
        }
        if (!emailGroup || !navigator.clipboard || !navigator.clipboard.writeText) return;

        navigator.clipboard.writeText(email).then(function () {
            emailGroup.classList.add('show-tooltip');
            setTimeout(function () {
                emailGroup.classList.remove('show-tooltip');
            }, 2000);
        }).catch(function (err) {
            console.error('Błąd kopiowania:', err);
        });
    }

    function bindFooterEmail() {
        var el = document.getElementById('footer-email-trigger');
        if (!el) return;
        el.addEventListener('click', copyEmail);
        el.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                copyEmail();
            }
        });
    }

    window.setLanguage = setLanguage;
    window.copyEmail = copyEmail;

    document.addEventListener('DOMContentLoaded', function () {
        bindFooterEmail();
        
        var savedLang = localStorage.getItem('portfolio_lang') || 'en';
        setLanguage(savedLang);
    });
})();

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.createElement('div');
    modal.id = 'media-modal';
    modal.className = 'media-modal';
    modal.innerHTML = `
        <span class="modal-close" aria-label="Zamknij">&times;</span>
        <div class="modal-content-wrapper" id="modal-content-wrapper"></div>
    `;
    document.body.appendChild(modal);

    const modalWrapper = document.getElementById('modal-content-wrapper');
    const closeBtn = modal.querySelector('.modal-close');

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modalWrapper.innerHTML = ''; 
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === modalWrapper) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    const mediaElements = document.querySelectorAll('.mechanic-media img, .mechanic-media video');

    mediaElements.forEach(media => {
        if (media.closest('.coverflow-carousel')) return;

        media.classList.add('zoomable-media');

        media.addEventListener('click', () => {
            modalWrapper.innerHTML = ''; 
            
            if (media.tagName === 'IMG') {
                const img = document.createElement('img');
                img.src = media.src;
                img.alt = media.alt || 'Powiększony zrzut ekranu';
                modalWrapper.appendChild(img);
            } 
            else if (media.tagName === 'VIDEO') {
                const video = document.createElement('video');
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.controls = true;
                
                const sourceTag = media.querySelector('source');
                const source = document.createElement('source');
                source.src = sourceTag ? sourceTag.src : media.src;
                source.type = 'video/mp4';
                
                video.appendChild(source);
                modalWrapper.appendChild(video);
            }

            modal.classList.add('active');
        });
    });
});