window.onload = function () {
  // --- Старая анимация ---
  const container = document.getElementById('cardContainer');
  setTimeout(() => {
    container.classList.add('stopped');
  }, 2000);
  setTimeout(() => {
    container.classList.add('line-up');
  }, 2500);
  const cards = document.querySelectorAll('.card');
  const modal = document.getElementById('infoModal');
  const modalText = document.getElementById('modalText');
  const modalImageContainer = document.getElementById('modalImageContainer');
  const closeBtn = modal.querySelector('.close-btn');
  const infoImages = [
    "/static/images/2.jpg",
    "/static/images/3.jpg",
    "/static/images/4.jpg",
    "/static/images/5.jpg"
  ];
  const infoData = [
    "Процессор — центральное устройство обработки данных, выполняющее арифметические и логические операции.",
    "Оперативная память — временное хранилище данных и программ, доступное процессору для быстрого чтения и записи.",
    "Устройства ввода и вывода — периферийные устройства для взаимодействия пользователя с ЭВМ (клавиатура, монитор, мышь и т.д.).",
    "Запоминающие устройства — устройства для долговременного хранения информации (жесткие диски, SSD, флешки и др.)."
  ];
  const modalSides = ['top', 'right', 'bottom', 'left'];

  function resetModal() {
    modal.className = 'modal hidden';
    modalText.textContent = '';
    modalImageContainer.innerHTML = '';
  }

  cards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      resetModal();
      modalText.textContent = infoData[index];
      modalImageContainer.innerHTML = `<img src="${infoImages[index]}" alt="Изображение" style="max-width: 100%; height: auto; display: block; margin: 10px auto;">`;
      modal.classList.remove('hidden');
      modal.classList.add('show');
      modal.classList.add(modalSides[index]);
    });
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    resetModal();
  });

  window.addEventListener('click', () => {
    resetModal();
  });





  // --- Навигация по h2 и кнопка прокрутки вверх ---
  // Создаем меню слева
  const navMenu = document.createElement('div');
  navMenu.id = 'nav-menu';
  navMenu.innerHTML = '<h3>Содержание</h3><ul id="nav-list"></ul>';
  document.body.appendChild(navMenu);

  const navList = document.getElementById('nav-list');
  const h2s = document.querySelectorAll('h2');
  h2s.forEach((h2, index) => {
    if (!h2.id) h2.id = 'section-' + index;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + h2.id;
    a.textContent = h2.textContent;
    li.appendChild(a);
    navList.appendChild(li);
  });


  // Кнопка прокрутки вверх
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.id = 'scroll-top';
  scrollTopBtn.textContent = '↑';
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.body.appendChild(scrollTopBtn);

};