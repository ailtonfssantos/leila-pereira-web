/**
 * Chatbot LP Estrias
 * Assistente virtual premium para tratamentos de regeneración de estrías
 * Valencia, España - Atendimento a domicilio
 * 
 * Arquivo: js/chatbot.js
 * CSS externo: css/chatbot.css
 */

class LPChatbot {
  constructor(config = {}) {
    // Configurações padrão
    this.config = {
      botName: 'LP Estrias',
      botAvatar: 'img/logo-chatbot.png',
      primaryColor: '#C9A96E',
      secondaryColor: '#E8C8C0',
      backgroundColor: '#FAF7F4',
      textColor: '#2C2420',
      whatsappNumber: '34602624342',
      serviceZones: [
        'valencia-centro', 'valencia-norte', 'valencia-sur', 'valencia-este',
        'paterna', 'torrent', 'mislata', 'alboraya', 'burjassot',
        'sagunto', 'alaquàs', 'manises', 'xirivella'
      ],
      ...config
    };

    // Estado da conversa
    this.state = {
      language: 'es',
      step: 'greeting',
      userData: {
        nombre: '',
        telefono: '',
        municipio: '',
        tratamiento: '',
        fecha_preferida: '',
        mensaje: '',
        origen: 'chatbot_lp_estrias'
      },
      conversationHistory: []
    };

    // Respostas por idioma
    this.i18n = {
      es: {
        greeting: "¡Hola! 👋 Soy el asistente virtual de LP Estrias.\n\nEstoy aquí para ayudarte a conocer nuestros tratamientos de regeneración y reparación de la piel y, si lo deseas, ayudarte a solicitar una cita a domicilio en Valencia y alrededores.\n\n¿Qué te gustaría saber?",
        quickOptions: ["✨ Tratamientos", "📸 Ver resultados", "💬 Tengo una duda", " Solicitar una cita"],
        treatments: "En LP Estrias trabajamos con tratamientos personalizados dirigidos a:\n\n• Regeneración de estrías\n• Reparación y regeneración de la piel\n• Mejora de la textura cutánea\n• Cuidado personalizado de la zona tratada\n\nTodos nuestros protocolos utilizan productos de alta gama y técnicas avanzadas. ¿Te gustaría saber más sobre algún tratamiento en concreto?",
        results: "Puedes consultar nuestra galería de resultados para conocer algunos de nuestros trabajos. Ten en cuenta que cada piel responde de forma diferente y los resultados pueden variar.\n\n📸 <a href='#resultados' class='chat-link'>Ver resultados en el sitio web</a>",
        resultsDisclaimer: "El objetivo del tratamiento es mejorar visiblemente el aspecto, la textura y la apariencia de las estrías y favorecer la regeneración de la piel. Sin embargo, cada piel responde de una manera diferente y no es posible garantizar que desaparezcan por completo.",
        homeService: "Realizamos el servicio a domicilio en Valencia y determinadas zonas de los alrededores (hasta 30 km de distancia). ¿En qué zona o municipio te encuentras?",
        scheduling: "Perfecto 😊 Para solicitar tu cita, necesito algunos datos:",
        collectName: "¿Podrías indicarme tu nombre completo?",
        collectPhone: "Gracias, {{name}}. ¿Cuál es tu teléfono o WhatsApp para contactarte?",
        collectMunicipio: "¿En qué municipio o zona de Valencia te encuentras?",
        collectTreatment: "¿Qué tratamiento te interesa? (regeneración de estrías, reparación de piel, bioestimulación, hidratación profunda, tratamiento postparto)",
        collectDate: "¿Tienes alguna fecha o período preferido para la cita?",
        collectMessage: "¿Hay algo más que quieras comentarme? (opcional)",
        confirmation: "Gracias, {{name}}. He registrado tu solicitud de cita.\n\n📋 Resumen:\n• Tratamiento: {{tratamiento}}\n• Zona: {{municipio}}\n• Contacto: {{telefono}}\n\nLa especialista se pondrá en contacto contigo en menos de 24 horas para confirmar los detalles. ¿Prefieres contactar ahora por WhatsApp?",
        price: "No quiero darte una información incorrecta. El precio puede depender del tratamiento y de la zona a tratar. Si quieres, puedo ayudarte a solicitar una valoración personalizada sin compromiso.",
        pain: "La sensación puede variar dependiendo del tratamiento y de la sensibilidad de cada persona. Durante la valoración presencial se te explicará cómo es el procedimiento y qué puedes esperar.",
        medicalDisclaimer: "En ese caso, lo más recomendable es comentarlo directamente con la especialista antes de realizar el tratamiento, para confirmar si es adecuado para ti.",
        photoUpload: "Si quieres, puedes enviar una fotografía de la zona para que la especialista pueda tener una referencia inicial. La fotografía no sustituye una valoración profesional.",
        transferToHuman: "Claro 😊 Puedo ayudarte a ponerte en contacto con la especialista.",
        whatsappButton: "💬 Hablar por WhatsApp",
        scheduleButton: "📅 Solicitar cita en el sitio web",
        back: "⬅️ Volver",
        typing: "Escribiendo...",
        error: "Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo o contacta directamente por WhatsApp.",
        fallback: "Gracias por tu mensaje. Para darte la mejor respuesta, ¿podrías contarme un poco más sobre lo que necesitas? 😊",
        goodbye: "¡Ha sido un placer ayudarte! Si tienes más dudas, estoy aquí cuando me necesites. 💫"
      },
      pt: {
        greeting: "Olá!  Sou a assistente virtual da LP Estrias.\n\nEstou aqui para te ajudar a conhecer os nossos tratamentos de regeneração e reparação da pele e, se desejares, ajudar-te a marcar uma consulta ao domicílio em Valência e arredores.\n\nO que gostarias de saber?",
        quickOptions: ["✨ Tratamentos", "📸 Ver resultados", "💬 Tenho uma dúvida", "📅 Marcar consulta"],
        treatments: "Na LP Estrias trabalhamos com tratamentos personalizados direcionados a:\n\n• Regeneração de estrias\n• Reparação e regeneração da pele\n• Melhoria da textura cutânea\n• Cuidado personalizado da zona tratada\n\nTodos os nossos protocolos utilizam produtos de alta gama e técnicas avançadas. Gostarias de saber mais sobre algum tratamento em concreto?",
        results: "Podes consultar a nossa galeria de resultados para conhecer alguns dos nossos trabalhos. Tem em conta que cada pele responde de forma diferente e os resultados podem variar.\n\n <a href='#resultados' class='chat-link'>Ver resultados no site</a>",
        resultsDisclaimer: "O objetivo do tratamento é melhorar visivelmente o aspeto, a textura e a aparência das estrias e favorecer a regeneração da pele. No entanto, cada pele responde de maneira diferente e não é possível garantir que desapareçam por completo.",
        homeService: "Realizamos o serviço ao domicílio em Valência e determinadas zonas dos arredores (até 30 km de distância). Em que zona ou município te encontras?",
        scheduling: "Perfeito 😊 Para solicitar a tua consulta, preciso de alguns dados:",
        collectName: "Podias indicar-me o teu nome completo?",
        collectPhone: "Obrigada, {{name}}. Qual é o teu telefone ou WhatsApp para te contactarmos?",
        collectMunicipio: "Em que município ou zona de Valência te encontras?",
        collectTreatment: "Que tratamento te interessa? (regeneração de estrias, reparação de pele, bioestimulação, hidratação profunda, tratamento pós-parto)",
        collectDate: "Tens alguma data ou período preferido para a consulta?",
        collectMessage: "Há mais alguma coisa que queiras comentar? (opcional)",
        confirmation: "Obrigada, {{name}}. Registei o teu pedido de consulta.\n\n📋 Resumo:\n• Tratamento: {{tratamiento}}\n• Zona: {{municipio}}\n• Contacto: {{telefono}}\n\nA especialista entrará em contacto contigo em menos de 24 horas para confirmar os detalhes. Preferes contactar agora por WhatsApp?",
        price: "Não quero dar-te uma informação incorreta. O preço pode depender do tratamento e da zona a tratar. Se quiseres, posso ajudar-te a solicitar uma avaliação personalizada sem compromisso.",
        pain: "A sensação pode variar dependendo do tratamento e da sensibilidade de cada pessoa. Durante a avaliação presencial ser-te-á explicado como é o procedimento e o que podes esperar.",
        medicalDisclaimer: "Nesse caso, o mais recomendável é comentá-lo diretamente com a especialista antes de realizar o tratamento, para confirmar se é adequado para ti.",
        photoUpload: "Se quiseres, podes enviar uma fotografia da zona para que a especialista possa ter uma referência inicial. A fotografia não substitui uma avaliação profissional.",
        transferToHuman: "Claro 😊 Posso ajudar-te a entrar em contacto com a especialista.",
        whatsappButton: "💬 Falar por WhatsApp",
        scheduleButton: " Marcar consulta no site",
        back: "⬅️ Voltar",
        typing: "A escrever...",
        error: "Lamento, ocorreu um erro. Por favor, tenta novamente ou contacta diretamente por WhatsApp.",
        fallback: "Obrigada pela tua mensagem. Para te dar a melhor resposta, podias contar-me um pouco mais sobre o que precisas? 😊",
        goodbye: "Foi um prazer ajudar-te! Se tiveres mais dúvidas, estou aqui quando precisares. 💫"
      },
      en: {
        greeting: "Hello! 👋 I'm the virtual assistant at LP Estrias.\n\nI'm here to help you learn about our skin regeneration and repair treatments, and if you'd like, help you book a home appointment in Valencia and surrounding areas.\n\nWhat would you like to know?",
        quickOptions: ["✨ Treatments", "📸 See results", "💬 I have a question", "📅 Book an appointment"],
        treatments: "At LP Estrias, we work with personalized treatments focused on:\n\n• Stretch mark regeneration\n• Skin repair and regeneration\n• Skin texture improvement\n• Personalized care for the treated area\n\nAll our protocols use high-end products and advanced techniques. Would you like to know more about a specific treatment?",
        results: "You can check our results gallery to see some of our work. Please note that every skin responds differently and results may vary.\n\n📸 <a href='#resultados' class='chat-link'>View results on website</a>",
        resultsDisclaimer: "The goal of the treatment is to visibly improve the appearance, texture and look of stretch marks and promote skin regeneration. However, every skin responds differently and we cannot guarantee complete disappearance.",
        homeService: "We provide home service in Valencia and certain surrounding areas (up to 30 km distance). Which area or municipality are you located in?",
        scheduling: "Perfect 😊 To request your appointment, I'll need some information:",
        collectName: "Could you please tell me your full name?",
        collectPhone: "Thank you, {{name}}. What's your phone number or WhatsApp so we can contact you?",
        collectMunicipio: "Which municipality or area in Valencia are you located in?",
        collectTreatment: "Which treatment are you interested in? (stretch mark regeneration, skin repair, biostimulation, deep hydration, postpartum treatment)",
        collectDate: "Do you have a preferred date or time period for the appointment?",
        collectMessage: "Is there anything else you'd like to share? (optional)",
        confirmation: "Thank you, {{name}}. I've registered your appointment request.\n\n📋 Summary:\n• Treatment: {{tratamiento}}\n• Area: {{municipio}}\n• Contact: {{telefono}}\n\nThe specialist will contact you within 24 hours to confirm the details. Would you prefer to contact via WhatsApp now?",
        price: "I don't want to give you incorrect information. The price may depend on the treatment and area to be treated. If you'd like, I can help you request a personalized, no-obligation assessment.",
        pain: "The sensation may vary depending on the treatment and each person's sensitivity. During the in-person assessment, you'll be explained how the procedure works and what to expect.",
        medicalDisclaimer: "In that case, it's best to discuss this directly with the specialist before proceeding with the treatment, to confirm if it's suitable for you.",
        photoUpload: "If you'd like, you can send a photo of the area so the specialist can have an initial reference. The photo does not replace a professional assessment.",
        transferToHuman: "Of course 😊 I can help you get in touch with the specialist.",
        whatsappButton: " Chat on WhatsApp",
        scheduleButton: "📅 Book appointment on website",
        back: "⬅️ Back",
        typing: "Typing...",
        error: "Sorry, an error occurred. Please try again or contact us directly via WhatsApp.",
        fallback: "Thank you for your message. To give you the best response, could you tell me a bit more about what you need? ",
        goodbye: "It was a pleasure helping you! If you have more questions, I'm here whenever you need me. 💫"
      }
    };

    this.init();
  }

