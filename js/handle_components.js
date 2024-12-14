(
  async function () {
    const header = await fetch('components/header.html').then(response => response.text());
    const footer = await fetch('components/footer.html').then(response => response.text());

    const mainContent = document.getElementById('main-content');
    mainContent.insertAdjacentHTML('beforeBegin', header);
    mainContent.insertAdjacentHTML('afterEnd', footer);
  }()
);
