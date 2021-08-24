
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
    AOS.init();
    // Handle video player
    const player = new Plyr('#player');
    // Handle slider gallery
    const slider = tns({
        container: '.row-slider',
        nav: false,
        controls: false,
        edgePadding: 10,
        mouseDrag: true,
        items: 2,
        swipeAngle: 15,
        loop: false,
        slideBy: 'page',
        autoplay: false,
        preventScrollOnTouch: 'auto',
        responsive: {
            768: {
                edgePadding: 50,
            }
        }
    });
    
    /* 
    |======================================
    | OPENING SCRIPT
    |======================================
    */
    // animate spouse text opening
    const headerSpouseText = document.querySelector('#opening h1');
    headerSpouseText.innerHTML = headerSpouseText.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    anime.timeline()
        .add({
            targets: '#opening h1 .letter',
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
    // timezz : countdown
    timezz('#countdown-row', {
        date: new Date(2021, 5, 29, 14, 52),
        stop: false,
        canContinue: false,
        withYears: false,
        beforeCreate() {},
        beforeDestroy() {},
        update(event) {},
    });
    // lightgallery : image lightbox popup
    lightGallery(document.getElementById('row-lightgallery'), {
        mode: 'lg-fade',
        cssEasing: 'ease-in',
        speed: 1000,
        startClass: 'lg-fade',
        backdropDuration: 500,
        hideBarsDelay: 500,
        selector: '[data-src]',
        download: false,
    });
    // page href smooth scroll
    const btn_href_page = document.querySelectorAll('.page-scroll');
    for (let btn of btn_href_page) {
        btn.addEventListener('click', function(e) {
            window.scrollTo({
                top: document.querySelector(`${this.getAttribute('href')}`).offsetTop - 50,
                behavior: 'smooth'
            });
            e.preventDefault();
        })
    }
    // back to top & nav-item active class
    const btn_to_top = document.querySelector('#btn-to-top');
    const navbar = document.querySelector('.navbar');
    const navlinks = document.querySelectorAll('.nav-link.page-scroll');
    let str_section_query = "";
    for (let indexNavlink = 0; indexNavlink < navlinks.length; indexNavlink++) {
        if (indexNavlink !== navlinks.length-1) {
            str_section_query += `${navlinks[indexNavlink].getAttribute('href')}, `;
        } else {
            str_section_query += `${navlinks[indexNavlink].getAttribute('href')}`;
        }
    }
    sectionlistener = document.querySelectorAll(str_section_query);
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            btn_to_top.style.display = 'flex';
        } else {
            navbar.classList.remove('navbar-scrolled');
            btn_to_top.style.display = 'none';
        }

        for (let link of document.querySelectorAll('.nav-link')) {
            link.classList.remove('active');
        }
        for (let section of sectionlistener) {
            if (
                window.scrollY > (section.offsetTop - 100) &&
                window.scrollY < (section.offsetTop + section.offsetHeight)
            ) {
                for (let link of document.querySelectorAll('.nav-link')) {
                    link.classList.remove('active');
                }
                document.querySelector(`.nav-link[href="#${section.id}"]`).classList.add('active');
            }
        }
    })
    
});