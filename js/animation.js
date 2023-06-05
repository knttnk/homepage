
(function () {
  const fixedHeader = document.getElementsByClassName('fixed-app-bar')[0];

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    const topImageHeight = window.innerHeight * 0.8;
    const rem = getComputedStyle(document.documentElement).fontSize;
    const fixedAppBarHeight = parseFloat(rem) * 5;
    const criteriaVisible = topImageHeight - fixedAppBarHeight;
    const criteriaNotVisible = criteriaVisible * 0.5;
    fixedHeader.style.opacity = (scroll - criteriaNotVisible) / (criteriaVisible - criteriaNotVisible);
  })
}());