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
    var sliderGallery = tns({
        container: '#tinyslider-container-gallery',
        controlsContainer: "#tinyslider-controls-gallery",
        items: 1,
        nav: false,
        center: true,
        mouseDrag: true,
        gutter: 5,
        swipeAngle: false,
        edgePadding: 10,
        preventScrollOnTouch: 'force',
        responsive: {
            568: {
                items: 1,
                gutter: 20,
                edgePadding: 60,
            },
            992: {
                items: 1,
                gutter: 30,
                edgePadding: 200,
            }
        }
    });

    sliderGallery.getInfo().slideItems[sliderGallery.getInfo().index].classList.add('active');
    sliderGallery.events.on('indexChanged', () => {
        const info = sliderGallery.getInfo();
        const indexPrev = info.indexCached;
        const indexCurr = info.index;
        for (let i = 0; i < sliderGallery.getInfo().slideItems.length; i++) {
            sliderGallery.getInfo().slideItems[i].classList.remove('active');
        }
        info.slideItems[indexCurr].classList.add('active');
    });

    /* 
    |======================================
    | OPENING SCRIPT
    |======================================
    */
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
    const carousel = document.getElementById('carouselExampleFade');
    carousel.addEventListener('slide.bs.carousel', function (event) {
        for(let aos of document.querySelectorAll('.aos-init')) {
            aos.classList.remove('aos-animate');
        }
    })
    carousel.addEventListener('slid.bs.carousel', function (event) {
        AOS.refresh();
    });

}, false);