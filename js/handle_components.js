/**
 * 
 * @param {string} main_path  /pages/ に続くパス 拡張子を含めない
 * @param {string} language  'ja' or 'en'
 */
async function handleComponents(
  main_path,
  language = 'ja',
) {
  // メインコンテンツを挿入
  const mainContent = document.getElementById('main-content');
  const mainText = await fetch(`/contents/${main_path}-${language}.html`).then(response => response.text());
  mainContent.innerHTML = mainText;

  // ヘッダーを置換
  const header = await fetch('/components/header.html').then(response => response.text());
  const preHeader = document.getElementsByClassName('pre-header')[0];
  preHeader.remove();
  mainContent.insertAdjacentHTML('beforeBegin', header);

  // 言語ボタンを挿入
  const footer = await fetch('/components/footer.html').then(response => response.text());
  mainContent.insertAdjacentHTML('afterEnd', footer);
  const anchorElement = document.body.querySelector('#language-anchor');
  const menuElement = document.body.querySelector('#language-menu');
  anchorElement.addEventListener('click', () => {
    menuElement.open = true;
  });
}

/**
 * Navigation Bar を挿入
 * 
 * @param {int} initialIndex 0-indexed
 * @param {string} language 'ja' or 'en'
 */
function writeNavBar(initialIndex) {
  function eventHandler(event) {
    const tab = event.detail.tab;
    const activeIndex = event.detail.activeIndex;

    if (activeIndex === initialIndex) {
      console.log('Navigation not changed:', activeIndex);
      return;
    }
    console.log('Navigation changed:', activeIndex);
    const href = tab.getAttribute('href');
    window.location.href = href;
  }

  const footerHtml = (
    "<md-navigation-bar style='position: fixed; bottom: 0;' active-index='" + initialIndex + "' id='nav-bar'>" +
    "  <md-navigation-tab href='/index.html' label='プロフィール'>" +
    "    <md-icon slot='inactive-icon'>home</md-icon>" +
    "    <md-icon slot='active-icon' filled>home</md-icon>" +
    "  </md-navigation-tab>" +
    "  <md-navigation-tab href='/pages/research/research-ja.html' label='研究紹介'>" +
    "    <md-icon slot='inactive-icon'>description</md-icon>" +
    "    <md-icon slot='active-icon' filled>description</md-icon>" +
    "  </md-navigation-tab>" +
    "</md-navigation-bar>"
  );
  document.write(footerHtml);
  const navBar = document.body.querySelector('#nav-bar');

  // navigation-bar-activated イベントを監視
  // 使えなくなったら、 CustomEvent とか、 @fires で検索するといいかも
  navBar.addEventListener('navigation-bar-activated', eventHandler);
}