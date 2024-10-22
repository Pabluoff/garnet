// Função para adicionar mensagem do usuário
function addUserMessage(message) {
    const chatBody = document.querySelector('.chat-body');
    const userMessageContainer = document.createElement('div');
    userMessageContainer.classList.add('user-message-container');

    const userMessageBubble = document.createElement('div');
    userMessageBubble.classList.add('user-message-bubble');
    userMessageBubble.textContent = message;

    userMessageContainer.appendChild(userMessageBubble);
    chatBody.appendChild(userMessageContainer);
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll para o fim
}

// Função para adicionar mensagem do bot
function addBotMessage(message) {
    const chatBody = document.querySelector('.chat-body');
    const botMessageContainer = document.createElement('div');
    botMessageContainer.classList.add('bot-message-container');

    const botAvatar = document.createElement('img');
    botAvatar.src = '/img/apple-touch-icon.png'; // Caminho do avatar do bot
    botAvatar.alt = 'Bot Avatar';
    botAvatar.classList.add('bot-avatar');

    const botMessageBubble = document.createElement('div');
    botMessageBubble.classList.add('bot-message-bubble');
    botMessageBubble.textContent = message;

    botMessageContainer.appendChild(botAvatar);
    botMessageContainer.appendChild(botMessageBubble);
    chatBody.appendChild(botMessageContainer);
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll para o fim
}

// Função para mostrar "digitando..." com estilo melhorado
function showTypingIndicator() {
    const chatBody = document.querySelector('.chat-body');
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('bot-message-container', 'typing-indicator');
    
    const botAvatar = document.createElement('img');
    botAvatar.src = '/img/apple-touch-icon.png'; // Caminho do avatar do bot
    botAvatar.alt = 'Bot Avatar';
    botAvatar.classList.add('bot-avatar');
    
    const typingBubble = document.createElement('div');
    typingBubble.classList.add('bot-message-bubble');

    // Criação dos três pontos animados
    const typingDots = document.createElement('div');
    typingDots.classList.add('typing-dots');
    typingDots.innerHTML = '<span></span><span></span><span></span>';

    typingBubble.appendChild(typingDots);
    typingIndicator.appendChild(botAvatar);
    typingIndicator.appendChild(typingBubble);
    chatBody.appendChild(typingIndicator);
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll para o fim

    return typingIndicator; // Retorna o elemento para ser removido depois
}

// Função para determinar resposta do bot com base no contexto
function getBotResponse(userMessage) {
    const greetings = ["oi", "olá", "ola", "iae", "eai", "oii", "salve", "opa"];
    const goodbye = ["tchau", "até mais", "adeus"];
    const help = ["ajuda", "socorro", "suporte"];

    const lowerCaseMessage = userMessage.toLowerCase();

    // Verificar se a mensagem é uma saudação
    if (greetings.some(greeting => lowerCaseMessage.includes(greeting))) {
        return "Olá! Como posso ajudar você hoje?";
    }
    // Verificar se a mensagem é uma despedida
    if (goodbye.some(word => lowerCaseMessage.includes(word))) {
        return "Tchau! Volte quando precisar de mais ajuda.";
    }
    // Verificar se a mensagem é um pedido de ajuda
    if (help.some(word => lowerCaseMessage.includes(word))) {
        return "Claro! Estou aqui para ajudar. O que você precisa?";
    }

    // Resposta padrão
    const defaultResponses = [
        "Hmm, não entendi bem. Pode tentar explicar de outra forma?",
        "Não tenho certeza do que você quis dizer. Pode me dar mais detalhes?",
        "Desculpe, não consegui entender. Pode reformular, por favor?"
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Função para enviar mensagem ao clicar no botão ou pressionar Enter
function sendMessage() {
    const messageInput = document.querySelector('.message-input');
    const userMessage = messageInput.value.trim();

    if (userMessage !== "") {
        addUserMessage(userMessage);
        messageInput.value = ''; // Limpar o campo de input

        // Mostrar o indicador de "digitando..."
        const typingIndicator = showTypingIndicator();

        // Simulando a resposta do bot após um pequeno delay
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);

            // Remove o indicador de "digitando..."
            typingIndicator.remove();

            // Adiciona a mensagem do bot
            addBotMessage(botResponse);
        }, 1500); // Delay de 1.5 segundos para simular digitação
    }
}

// Funcionalidade para clicar nas sugestões
function handleSuggestionClick(event) {
    const suggestion = event.target.textContent;
    addUserMessage(suggestion);
    
    // Mostrar o indicador de "digitando..."
    const typingIndicator = showTypingIndicator();

    // Simulando resposta do bot após clicar na sugestão
    setTimeout(() => {
        typingIndicator.remove(); // Remover "digitando..."
        addBotMessage(`Você escolheu: ${suggestion}. Estou ajustando sua sensibilidade.`);
        
        // Função para gerar mensagem de áudio após 5 segundos
        setTimeout(() => {
            generateAudioMessage();
        }, 5000);
        
    }, 1500);
}

