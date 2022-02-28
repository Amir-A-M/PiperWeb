(function mobileDropdownMenu() {
    // return if its'nt tablet or smaller
    if ($(window).width() < 1023) return;

    // burger button
    $('#mobile-nav-toggle').click(function (e) {
        $('#mobile-nav-toggle').toggleClass('open');
        $('.mobile-menu').toggleClass('translate-x-0');
    });

    // dropdown menu
    $('.drop-down>a').click(function (e) {
        e.preventDefault();
        $(this).siblings('ul').slideToggle();
        $(this).children('svg').toggleClass('rotate-180', '');
    });

    // mega menu
    $('.mega-menu>a').click(function (e) {
        e.preventDefault();
        $(this).siblings('ul').addClass('translate-x-0');
        $('#mobile-nav-toggle').hide();

        $('.close-mega-menu').click(function () {
            setTimeout(() => $('#mobile-nav-toggle').show(), 300)
            $(this).parent('ul').removeClass('translate-x-0');
        });
    });
})();