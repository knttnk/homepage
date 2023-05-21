
(function () {
    const fixedHeader = document.getElementsByClassName('fixed-header')[0];

    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        const criteriaNotVisible = window.screen.availHeight * 0.5;
        const criteriaVisible = window.screen.availHeight * 0.6;

        fixedHeader.style.opacity = (scroll - criteriaNotVisible) / (criteriaVisible - criteriaNotVisible);
    })
}());