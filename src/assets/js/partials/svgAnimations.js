(function svgAnimations (){

    // hero section background animation
    if ($('#hero-section-svg-bg').length) {
        for (let i = 1; i <= 3; i++) {
            KUTE.fromTo(
                `#HS_D${i}_1`,
                { path: `#HS_D${i}_1` },
                { path: `#HS_D${i}_2` },
                { repeat: Infinity, duration: 10000, yoyo: true, morphPrecision: 3, easing: 'easingSinusoidalInOut' }
            ).start();
        }
    };

})();