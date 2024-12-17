/**
 * 
 * @param {string} contentPath  /contents/ 以下の内容を含んだhtmlへのパス
 * @param {string} rootPath  トップのディレクトリへのパス ../ など
 * @param {string} lang  "ja" or "en"
 */
async function handleComponents(
  contentPath,
  rootPath,
  lang,
) {
  // メインコンテンツを挿入
  const mainContent = document.getElementById('main-content');
  const mainText = await fetch(
    rootPath + "contents/" + contentPath,
  ).then(response => response.text());
  mainContent.innerHTML = mainText;

  // ヘッダーを置換
  const header = await fetch(
    rootPath + (
      // lang === "en" ?  // TODO: 実装
      //   "components/header-en.html" :
      //   "components/header-ja.html"
      "components/header-ja.html"
    )
  ).then(response => response.text());
  const preHeader = document.getElementsByClassName('pre-header')[0];
  preHeader.remove();
  mainContent.insertAdjacentHTML('beforeBegin', header);

  // 言語ボタンを挿入
  const langButton = await fetch(
    rootPath + "components/lang-button.html"
  ).then(response => response.text());
  mainContent.insertAdjacentHTML('afterEnd', langButton);
  const anchorElement = document.body.querySelector('#language-anchor');
  const menuElement = document.body.querySelector('#language-menu');
  anchorElement.addEventListener('click', () => {
    menuElement.open = true;
  });
  const jaButton = document.body.querySelector('#language-japanese').parentElement;
  const enButton = document.body.querySelector('#language-english').parentElement;
  jaButton.setAttribute('href', rootPath + 'index.html');
  enButton.setAttribute('href', rootPath + 'index-en.html');
}

/**
 * Navigation Bar を挿入
 * 
 * @param {int} initialIndex 0-indexed
 * @param {string} rootPath ../ など
 */
function writeNavBar(
  initialIndex,
  rootPath,
) {
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
    "  <md-navigation-tab href='" + rootPath + "index.html' label='プロフィール'>" +
    "    <md-icon slot='inactive-icon'>home</md-icon>" +
    "    <md-icon slot='active-icon' filled>home</md-icon>" +
    "  </md-navigation-tab>" +
    "  <md-navigation-tab href='" + rootPath + "pages/research/research-ja.html' label='研究紹介'>" +
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