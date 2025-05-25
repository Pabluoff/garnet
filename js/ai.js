const sendSound = new Audio("/img/mensagem enviada.mp3");
sendSound.volume = 1.0;

const receiveSound = new Audio("/img/mensagem recebida.mp3");
receiveSound.volume = 0.5;

function playSendSound() {
  try {
    sendSound.currentTime = 0;
    sendSound.play().catch((error) => {
      console.error("Erro ao reproduzir som de envio:", error);
    });
  } catch (error) {
    console.error("Erro no som de envio:", error);
  }
}

function playReceiveSound() {
  try {
    receiveSound.currentTime = 0;
    receiveSound.play().catch((error) => {
      console.error("Erro ao reproduzir som de recebimento:", error);
    });
  } catch (error) {
    console.error("Erro no som de recebimento:", error);
  }
}

function getRandomSensitivity() {
  return Math.floor(Math.random() * (200 - 130 + 1)) + 130;
}

function generateRandomSensitivityConfig() {
  return {
    geral: getRandomSensitivity(),
    mira2x: getRandomSensitivity(),
    mira4x: getRandomSensitivity(),
  };
}

const knowledgeBase = {
  greetings: [
    "oi",
    "olá",
    "ola",
    "iae",
    "eai",
    "e ai",
    "oii",
    "salve",
    "opa",
    "ei",
    "hello",
    "hi",
    "hey",
  ],
  goodbye: [
    "tchau",
    "até mais",
    "adeus",
    "flw",
    "vlw",
    "bye",
    "até logo",
    "fui",
    "vou vazar",
  ],
  help: [
    "ajuda",
    "socorro",
    "suporte",
    "help",
    "como funciona",
    "o que você faz",
    "preciso de ajuda",
  ],
  stickers: [
    "/img/sticker-bandeirão.jpg",
    "/img/sticker-auau.jpg",
    "/img/sticker-cat-serio.jpg",
    "/img/sticker-dog-terno.jpg",
    "/img/sticker-dog-silencio.jpg",
  ],
  sensitivity: {
    torneios: {
      getResponse: () => {
        const config = generateRandomSensitivityConfig();
        return `Para torneios recomendo: <br><br> 💚 Geral: ${config.geral} <br>💚 Mira 2X: ${config.mira2x} <br>💚 Mira 4X: ${config.mira4x}`;
      },
      followUp:
        "Essa configuração é ideal para jogos competitivos onde precisão é crucial.",
    },
    "sala personalizada": {
      getResponse: () => {
        const config = generateRandomSensitivityConfig();
        return `Para sala personalizada sugiro: <br><br> 💚 Geral: ${config.geral} <br>💚 Mira 2X: ${config.mira2x} <br>💚 Mira 4X: ${config.mira4x}`;
      },
      followUp: "Perfeito para duelos onde reação rápida é essencial.",
    },
    rankeada: {
      getResponse: () => {
        const config = generateRandomSensitivityConfig();
        return `Na rankeada use: <br><br> 💚 Geral: ${config.geral} <br>💚 Mira 2X: ${config.mira2x} <br>💚 Mira 4X: ${config.mira4x}`;
      },
      followUp: "Balança entre agressividade e controle para partidas longas.",
    },
    "battle royale": {
      getResponse: () => {
        const config = generateRandomSensitivityConfig();
        return `Para Battle Royale: <br><br> 💚 Geral: ${config.geral} <br>💚 Mira 2X: ${config.mira2x} <br>💚 Mira 4X: ${config.mira4x}`;
      },
      followUp: "Ótimo para diferentes distâncias de combate.",
    },
    treino: {
      getResponse: () => {
        const config = generateRandomSensitivityConfig();
        return `Para treino: <br><br> 💚 Geral: ${config.geral} <br>💚 Mira 2X: ${config.mira2x} <br>💚 Mira 4X: ${config.mira4x}`;
      },
      followUp: "Ajuda a melhorar seu reflexo e controle de recuo.",
    },
    casual: {
      getResponse: () => {
        const config = generateRandomSensitivityConfig();
        return `Para jogos casuais: <br><br> 💚 Geral: ${config.geral} <br>💚 Mira 2X: ${config.mira2x} <br>💚 Mira 4X: ${config.mira4x}`;
      },
      followUp: "Bom para diversão sem compromisso com performance máxima.",
    },
  },
  weapons: {
    ak47: {
      hasScope: false,
      getResponse: () => {
        const { geral } = generateRandomSensitivityConfig();
        return `🔫 AK47 — Controle de recuo intenso<br><br>💚 Geral: ${geral}`;
      },
    },
    m4a1: {
      hasScope: false,
      getResponse: () => {
        const { geral } = generateRandomSensitivityConfig();
        return `🔫 M4A1 — Precisão em média distância<br><br>💚 Geral: ${geral}`;
      },
    },
    awm: {
      hasScope: true,
      getResponse: () => {
        const { geral } = generateRandomSensitivityConfig();
        return `🔫 AWM — Sniper profissional<br><br>💚 Geral: ${geral}<br>💚 Mira AWM: 166`;
      },
    },
    mp40: {
      hasScope: false,
      getResponse: () => {
        const { geral } = generateRandomSensitivityConfig();
        return `🔫 MP40 — Dominância em close combat<br><br>💚 Geral: ${geral}`;
      },
    },
    "scar-l": {
      hasScope: false,
      getResponse: () => {
        const { geral } = generateRandomSensitivityConfig();
        return `🔫 SCAR-L — Performance versátil<br><br>💚 Geral: ${geral}`;
      },
    },
    groza: {
      hasScope: false,
      getResponse: () => {
        const { geral } = generateRandomSensitivityConfig();
        return `🔫 Groza — Controle de recuo avançado<br><br>💚 Geral: ${geral}`;
      },
    },
    desert: {
      hasScope: false,
      getResponse: () => {
        const { geral } = generateRandomSensitivityConfig();
        return `🔫 Desert Eagle — Precisão letal<br><br>💚 Geral: ${geral}`;
      },
    },
    m1014: {
      hasScope: false,
      getResponse: () => {
        const { geral } = generateRandomSensitivityConfig();
        return `🔫 M1014 — Spread controlado<br><br>💚 Geral: ${geral}`;
      },
    },
    m1887: {
      hasScope: false,
      getResponse: () => {
        const { geral } = generateRandomSensitivityConfig();
        return `🔫 M1887 — Duplo cano preciso<br><br>💚 Geral: ${geral}`;
      },
    },
    svd: {
      hasScope: true,
      scopes: ["4×"],
      getResponse: () => {
        const { geral, mira4x } = generateRandomSensitivityConfig();
        return `🔫 SVD — Semi-auto estável<br><br>💚 Geral: ${geral}<br>💚 Mira 4X: ${mira4x}`;
      },
    },
    ump: {
      hasScope: true,
      scopes: ["2×"],
      getResponse: () => {
        const { geral, mira2x } = generateRandomSensitivityConfig();
        return `🔫 UMP — Controle em médio alcance<br><br>💚 Geral: ${geral}<br>💚 Mira 2X: ${mira2x}`;
      },
    },
    sks: {
      hasScope: true,
      scopes: ["4×"],
      getResponse: () => {
        const { geral, mira4x } = generateRandomSensitivityConfig();
        return `🔫 SKS — Tiro por tiro preciso<br><br>💚 Geral: ${geral}<br>💚 Mira 4X: ${mira4x}`;
      },
    },
    mc10: {
      hasScope: false,
      getResponse: () => {
        const { geral } = generateRandomSensitivityConfig();
        return `🔫 MC10 — Mobilidade agressiva<br><br>💚 Geral: ${geral}`;
      },
    },
  },
  generalTips: [
    "📌 Ajuste sua sensibilidade gradualmente, não mude tudo de uma vez.",
    "📌 Treine pelo menos 30 minutos com novas configurações.",
    "📌 Sensibilidade muito alta pode prejudicar sua precisão.",
    "📌 Use a mesma sensibilidade por 3 dias antes de ajustar.",
    "📌 Anote seus ajustes para comparar performance.",
    "📌 Mantenha a mesma sensibilidade por vários dias para se acostumar.",
  ],
  defaultResponses: [
    "🤔 Hmm, não entendi bem. Pode tentar explicar de outra forma?",
    "😕 Ih, fiquei na dúvida aqui. Me dá mais detalhes?",
    "🙃 Errou a explicação? Reformula aí que eu tento de novo!",
    "Interessante! Sobre qual aspecto da sensibilidade você quer saber?",
    "Boa pergunta! Sobre qual modo ou arma você quer info?.",
  ],
};

