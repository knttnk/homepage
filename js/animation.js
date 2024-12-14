
(function () {
  let fixedAppBar;  // 毎回取得するのは効率が悪いので、最初に取得しておく

  window.addEventListener(
    'scroll', () => {
      // fixedAppBarが取得できていなければ取得する
      if (!fixedAppBar) {
        fixedAppBar = document.getElementsByClassName('fixed-app-bar')[0];
      }
      if (!fixedAppBar) return;  // 依然として取得できていなければ処理を終了

      // スクロール量に応じて透明度を変更
      const scroll = window.scrollY;
      const topImageHeight = window.innerHeight * 0.8;
      const rem = getComputedStyle(document.documentElement).fontSize;
      const fixedAppBarHeight = parseFloat(rem) * 5;
      const criteriaVisible = topImageHeight - fixedAppBarHeight;
      const criteriaNotVisible = criteriaVisible * 0.5;
      fixedAppBar.style.opacity = (scroll - criteriaNotVisible) / (criteriaVisible - criteriaNotVisible);
    }
  )
}());