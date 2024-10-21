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
    const greetings = ["oi", "olá", "ola", "iae", "eai", "oii", "salve"];
    const goodbye = ["tchau", "até mais", "adeus"];
    const help = ["ajuda", "socorro", "suporte"];

    const lowerCaseMessage = userMessage.toLowerCase();

    // Verificar se a mensagem é uma saudação
    if (greetings.includes(lowerCaseMessage)) {
        return "Olá! Como posso ajudar você hoje?";
    }
    // Verificar se a mensagem é uma despedida
    if (goodbye.includes(lowerCaseMessage)) {
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
    }, 1500);
}

// Evento para o botão de envio de mensagem
document.querySelector('.send-btn-ig-chat').addEventListener('click', sendMessage);

// Evento para pressionar Enter no campo de texto
document.querySelector('.message-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Adicionando eventos para as sugestões
document.querySelectorAll('.suggestion-bubble').forEach(suggestion => {
    suggestion.addEventListener('click', handleSuggestionClick);
});
