/**
 * コンポーネントを処理する
 * @param {string} contentPath  /contents/ 以下の内容を含んだhtmlへのパス
 * @param {string} rootPath  トップのディレクトリへのパス ../ など
 * @param {string} lang  "ja" or "en"
 * @param {number} initialIndex  初期インデックス
 */
async function handleComponents(contentPath, rootPath, lang, initialIndex) {
  // すべての基準となるメインコンテンツを取得
  const mainContent = document.getElementById("main-content");

  // path
  const headerPath = `${rootPath}components/header-${lang}.html`;
  const footerPath = `${rootPath}components/footer.html`;
  const langButtonPath = `${rootPath}components/lang-button.html`;
  const indexHtmlPath = `${rootPath}index${lang === "en" ? "-en" : ""}.html`;
  const researchPath = `${rootPath}pages/research/research-${lang}.html`;

  // ヘッダーを置換
  fetch(headerPath).then(async (response) => {
    const headerHtml = await response.text();
    // ヘッダーの代わりに置いてある空の<div>を削除
    const preHeader = document.getElementsByClassName("pre-header")[0];
    preHeader.remove();
    // ヘッダーをメインコンテンツの前に挿入
    mainContent.insertAdjacentHTML("beforeBegin", headerHtml);
  });

  // フッターを挿入
  fetch(footerPath).then(async (response) => {
    // ファイルに記述してあるhtmlをメインコンテンツの後に挿入
    const footerHtml = await response.text();
    mainContent.insertAdjacentHTML("afterEnd", footerHtml);

    // フッターの初期値設定
    const footer = document.body.querySelector("#nav-bar");
    footer.setAttribute("active-index", initialIndex);
    // タブの設定
    const profileTab = document.body.querySelector("#nav-bar-profile-tab");
    profileTab.setAttribute("href", indexHtmlPath);
    profileTab.setAttribute(
      "label",
      lang === "en" ? "Profile" : "プロフィール"
    );
    const researchTab = document.body.querySelector("#nav-bar-research-tab");
    researchTab.setAttribute("href", researchPath);
    researchTab.setAttribute("label", lang === "en" ? "Research" : "研究紹介");
    // navigation-bar-activated イベントを監視
    // 使えなくなったら、 CustomEvent とか、 @fires で検索するといいかも
    footer.addEventListener("navigation-bar-activated", (event) => {
      const tab = event.detail.tab;
      const activeIndex = event.detail.activeIndex;
      if (activeIndex === initialIndex) {
        // console.log("Navigation not changed because active index is the same:", activeIndex);
        return;
      }
      // console.log("Navigation changed:", activeIndex);
      const href = tab.getAttribute("href");
      window.location.href = href;
    });
  });

  // 言語ボタンを挿入
  fetch(langButtonPath).then(async (response) => {
    const langButton = await response.text();
    mainContent.insertAdjacentHTML("afterEnd", langButton);
    const anchorElement = document.body.querySelector("#language-anchor");
    const menuElement = document.body.querySelector("#language-menu");
    anchorElement.addEventListener("click", () => {
      menuElement.open = true;
    });
    const jaButton =
      document.body.querySelector("#language-japanese").parentElement;
    const enButton =
      document.body.querySelector("#language-english").parentElement;
    jaButton.setAttribute("href", `${rootPath}index.html`);
    enButton.setAttribute("href", `${rootPath}index-en.html`);
  });

  // メインコンテンツを挿入
  fetch(`${rootPath}contents/${contentPath}`).then(async (response) => {
    const mainText = await response.text();
    mainContent.innerHTML = mainText;
  });
}