  // Inicialização
  init() {
    this.renderWidget();
    this.bindEvents();
    this.detectLanguage();
    this.addMessage('bot', this.i18n[this.state.language].greeting, this.i18n[this.state.language].quickOptions);
  }

  // Detectar idioma do usuário
  detectLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('pt')) {
      this.state.language = 'pt';
    } else if (userLang.startsWith('en')) {
      this.state.language = 'en';
    } else {
      this.state.language = 'es';
    }
  }

  // Traduzir texto com substituição de variáveis
  t(key, vars = {}) {
    let text = this.i18n[this.state.language][key] || key;
    Object.entries(vars).forEach(([k, v]) => {
      text = text.replace(new RegExp(`{{${k}}}`, 'g'), v);
    });
    return text;
  }

  // Renderizar widget do chatbot
  renderWidget() {
    const widget = document.createElement('div');
    widget.id = 'lp-chatbot-widget';
    widget.innerHTML = `
      <!-- Botão flutuante -->
      <button id="lp-chatbot-toggle" class="lp-chatbot-toggle" aria-label="Abrir chat">
        <svg viewBox="0 0 24 24" fill="currentColor" class="icon-chat">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
        </svg>
        <span class="lp-badge">💬</span>
      </button>

      <!-- Janela do chat -->
      <div id="lp-chatbot-window" class="lp-chatbot-window" hidden>
        <!-- Cabeçalho -->
        <div class="lp-chatbot-header">
          <div class="lp-chatbot-avatar">
            <img src="${this.config.botAvatar}" alt="${this.config.botName}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2245%22 fill=%22${this.config.primaryColor.replace('#','%23')}%22/><text x=%2250%22 y=%2258%22 font-size=%2230%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22sans-serif%22>LP</text></svg>'"/>
          </div>
          <div class="lp-chatbot-info">
            <h4 class="lp-chatbot-name">${this.config.botName}</h4>
            <span class="lp-chatbot-status">
              <span class="status-dot"></span> En línea
            </span>
          </div>
          <button id="lp-chatbot-close" class="lp-chatbot-close" aria-label="Fechar chat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- Área de mensagens -->
        <div id="lp-chatbot-messages" class="lp-chatbot-messages"></div>

        <!-- Área de input -->
        <div class="lp-chatbot-input-area">
          <div id="lp-chatbot-quick-replies" class="lp-chatbot-quick-replies"></div>
          <form id="lp-chatbot-form" class="lp-chatbot-form">
            <input type="text" id="lp-chatbot-input" placeholder="Escribe tu mensaje..." autocomplete="off" />
            <button type="submit" class="lp-chatbot-send" aria-label="Enviar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(widget);
  }

  // Vincular eventos
  bindEvents() {
    const widget = document.getElementById('lp-chatbot-widget');
    const toggle = document.getElementById('lp-chatbot-toggle');
    const window = document.getElementById('lp-chatbot-window');
    const close = document.getElementById('lp-chatbot-close');
    const form = document.getElementById('lp-chatbot-form');
    const input = document.getElementById('lp-chatbot-input');

    toggle.addEventListener('click', () => {
      window.hidden = !window.hidden;
      if (!window.hidden) {
        input.focus();
      }
    });

    close.addEventListener('click', () => {
      window.hidden = true;
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = input.value.trim();
      if (message) {
        this.handleUserMessage(message);
        input.value = '';
      }
    });
  }

  // Adicionar mensagem ao chat
    addMessage(sender, text, quickReplies = null) {
    const messages = document.getElementById('lp-chatbot-messages');
    const messageEl = document.createElement('div');
    messageEl.className = `lp-message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'lp-message-avatar';
    avatar.textContent = sender === 'bot' ? 'LP' : '';
    
    const bubble = document.createElement('div');
    bubble.className = 'lp-message-bubble';
    bubble.innerHTML = text.replace(/\n/g, '<br>');
    
    messageEl.appendChild(avatar);
    messageEl.appendChild(bubble);
    messages.appendChild(messageEl);
    messages.scrollTop = messages.scrollHeight;

    // Adicionar event listener para links internos
    const links = bubble.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        this.scrollToSection(targetId);
        });
    });

    // Adicionar respostas rápidas se for do bot
    if (sender === 'bot' && quickReplies?.length) {
        setTimeout(() => {
        const quickRepliesEl = document.getElementById('lp-chatbot-quick-replies');
        quickRepliesEl.innerHTML = '';
        quickReplies.forEach(reply => {
            const btn = document.createElement('button');
            btn.className = 'lp-quick-reply';
            btn.textContent = reply;
            btn.addEventListener('click', () => {
            this.handleUserMessage(reply);
            quickRepliesEl.innerHTML = '';
            });
            quickRepliesEl.appendChild(btn);
        });
        }, 300);
    }

    // Guardar no histórico
    this.state.conversationHistory.push({ sender, text, timestamp: new Date() });
    }

    // Scroll suave até uma seção
