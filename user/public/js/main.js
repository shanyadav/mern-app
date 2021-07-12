(function ($) {
    'use strict';
 
    /* =======================================
        For Sidebar
    =======================================*/
    $(".siderbar_btn").on("click", function () {
        $(".menu_sidebar_info").addClass("info-opened");
        $(".body-overlay").addClass("opened");
    });
    $(".menu_info_close-btn").on("click", function () {
        $(".menu_sidebar_info").removeClass("info-opened");
        $(".body-overlay").removeClass("opened");
    });
    $(".body-overlay").on("click", function () {
        $(".menu_sidebar_info").removeClass("info-opened");
        $(".body-overlay").removeClass("opened");
    });
 
    /* =======================================
        For slider
    =======================================*/
    $("#slider_owl").owlCarousel({
        items: 1,
        nav: true,
        dots: true,
        autoplay: false,
        autoplayTimeout: 9000, // Default is 5000
        smartSpeed: 1000, // Default is 250
        loop: true,
        navText: ["<i class='icon-glyph-205'></i>", "<i class='icon-glyph-204'></i>"],
        mouseDrag: true,
        touchDrag: true,
    });

 
    /*=======================================
        slider Section
     ========================================== */
    $(".search_icon").on('click', function () {
        $(".search_icon_inr").slideToggle();
    });
    $(".slider_home").on("translate.owl.carousel", function () {
        $(".single_slider h2, .single_slider h5, .single_slider p").removeClass("animated fadeInUp").css("opacity", "0");
        $(".single_slider .slider_btn").removeClass("animated fadeInDown").css("opacity", "0");
    });

    $(".slider_home").on("translated.owl.carousel", function () {
        $(".single_slider h2, .single_slider h5, .single_slider p").addClass("animated fadeInUp").css("opacity", "1");
        $(".single_slider .slider_btn").addClass("animated fadeInDown").css("opacity", "1");
    });

    /* =======================================
         Branche Section -- Home Page
     =======================================*/
     $("#branche_carousel").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 5 seconds
        autoplay: false,
        smartSpeed: 1000, // Default is 250
        items: 2, //Set Testimonial items
        loop: true,
        margin: 30,
        touchDrag: true,
        mouseDrag: true,
        pagination: false,
        nav: false,
        dots: false,
        navText: ["<i class='icofont-thin-left'></i>", "<i class='icofont-thin-right'></i>"],
        responsive: {
            1200: {
                items: 2
            },
            992: {
                items: 2
            },
            768: {
                items: 2
            },
            480: {
                items: 1
            },
            320: {
                items: 1
            }
        }
    });

    /* =======================================
         Team Section 
     =======================================*/
    $("#team_carsel").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 5 seconds
        autoplay: true,
        smartSpeed: 1000, // Default is 250
        items: 1, //Set Testimonial items
        loop: true,
        margin: 30,
        singleItem: false,
        touchDrag: true,
        mouseDrag: true,
        pagination: true,
        nav: false,
        dots: false,
        navText: ["<i class='icofont-thin-left'></i>", "<i class='icofont-thin-right'></i>"],
    });


    /* =======================================
         Testimonial Section 
     =======================================*/
    $("#testimonial").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 5 seconds
        autoplay: false,
        smartSpeed: 1000, // Default is 250
        items: 3, //Set Testimonial items
        loop: true,
        margin: 30,
        touchDrag: true,
        mouseDrag: true,
        pagination: true,
        nav: false,
        dots: true,
        navText: ["<i class='icofont-thin-left'></i>", "<i class='icofont-thin-right'></i>"],
        responsive: {
            1200: {
                items: 3
            },
            992: {
                items: 2
            },
            768: {
                items: 2
            },
            480: {
                items: 1
            },
            320: {
                items: 1
            }
        }
    });
    /* =======================================
         Gallery Section 
     =======================================*/
    $(".gallery_carousel").owlCarousel({
        autoPlay: 1000, //Set AutoPlay to 5 seconds
        autoplay: false,
        smartSpeed: 200, // Default is 250
        items: 4, //Set Testimonial items
        loop: true,
        singleItem: true,
        touchDrag: true,
        mouseDrag: true,
        pagination: true,
        margin: 5,
        nav: true,
        dots: false,
        navText: ["<i class='icofont-thin-left'></i>", "<i class='icofont-thin-right'></i>"],
        responsive: {
            1200: {
                items: 4
            },
            992: {
                items: 3
            },
            768: {
                items: 3
            },
            480: {
                items: 2
            },
            320: {
                items: 1
            }
        }
    });

    /* =======================================
         Product Promotion Section 
     =======================================*/
    $("#product_pro").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 5 seconds
        autoplay: false,
        smartSpeed: 1000, // Default is 250
        items: 3, //Set Testimonial items
        loop: true,
        margin: 30,
        singleItem: true,
        touchDrag: true,
        mouseDrag: true,
        pagination: true,
        nav: false,
        dots: true,
        navText: ["<i class='icofont-thin-left'></i>", "<i class='icofont-thin-right'></i>"],
        responsive: {
            1200: {
                items: 3
            },
            992: {
                items: 3
            },
            768: {
                items: 2
            },
            480: {
                items: 1
            },
            320: {
                items: 1
            },
            280: {
                items: 1
            }
        }
    });

    /*=======================================
        Event  Section  
    =======================================*/
    $("#event_carousel").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 5 seconds
        autoplay: false,
        smartSpeed: 2000, // Default is 250
        items: 3,
        center: true,
        loop: true,
        touchDrag: true,
        mouseDrag: true,
        pagination: false,
        dots: true,
        nav: false,
        navText: ["<i class='logo-nav-icon'></i>", "<i class='logo-nav-icon'></i>"],
        responsive: {
            1200: {
                items: 3
            },
            992: {
                items: 3
            },
            768: {
                items: 3
            },
            480: {
                items: 1,
                center: false,
            },
            320: {
                items: 1,
                center: false,
            } 
        }
    });


    /*=======================================
        Client Section  
    =======================================*/
    $("#client_carousel").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 5 seconds
        autoplay: true,
        smartSpeed: 2000, // Default is 250
        items: 5,
        loop: true,
        touchDrag: true,
        mouseDrag: true,
        pagination: false,
        dots: false,
        nav: false,
        navText: ["<i class='logo-nav-icon'></i>", "<i class='logo-nav-icon'></i>"],
        responsive: {
            1200: {
                items: 5
            },
            992: {
                items: 5
            },
            768: {
                items: 4
            },
            480: {
                items: 3
            },
            320: {
                items: 2
            },
            280: {
                items: 2
            }
        }
    });


     /*-------------------------------------
       Menu Page Menu  Scroll 
    -------------------------------------*/
    var scrollLeftAmount = 240;
    $("#arrow_right").on('click', function () {
        $('.menu-list-nav-sm').animate({
            scrollLeft:'+='+scrollLeftAmount
        },300);
    }); 
    $("#arrow_left").on('click', function () {
        $('.menu-list-nav-sm').animate({
            scrollLeft:'-='+scrollLeftAmount
        },300);
    });

    
    /* =======================================
        For Menu
    =======================================*/
    $("#navigation").menumaker({
        title: "",
        format: "multitoggle"
    });


    /*=======================================
           * gallery.min.js        
    ======================================= */

    $(".project-link").magnificPopup({
        type: 'image',
        gallery: {
            enabled: true,
        },
    });


 

     /*-------------------------------------
       Menu Page Menu Sticky
    -------------------------------------*/
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll > 700)
          $('.menu-list-col').addClass('menu_sticky');
        else
          $('.menu-list-col').removeClass('menu_sticky');
    });
 

     /*-------------------------------------
       Shop Page Menu Sticky
    -------------------------------------*/
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll > 1100)
          $('.shop-cart-wrap').addClass('shop_sticky');
        else
          $('.shop-cart-wrap').removeClass('shop_sticky');
    });




})(jQuery);