let conversationState = {
  waitingForPollAnswer: false,
  currentContext: null,
  audioPlaying: false,
  currentAudio: null,
  currentUtterance: null,
  pollSent: false,
  mentionSent: false,
  audioInteracted: false,
  lastAudioEl: null,
};

function addUserMessage(message) {
  const chatBody = document.querySelector(".chat-body");
  const userMessageContainer = document.createElement("div");
  userMessageContainer.classList.add("user-message-container");

  const userAvatar = document.createElement("img");
  const storedProfile = localStorage.getItem("profilePicture");
  userAvatar.src = storedProfile ? storedProfile : "/img/user.webp";
  userAvatar.alt = "User Avatar";
  userAvatar.classList.add("user-avatar");

  const userMessageBubble = document.createElement("div");
  userMessageBubble.classList.add("user-message-bubble");
  userMessageBubble.textContent = message;

  userMessageContainer.appendChild(userMessageBubble);
  userMessageContainer.appendChild(userAvatar);

  chatBody.appendChild(userMessageContainer);
  chatBody.scrollTop = chatBody.scrollHeight;

  playSendSound();
}

function addBotMessage(message) {
  const chatBody = document.querySelector(".chat-body");
  const botMessageContainer = document.createElement("div");
  botMessageContainer.classList.add("bot-message-container");

  const botAvatar = document.createElement("img");
  botAvatar.src = "/img/apple-touch-icon.png";
  botAvatar.alt = "Bot Avatar";
  botAvatar.classList.add("bot-avatar");

  const botMessageBubble = document.createElement("div");
  botMessageBubble.classList.add("bot-message-bubble");
  botMessageBubble.innerHTML = message;

  botMessageContainer.appendChild(botAvatar);
  botMessageContainer.appendChild(botMessageBubble);
  chatBody.appendChild(botMessageContainer);
  chatBody.scrollTop = chatBody.scrollHeight;

  playReceiveSound();
}

