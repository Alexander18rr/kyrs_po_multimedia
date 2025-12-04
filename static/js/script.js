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



  // --- ИНТЕРАКТИВНАЯ СЕРВЕРНАЯ СТОЙКА ---
  function initServerRack() {
    const rackUnits = document.querySelectorAll('.rack-unit');
    const rackDetail = document.getElementById('rackDetail');
    
    const rackData = {
      'patch-panel': {
        title: '📡 Патч-панели',
        description: 'Центральная точка коммутации кабелей в серверной стойке',
        details: [
          'Организация сетевых подключений',
          'Маркировка портов для удобства обслуживания',
          'Кабельный менеджмент',
          'Поддержка Cat6/Cat6A/Cat7'
        ],
        icon: '📡',
        color: '#4CAF50'
      },
      'switch': {
        title: '🔀 Коммутаторы',
        description: 'Сетевые устройства для маршрутизации трафика между серверами',
        details: [
          'Управляемые и неуправляемые модели',
          'Поддержка VLAN, QoS',
          'PoE для питания устройств',
          '10GbE, 40GbE, 100GbE порты'
        ],
        icon: '🔀',
        color: '#2196F3'
      },
      'servers': {
        title: '🖥️ Серверы',
        description: 'Основные вычислительные узлы в стойке',
        details: [
          'Серверы 1U, 2U, 4U форм-фактора',
          'Двухпроцессорные и многопроцессорные конфигурации',
          'Горячая замена компонентов',
          'Модульная архитектура'
        ],
        icon: '🖥️',
        color: '#FF9800'
      },
      'storage': {
        title: '💾 Системы хранения',
        description: 'Масштабируемые хранилища данных',
        details: [
          'SAN/NAS системы',
          'Дисковые массивы с RAID',
          'SSD кэширование',
          'Репликация данных'
        ],
        icon: '💾',
        color: '#9C27B0'
      },
      'ups': {
        title: '⚡ ИБП',
        description: 'Источники бесперебойного питания',
        details: [
          'Защита от перепадов напряжения',
          'Автономная работа при отключении электроэнергии',
          'Стабилизация напряжения',
          'Мониторинг состояния'
        ],
        icon: '⚡',
        color: '#f44336'
      },
      'kvm': {
        title: '⌨️ KVM-переключатели',
        description: 'Управление несколькими серверами с одной консоли',
        details: [
          'Управление по IP',
          'Поддержка до 32 серверов',
          'Запись сессий',
          'Интеграция с AD/LDAP'
        ],
        icon: '⌨️',
        color: '#00BCD4'
      },
      'backup': {
        title: '💽 Резервные серверы',
        description: 'Системы резервного копирования и восстановления',
        details: [
          'Автоматическое резервное копирование',
          'Восстановление в любой момент времени',
          'Шифрование данных',
          'Хранение вне площадки'
        ],
        icon: '💽',
        color: '#607D8B'
      },
      'security': {
        title: '🛡️ Системы безопасности',
        description: 'Обеспечение физической и логической безопасности',
        details: [
          'Системы видеонаблюдения',
          'Контроль доступа',
          'Пожарная сигнализация',
          'Системы газового пожаротушения'
        ],
        icon: '🛡️',
        color: '#FFC107'
      },
      'management': {
        title: '📊 Системы управления',
        description: 'Централизованное управление инфраструктурой',
        details: [
          'DCIM системы',
          'Мониторинг температуры и влажности',
          'Управление питанием',
          'Отчетность и аналитика'
        ],
        icon: '📊',
        color: '#8BC34A'
      },
      'pdu': {
        title: '🔌 Блоки распределения питания',
        description: 'Управляемые источники питания для стоек',
        details: [
          'Управление по IP',
          'Мониторинг потребления',
          'Удаленная перезагрузка',
          'Измерение параметров сети'
        ],
        icon: '🔌',
        color: '#795548'
      }
    };
    
    rackUnits.forEach(unit => {
      unit.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
        this.style.boxShadow = '0 0 20px rgba(33, 150, 243, 0.3)';
      });
      
      unit.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
          this.style.transform = 'translateX(0)';
          this.style.boxShadow = 'none';
        }
      });
      
      unit.addEventListener('click', function(e) {
        e.stopPropagation();
        const unitType = this.dataset.unit;
        const data = rackData[unitType];
        
        // Сброс активного состояния
        rackUnits.forEach(u => u.classList.remove('active'));
        this.classList.add('active');
        this.style.transform = 'translateX(15px)';
        this.style.boxShadow = '0 0 25px rgba(33, 150, 243, 0.5)';
        
        if (data && rackDetail) {
          const detailsHtml = data.details.map(detail => 
            `<li>${detail}</li>`
          ).join('');
          
          rackDetail.innerHTML = `
            <div class="rack-info" style="border-left: 5px solid ${data.color}">
              <div class="rack-info-header">
                <span class="rack-info-icon">${data.icon}</span>
                <h4>${data.title}</h4>
              </div>
              <p class="rack-info-description">${data.description}</p>
              <ul class="rack-info-details">
                ${detailsHtml}
              </ul>
              <div class="rack-info-tip">
                <strong>💡 Это важно:</strong> ${getRackTip(unitType)}
              </div>
            </div>
          `;
          
          // Анимация появления
          rackDetail.style.opacity = '0';
          rackDetail.style.transform = 'translateY(10px)';
          
          setTimeout(() => {
            rackDetail.style.transition = 'all 0.3s ease';
            rackDetail.style.opacity = '1';
            rackDetail.style.transform = 'translateY(0)';
          }, 10);
        }
      });
    });
    
    function getRackTip(unitType) {
      const tips = {
        'patch-panel': 'Правильная организация патч-панелей экономит до 40% времени при обслуживании.',
        'switch': 'Используйте коммутаторы с поддержкой PoE+ для питания IP-телефонов и камер.',
        'servers': 'Оптимальное охлаждение достигается при чередовании горячих и холодных рядов.',
        'storage': 'Используйте SSD кэш для ускорения работы часто используемых данных.',
        'ups': 'Регулярно тестируйте ИБП и заменяйте батареи каждые 3-4 года.',
        'kvm': 'KVM over IP позволяет управлять серверами из любой точки мира.',
        'backup': 'Правило 3-2-1: 3 копии данных, 2 разных носителя, 1 копия вне площадки.',
        'security': 'Системы газового пожаротушения сохраняют оборудование невредимым.',
        'management': 'DCIM системы помогают оптимизировать энергопотребление ЦОД.',
        'pdu': 'Управляемые PDU позволяют перезагружать зависшие устройства удаленно.'
      };
      return tips[unitType] || 'Это важный компонент серверной инфраструктуры.';
    }
    
    // Активируем первый элемент по умолчанию
    if (rackUnits.length > 0) {
      setTimeout(() => {
        rackUnits[2]?.click(); // Активируем серверы по умолчанию
      }, 1500);
    }
  }
  
  // Инициализация серверной стойки
  if (document.getElementById('serverComponentsInfo')) {
    initServerRack();
    
    // Добавляем кнопку сброса для серверной стойки
    const rackContainer = document.querySelector('.rack-details');
    if (rackContainer) {
      const resetRackButton = document.createElement('button');
      resetRackButton.textContent = 'Сбросить выбор';
      resetRackButton.className = 'reset-rack-btn';
      resetRackButton.style.cssText = `
        display: block;
        margin: 20px auto 10px;
        padding: 10px 20px;
        background: linear-gradient(135deg, #0d47a1 0%, #1565c0 100%);
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(13, 71, 161, 0.3);
      `;
      
      resetRackButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(13, 71, 161, 0.4)';
      });
      
      resetRackButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(13, 71, 161, 0.3)';
      });
      
      resetRackButton.addEventListener('click', function() {
        document.querySelectorAll('.rack-unit').forEach(unit => {
          unit.classList.remove('active');
          unit.style.transform = 'translateX(0)';
          unit.style.boxShadow = 'none';
        });
        
        const rackDetail = document.getElementById('rackDetail');
        if (rackDetail) {
          rackDetail.innerHTML = `
            <div class="default-rack-message">
              <span>👆</span>
              <p>Нажмите на уровень серверной стойки для получения информации</p>
            </div>
          `;
        }
      });
      
      rackContainer.appendChild(resetRackButton);
    }
  }
  
  // Добавляем динамические стили для серверной стойки
  const serverStyles = document.createElement('style');
  serverStyles.textContent = `
    .rack-info {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      animation: slideIn 0.3s ease-out;
    }
    
    .rack-info-header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 15px;
    }
    
    .rack-info-icon {
      font-size: 2.5em;
    }
    
    .rack-info-header h4 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.3em;
    }
    
    .rack-info-description {
      color: #666;
      line-height: 1.5;
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }
    
    .rack-info-details {
      padding-left: 20px;
      margin: 15px 0;
    }
    
    .rack-info-details li {
      margin-bottom: 10px;
      color: #555;
      position: relative;
      padding-left: 10px;
    }
    
    .rack-info-details li::before {
      content: "→";
      color: #1565c0;
      font-weight: bold;
      position: absolute;
      left: -15px;
    }
    
    .rack-info-tip {
      margin-top: 20px;
      padding: 15px;
      background: #e3f2fd;
      border-radius: 8px;
      border-left: 4px solid #1565c0;
      color: #0d47a1;
    }
    
    .default-rack-message {
      text-align: center;
      color: #666;
      padding: 40px 20px;
    }
    
    .default-rack-message span {
      font-size: 3em;
      display: block;
      margin-bottom: 10px;
    }
    
    /* Анимация для серверных карточек */
    .server-component-card {
      transition: all 0.3s ease;
    }
    
    .server-component-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 15px 35px rgba(13, 71, 161, 0.15);
    }
    
    .tier-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    }
    
    .tech-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    
    .trend-item:hover {
      transform: translateY(-5px);
      background: white;
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
  `;
  
  document.head.appendChild(serverStyles);

  // --- ОБРАБОТЧИКИ ДЛЯ СЕРВЕРНЫХ СЕКЦИЙ ---
  // Анимация для карточек сравнения
  const comparisonCards = document.querySelectorAll('.comparison-card');
  comparisonCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Подсказка для новых пользователей серверной секции
  if (document.getElementById('serverComponentsInfo') && !localStorage.getItem('serverComponentsVisited')) {
    setTimeout(() => {
      const showTip = confirm('🖥️ Добро пожаловать в раздел серверных компонентов! Нажмите на элементы серверной стойки, чтобы узнать подробности. Нажмите OK, чтобы продолжить.');
      if (showTip) {
        localStorage.setItem('serverComponentsVisited', 'true');
      }
    }, 2000);
  }

  console.log('Все скрипты успешно загружены и инициализированы!');




  // --- ИНТЕРАКТИВНАЯ СЕКЦИЯ БУДУЩИХ ТЕХНОЛОГИЙ ---
  function initFutureTechSection() {
    // Данные для технологий куба
    const techData = {
      'quantum': {
        title: '⚛️ Квантовые вычисления',
        description: 'Использование квантовых битов (кубитов) для решения сложных задач, недоступных классическим компьютерам.',
        features: [
          'Квантовая суперпозиция: кубиты могут быть в состоянии 0 и 1 одновременно',
          'Квантовая запутанность: связь между кубитами на любом расстоянии',
          'Квантовый параллелизм: одновременное выполнение множества вычислений',
          'Квантовое туннелирование: преодоление энергетических барьеров'
        ],
        applications: [
          'Расшифровка современных алгоритмов шифрования',
          'Моделирование сложных молекул для создания новых лекарств',
          'Оптимизация финансовых портфелей и логистических цепочек',
          'Ускорение машинного обучения в миллионы раз'
        ],
        challenges: [
          'Квантовая декогеренция (потеря информации)',
          'Сверхнизкие температуры (около абсолютного нуля)',
          'Высокая стоимость и сложность производства',
          'Необходимость новых алгоритмов и ПО'
        ],
        icon: '⚛️',
        color: '#00f7ff'
      },
      'neuromorphic': {
        title: '🧠 Нейроморфные чипы',
        description: 'Процессоры, имитирующие структуру и работу человеческого мозга с использованием искусственных нейронов и синапсов.',
        features: [
          'Массовый параллелизм: миллиарды "нейронов" работают одновременно',
          'Энергоэффективность: потребление в тысячи раз ниже традиционных CPU',
          'Обучение на лету: адаптация к новым данным в реальном времени',
          'Отказоустойчивость: продолжение работы при повреждении части "нейронов"'
        ],
        applications: [
          'Автономные транспортные средства и дроны',
          'Носимые медицинские диагностические устройства',
          'Распознавание образов в реальном времени',
          'Когнитивные помощники и роботы-компаньоны'
        ],
        challenges: [
          'Сложность проектирования нейроморфных архитектур',
          'Необходимость новых парадигм программирования',
          'Интеграция с существующими системами',
          'Масштабирование до уровня человеческого мозга'
        ],
        icon: '🧠',
        color: '#ff00ff'
      },
      'optical': {
        title: '💡 Оптические вычисления',
        description: 'Использование света (фотонов) вместо электричества (электронов) для передачи и обработки информации.',
        features: [
          'Скорость света: передача данных практически без задержек',
          'Отсутствие нагрева: фотоны не выделяют тепло при движении',
          'Параллельная обработка: одновременная передача множества световых волн',
          'Иммунитет к электромагнитным помехам'
        ],
        applications: [
          'Суперкомпьютеры для моделирования климата и вселенной',
          'Квантовая криптография и безопасная связь',
          'Высокочастотные финансовые транзакции',
          'Обработка Big Data в реальном времени'
        ],
        challenges: [
          'Сложность миниатюризации оптических компонентов',
          'Высокая стоимость производства',
          'Трудности интеграции с электронными схемами',
          'Потребность в новых материалах и технологиях'
        ],
        icon: '💡',
        color: '#00ff9d'
      },
      'biological': {
        title: '🧬 Биологические компьютеры',
        description: 'Использование живых клеток, ДНК, белков и других биологических молекул для хранения и обработки информации.',
        features: [
          'Биосовместимость: работа внутри живых организмов',
          'Самовоспроизводство: размножение и ремонт самих себя',
          'Энергия из окружающей среды: питание от биохимических реакций',
          'Наномасштаб: компоненты размерами в нанометры'
        ],
        applications: [
          'Наномедицина: целевая доставка лекарств в клетки',
          'Биосенсоры: мониторинг здоровья в реальном времени',
          'ДНК-архивы: хранение данных на тысячи лет',
          'Биоремедиация: очистка окружающей среды'
        ],
        challenges: [
          'Сложность контроля биологических процессов',
          'Взаимодействие с иммунной системой',
          'Этические вопросы и регуляция',
          'Стабильность и воспроизводимость'
        ],
        icon: '🧬',
        color: '#ff9900'
      },
      'molecular': {
        title: '⚗️ Молекулярные компьютеры',
        description: 'Использование отдельных молекул в качестве логических элементов и ячеек памяти.',
        features: [
          'Атомарная точность: компоненты размерами в несколько атомов',
          'Квантовые эффекты: использование квантовых свойств молекул',
          'Самосборка: автоматическая организация в нужные структуры',
          'Сверхнизкое энергопотребление: работа при комнатной температуре'
        ],
        applications: [
          'Нанопроизводство: создание материалов атом за атомом',
          'Квантовые симуляции: моделирование молекулярных систем',
          'Сверхплотная память: терабайты на квадратный сантиметр',
          'Химические компьютеры: решение химических задач'
        ],
        challenges: [
          'Стабильность молекулярных структур',
          'Сложность адресации отдельных молекул',
          'Интерфейсы с макромиром',
          'Масштабирование производства'
        ],
        icon: '⚗️',
        color: '#9d00ff'
      },
      'dna': {
        title: '🧪 ДНК-хранилища',
        description: 'Использование молекул ДНК для архивирования огромных объемов информации на тысячи лет.',
        features: [
          'Невероятная плотность: 1 эксабайт (10¹⁸ байт) в 1 грамме ДНК',
          'Долговечность: сохранность данных до 10 000 лет',
          'Устойчивость: невосприимчивость к электромагнитным полям',
          'Биосовместимость: возможность хранения внутри живых организмов'
        ],
        applications: [
          'Архивирование всего человеческого знания',
          'Хранение генетических и медицинских данных',
          'Создание "вечных" библиотек',
          'Биометрическая идентификация'
        ],
        challenges: [
          'Высокая стоимость синтеза и секвенирования ДНК',
          'Медленная скорость записи и чтения',
          'Ошибки при синтезе и репликации',
          'Этические вопросы приватности'
        ],
        icon: '🧪',
        color: '#ff0066'
      }
    };
    
    // Обработчики для граней куба
    const cubeFaces = document.querySelectorAll('.cube-face');
    const techDetail = document.getElementById('techDetail');
    
    if (cubeFaces.length > 0 && techDetail) {
      cubeFaces.forEach(face => {
        face.addEventListener('mouseenter', function() {
          const techType = this.dataset.tech;
          const data = techData[techType];
          
          if (data) {
            const featuresHtml = data.features.map(feature => 
              `<li>${feature}</li>`
            ).join('');
            
            const appsHtml = data.applications.map(app => 
              `<li>${app}</li>`
            ).join('');
            
            const challengesHtml = data.challenges.map(challenge => 
              `<li>${challenge}</li>`
            ).join('');
            
            techDetail.innerHTML = `
              <div class="tech-detail-content" style="border-left: 5px solid ${data.color}">
                <div class="tech-detail-header">
                  <span class="tech-detail-icon">${data.icon}</span>
                  <h4>${data.title}</h4>
                </div>
                <p class="tech-detail-description">${data.description}</p>
                
                <div class="tech-detail-section">
                  <h5><span style="color: ${data.color}">🌟</span> Ключевые особенности:</h5>
                  <ul class="tech-detail-features">
                    ${featuresHtml}
                  </ul>
                </div>
                
                <div class="tech-detail-section">
                  <h5><span style="color: ${data.color}">🎯</span> Практическое применение:</h5>
                  <ul class="tech-detail-applications">
                    ${appsHtml}
                  </ul>
                </div>
                
                <div class="tech-detail-section">
                  <h5><span style="color: ${data.color}">⚠️</span> Технические вызовы:</h5>
                  <ul class="tech-detail-challenges">
                    ${challengesHtml}
                  </ul>
                </div>
              </div>
            `;
            
            // Анимация появления
            techDetail.style.opacity = '0';
            techDetail.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
              techDetail.style.transition = 'all 0.3s ease';
              techDetail.style.opacity = '1';
              techDetail.style.transform = 'translateY(0)';
            }, 10);
          }
        });
        
        // Для мобильных устройств
        face.addEventListener('touchstart', function(e) {
          e.preventDefault();
          const techType = this.dataset.tech;
          const data = techData[techType];
          
          if (data) {
            // Тот же код, что и для mouseenter
            const featuresHtml = data.features.map(feature => 
              `<li>${feature}</li>`
            ).join('');
            
            const appsHtml = data.applications.map(app => 
              `<li>${app}</li>`
            ).join('');
            
            const challengesHtml = data.challenges.map(challenge => 
              `<li>${challenge}</li>`
            ).join('');
            
            techDetail.innerHTML = `
              <div class="tech-detail-content" style="border-left: 5px solid ${data.color}">
                <div class="tech-detail-header">
                  <span class="tech-detail-icon">${data.icon}</span>
                  <h4>${data.title}</h4>
                </div>
                <p class="tech-detail-description">${data.description}</p>
                
                <div class="tech-detail-section">
                  <h5><span style="color: ${data.color}">🌟</span> Ключевые особенности:</h5>
                  <ul class="tech-detail-features">
                    ${featuresHtml}
                  </ul>
                </div>
                
                <div class="tech-detail-section">
                  <h5><span style="color: ${data.color}">🎯</span> Практическое применение:</h5>
                  <ul class="tech-detail-applications">
                    ${appsHtml}
                  </ul>
                </div>
                
                <div class="tech-detail-section">
                  <h5><span style="color: ${data.color}">⚠️</span> Технические вызовы:</h5>
                  <ul class="tech-detail-challenges">
                    ${challengesHtml}
                  </ul>
                </div>
              </div>
            `;
          }
        });
      });
      
      // Активируем первую технологию по умолчанию
      setTimeout(() => {
        if (cubeFaces[0]) {
          const event = new MouseEvent('mouseenter');
          cubeFaces[0].dispatchEvent(event);
        }
      }, 2000);
    }
    
    // Обработчики для опроса
    const pollOptions = document.querySelectorAll('.poll-option');
    const pollResults = document.querySelector('.poll-results');
    
    if (pollOptions.length > 0 && pollResults) {
      // Данные для опроса (симулируем существующие результаты)
      const pollData = {
        '2040': { count: 25, label: 'Оптимисты-футуристы' },
        '2050': { count: 45, label: 'Реалисты' },
        '2060': { count: 20, label: 'Скептики' },
        '2100': { count: 7, label: 'Консерваторы' },
        'never': { count: 3, label: 'Нигилисты' }
      };
      
      let userVoted = false;
      
      pollOptions.forEach(option => {
        option.addEventListener('click', function() {
          if (userVoted) return;
          
          const year = this.dataset.year;
          
          // Увеличиваем счетчик для выбранного варианта
          pollData[year].count++;
          
          // Обновляем отображение результатов
          showPollResults(year);
          
          // Отмечаем, что пользователь проголосовал
          userVoted = true;
          this.style.background = '#00f7ff';
          this.style.color = '#000000';
          this.style.boxShadow = '0 0 20px rgba(0, 247, 255, 0.5)';
          
          // Блокируем другие кнопки
          pollOptions.forEach(opt => {
            if (opt !== this) {
              opt.style.opacity = '0.5';
              opt.style.cursor = 'not-allowed';
            }
          });
          
          // Сохраняем в localStorage
          localStorage.setItem('futurePollVoted', 'true');
          localStorage.setItem('futurePollChoice', year);
        });
      });
      
      function showPollResults(userChoice) {
        const total = Object.values(pollData).reduce((sum, item) => sum + item.count, 0);
        
        let resultsHtml = `
          <div class="results-content">
            <h4 style="color: #00f7ff; margin-bottom: 20px;">Результаты опроса</h4>
            <p style="color: #cccccc; margin-bottom: 20px;">Вы проголосовали за: <strong style="color: #ff00ff">${getYearLabel(userChoice)}</strong></p>
        `;
        
        Object.entries(pollData).forEach(([year, data]) => {
          const percentage = Math.round((data.count / total) * 100);
          const isUserChoice = year === userChoice;
          
          resultsHtml += `
            <div class="result-item" style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <span style="color: ${isUserChoice ? '#ff00ff' : '#ffffff'}">${getYearLabel(year)}</span>
                <span style="color: #cccccc">${percentage}% (${data.count})</span>
              </div>
              <div class="result-bar" style="height: 20px; background: rgba(255, 255, 255, 0.1); border-radius: 10px; overflow: hidden;">
                <div class="result-fill" style="height: 100%; width: ${percentage}%; background: ${isUserChoice ? 'linear-gradient(90deg, #ff00ff, #ff0066)' : 'linear-gradient(90deg, #00f7ff, #0077ff)'}; border-radius: 10px; transition: width 1s ease;"></div>
              </div>
              <div style="color: #888888; font-size: 0.9em; margin-top: 5px;">${data.label}</div>
            </div>
          `;
        });
        
        resultsHtml += `
            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="color: #cccccc; font-size: 0.9em;">Всего проголосовало: <strong>${total}</strong> человек</p>
            </div>
          </div>
        `;
        
        pollResults.innerHTML = resultsHtml;
        
        // Анимация заполнения
        setTimeout(() => {
          const resultFills = document.querySelectorAll('.result-fill');
          resultFills.forEach(fill => {
            fill.style.transition = 'width 1s ease';
          });
        }, 100);
      }
      
      function getYearLabel(year) {
        const labels = {
          '2040': 'До 2040 года',
          '2050': '2040-2050 годы',
          '2060': '2050-2060 годы',
          '2100': 'После 2060 года',
          'never': 'Никогда не достигнем'
        };
        return labels[year] || year;
      }
      
      // Проверяем, голосовал ли пользователь ранее
      if (localStorage.getItem('futurePollVoted') === 'true') {
        const previousChoice = localStorage.getItem('futurePollChoice');
        if (previousChoice) {
          // Показываем результаты без возможности голосовать
          pollOptions.forEach(opt => {
            opt.style.opacity = '0.5';
            opt.style.cursor = 'not-allowed';
            if (opt.dataset.year === previousChoice) {
              opt.style.background = '#00f7ff';
              opt.style.color = '#000000';
            }
          });
          userVoted = true;
          showPollResults(previousChoice);
        }
      }
    }
    
    // Обработчики для карточек технологий (flip-эффект)
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
      });
      
      card.addEventListener('mouseleave', function() {
        if (!this.querySelector('.tech-card-inner').classList.contains('flipped')) {
          this.style.transform = 'translateY(0)';
        }
      });
      
      // Добавляем возможность клика для переворота на мобильных
      card.addEventListener('touchstart', function(e) {
        e.preventDefault();
        const inner = this.querySelector('.tech-card-inner');
        inner.classList.toggle('flipped');
        this.style.transform = inner.classList.contains('flipped') ? 'translateY(-10px)' : 'translateY(0)';
      });
    });
    
    // Обработчики для таймлайна
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      item.addEventListener('click', function() {
        timelineItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        const year = this.dataset.year;
        // Можно добавить дополнительную логику при клике на таймлайн
      });
    });
  }
  
  // Инициализация секции будущих технологий
  if (document.getElementById('futureComputersInfo')) {
    initFutureTechSection();
    
    // Подсказка для новых пользователей
    if (!localStorage.getItem('futureTechVisited')) {
      setTimeout(() => {
        const showTip = confirm('🚀 Добро пожаловать в будущее компьютерных технологий! Наведите курсор на вращающийся куб, чтобы узнать о прорывных технологиях. Нажмите OK, чтобы продолжить.');
        if (showTip) {
          localStorage.setItem('futureTechVisited', 'true');
        }
      }, 2500);
    }
  }
  
  // Добавляем динамические стили для секции будущего
  const futureStyles = document.createElement('style');
  futureStyles.textContent = `
    .tech-detail-content {
      background: rgba(0, 0, 0, 0.7);
      padding: 25px;
      border-radius: 15px;
      backdrop-filter: blur(10px);
      animation: fadeIn 0.5s ease;
      color: #ffffff;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .tech-detail-header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 20px;
    }
    
    .tech-detail-icon {
      font-size: 2.5em;
      filter: drop-shadow(0 0 10px currentColor);
    }
    
    .tech-detail-header h4 {
      margin: 0;
      color: #ffffff;
      font-size: 1.4em;
    }
    
    .tech-detail-description {
      color: #cccccc;
      line-height: 1.6;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .tech-detail-section {
      margin-bottom: 20px;
    }
    
    .tech-detail-section h5 {
      color: #ffffff;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .tech-detail-features,
    .tech-detail-applications,
    .tech-detail-challenges {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .tech-detail-features li,
    .tech-detail-applications li,
    .tech-detail-challenges li {
      color: #cccccc;
      margin-bottom: 8px;
      padding-left: 20px;
      position: relative;
      line-height: 1.4;
    }
    
    .tech-detail-features li::before {
      content: "✨";
      position: absolute;
      left: 0;
    }
    
    .tech-detail-applications li::before {
      content: "🎯";
      position: absolute;
      left: 0;
    }
    
    .tech-detail-challenges li::before {
      content: "⚠️";
      position: absolute;
      left: 0;
    }
    
    .results-content {
      width: 100%;
    }
    
    /* Анимация для карточек технологий */
    .tech-card {
      opacity: 0;
      animation: slideUpFade 0.8s forwards;
    }
    
    .tech-card:nth-child(1) { animation-delay: 0.1s; }
    .tech-card:nth-child(2) { animation-delay: 0.2s; }
    .tech-card:nth-child(3) { animation-delay: 0.3s; }
    .tech-card:nth-child(4) { animation-delay: 0.4s; }
    
    @keyframes slideUpFade {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Анимация для сценариев */
    .scenario {
      opacity: 0;
      animation: fadeInScale 0.8s forwards;
    }
    
    .scenario:nth-child(1) { animation-delay: 0.1s; }
    .scenario:nth-child(2) { animation-delay: 0.3s; }
    .scenario:nth-child(3) { animation-delay: 0.5s; }
    
    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    /* Анимация для этических вопросов */
    .question-item {
      opacity: 0;
      animation: fadeIn 0.8s forwards;
    }
    
    .question-item:nth-child(1) { animation-delay: 0.1s; }
    .question-item:nth-child(2) { animation-delay: 0.2s; }
    .question-item:nth-child(3) { animation-delay: 0.3s; }
    .question-item:nth-child(4) { animation-delay: 0.4s; }
    
    /* Управление анимацией куба */
    .tech-cube {
      animation: rotateCube 30s infinite linear;
    }
    
    .tech-cube:hover {
      animation-play-state: paused;
    }
    
    @keyframes rotateCube {
      0% { transform: rotateX(-15deg) rotateY(0deg); }
      100% { transform: rotateX(-15deg) rotateY(360deg); }
    }
    
    /* Стили для флип-карточек */
    .tech-card-inner.flipped {
      transform: rotateY(180deg);
    }
    
    /* Адаптивные стили для мобильных */
    @media (max-width: 768px) {
      .tech-cube {
        width: 150px;
        height: 150px;
      }
      
      .cube-face {
        width: 150px;
        height: 150px;
      }
      
      .front { transform: translateZ(75px); }
      .back { transform: translateZ(-75px) rotateY(180deg); }
      .right { transform: translateX(75px) rotateY(90deg); }
      .left { transform: translateX(-75px) rotateY(-90deg); }
      .top { transform: translateY(-75px) rotateX(90deg); }
      .bottom { transform: translateY(75px) rotateX(-90deg); }
      
      .tech-icon {
        font-size: 2em;
      }
      
      .cube-face h4 {
        font-size: 0.9em;
      }
    }
    
    @media (max-width: 480px) {
      .tech-cube {
        width: 120px;
        height: 120px;
      }
      
      .cube-face {
        width: 120px;
        height: 120px;
      }
      
      .front { transform: translateZ(60px); }
      .back { transform: translateZ(-60px) rotateY(180deg); }
      .right { transform: translateX(60px) rotateY(90deg); }
      .left { transform: translateX(-60px) rotateY(-90deg); }
      .top { transform: translateY(-60px) rotateX(90deg); }
      .bottom { transform: translateY(60px) rotateX(-90deg); }
      
      .face-content {
        padding: 10px;
      }
    }
  `;
  
  document.head.appendChild(futureStyles);

  console.log('Все скрипты успешно загружены и инициализированы, включая футуристическую секцию!');










};

