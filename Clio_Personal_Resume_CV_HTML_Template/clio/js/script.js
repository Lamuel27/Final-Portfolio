(function(){
    
    "use strict";

    // preloader start

    var LOADER = {};

	function preloaderInit() {
        LOADER.intro = document.querySelector('.content__intro');
        LOADER.shape = LOADER.intro.querySelector('svg.shape');
        LOADER.path = LOADER.shape.querySelector('path');
        LOADER.enter = document.querySelector('.enter');
        LOADER.shape.style.transformOrigin = '50% 0%';
        LOADER.path.setAttribute('pathdata:id', LOADER.path.getAttribute('data-pathdata'));
		LOADER.enter.addEventListener('click', siteReveal);
        LOADER.enter.addEventListener('touchenter', siteReveal);
        document.body.addEventListener('keypress', keyPressEnter);
    };
    
    function keyPressEnter(e) {
        var key = e.which || e.keyCode;

        if (key === 13) {
            siteReveal(e);
        }
    }

    var siteLoaded;
    
	function siteReveal(e) {

        e.preventDefault();
        
        if ( siteLoaded ) return;

        var translateY = '-200vh';

        if (screen.orientation && screen.orientation.type === 'landscape-primary') {
            translateY = '-270vh';
        }
        
        siteLoaded = true;

		anime({
			targets: LOADER.intro,
			duration: 1100,
			easing: 'easeInOutSine',
			translateY: translateY
		});
		
		anime({
			targets: LOADER.shape,
			scaleY: [
				{value:[0.8,1.8],duration: 550,easing: 'easeInQuad'},
				{value:1,duration: 550,easing: 'easeOutQuad'}
			]
		});

		anime({
			targets: LOADER.path,
			duration: 1100,
			easing: 'easeOutQuad',
			d: LOADER.path.getAttribute('pathdata:id')
        });
        
        LOADER.enter.removeEventListener('click', siteReveal);
        LOADER.enter.removeEventListener('touchenter', siteReveal);
        document.body.removeEventListener('keypress', keyPressEnter);
        setTimeout(function() {
            LOADER.intro.remove();
            LOADER = null;
        }, 2000);
    };

    function scaleElement(element) {
        if (!element)
            return;
        var parentStyles = getComputedStyle(element.parentElement);
        var parentHeight = parseInt(parentStyles.height) - parseInt(parentStyles.paddingTop) - parseInt(parentStyles.paddingBottom);
        var height = element.offsetHeight;
        element.style.transform = '';
        if (screen.availWidth > 767 && height > parentHeight) {
            element.style.transform = 'scale(' + parentHeight / height + ')';
        }
    }
    
    function initialScale() {
        var elements = document.querySelectorAll('.flex-content');
        elements.forEach(scaleElement);
    }
    
    if (document.body.classList.contains('home')) {
        preloaderInit();
        $('.count').each(function () {
            $(this).prop('Counter', 0).animate(
                {
                    counter: 100
                },
                {
                    duration: 3000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                }
            );

            $(this).fadeOut(2000, function() {
                document.body.addEventListener('keypress', keyPressEnter);
            });
        });

        $(".enter").delay(4500).fadeIn(1500);

        setTimeout(initialScale, 2000);
    }

    function initMap(lat, long) {
        var center = new google.maps.LatLng(lat, long);

        var map = new google.maps.Map(document.querySelector(".gmap3-area"), {
            center: center,
            zoom: 10,
            styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
        });

        var marker = new google.maps.Marker({
            position: center,
            icon: "img/icon/map-marker.png",
            map: map
        });
    }

    // preloader ends

    function homeCardAnimation() {
        var animating = 0;
        var container = document.getElementById('clio-cards');
        var navContainer = document.getElementById('card-nav');
        var navItems = navContainer.children;
        var items = container.children;
        var count = items.length;
        var itemPerPage = 3;
        var totalPage = Math.ceil(count / itemPerPage);
        var page = 0;

        container.classList.remove('loading');

        function updateNav() {
            for (let i = 0; i < navItems.length; i++) {
                navItems[i].classList.remove('current');
            }
            navContainer.querySelector("[data-page='" + page + "']").classList.add('current');
        }

        function onResize() {
            if (window.innerWidth < 768 ) {
                return;
            }
            if (window.innerWidth < 1201) {
                itemPerPage = 2;
                totalPage = Math.ceil(count / itemPerPage);
                
            } else {
                itemPerPage = 3;
                totalPage = Math.ceil(count / itemPerPage);
            }
            page = 0;
            scaleElement(document.querySelector('.profile-brief .flex-content'));
            makeNav();
            next();
        }

        onResize();

        window.addEventListener('resize', onResize);

        function next(event){
            if (animating) return false;
            animating = 1;
            if (event) {
                page = Number(event.target.getAttribute('data-page'));
            }
            updateNav();
            var start = page * itemPerPage;
            var end = ((page + 1) * itemPerPage) - (count % itemPerPage);
            for (let i = 0; i < count; i++) {
                items[i].setAttribute('card-active', 0);
                items[i].style.opacity = '';
                items[i].style.visibility = '';
                items[i].classList.add('out');
                items[i].classList.remove('in');
            }
            for (let i = start; i < end; i++) {
                (function(j){
                    setTimeout(function(){
                        items[j].setAttribute('card-active', 1);
                        items[j].style.opacity = 1;
                        items[j].style.visibility = 'visible';
                        items[j].classList.remove('out');
                        items[j].classList.add('in');
                        scaleElement(items[j].querySelector('.flex-content'));
                        if (items[j].querySelector('svg')) {
                            resetSvgAnimation(items[j].querySelector('svg').id);
                        }
                        animating = 0;
                        if (items[j].classList.contains('grid_item__map')) {
                            setTimeout(() => {
                                initMap(document.getElementById('gmap').dataset.lat, document.getElementById('gmap').dataset.long);
                                items[j].classList.add('grid_item__map-initialized');
                                items[j].classList.remove('grid_item__map');
                            }, 300);
                        }
                    }, 350);
                })(i);
            }
            page++;
            if (page === totalPage) {
                page = 0;
            }
        }

        makeNav();

        next();

        function resetSvgAnimation(iconID) {
            window.iconObject['tc' + iconID].reset().play();
        }

        function makeNav() {
            function template(page) {
                var el = document.createElement('li');
                el.setAttribute('data-page', page);
                el.innerText = '0' + (page + 1);
                el.addEventListener('click', next);
                if (page === 0) el.classList.add('current');
                return el;
            }
            navContainer.innerText = '';
            for (let i = 0; i < totalPage; i++) {
                navContainer.appendChild(template(i));
            }
        }
    }

    if (document.body.classList.contains('home')) {
        homeCardAnimation();
    }

    if (document.querySelector('.grid_item__map') && window.innerWidth < 768) {
        initMap(document.getElementById('gmap').dataset.lat, document.getElementById('gmap').dataset.long);
        document.querySelector('.grid_item__map').classList.add('grid_item__map-initialized');
        document.querySelector('.grid_item__map-initialized').classList.add('grid_item__map');
    }

    $(document).ready(function(){

        $('.offcanvus-video').lightGallery({
            selector: '.openlightbox'
        });
    
        $('#mixstart').lightGallery({
            selector: '.gallery-item',
            subHtmlSelectorRelative: true,
            thumbnail: false,
        });

        $('img.svg').each(function () {
            var $img = $(this),
                imgID = $img.attr('id'),
                imgClass = $img.attr('class'),
                imgURL = $img.attr('src');

            $.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                var $svg = $(data).find('svg');

                // Add replaced image's ID to the new SVG
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass);
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);
            }, 'xml');
        });

        //============= Owl carousel for Testimonial  ============ 

        $(".testimonial-wrapper").owlCarousel({
            autoPlay: true,
            slideSpeed: 2000,
            dots: true,
            navigation: false,
            items: 1,
            smartSpeed: 1200,
            margin: 6
        });

        $(".client-wrapper").owlCarousel({
            loop: true,
            autoPlay: true,
            slideSpeed: 2000,
            dots: true,
            nav: true,
            items: 1,
            navText: ["<i></i>", "<i></i>"],
            smartSpeed: 1200,
            margin: 5
        });


        $('.education_tab').champ();

        $('.experience_tab').champ({
            multiple_tabs: "true"
        });

        $(".portfolio").mCustomScrollbar({
            autoHideScrollbar: true
        });

        $(".sidebar-offcanvas").mCustomScrollbar({
            autoHideScrollbar: true
        });

        $('#mixstart').mixItUp();

        $('.opener, .mobile-portfolio-opener').on('click', function () {
            $(".portfolio").toggleClass("active");
            $('.container').toggleClass('open');
            $('.mask-overlay').remove();

            $('.sb_open').on('click', function () {
                $(".portfolio").removeClass("active");
                $('.container').removeClass('open');
            });
        });


        $('.sb_open').on('click', function (e) {
            e.preventDefault();
            var mask = '<div class="mask-overlay"></div>';

            $(".sidebar-offcanvas").toggleClass("active");
            $('.container').toggleClass('offcanvus-open');
            $('.home').removeClass('.view-single');
            $('.content').removeClass('.content--show');
            $('.content__item').removeClass('.content__item--show');

            $(mask).hide().appendTo('body').fadeIn('fast');
            $('.mask-overlay,.sb_close,.opener').on('click', function (e) {
                e.preventDefault();
                $('.mask-overlay').remove();
                $(".sidebar-offcanvas").removeClass("active");
                $('.container').removeClass('offcanvus-open');
            });
        });

        $("#accordian a").click(function () {
            var link = $(this);
            var closest_ul = link.closest("ul");
            var parallel_active_links = closest_ul.find(".active")
            var closest_li = link.closest("li");
            var link_status = closest_li.hasClass("active");
            var count = 0;

            closest_ul.find("ul").slideUp(function () {
                if (++count == closest_ul.find("ul").length)
                    parallel_active_links.removeClass("active");
            });

            if (!link_status) {
                closest_li.children("ul").slideDown();
                closest_li.addClass("active");
            }
        });

        $('#clio-cards').animateIcon({ duration: 100 });
    });

})();