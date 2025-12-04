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


  // --- ИНТЕРАКТИВНАЯ СХЕМА НОУТБУКА ---
  const laptopParts = document.querySelectorAll('.laptop-part');
  const componentDetail = document.getElementById('componentDetail');
  
  // Данные о компонентах ноутбука
  const componentData = {
    cpu: {
      title: "📱 Мобильный процессор",
      description: "Специально разработан для ноутбуков с фокусом на энергоэффективность",
      details: [
        "Низкое тепловыделение (TDP 15-45 Вт)",
        "Интегрированная графика",
        "Технологии энергосбережения",
        "Частота ниже десктопных аналогов"
      ],
      icon: "⚡",
      color: "#4CAF50"
    },
    ram: {
      title: "🧠 Память SO-DIMM",
      description: "Компактные модули оперативной памяти для ноутбуков",
      details: [
        "Размер: примерно вдвое меньше DIMM",
        "204-пиновые разъемы (DDR4)",
        "Более низкое энергопотребление",
        "Часто распаяна на плате в ультрабуках"
      ],
      icon: "🧠",
      color: "#2196F3"
    },
    storage: {
      title: "💾 Накопитель 2.5\" / M.2",
      description: "Компактные хранилища данных для мобильных устройств",
      details: [
        "2.5\" HDD/SSD (толщина 7-9.5 мм)",
        "M.2 SSD (размер 22×80 мм)",
        "NVMe для высокой скорости",
        "SATA для обратной совместимости"
      ],
      icon: "💾",
      color: "#FF9800"
    },
    battery: {
      title: "🔋 Литий-ионный аккумулятор",
      description: "Источник автономного питания ноутбука",
      details: [
        "Емкость: 30-100 Вт·ч",
        "Срок службы: 3-5 лет",
        "500-1000 циклов заряда",
        "Быстрая деградация при перегреве"
      ],
      icon: "🔋",
      color: "#9C27B0"
    },
    cooling: {
      title: "❄️ Система охлаждения",
      description: "Компактная система отвода тепла",
      details: [
        "Низкопрофильные вентиляторы",
        "Тепловые трубки",
        "Медные радиаторы",
        "Пассивное охлаждение в тонких моделях"
      ],
      icon: "❄️",
      color: "#f44336"
    }
  };

  // Функция для отображения информации о компоненте
  function showComponentInfo(componentId) {
    const data = componentData[componentId];
    
    if (!data) return;
    
    const detailsHtml = data.details.map(detail => 
      `<li>${detail}</li>`
    ).join('');
    
    componentDetail.innerHTML = `
      <div class="component-info" style="border-left: 5px solid ${data.color}">
        <div class="component-header">
          <span class="component-icon">${data.icon}</span>
          <h4>${data.title}</h4>
        </div>
        <p class="component-description">${data.description}</p>
        <ul class="component-details-list">
          ${detailsHtml}
        </ul>
        <div class="component-tip">
          <strong>💡 Интересный факт:</strong> ${getComponentTip(componentId)}
        </div>
      </div>
    `;
    
    // Добавляем анимацию появления
    componentDetail.style.opacity = '0';
    componentDetail.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      componentDetail.style.transition = 'all 0.3s ease';
      componentDetail.style.opacity = '1';
      componentDetail.style.transform = 'translateY(0)';
    }, 10);
  }

  // Функция для получения интересных фактов
  function getComponentTip(componentId) {
    const tips = {
      cpu: "Мобильные процессоры часто имеют более низкие частоты, но продвинутые технологии энергосбережения.",
      ram: "В ультрабуках память часто распаяна на плате, что делает апгрейд невозможным.",
      storage: "M.2 SSD могут быть в 5 раз быстрее традиционных 2.5\" SATA SSD.",
      battery: "Оптимальный уровень заряда для долгой жизни батареи - 20-80%.",
      cooling: "Тепловые трубки могут эффективно переносить тепло на расстояние до 30 см."
    };
    return tips[componentId] || "Это важный компонент любого ноутбука.";
  }

  // Добавляем обработчики событий для компонентов ноутбука
  if (laptopParts.length > 0 && componentDetail) {
    laptopParts.forEach(part => {
      // При наведении курсора
      part.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.15)';
        this.style.zIndex = '10';
        this.style.boxShadow = '0 0 25px rgba(0,0,0,0.3)';
      });

      // При уходе курсора
      part.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
          this.style.transform = 'scale(1)';
          this.style.zIndex = '2';
          this.style.boxShadow = '';
        }
      });

      // При клике
      part.addEventListener('click', function(e) {
        e.stopPropagation();
        const componentId = this.dataset.component;
        
        // Убираем активный класс со всех компонентов
        laptopParts.forEach(p => {
          p.classList.remove('active');
          p.style.transform = 'scale(1)';
          p.style.zIndex = '2';
          p.style.boxShadow = '';
        });
        
        // Добавляем активный класс текущему компоненту
        this.classList.add('active');
        this.style.transform = 'scale(1.2)';
        this.style.zIndex = '10';
        this.style.boxShadow = '0 0 30px rgba(0,0,0,0.4)';
        
        // Показываем информацию
        showComponentInfo(componentId);
      });

      // Добавляем touch события для мобильных устройств
      part.addEventListener('touchstart', function(e) {
        e.preventDefault();
        const componentId = this.dataset.component;
        showComponentInfo(componentId);
        this.classList.add('active');
      });
    });

    // Показываем информацию о первом компоненте по умолчанию
    setTimeout(() => {
      laptopParts[0]?.click();
    }, 1000);
  }

  // --- ДОПОЛНИТЕЛЬНЫЙ ФУНКЦИОНАЛ ДЛЯ НОУТБУКОВ ---
  function initLaptopComponentsEnhancements() {
    // Добавляем подсказки при первом посещении
    if (!localStorage.getItem('laptopComponentsVisited') && laptopParts.length > 0) {
      setTimeout(() => {
        const showTip = confirm('💡 Подсказка: Нажмите на любой компонент ноутбука на схеме, чтобы узнать о нем подробнее! Нажмите OK, чтобы продолжить.');
        if (showTip) {
          localStorage.setItem('laptopComponentsVisited', 'true');
        }
      }, 1500);
    }
    
    // Добавляем кнопку сброса для схемы ноутбука
    const laptopOverview = document.querySelector('.component-details');
    if (laptopOverview) {
      const resetButton = document.createElement('button');
      resetButton.textContent = 'Сбросить выбор компонентов';
      resetButton.className = 'reset-components-btn';
      resetButton.style.cssText = `
        display: block;
        margin: 20px auto 10px;
        padding: 10px 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
      `;
      
      resetButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
      });
      
      resetButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
      });
      
      resetButton.addEventListener('click', function() {
        document.querySelectorAll('.laptop-part').forEach(part => {
          part.classList.remove('active');
          part.style.transform = 'scale(1)';
          part.style.boxShadow = '';
        });
        
        if (componentDetail) {
          componentDetail.innerHTML = `
            <div class="default-message">
              <span>👆</span>
              <p>Нажмите на компонент ноутбука для получения информации</p>
            </div>
          `;
        }
      });
      
      laptopOverview.appendChild(resetButton);
    }
  }

  // Инициализация улучшений для ноутбуков
  if (document.getElementById('laptopComponentsInfo')) {
    initLaptopComponentsEnhancements();
  }

  // --- ПЛАВНАЯ ПРОКРУТКА ДЛЯ НАВИГАЦИИ ---
  document.querySelectorAll('#nav-list a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- ОБНОВЛЕНИЕ КНОПКИ ПРОКРУТКИ ВВЕРХ ---
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.display = 'block';
      scrollTopBtn.style.opacity = '1';
    } else {
      scrollTopBtn.style.opacity = '0';
      setTimeout(() => {
        if (window.pageYOffset <= 300) {
          scrollTopBtn.style.display = 'none';
        }
      }, 300);
    }
  });

  // Скрываем кнопку при загрузке
  scrollTopBtn.style.display = 'none';
  scrollTopBtn.style.transition = 'opacity 0.3s ease';

  // --- АНИМАЦИЯ ДЛЯ ИЗОБРАЖЕНИЙ СЕКЦИЙ ---
  const sectionImages = document.querySelectorAll('.info-section img');
  sectionImages.forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    img.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // --- ИНИЦИАЛИЗАЦИЯ ТАБЛИЦ ---
  const tables = document.querySelectorAll('.comparison-table table');
  tables.forEach(table => {
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
      if (index % 2 === 0) {
        row.style.backgroundColor = '#f8f9fa';
      }
    });
  });

  // --- АНИМАЦИЯ ДЛЯ КАРТОЧЕК КОМПОНЕНТОВ ---
  const componentCards = document.querySelectorAll('.component-card, .port-card, .form-factor');
  componentCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // --- СТИЛИ ДЛЯ КОМПОНЕНТОВ НОУТБУКА (динамическое добавление) ---
  const laptopStyles = document.createElement('style');
  laptopStyles.textContent = `
    .component-info {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      animation: slideIn 0.3s ease-out;
      width: 100%;
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .component-header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 15px;
    }
    
    .component-icon {
      font-size: 2.5em;
    }
    
    .component-header h4 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.3em;
    }
    
    .component-description {
      color: #666;
      line-height: 1.5;
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }
    
    .component-details-list {
      padding-left: 20px;
      margin: 15px 0;
    }
    
    .component-details-list li {
      margin-bottom: 10px;
      color: #555;
      position: relative;
      padding-left: 10px;
    }
    
    .component-details-list li::before {
      content: "✓";
      color: #4CAF50;
      font-weight: bold;
      position: absolute;
      left: -15px;
    }
    
    .component-tip {
      margin-top: 20px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      color: #555;
    }
    
    .laptop-part.active {
      animation: pulseActive 1.5s infinite;
    }
    
    @keyframes pulseActive {
      0%, 100% {
        box-shadow: 0 0 20px rgba(0,0,0,0.3);
      }
      50% {
        box-shadow: 0 0 30px rgba(0,0,0,0.5);
      }
    }
    
    /* Подсветка активного компонента */
    .cpu-part.active { background: rgba(76, 175, 80, 0.2); }
    .ram-part.active { background: rgba(33, 150, 243, 0.2); }
    .storage-part.active { background: rgba(255, 152, 0, 0.2); }
    .battery-part.active { background: rgba(156, 39, 176, 0.2); }
    .cooling-part.active { background: rgba(244, 67, 54, 0.2); }
    
    /* Индикатор клика для мобильных устройств */
    @media (max-width: 768px) {
      .laptop-part {
        cursor: pointer;
      }
      
      .laptop-part:active {
        transform: scale(0.95);
      }
    }
    
    .default-message {
      text-align: center;
      color: #666;
      padding: 20px;
    }
    
    .default-message span {
      font-size: 3em;
      display: block;
      margin-bottom: 10px;
    }
  `;
  
  document.head.appendChild(laptopStyles);

  console.log('Все скрипты успешно загружены и инициализированы!');
};