scrollToSection(targetId) {
  // Fechar o chatbot
  const chatbotWindow = document.getElementById('lp-chatbot-window');
  if (chatbotWindow) {
    chatbotWindow.hidden = true;
  }

  // Encontrar a seção de destino
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    // Scroll suave com offset para a navbar
    const navbarHeight = 80; // Ajuste conforme altura da sua navbar
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // Destacar a seção (opcional)
    targetElement.style.scrollMarginTop = `${navbarHeight}px`;
  } else {
    console.warn(`Seção #${targetId} não encontrada`);
  }
}

  // Mostrar indicador de "digitando"
  showTyping() {
    const messages = document.getElementById('lp-chatbot-messages');
    const typingEl = document.createElement('div');
    typingEl.className = 'lp-message bot';
    typingEl.id = 'lp-typing-indicator';
    typingEl.innerHTML = `
      <div class="lp-message-avatar">LP</div>
      <div class="lp-typing">
        <div class="lp-typing-dot"></div>
        <div class="lp-typing-dot"></div>
        <div class="lp-typing-dot"></div>
      </div>
    `;
    messages.appendChild(typingEl);
    messages.scrollTop = messages.scrollHeight;
  }

  hideTyping() {
    const typing = document.getElementById('lp-typing-indicator');
    if (typing) typing.remove();
  }

  // Processar mensagem do usuário
  async handleUserMessage(message) {
    // Adicionar mensagem do usuário
    this.addMessage('user', message);
    
    // Mostrar "digitando"
    this.showTyping();

    // Processar com delay simulado
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
    
    this.hideTyping();

    // Lógica de resposta
    const response = this.processMessage(message.toLowerCase());
    
    if (response.text) {
      this.addMessage('bot', response.text, response.quickReplies);
    }

    // Se houver ação de conversão
    if (response.action === 'collect_lead') {
      this.sendLeadToSystem();
    } else if (response.action === 'redirect_whatsapp') {
      this.redirectToWhatsApp();
    }
  }

  // Processar mensagem e gerar resposta
  processMessage(input) {
    const { step, language, userData } = this.state;
    const t = (key, vars) => this.t(key, vars);

    // Detectar idioma da mensagem
    if (input.includes('olá') || input.includes('português') || input.includes('brasil')) {
      this.state.language = 'pt';
    } else if (input.includes('hello') || input.includes('english')) {
      this.state.language = 'en';
    }

    // Fluxo principal
    switch (step) {
      case 'greeting':
        if (input.includes('tratamiento') || input.includes('✨') || input.includes('tratamentos')) {
          return { text: t('treatments'), quickReplies: ["📸 Ver resultados", " Tengo una duda", "📅 Solicitar una cita", t('back')] };
        }
        if (input.includes('resultados') || input.includes('📸') || input.includes('antes y después')) {
          return { text: t('results'), quickReplies: ["✨ Tratamientos", "💬 Tengo una duda", "📅 Solicitar una cita", t('back')] };
        }
        if (input.includes('duda') || input.includes('💬') || input.includes('pergunta') || input.includes('dúvida')) {
          return { text: t('fallback'), quickReplies: ["¿Qué tratamiento realizáis?", "¿Dónde trabajáis?", "¿Es doloroso?", "¿Cuánto cuesta?"] };
        }
        if (input.includes('cita') || input.includes('📅') || input.includes('marcar') || input.includes('reservar')) {
          this.state.step = 'collect_name';
          return { text: t('scheduling') + '\n\n' + t('collectName') };
        }
        // Fallback para perguntas gerais
        return this.handleGeneralQuestion(input);

      case 'collect_name':
        userData.nombre = input.trim();
        this.state.step = 'collect_phone';
        return { text: t('collectPhone', { name: userData.nombre.split(' ')[0] }) };

      case 'collect_phone':
        userData.telefono = input.trim();
        this.state.step = 'collect_municipio';
        return { text: t('collectMunicipio') };

      case 'collect_municipio':
        userData.municipio = input.trim();
        // Verificar zona de atendimento
        const zoneOk = this.config.serviceZones.some(z => input.toLowerCase().includes(z));
        if (!zoneOk && !input.toLowerCase().includes('valencia')) {
          return { 
            text: "Gracias. Te comento que nuestro servicio a domicilio cubre Valencia y municipios cercanos (hasta 30 km). ¿Tu zona está dentro de este radio? Si no es así, podemos explorar otras opciones 😊",
            quickReplies: ["Sí, está dentro del radio", "No, estoy más lejos", "📅 Continuar con la cita"]
          };
        }
        this.state.step = 'collect_treatment';
        return { text: t('collectTreatment') };

      case 'collect_treatment':
        userData.tratamiento = input.trim();
        this.state.step = 'collect_date';
        return { text: t('collectDate') };

      case 'collect_date':
        userData.fecha_preferida = input.trim();
        this.state.step = 'collect_message';
        return { text: t('collectMessage') };

      case 'collect_message':
        userData.mensaje = input.trim();
        this.state.step = 'confirmation';
        const confirmationText = t('confirmation', {
          name: userData.nombre.split(' ')[0],
          tratamiento: userData.tratamiento,
          municipio: userData.municipio,
          telefono: userData.telefono
        });
        return { 
          text: confirmationText,
          quickReplies: [t('whatsappButton'), t('scheduleButton'), t('back')],
          action: 'collect_lead'
        };

      case 'confirmation':
        if (input.includes('whatsapp') || input.includes('💬')) {
          return { action: 'redirect_whatsapp' };
        }
        if (input.includes('web') || input.includes('📅') || input.includes('site')) {
          window.location.href = '#booking';
          return { text: t('goodbye') };
        }
        return { text: t('fallback'), quickReplies: [t('whatsappButton'), t('scheduleButton')] };
    }

    // Respostas para perguntas frequentes
    return this.handleGeneralQuestion(input);
  }

  // Responder perguntas gerais
  handleGeneralQuestion(input) {
    const t = (key) => this.i18n[this.state.language][key];

    // Perguntas sobre resultados
    if (input.includes('desaparecen') || input.includes('eliminar') || input.includes('100%') || input.includes('resultado garantizado')) {
      return { text: t('resultsDisclaimer') };
    }

    // Perguntas sobre atendimento a domicilio
    if (input.includes('domicilio') || input.includes('casa') || input.includes('donde') || input.includes('zona')) {
      return { text: t('homeService'), quickReplies: ["Valencia centro", "Paterna / Torrent", "Otra zona"] };
    }

    // Perguntas sobre preço
    if (input.includes('precio') || input.includes('coste') || input.includes('cuánto') || input.includes('valor')) {
      return { text: t('price'), quickReplies: ["📅 Solicitar valoración", "💬 Hablar por WhatsApp"] };
    }

    // Perguntas sobre dor
    if (input.includes('dolor') || input.includes('duele') || input.includes('sensación')) {
      return { text: t('pain') };
    }

    // Perguntas sobre contraindicações / saúde
    if (input.includes('embarazo') || input.includes('lactancia') || input.includes('enfermedad') || input.includes('alergia') || input.includes('medicamento')) {
      return { text: t('medicalDisclaimer'), quickReplies: ["💬 Consultar con la especialista"] };
    }

    // Solicitar falar com humano
    if (input.includes('hablar') || input.includes('persona') || input.includes('humano') || input.includes('especialista')) {
      return { text: t('transferToHuman'), quickReplies: [t('whatsappButton')] };
    }

    // Enviar foto
    if (input.includes('fotografía') || input.includes('foto') || input.includes('imagen')) {
      return { text: t('photoUpload') };
    }

    // Fallback
    return { text: t('fallback'), quickReplies: ["✨ Tratamientos", "📸 Ver resultados", "📅 Solicitar una cita"] };
  }

  // Enviar lead para o sistema
  sendLeadToSystem() {
    const leadData = { ...this.state.userData, timestamp: new Date().toISOString() };
    
    // Opção 1: Salvar no localStorage para processamento posterior
    const leads = JSON.parse(localStorage.getItem('lp_leads') || '[]');
    leads.push(leadData);
    localStorage.setItem('lp_leads', JSON.stringify(leads));
    
    console.log('Lead registrado:', leadData);
    
    // Aqui você pode adicionar integração com:
    // - Google Sheets via Apps Script
    // - API do backend
    // - Email via Formspree
    // - CRM (HubSpot, Pipedrive, etc.)
  }

  // Redirecionar para WhatsApp
  redirectToWhatsApp() {
    const { userData } = this.state;
    const message = `¡Hola Leila! 👋%0A%0ASolicité cita a través del chatbot:%0A%0A*Nombre:* ${userData.nombre}%0A*Teléfono:* ${userData.telefono}%0A*Zona:* ${userData.municipio}%0A*Tratamiento:* ${userData.tratamiento}%0A*Fecha:* ${userData.fecha_preferida}%0A*Mensaje:* ${userData.mensaje}%0A%0A¡Gracias!`;
    
    window.open(`https://wa.me/${this.config.whatsappNumber}?text=${message}`, '_blank');
  }
}

// Inicializar chatbot quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Verificar se já existe para evitar duplicação
  if (!document.getElementById('lp-chatbot-widget')) {
    window.lpChatbot = new LPChatbot({
      botAvatar: 'img/logo-chatbot.png',
      whatsappNumber: '34602624342',
      serviceZones: [
        'valencia-centro', 'valencia-norte', 'valencia-sur', 'valencia-este',
        'paterna', 'torrent', 'mislata', 'alboraya', 'burjassot',
        'sagunto', 'alaquàs', 'manises', 'xirivella'
      ]
    });
  }
});