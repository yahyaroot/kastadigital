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
        
        setTimeout(() => {
            document.querySelector('section#opening').remove();
            AOS.init();
        }, 1500);

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
    const section1 = document.getElementById('section-1');
    const section2 = document.getElementById('section-2');
    const sectionGlideSlide = document.querySelectorAll('.glide__slide');
    const btn_glide_controls = document.querySelectorAll('[data-glide-dir]');
    // glide : page slide
    const glideSection = new Glide('#glide-section', {
        type: 'carousel',
        perView: 1,
        focusAt: 'center',
        swipeThreshold: false, 
        dragThreshold: false,
        animationTimingFunc: 'ease-in',
        animationDuration: 1500,
        autoheight: true,
    })
    glideSection.on('build.after', function(event) {
        let slideHeight = document.querySelector('.glide__slide--active').offsetHeight;
        let glideTrack = document.querySelector('.glide__track').offsetHeight;
        if (slideHeight != glideTrack) {
            let newHeight = slideHeight;
            document.querySelector('.glide__track').style.height = `${newHeight}px`;
        }
    })
    glideSection.on('run.after', function(event) {
        let slide = document.querySelector('.glide__slide--active');
        let slideHeight = document.querySelector('.glide__slide--active').offsetHeight;
        let glideTrack = document.querySelector('.glide__track').offsetHeight;
        if (slideHeight != glideTrack) {
            let newHeight = slideHeight;
            document.querySelector('.glide__track').style.height = `${newHeight}px`;
        }
        for (let btn of btn_glide_controls) {
            btn.classList.remove('active');
            if (glideSection.index === parseInt(btn.dataset.glideDir.substring(1))) {
                btn.classList.add('active');
            }
        }
    })
    glideSection.mount();
});