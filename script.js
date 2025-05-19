// Scroll suave para navegacion (por si el navegador no soporta scroll-behavior)
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

// Formulario de contacto
const form = document.getElementById('contactForm');
const nombre = document.getElementById('nombre');
const telefono = document.getElementById('telefono');
const email = document.getElementById('email');
const message = document.getElementById('message');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  formSuccess.classList.add('hidden');
  formError.classList.add('hidden');
  
  // Validación simple
  if (
    nombre.value.trim() === '' || 
    telefono.value.trim() === '' || 
    email.value.trim() === '' || 
    message.value.trim() === '' || 
    !email.value.includes('@')
  ) {
    formError.classList.remove('hidden');
    return;
  }
  
  // Validación básica de teléfono (al menos 6 dígitos)
  const telefonoRegex = /\d{6,}/;
  if (!telefonoRegex.test(telefono.value.replace(/\D/g, ''))) {
    formError.classList.remove('hidden');
    formError.textContent = 'Por favor, ingresa un número de teléfono válido.';
    return;
  }
  
  // Simular envío exitoso
  formSuccess.classList.remove('hidden');
  form.reset();
  formError.textContent = 'Por favor, completa todos los campos correctamente.';
});

// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotHeader = document.getElementById('chatbot-header');
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotButton = document.getElementById('chatbot-button');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');

  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar la redirección de Formsubmit

    // Enviar el formulario usando AJAX
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
    })
    .then(response => {
      if (response.ok) {
        // Mostrar el mensaje de éxito
        formSuccess.classList.remove('hidden');
        form.reset(); // Limpiar el formulario
      } else {
        // Manejar errores (opcional)
        console.error('Error al enviar el formulario');
        alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
      }
    });
  });

  // Hacer visible el chatbot
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

  // Función para cerrar completamente el chatbot
  function closeChatbot() {
    chatbotContainer.classList.add('hidden');
    chatbotButton.classList.remove('hidden');
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

  // Event listeners
  chatbotHeader.addEventListener('click', toggleChatbot);
  chatbotButton.addEventListener('click', openChatbot);
  
  chatbotSend.addEventListener('click', processUserInput);
  
  chatbotInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      processUserInput();
    }
  });
});