function showTypingIndicator() {
  const chatBody = document.querySelector(".chat-body");
  const typingIndicator = document.createElement("div");
  typingIndicator.classList.add("bot-message-container", "typing-indicator");

  const botAvatar = document.createElement("img");
  botAvatar.src = "/img/apple-touch-icon.png";
  botAvatar.alt = "Bot Avatar";
  botAvatar.classList.add("bot-avatar");

  const typingBubble = document.createElement("div");
  typingBubble.classList.add("bot-message-bubble");

  const typingDots = document.createElement("div");
  typingDots.classList.add("typing-dots");
  typingDots.innerHTML = "<span></span><span></span><span></span>";

  typingBubble.appendChild(typingDots);
  typingIndicator.appendChild(botAvatar);
  typingIndicator.appendChild(typingBubble);
  chatBody.appendChild(typingIndicator);
  chatBody.scrollTop = chatBody.scrollHeight;

  return typingIndicator;
}

function getBotResponse(userMessage) {
  const lowerCaseMessage = userMessage.toLowerCase();
  const userName = localStorage.getItem("nome") || "Jogador";
  const response = { message: "", sticker: null };
  const suggestions = document.querySelectorAll(".suggestion-bubble");
  for (const suggestion of suggestions) {
    if (lowerCaseMessage.includes(suggestion.textContent.toLowerCase())) {
      return handleSuggestion(suggestion.textContent);
    }
  }

  if (knowledgeBase.greetings.some((g) => lowerCaseMessage.includes(g))) {
    const greetings = [
      `👋 Olá, ${userName}! Como posso te ajudar hoje? Digite "Ajuda" para ver o que eu posso fazer.`,
      `👋 E aí, ${userName}! Pronto para ajustar sua sensibilidade? Digite "Ajuda" para conhecer minhas funções.`,
      `👋 Olá! Vamos melhorar seu desempenho, ${userName}? Escreva "Ajuda" e eu mostro minhas opções.`,
      `👋 ${userName}! Preparado para otimizar suas configurações? Digite "Ajuda" para saber mais.`,
      `👋 E aí, campeão! O que vamos ajustar hoje, ${userName}? Digite "Ajuda" para ver minhas skills.`,
    ];

    response.message = greetings[Math.floor(Math.random() * greetings.length)];
    response.sticker =
      knowledgeBase.stickers[
        Math.floor(Math.random() * knowledgeBase.stickers.length)
      ];
    return response;
  }

  if (knowledgeBase.goodbye.some((g) => lowerCaseMessage.includes(g))) {
    const goodbyes = [
      "Tô vazando também. Treina aí!",
      "Foi um prazer! Até a próxima!",
      "Até mais!",
    ];
    response.message = goodbyes[Math.floor(Math.random() * goodbyes.length)];
    return response;
  }

  if (knowledgeBase.help.some((h) => lowerCaseMessage.includes(h))) {
    const sensitivityList = Object.keys(knowledgeBase.sensitivity)
      .map((opt) => `• 🎯 ${opt.charAt(0).toUpperCase() + opt.slice(1)}`)
      .join("<br>");

    response.message = `${userName}! Posso te ajudar com:<br><br>
      ⚙️ <strong>Ajuste de Sensibilidade</strong>:<br>
      - Torneios<br>
      - Sala personalizada<br>
      - Rankeada<br>
      - Battle Royale<br>
      - Treino<br>
      - Casual<br><br>
      🔫 <strong>Ajuste de Arma</strong>:<br>
      - Exemplo: <em>Como ajustar a M1014?</em><br><br>
      Vamos começar?`;
    return response;
  }

  for (const [key, data] of Object.entries(knowledgeBase.sensitivity)) {
    if (lowerCaseMessage.includes(key)) {
      conversationState.currentContext = key;
      response.message = `${data.getResponse()}<br><br>${data.followUp}`;
      return response;
    }
  }

  for (const [weapon, data] of Object.entries(knowledgeBase.weapons)) {
    if (lowerCaseMessage.includes(weapon)) {
      response.message = `${data.getResponse()}<br><br>${
        knowledgeBase.generalTips[
          Math.floor(Math.random() * knowledgeBase.generalTips.length)
        ]
      }`;
      return response;
    }
  }

  if (
    lowerCaseMessage.includes("dica") ||
    lowerCaseMessage.includes("conselho") ||
    lowerCaseMessage.includes("melhorar")
  ) {
    response.message =
      knowledgeBase.generalTips[
        Math.floor(Math.random() * knowledgeBase.generalTips.length)
      ];
    return response;
  }

  if (conversationState.waitingForPollAnswer) {
    response.message = "Escolhe uma opção pra gente continuar!";
    return response;
  }

  const defaultResponse =
    knowledgeBase.defaultResponses[
      Math.floor(Math.random() * knowledgeBase.defaultResponses.length)
    ];

  response.message = `${defaultResponse}<br><br>
    👉 Você pode me perguntar: <br><br>
    🔹 Sensibilidade para torneios<br>
    🔹 Ajustes por arma (ex: Como ajustar a M1014?)<br>
    🔹 Dicas gerais`;

  return response;
}

