function addUserMessage(message) {
    const chatBody = document.querySelector('.chat-body');
    const userMessageContainer = document.createElement('div');
    userMessageContainer.classList.add('user-message-container');

    const userMessageBubble = document.createElement('div');
    userMessageBubble.classList.add('user-message-bubble');
    userMessageBubble.textContent = message;

    userMessageContainer.appendChild(userMessageBubble);
    chatBody.appendChild(userMessageContainer);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function addBotMessage(message) {
    const chatBody = document.querySelector('.chat-body');
    const botMessageContainer = document.createElement('div');
    botMessageContainer.classList.add('bot-message-container');

    const botAvatar = document.createElement('img');
    botAvatar.src = '/img/apple-touch-icon.png';
    botAvatar.alt = 'Bot Avatar';
    botAvatar.classList.add('bot-avatar');

    const botMessageBubble = document.createElement('div');
    botMessageBubble.classList.add('bot-message-bubble');
    botMessageBubble.textContent = message;

    botMessageContainer.appendChild(botAvatar);
    botMessageContainer.appendChild(botMessageBubble);
    chatBody.appendChild(botMessageContainer);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showTypingIndicator() {
    const chatBody = document.querySelector('.chat-body');
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('bot-message-container', 'typing-indicator');

    const botAvatar = document.createElement('img');
    botAvatar.src = '/img/apple-touch-icon.png';
    botAvatar.alt = 'Bot Avatar';
    botAvatar.classList.add('bot-avatar');

    const typingBubble = document.createElement('div');
    typingBubble.classList.add('bot-message-bubble');

    const typingDots = document.createElement('div');
    typingDots.classList.add('typing-dots');
    typingDots.innerHTML = '<span></span><span></span><span></span>';

    typingBubble.appendChild(typingDots);
    typingIndicator.appendChild(botAvatar);
    typingIndicator.appendChild(typingBubble);
    chatBody.appendChild(typingIndicator);
    chatBody.scrollTop = chatBody.scrollHeight;

    return typingIndicator;
}

function getBotResponse(userMessage) {
    const greetings = ["oi", "olá", "ola", "iae", "eai", "oii", "salve", "opa"];
    const goodbye = ["tchau", "até mais", "adeus"];
    const help = ["ajuda", "socorro", "suporte"];

    const lowerCaseMessage = userMessage.toLowerCase();

    if (greetings.some(greeting => lowerCaseMessage.includes(greeting))) {
        return "Olá! Como posso ajudar você hoje?";
    }
    if (goodbye.some(word => lowerCaseMessage.includes(word))) {
        return "Tchau! Volte quando precisar de mais ajuda.";
    }
    if (help.some(word => lowerCaseMessage.includes(word))) {
        return "Claro! Estou aqui para ajudar. O que você precisa?";
    }

    const defaultResponses = [
        "Hmm, não entendi bem. Pode tentar explicar de outra forma?",
        "Não tenho certeza do que você quis dizer. Pode me dar mais detalhes?",
        "Desculpe, não consegui entender. Pode reformular, por favor?"
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function sendMessage() {
    const messageInput = document.querySelector('.message-input');
    const userMessage = messageInput.value.trim();

    if (userMessage !== "") {
        addUserMessage(userMessage);
        messageInput.value = '';

        const typingIndicator = showTypingIndicator();

        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);

            typingIndicator.remove();

            addBotMessage(botResponse);
        }, 1500);
    }
}

function handleSuggestionClick(event) {
    const suggestion = event.target.textContent;
    addUserMessage(suggestion);

    const typingIndicator = showTypingIndicator();

    setTimeout(() => {
        typingIndicator.remove();
        addBotMessage(`Você escolheu: ${suggestion}. Estou ajustando sua sensibilidade.`);

        setTimeout(() => {
            generateAudioMessage();
        }, 5000);

    }, 1500);
}

// Função para gerar e enviar uma enquete clicável com estilo avançado
function sendPoll() {
    const typingIndicator = showTypingIndicator(); // Exibe o indicador de "digitando..."

    setTimeout(() => {
        typingIndicator.remove(); // Remove o indicador de "digitando..."

        // Adiciona a enquete no chat
        const chatBody = document.querySelector('.chat-body');
        const pollContainer = document.createElement('div');
        pollContainer.classList.add('bot-message-container');

        const botAvatar = document.createElement('img');
        botAvatar.src = '/img/apple-touch-icon.png'; // Caminho do avatar do bot
        botAvatar.alt = 'Bot Avatar';
        botAvatar.classList.add('bot-avatar');

        const pollMessage = document.createElement('div');
        pollMessage.classList.add('bot-message-bubble');
        pollMessage.innerHTML = `
            <p class="poll-title">Qual é o seu estilo de jogo?</p>
            <p class="poll-instruction">Clique em uma das opções para continuar:</p>
            <div class="poll-options">
                <div class="poll-option" data-answer="Rush">
                    <div class="option-circle"></div>
                    <span>Prefere jogar rushando?</span>
                </div>
                <div class="poll-option" data-answer="Moderado">
                    <div class="option-circle"></div>
                    <span>Prefere jogar moderado?</span>
                </div>
                <div class="poll-option" data-answer="Longa Distância">
                    <div class="option-circle"></div>
                    <span>Prefere jogar de longa distância?</span>
                </div>
            </div>
        `;

        pollContainer.appendChild(botAvatar);
        pollContainer.appendChild(pollMessage);
        chatBody.appendChild(pollContainer);
        chatBody.scrollTop = chatBody.scrollHeight; // Scroll para o fim

        // Adiciona event listeners para as opções da enquete
        const pollOptions = pollMessage.querySelectorAll('.poll-option');
        pollOptions.forEach(option => {
            option.addEventListener('click', handlePollAnswer);
        });
    }, 2000); // Delay de 2 segundos para simular a digitação
}

// Função para lidar com a resposta da enquete
function handlePollAnswer(event) {
    const selectedAnswer = event.currentTarget.getAttribute('data-answer');
    const chatBody = document.querySelector('.chat-body');

    // Mostra a resposta do usuário no chat
    const userAnswerContainer = document.createElement('div');
    userAnswerContainer.classList.add('user-message-container');

    const userAnswerMessage = document.createElement('div');
    userAnswerMessage.classList.add('user-message-bubble');
    userAnswerMessage.textContent = selectedAnswer;

    userAnswerContainer.appendChild(userAnswerMessage);
    chatBody.appendChild(userAnswerContainer);
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll para o fim

    // Desabilita todas as opções após a seleção
    const pollOptions = document.querySelectorAll('.poll-option');
    pollOptions.forEach(option => {
        option.style.pointerEvents = 'none'; // Desativa cliques
        option.classList.add('option-disabled'); // Adiciona classe de desabilitado
    });

    // Sequência de mensagens simulando a IA
    const typingIndicator = showTypingIndicator();
    setTimeout(() => {
        typingIndicator.remove();
        sendBotMessage(`Sua escolha foi: ${selectedAnswer}. Vamos ajustar sua sensibilidade de acordo.`);

        setTimeout(() => {
            const typingIndicator1 = showTypingIndicator();
            setTimeout(() => {
                typingIndicator1.remove();
                sendBotMessage("Acessando banco de dados...");

                setTimeout(() => {
                    const typingIndicator2 = showTypingIndicator();
                    setTimeout(() => {
                        typingIndicator2.remove();
                        sendBotMessage("InsightShot Injetado.");

                        setTimeout(() => {
                            const typingIndicator3 = showTypingIndicator();
                            setTimeout(() => {
                                typingIndicator3.remove();
                                sendBotMessage("Executando IA...");

                                // Redireciona para o Free Fire após a mensagem final
                                setTimeout(() => {
                                    window.location.href = "freefire://"; // Substitua pelo link correto
                                }, 2000); // Delay para simular a conclusão da IA
                            }, 2000); // Delay para simular digitação
                        }, 2000); // Delay para a mensagem "InsightShot Injetado."
                    }, 2000); // Delay para simular digitação
                }, 2000); // Delay para a mensagem "Acessando banco de dados..."
            }, 2000); // Delay após a escolha inicial
        }, 2000); // Delay para a primeira mensagem da sequência
    }, 2000); // Delay após o clique
}

// Função para exibir a mensagem do bot
function sendBotMessage(message) {
    const chatBody = document.querySelector('.chat-body');
    const botResponseContainer = document.createElement('div');
    botResponseContainer.classList.add('bot-message-container');

    const botAvatar = document.createElement('img');
    botAvatar.src = '/img/apple-touch-icon.png'; // Caminho do avatar do bot
    botAvatar.alt = 'Bot Avatar';
    botAvatar.classList.add('bot-avatar');

    const botResponseMessage = document.createElement('div');
    botResponseMessage.classList.add('bot-message-bubble');
    botResponseMessage.textContent = message;

    botResponseContainer.appendChild(botAvatar);
    botResponseContainer.appendChild(botResponseMessage);
    chatBody.appendChild(botResponseContainer);
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll para o fim
}

// Após a reprodução do áudio, chamar a função da enquete
function generateAudioMessage() {
    const userName = localStorage.getItem('nome') || 'Jogador';
    const audioMessages = [
        `${userName}, estamos gerando sua sensibilidade com base em inteligência artificial. Quanto mais você jogar, melhor a sensibilidade fica.`,
        `${userName}, sua sensibilidade está sendo ajustada com inteligência artificial. Jogue mais para melhorar ainda mais!`,
        `${userName}, estamos analisando seu estilo de jogo para otimizar a sensibilidade. Quanto mais você joga, mais preciso fica!`
    ];
    const audioMessage = audioMessages[Math.floor(Math.random() * audioMessages.length)];

    const utterance = new SpeechSynthesisUtterance(audioMessage);
    utterance.lang = 'pt-BR';

    let startTime, endTime, actualDuration;
    const chatBody = document.querySelector('.chat-body');
    const audioMessageContainer = document.createElement('div');
    audioMessageContainer.classList.add('bot-message-container');

    const botAvatar = document.createElement('img');
    botAvatar.src = '/img/apple-touch-icon.png'; // Caminho do avatar do bot
    botAvatar.alt = 'Bot Avatar';
    botAvatar.classList.add('bot-avatar');

    const audioMessageBubble = document.createElement('div');
    audioMessageBubble.classList.add('bot-message-bubble');
    const durationDisplay = `00:00`;

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
    chatBody.scrollTop = chatBody.scrollHeight;

    const audioPlayIcon = audioMessageBubble.querySelector('.audio-play-icon');
    const playIcon = audioPlayIcon.querySelector('ion-icon');

    let durationInterval;
    let isPlaying = false;

    audioPlayIcon.addEventListener('click', () => {
        if (isPlaying) {
            speechSynthesis.cancel();
            playIcon.setAttribute('name', 'play-circle-outline');
            clearInterval(durationInterval);
            isPlaying = false;
        } else {
            utterance.onstart = () => {
                startTime = Date.now();
                playIcon.setAttribute('name', 'pause-circle-outline');

                durationInterval = setInterval(() => {
                    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
                    updateDurationDisplay(elapsedTime);
                }, 1000);
            };

            utterance.onend = () => {
                endTime = Date.now();
                actualDuration = Math.floor((endTime - startTime) / 1000);
                playIcon.setAttribute('name', 'play-circle-outline');
                clearInterval(durationInterval);
                updateDurationDisplay(actualDuration);
                isPlaying = false;

                // Chamar a função para enviar a enquete após o fim do áudio
                sendPoll();
            };

            speechSynthesis.speak(utterance);
            isPlaying = true;
        }
    });

    function updateDurationDisplay(time) {
        const durationElement = audioMessageBubble.querySelector('.audio-duration');
        const minutes = String(Math.floor(time / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        durationElement.textContent = `${minutes}:${seconds}`;
    }
}

function sendMessage() {
    const messageInput = document.querySelector('.message-input');
    const userMessage = messageInput.value.trim();

    if (userMessage !== "") {
        addUserMessage(userMessage);
        messageInput.value = '';

        const typingIndicator = showTypingIndicator();

        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);

            typingIndicator.remove();

            addBotMessage(botResponse);
        }, 1500);
    }
}

document.querySelector('.send-btn-ig-chat').addEventListener('click', sendMessage);

document.querySelector('.message-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

document.querySelectorAll('.suggestion-bubble').forEach(suggestion => {
    suggestion.addEventListener('click', handleSuggestionClick);
});
