
(function () {
    const fixedHeader = document.getElementsByClassName('fixed-header')[0];

    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        fixedHeader.style.opacity = Math.min(
            100,
            Math.max(0, scroll - 50) / 2.0,
        ) + "%";
        // if (window.scrollY > 80) {
        //     console.log("animation.js log point 2")
        //     fixedHeader.classList.add('is-show')
        // } else {
        //     console.log("animation.js log point 3")
        //     fixedHeader.classList.remove('is-show');
        // }
    })
}());