function handleSuggestion(suggestion) {
  const response = { message: "", sticker: null };

  if (suggestion.includes("torneios")) {
    response.message =
      knowledgeBase.sensitivity.torneios.getResponse() +
      "<br><br>" +
      knowledgeBase.sensitivity.torneios.followUp;
    conversationState.currentContext = "torneios";
  } else if (suggestion.includes("sala personalizada")) {
    response.message =
      knowledgeBase.sensitivity["sala personalizada"].getResponse() +
      "<br><br>" +
      knowledgeBase.sensitivity["sala personalizada"].followUp;
    conversationState.currentContext = "sala personalizada";
  } else if (suggestion.includes("rankeada")) {
    response.message =
      knowledgeBase.sensitivity.rankeada.getResponse() +
      "<br><br>" +
      knowledgeBase.sensitivity.rankeada.followUp;
    conversationState.currentContext = "rankeada";
  } else if (suggestion.includes("AK47")) {
    response.message =
      knowledgeBase.weapons.ak47.getResponse() +
      "<br><br>" +
      knowledgeBase.generalTips[
        Math.floor(Math.random() * knowledgeBase.generalTips.length)
      ];
    conversationState.currentContext = "ak47";
  } else if (suggestion.includes("dicas") || suggestion.includes("melhorar")) {
    response.message =
      knowledgeBase.generalTips[
        Math.floor(Math.random() * knowledgeBase.generalTips.length)
      ];
    conversationState.currentContext = "dicas";
  } else {
    response.message = "Estou analisando sua solicitação...";
  }

  response.message = `Você escolheu: ${suggestion}.<br><br>${response.message}<br><br>Vamos otimizar ainda mais sua experiência!`;
  return response;
}

