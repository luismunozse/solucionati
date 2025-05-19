document.addEventListener('DOMContentLoaded', function() {
  // Scroll suave para navegación
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Menú hamburguesa
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOpen = menuBtn.querySelector('.menu-open');
  const menuClose = menuBtn.querySelector('.menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMenu() {
    mobileMenu.classList.toggle('hidden');
    menuOpen.classList.toggle('hidden');
    menuClose.classList.toggle('hidden');
  }

  menuBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  document.addEventListener('click', function(e) {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
      toggleMenu();
    }
  });

  // Formulario de contacto
  const form = document.getElementById('contactForm');
  const nombre = document.getElementById('nombre');
  const telefono = document.getElementById('telefono');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const formSuccess = document.getElementById('formSuccess');
  // Si tienes un div con id="formError", descomenta la siguiente línea:
  // const formError = document.getElementById('formError');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    formSuccess.classList.add('hidden');
    // Si usas formError, descomenta la siguiente línea:
    // formError.classList.add('hidden');
    
    // Validación simple
    if (
      nombre.value.trim() === '' || 
      telefono.value.trim() === '' || 
      email.value.trim() === '' || 
      message.value.trim() === '' || 
      !email.value.includes('@')
    ) {
      // Si usas formError, descomenta:
      // formError.classList.remove('hidden');
      return;
    }
    
    // Validación básica de teléfono (al menos 6 dígitos)
    const telefonoRegex = /\d{6,}/;
    if (!telefonoRegex.test(telefono.value.replace(/\D/g, ''))) {
      // Si usas formError, descomenta:
      // formError.classList.remove('hidden');
      // formError.textContent = 'Por favor, ingresa un número de teléfono válido.';
      return;
    }
    
    // Simular envío exitoso
    formSuccess.classList.remove('hidden');
    form.reset();
    // Si usas formError, descomenta:
    // formError.textContent = 'Por favor, completa todos los campos correctamente.';
  });

  // Chatbot functionality
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotHeader = document.getElementById('chatbot-header');
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotButton = document.getElementById('chatbot-button');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');

  // Hacer visible el chatbot con animación
  setTimeout(() => {
    chatbotContainer.style.opacity = '1';
  }, 1500);

  // Inicializar chatbot minimizado
  chatbotContainer.classList.add('minimized');
  chatbotToggle.textContent = '+';

  // Respuestas predefinidas del chatbot
  const botResponses = {
    'hola': '¡Hola! ¿En qué puedo ayudarte hoy?',
    'servicios': 'Ofrecemos servicio técnico, mantenimiento, consultoría, masterización de equipos, servidores, desarrollo web y software personalizado.',
    'contacto': 'Puedes contactarnos a través del formulario en esta página o enviarnos un WhatsApp.',
    'precio': 'Los precios varían según el servicio requerido. ¿Podrías especificar qué servicio te interesa?',
    'ubicacion': 'Estamos ubicados en Córdoba, Argentina. También ofrecemos servicios remotos.',
    'horario': 'Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00 horas.',
    'gracias': '¡De nada! Estamos para ayudarte. ¿Hay algo más en lo que pueda asistirte?'
  };

  // Función para minimizar/maximizar el chatbot
  function toggleChatbot() {
    if (chatbotContainer.classList.contains('minimized')) {
      chatbotContainer.classList.remove('minimized');
      chatbotToggle.textContent = '−';
      chatbotButton.classList.add('hidden');
    } else {
      chatbotContainer.classList.add('minimized');
      chatbotToggle.textContent = '+';
    }
  }

  // Función para abrir el chatbot
  function openChatbot() {
    chatbotContainer.classList.remove('hidden');
    chatbotContainer.classList.remove('minimized');
    chatbotToggle.textContent = '−';
    chatbotButton.classList.add('hidden');
    chatbotInput.focus();
  }

  // Función para agregar un mensaje al chat
  function addMessage(message, isUser = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Función para procesar la entrada del usuario
  function processUserInput() {
    const userMessage = chatbotInput.value.trim();
    if (userMessage === '') return;

    // Agregar mensaje del usuario al chat
    addMessage(userMessage, true);
    chatbotInput.value = '';

    // Simular tiempo de respuesta del bot
    setTimeout(() => {
      // Buscar respuesta predefinida
      let botResponse = null;
      const userMessageLower = userMessage.toLowerCase();
      
      for (const [keyword, response] of Object.entries(botResponses)) {
        if (userMessageLower.includes(keyword)) {
          botResponse = response;
          break;
        }
      }

      // Si no hay respuesta predefinida, usar respuesta genérica
      if (!botResponse) {
        botResponse = 'Gracias por tu mensaje. ¿Hay algo específico en lo que pueda ayudarte sobre nuestros servicios de tecnología?';
      }

      // Agregar respuesta del bot al chat
      addMessage(botResponse);
    }, 500);
  }

  // Event listeners del chatbot
  chatbotHeader.addEventListener('click', toggleChatbot);
  chatbotButton.addEventListener('click', openChatbot);
  chatbotSend.addEventListener('click', processUserInput);
  chatbotInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      processUserInput();
    }
  });
});