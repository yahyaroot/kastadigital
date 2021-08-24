
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
    // Handle slider gallery
    var sliderGallery = tns({
        container: '#tinyslider-container-gallery',
        controlsContainer: "#tinyslider-controls-gallery",
        items: 1.2,
        nav: false,
        center: true,
        mouseDrag: true,
        gutter: 10,
        swipeAngle: false,
        loop: false,
        preventScrollOnTouch: 'force',
    });
    var sliderMessages = tns({
        container: '#tinyslider-container-messages',
        controlsContainer: "#tinyslider-controls-messages",
        items: 1.1,
        nav: false,
        mouseDrag: true,
        gutter: 5,
        swipeAngle: false,
        loop: false,
        preventScrollOnTouch: 'force',
        responsive: {
            568: {
                items: 2.2,
                gutter: 15,
            },
            992: {
                items: 3.2,
                gutter: 20,
            }
        }
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
        document.body.classList.add('opening-hide');
        document.body.classList.remove('opening-show');
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