function sendPoll() {
  const typingIndicator = showTypingIndicator();
  setTimeout(() => {
    typingIndicator.remove();
    const chatBody = document.querySelector(".chat-body");
    const pollContainer = document.createElement("div");
    pollContainer.classList.add("bot-message-container");

    pollContainer.innerHTML = `
    <img class="bot-avatar" src="/img/apple-touch-icon.png" alt="Bot">
    <div class="bot-message-bubble">
      <div class="poll-title">Qual é o seu estilo de jogo?</div>
      <div class="poll-instruction">Selecione uma opção para continuar</div>
      <div class="poll-options">
        ${["Rush", "Moderado", "Longa Distância"]
          .map(
            (opt) => `
          <div class="poll-option" data-answer="${opt}">
            <div class="option-circle"><ion-icon name="checkmark"></ion-icon></div>
            <div class="option-body">
              <div class="option-label">${opt}</div>
              <div class="progress-poll-bar"><div class="progress-poll-fill"></div></div>
            </div>
            <div class="option-info">
              <img src="${
                localStorage.getItem("profilePicture") || "/img/user.webp"
              }">
              <span class="vote-count">0</span>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
    `;
    chatBody.appendChild(pollContainer);
    chatBody.scrollTop = chatBody.scrollHeight;
    receiveSound.play();

    conversationState.waitingForPollAnswer = true;
    // adicionar listeners
    pollContainer.querySelectorAll(".poll-option").forEach((option) => {
      option.addEventListener("click", handlePollAnswer);
    });
  }, 1500);
}

function handlePollAnswer(event) {
  const optEl = event.currentTarget;
  const selected = optEl.dataset.answer;

  optEl.classList.add("option-selected");
  const countEl = optEl.querySelector(".vote-count");
  let count = 1;
  countEl.textContent = count;
  optEl.querySelector(".progress-poll-fill").style.width = "100%";

  document.querySelectorAll(".poll-option").forEach((el) => {
    el.classList.add("disabled");
    el.style.pointerEvents = "none";
  });
  optEl.classList.remove("disabled");

  conversationState.waitingForPollAnswer = false;
  createPollMention(selected);
  startAISequence(selected);
}

function startAISequence(style) {
  const steps = [
    `Analisando parâmetros do perfil (${style})...`,
    `Iniciando módulo AI-Xhead...`,
    "Conectando ao banco de dados...",
    "Compilando servidor com IA...",
    `Executando rotina de deep-learning para reco-recoil...`,
    "Sensibilidade otimizada com sucesso!",
  ];

  let delay = 1500;

  steps.forEach((step, index) => {
    setTimeout(() => {
      const typingIndicator = showTypingIndicator();

      setTimeout(() => {
        typingIndicator.remove();
        addBotMessage(step);

        if (index === steps.length - 1) {
          setTimeout(() => {
            setTimeout(() => {
              window.location.href = "freefire://";

              setTimeout(() => {
                addBotMessage(
                  "Se você não for redirecionado automaticamente, por favor, abra o Free Fire manualmente para ativar a inteligência artificial."
                );

                conversationState.currentContext = null;
                conversationState.waitingForPollAnswer = false;
                conversationState.currentUtterance = null;
              }, 3000);
            }, 1000);
          }, 2000);
        }
      }, 1000);
    }, delay * (index + 1));
  });
}

function generateAudioMessage() {
  conversationState.pollSent = false;
  const userName = localStorage.getItem("nome") || "Jogador";
  const audioMessages = [
    `${userName}, estamos gerando sua sensibilidade com base em inteligência artificial. Quanto mais você jogar, melhor a sensibilidade fica.`,
    `${userName}, sua sensibilidade está sendo ajustada com inteligência artificial. Jogue mais para melhorar ainda mais!`,
    `${userName}, estamos analisando seu estilo de jogo para otimizar a sensibilidade. Quanto mais você joga, mais preciso fica!`,
    `Configuração de inteligência artificial ativada para ${userName}. A sensibilidade será ajustada dinamicamente durante suas partidas.`,
    `Processo de otimização iniciado para ${userName}. A inteligência artificial vai aprendendo com seu estilo de jogo.`,
  ];

  const audioMessage =
    audioMessages[Math.floor(Math.random() * audioMessages.length)];

  const utterance = new SpeechSynthesisUtterance(audioMessage);
  utterance.lang = "pt-BR";
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  conversationState.currentUtterance = utterance;

  const chatBody = document.querySelector(".chat-body");
  const audioMessageContainer = document.createElement("div");
  audioMessageContainer.classList.add("bot-message-container");

  const botAvatar = document.createElement("img");
  botAvatar.src = "/img/apple-touch-icon.png";
  botAvatar.alt = "Bot Avatar";
  botAvatar.classList.add("bot-avatar");

  const audioMessageBubble = document.createElement("div");
  audioMessageBubble.classList.add("bot-message-bubble");

  audioMessageBubble.innerHTML = `
                <div class="audio-message-container">
                    <div class="audio-play-icon" id="play-icon">
                        <ion-icon name="play-circle-outline"></ion-icon>
                    </div>
                    <div class="audio-wave-container">
                        <div class="audio-wave"></div>
                        <div class="audio-wave"></div>
                        <div class="audio-wave"></div>
                        <div class="audio-wave"></div>
                        <div class="audio-wave"></div>
                    </div>
                    <div class="audio-duration">00:00</div>
                </div>
            `;

  audioMessageContainer.appendChild(botAvatar);
  audioMessageContainer.appendChild(audioMessageBubble);
  chatBody.appendChild(audioMessageContainer);
  chatBody.scrollTop = chatBody.scrollHeight;
  receiveSound.play();

  const playIcon = audioMessageBubble.querySelector("#play-icon ion-icon");
  const durationElement = audioMessageBubble.querySelector(".audio-duration");
  const waves = audioMessageBubble.querySelectorAll(".audio-wave");
  waves.forEach((w) => {
    w.style.animationPlayState = "paused";
  });

  let isPlaying = false;
  let timerInterval, startTime;

  function formatTime(ms) {
    const totalSec = Math.floor(ms / 1000);
    const min = String(Math.floor(totalSec / 60)).padStart(2, "0");
    const sec = String(totalSec % 60).padStart(2, "0");
    return `${min}:${sec}`;
  }

  function pauseAudio() {
    speechSynthesis.cancel();
    clearInterval(timerInterval);
    playIcon.setAttribute("name", "play-circle-outline");
    isPlaying = false;
    waves.forEach((w) => (w.style.animationPlayState = "paused"));
  }

  function playAudio() {
    conversationState.audioInteraction = true;
    clearTimeout(conversationState.audioReminderTimeout);
    startTime = Date.now();
    speechSynthesis.speak(utterance);
    playIcon.setAttribute("name", "pause-circle-outline");
    isPlaying = true;

    timerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      durationElement.textContent = formatTime(elapsed);
    }, 200);

    waves.forEach((w) => {
      w.style.animationPlayState = "running";
    });
  }

  playIcon.addEventListener("click", () => {
    if (isPlaying) pauseAudio();
    else playAudio();
  });

  utterance.onstart = () => {
    durationElement.textContent = "00:00";
  };

  utterance.onend = () => {
    clearInterval(timerInterval);
    const totalDuration = Date.now() - startTime;
    durationElement.textContent = formatTime(totalDuration);
    playIcon.setAttribute("name", "play-circle-outline");
    isPlaying = false;
    waves.forEach((w) => (w.style.animationPlayState = "paused"));

    if (!conversationState.pollSent) {
      conversationState.pollSent = true;
      setTimeout(() => {
        sendPoll();
      }, 1000);
    }
  };
  window.addEventListener("beforeunload", () => {
    clearTimeout(conversationState.audioReminderTimeout);
  });
}

function addBotSticker(stickerUrl) {
  const chatBody = document.querySelector(".chat-body");
  const container = document.createElement("div");
  container.classList.add("bot-message-container", "sticker");

  container.innerHTML = `
    <img class="bot-avatar" src="/img/apple-touch-icon.png" alt="Bot Avatar">
    <div class="message-sticker">
      <img src="${stickerUrl}" alt="Sticker">
      <div class="sticker-effect"></div>
    </div>
  `;

  chatBody.appendChild(container);
  chatBody.scrollTop = chatBody.scrollHeight;
  playReceiveSound();
}

function sendMessage() {
  const messageInput = document.querySelector(".message-input");
  const userMessage = messageInput.value.trim();

  if (userMessage !== "") {
    addUserMessage(userMessage);
    messageInput.value = "";

    const typingIndicator = showTypingIndicator();

    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      typingIndicator.remove();

      addBotMessage(botResponse.message);

      if (botResponse.sticker) {
        setTimeout(() => {
          addBotSticker(botResponse.sticker);
        }, 800);
      }

      if (
        conversationState.currentContext &&
        !conversationState.waitingForPollAnswer &&
        !conversationState.currentUtterance
      ) {
        setTimeout(() => {
          generateAudioMessage();
        }, 2000);
      }
    }, 1500);
  }
}

document
  .querySelector(".send-btn-ig-chat")
  .addEventListener("click", sendMessage);

document
  .querySelector(".message-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

document.querySelectorAll(".suggestion-bubble").forEach((suggestion) => {
  suggestion.addEventListener("click", function (event) {
    const suggestionText = event.target.textContent;
    addUserMessage(suggestionText);

    const typingIndicator = showTypingIndicator();

    setTimeout(() => {
      typingIndicator.remove();
      const botResponse = handleSuggestion(suggestionText);
      addBotMessage(botResponse.message);

      if (botResponse.sticker) {
        // Adicionado
        setTimeout(() => {
          addBotSticker(botResponse.sticker);
        }, 300);
      }

      setTimeout(() => {
        generateAudioMessage();
      }, 2000);
    }, 1500);
  });
});

function createMentionMessage() {
  const chatBody = document.querySelector(".chat-body");
  const container = document.createElement("div");
  container.classList.add("bot-message-container");

  let duration = "00:00";
  const lastAudio = conversationState.lastAudioEl;
  if (lastAudio) {
    const timerEl = lastAudio.querySelector(".audio-duration");
    if (timerEl) duration = timerEl.textContent;
  }

  container.innerHTML = `
    <img class="bot-avatar" src="/img/apple-touch-icon.png" alt="Bot Avatar">
    <div class="bot-message-bubble mention-message">
      <div class="mention-header">
        <div class="mention-title">Garnet</div>
        <div class="mention-desc">
          <ion-icon name="mic-outline"></ion-icon>
          <span class="mention-timer">${duration}</span>
        </div>
      </div>
      <div class="mention-text">Ouça a mensagem de voz para continuar 🔊</div>
    </div>
  `;

  chatBody.appendChild(container);
  chatBody.scrollTop = chatBody.scrollHeight;
  playReceiveSound();
}

(function patchGenerateAudio() {
  const original = window.generateAudioMessage;
  window.generateAudioMessage = function () {
    original();

    conversationState.audioInteracted = false;
    conversationState.mentionSent = false;

    setTimeout(() => {
      const last = [
        ...document.querySelectorAll(".audio-message-container"),
      ].pop();
      if (!last) return;

      last.addEventListener(
        "click",
        () => {
          if (conversationState.audioInteracted) return;
          conversationState.audioInteracted = true;
          clearTimeout(conversationState._mentionTimer);
        },
        { once: true }
      );

      // se não interagir em 15s, enviar menção
      conversationState._mentionTimer = setTimeout(() => {
        if (
          !conversationState.audioInteracted &&
          !conversationState.mentionSent
        ) {
          createMentionMessage();
          conversationState.mentionSent = true;
        }
      }, 15_000);
    }, 100);
  };
})();

(function patchSendAndSuggestions() {
  const shouldBlock = () =>
    conversationState.currentUtterance &&
    !conversationState.audioInteracted &&
    !conversationState.mentionSent &&
    !conversationState.waitingForPollAnswer;

  const origSend = window.sendMessage;

  window.sendMessage = function () {
    if (shouldBlock()) {
      createMentionMessage();
      conversationState.mentionSent = true;
      document.querySelector(".message-input").value = "";
      return;
    }
    origSend();
  };

  const input = document.querySelector(".message-input");
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && shouldBlock()) {
      e.preventDefault();
      createMentionMessage();
      conversationState.mentionSent = true;
      input.value = "";
    }
  });

  // CLIQUE NO BOTÃO DE ENVIAR
  const sendBtn = document.querySelector(".send-btn-ig-chat");
  sendBtn.addEventListener(
    "click",
    (e) => {
      if (shouldBlock()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        createMentionMessage();
        conversationState.mentionSent = true;
        input.value = "";
      } else {
        origSend();
      }
    },
    true
  );

  document.querySelectorAll(".suggestion-bubble").forEach((el) => {
    el.addEventListener(
      "click",
      (e) => {
        if (shouldBlock()) {
          e.preventDefault();
          e.stopPropagation();
          createMentionMessage();
          conversationState.mentionSent = true;
        }
      },
      true
    );
  });
})();

function createPollMention(selectedOption) {
  const chatBody = document.querySelector(".chat-body");
  const container = document.createElement("div");
  container.classList.add("user-message-container");

  container.innerHTML = `
    <div class="mention-message-user">
      <div class="mention-header-user">
        <div class="mention-title-user">Garnet</div>
        <div class="mention-desc-user">
          <ion-icon name="chatbubbles-outline"></ion-icon>
          <span>Qual é o seu estilo de jogo?</span>
        </div>
      </div>
      <div class="mention-text-user">${selectedOption}</div>
    </div>
    <img class="user-avatar" src="${
      localStorage.getItem("profilePicture") || "/img/user.webp"
    }" alt="Você">
  `;

  chatBody.appendChild(container);
  chatBody.scrollTop = chatBody.scrollHeight;
  playSendSound();
}

