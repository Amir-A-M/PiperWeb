(function whyUs () {
    // items hover style
    $('.why-us-item').mouseenter(function () { 

        $('.why-us-item').removeClass('bg-[#009966] text-white -translate-y-2 group -z-10');
        $(this).addClass('bg-[#009966] text-white -translate-y-2 group -z-10');

        $('.why-us-item').children('p').removeClass('text-gray-50');
        $(this).children('p').addClass('text-gray-50');

        $('.why-us-item').children('p').addClass('text-gray-700');
        $(this).children('p').removeClass('text-gray-700');
    });
})();