(function($) {
    var $window = $(window),
        $body = $('body'),
        $header = $('#header'),
        $footer = $('#footer'),
        $main = $('#main'),
        settings = {
            // Parallax background effect?
            parallax: true,
            // Parallax factor (lower = more intense, higher = less intense).
            parallaxFactor: 20
        };

    // Prevent default behavior on all anchor tags
    $('a').on('click', function(e) {
        e.preventDefault();
        console.log("Default prevented on anchor tag");
    });

    // Stop page reload or redirect (disable setTimeout or location.reload)
    window.addEventListener('beforeunload', function(e) {
        e.preventDefault(); // This will stop the page from refreshing
        e.returnValue = '';  // This is required for some browsers
        console.log("Page reload prevented!");
    });

    // Breakpoints and other initializations (parallax effect, etc.)
    breakpoints({
        xlarge: ['1281px', '1800px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: [null, '480px'],
    });

    // Disable parallax background on IE and mobile devices
    if (browser.name == 'ie' || browser.mobile) {
        settings.parallax = false;
    }

    if (settings.parallax) {
        breakpoints.on('<=medium', function() {
            $window.off('scroll.strata_parallax');
            $header.css('background-position', '');
        });

        breakpoints.on('>medium', function() {
            $header.css('background-position', 'left 0px');
            $window.on('scroll.strata_parallax', function() {
                $header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
            });
        });

        $window.on('load', function() {
            $window.triggerHandler('scroll');
        });
    }

    // Lightbox gallery
    $window.on('load', function() {
        $('#two').poptrox({
            caption: function($a) { return $a.next('h3').text(); },
            overlayColor: '#2c2c2c',
            overlayOpacity: 0.85,
            popupCloserText: '',
            popupLoaderText: '',
            selector: '.work-item a.image',
            usePopupCaption: true,
            usePopupDefaultStyling: false,
            usePopupEasyClose: false,
            usePopupNav: true,
            windowMargin: (breakpoints.active('<=small') ? 0 : 50)
        });
    });

})(jQuery);