// Função para gerar e reproduzir mensagem de áudio
function generateAudioMessage() {
    const userName = localStorage.getItem('nome') || 'Jogador'; // Recupera o nome do localStorage ou usa 'Jogador'
    
    // Definindo três variações de mensagem de áudio
    const audioMessages = [
        `${userName}, estamos gerando sua sensibilidade com base em inteligência artificial. Quanto mais você jogar, melhor a sensibilidade fica.`,
        `${userName}, sua sensibilidade está sendo ajustada com inteligência artificial. Jogue mais para melhorar ainda mais!`,
        `${userName}, estamos analisando seu estilo de jogo para otimizar a sensibilidade. Quanto mais você joga, mais preciso fica!`
    ];

    // Escolhe uma mensagem aleatória
    const audioMessage = audioMessages[Math.floor(Math.random() * audioMessages.length)];

    const utterance = new SpeechSynthesisUtterance(audioMessage);
    utterance.lang = 'pt-BR';

    // Variáveis para armazenar o tempo real de fala
    let startTime, endTime, actualDuration;

    // Criar balão de mensagem de áudio ao estilo do Instagram
    const chatBody = document.querySelector('.chat-body');
    const audioMessageContainer = document.createElement('div');
    audioMessageContainer.classList.add('bot-message-container');

    const botAvatar = document.createElement('img');
    botAvatar.src = '/img/apple-touch-icon.png'; // Caminho do avatar do bot
    botAvatar.alt = 'Bot Avatar';
    botAvatar.classList.add('bot-avatar');

    const audioMessageBubble = document.createElement('div');
    audioMessageBubble.classList.add('bot-message-bubble');

    // Exibição inicial da duração (antes de iniciar)
    const durationDisplay = `00:00`;

    // Adicionar a nova estrutura de mensagem de áudio
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
            <div class="audio-duration">${durationDisplay}</div>
        </div>
    `;

    audioMessageContainer.appendChild(botAvatar);
    audioMessageContainer.appendChild(audioMessageBubble);
    chatBody.appendChild(audioMessageContainer);
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll para o fim

    // Função para reproduzir o áudio ao clicar
    const audioPlayIcon = audioMessageBubble.querySelector('.audio-play-icon');
    const playIcon = audioPlayIcon.querySelector('ion-icon');

    let durationInterval; // Variável para armazenar o intervalo
    let isPlaying = false; // Estado da reprodução
    let timeWhenPaused = 0; // Armazena o tempo quando pausado

    audioPlayIcon.addEventListener('click', () => {
        if (isPlaying) {
            speechSynthesis.cancel(); // Para a reprodução se já estiver tocando
            playIcon.setAttribute('name', 'play-circle-outline'); // Altera para o ícone de play
            clearInterval(durationInterval); // Limpa o intervalo ao pausar
            isPlaying = false; // Atualiza o estado
        } else {
            // Inicia o cronômetro quando a fala começar
            utterance.onstart = () => {
                startTime = Date.now();
                playIcon.setAttribute('name', 'pause-circle-outline'); // Altera para o ícone de pause

                // Atualiza o cronômetro enquanto a fala estiver ocorrendo
                durationInterval = setInterval(() => {
                    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
                    updateDurationDisplay(elapsedTime);
                }, 1000);
            };

            // Quando a fala terminar, calcula a duração total
            utterance.onend = () => {
                endTime = Date.now();
                actualDuration = Math.floor((endTime - startTime) / 1000); // Calcula a duração real

                playIcon.setAttribute('name', 'play-circle-outline'); // Retorna ao ícone de play após o fim
                clearInterval(durationInterval); // Limpa o intervalo ao finalizar
                updateDurationDisplay(actualDuration); // Exibe a duração final
                isPlaying = false; // Atualiza o estado
            };

            speechSynthesis.speak(utterance); // Inicia a fala
            isPlaying = true; // Atualiza o estado
        }
    });

    // Função para atualizar a exibição da duração
    function updateDurationDisplay(time) {
        const durationElement = audioMessageBubble.querySelector('.audio-duration');
        const minutes = String(Math.floor(time / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        durationElement.textContent = `${minutes}:${seconds}`;
    }
}

// Função para enviar mensagem ao clicar no botão ou pressionar Enter
function sendMessage() {
    const messageInput = document.querySelector('.message-input');
    const userMessage = messageInput.value.trim();

    if (userMessage !== "") {
        addUserMessage(userMessage);
        messageInput.value = ''; // Limpar o campo de input

        // Mostrar o indicador de "digitando..."
        const typingIndicator = showTypingIndicator();

        // Simulando a resposta do bot após um pequeno delay
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);

            // Remove o indicador de "digitando..."
            typingIndicator.remove();

            // Adiciona a mensagem do bot
            addBotMessage(botResponse);
        }, 1500); // Delay de 1.5 segundos para simular digitação
    }
}

// Evento para clicar no botão de envio
document.querySelector('.send-btn-ig-chat').addEventListener('click', sendMessage);

// Evento para enviar mensagem ao pressionar Enter
document.querySelector('.message-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Evento para clicar nas sugestões
document.querySelectorAll('.suggestion-bubble').forEach(suggestion => {
    suggestion.addEventListener('click', handleSuggestionClick);
});
