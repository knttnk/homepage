(
  async function () {
    const mainContent = document.getElementById('main-content');

    // ヘッダーを置換
    const header = await fetch('components/header.html').then(response => response.text());
    const preHeader = document.getElementsByClassName('pre-header')[0];
    preHeader.remove();
    mainContent.insertAdjacentHTML('beforeBegin', header);


    // フッターを挿入
    const footer = await fetch('components/footer.html').then(response => response.text());
    mainContent.insertAdjacentHTML('afterEnd', footer);
  }()
);
