var url = new URL(window.location.href);
var u = url.searchParams.get("u");
if (u==null || u=="") {
    document.getElementById('guest').innerHTML = "Guest";
} else {
    document.getElementById('guest').innerHTML = u;
}

document.addEventListener('DOMContentLoaded', function() {
    /* 
    |======================================
    | APP INIT 
    |======================================
    */
    // Aos init
    AOS.init();

    /* 
    |======================================
    | OPENING SCRIPT
    |======================================
    */
    // animate spouse text opening
    const openingSpouseText = document.querySelector('.spouse-text');
    openingSpouseText.innerHTML = openingSpouseText.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    anime.timeline()
        .add({
            targets: '.spouse-text .letter',
            scale: [4,1],
            opacity: [0,1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 950,
            delay: (el, i) => 150*i
        });
    // btn sound and open the opening
    const btn_open = document.querySelector('#btn-open-opening');
    const btn_play = document.querySelector('#btn-play');
    const audio = document.querySelector('#audio');
    btn_open.addEventListener('click', function(e) {
        document.body.classList.remove('opening-show');
        document.body.classList.add('opening-hide');
        for(let aos of document.querySelectorAll('.aos-init')) {
            aos.classList.remove('aos-animate');
        }
        setTimeout(() => {
            document.querySelector('section#opening').remove();
            AOS.refresh();
        }, 2000);

        audio.play();
    })
    btn_play.addEventListener('click', function() {
        if (audio.paused) {
            btn_play.innerHTML = '<i class="ri ri-volume-high"></i>';
            audio.play();
        } else {
            btn_play.innerHTML = '<i class="ri ri-volume-off"></i>';
            audio.pause();
        }
    })
    
    /* 
    |======================================
    | PAGE SCRIPT
    |======================================
    */
    // glide : carousel/slider
    const glideTrack = document.querySelector('.glide__track');
    let glide = new Glide('.glide', {
        type: 'carousel',
        perView: 2,
        focusAt: '0',
        peek: {
            before: 0, after: 150
        },
        breakpoints: {
            992: { perView: 1 },
        }
    }).mount();
    let glideGallery = null;

    const carousel = document.getElementById('carouselExampleFade');
    carousel.addEventListener('slide.bs.carousel', function (event) {
        for(let aos of document.querySelectorAll('.aos-init')) {
            aos.classList.remove('aos-animate');
        }
    })
    carousel.addEventListener('slid.bs.carousel', function (event) {
        if ( event.relatedTarget.querySelector('#section-3') !== null && glideGallery === null ) {
            glide.update({ 
                type: 'carousel',
                focusAt: '0',
                peek: {
                    before: 0, after: 150
                },
                breakpoints: {
                    992: { perView: 1 },
                }
            });
        }
        AOS.refresh();
    });

    
}, false);