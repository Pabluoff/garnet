// Função para verificar o e-mail e realizar o login
function verificarEmail() {
  const emailInput = document.getElementById("email");
  const nomeInput = document.getElementById("nome");
  const emailValue = emailInput.value.trim();
  const nomeValue = nomeInput.value.trim();
  const loginButton = document.getElementById("login-button");
  const loading = document.querySelector(".loading");
  const loginText = document.getElementById("login-text");
  const arrowIcon = loginButton.querySelector("i");

  const emailsPadrao = [
    "terminal@gmail.com",
    "garnetvip@gmail.com",
    "pabluo23cm@gmail.com",
  ];

  if (nomeValue === "") {
    // Verificação do nome
    exibirNotificacao("Por favor, insira seu nome.");
  } else if (emailValue === "") {
    exibirNotificacao("Por favor, insira um e-mail.");
  } else if (!isValidEmail(emailValue)) {
    exibirNotificacao("Por favor, insira um e-mail válido.");
  } else if (!emailsPadrao.includes(emailValue)) {
    exibirNotificacao("Insira um e-mail existente.");
  } else {
    loginText.style.visibility = "hidden";
    loading.style.display = "block";
    arrowIcon.style.visibility = "hidden";
    loginButton.classList.add("loading-active");

    localStorage.setItem("email", emailValue);
    localStorage.setItem("nome", nomeValue);

    setTimeout(function () {
      exibirNotificacaoSucesso("Seu login foi realizado com sucesso!");
      setTimeout(function () {
        // Verifica se a página atual é "/inicio"
        if (window.location.pathname === "/inicio") {
          // Adicionando o trecho ao redirecionar para "/inicio"
          loginText.style.visibility = "visible";
          arrowIcon.style.visibility = "visible";
          loading.style.display = "none";
          loginButton.classList.remove("loading-active");
        }

        window.location.href = "/inicio";
      }, 1000);
    }, 3000);
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function exibirNotificacao(mensagem) {
  const notification = document.getElementById("notification");
  const notificationText = document.getElementById("notification-text");
  notificationText.textContent = mensagem;

  notification.classList.remove("slide-out");
  notification.classList.add("slide-in");

  setTimeout(function () {
    fecharNotificacao();
  }, 3000);
}

function fecharNotificacao() {
  const notification = document.getElementById("notification");
  notification.classList.remove("slide-in");
  notification.classList.add("slide-out");
}

function exibirNotificacaoSucesso(mensagem) {
  const notificationSuccess = document.getElementById("notification-success");
  const notificationSuccessText = document.getElementById(
    "notification-success-text"
  );
  notificationSuccessText.textContent = mensagem;

  notificationSuccess.classList.remove("slide-out");
  notificationSuccess.classList.add("slide-in");

  setTimeout(function () {
    fecharNotificacaoSucesso();
  }, 3000);
}

function fecharNotificacaoSucesso() {
  const notificationSuccess = document.getElementById("notification-success");
  notificationSuccess.classList.remove("slide-in");
  notificationSuccess.classList.add("slide-out");
}

function recuperarEmailSalvo() {
  const email = localStorage.getItem("email");
  const nome = localStorage.getItem("nome");
  if (email) {
    const emailInput = document.getElementById("email");
    emailInput.value = email;
  }
  if (nome) {
    const nomeInput = document.getElementById("nome");
    nomeInput.value = nome;
  }
}

window.onload = function () {
  recuperarEmailSalvo();
};

function carregarInformacoesUsuario() {
  const userEmail = localStorage.getItem("email");
  const userMailElement = document.getElementById("user-email");
  const userNameElement = document.getElementById("user-name");

  if (userEmail) {
    const nome = localStorage.getItem("nome");
    if (nome) {
      userNameElement.textContent = nome.toLowerCase();
    }
    const nomeUsuario = userEmail.split("@")[0];
    userMailElement.textContent = nomeUsuario;
  } else {
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
  }
}

carregarInformacoesUsuario();

function fazerLogout() {
  localStorage.removeItem("email");
  localStorage.removeItem("nome");
  window.location.href = "/";
}

document.getElementById("logout").addEventListener("click", fazerLogout);

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Armazena o evento para uso posterior
  deferredPrompt = event;

  // Mostra o botão "Add to Home Screen"
  seuBotaoAddToHomeScreen.style.display = 'block';

  // Adicione um evento de clique ao botão "Add to Home Screen"
  seuBotaoAddToHomeScreen.addEventListener('click', () => {
    // Mostra o prompt de instalação
    deferredPrompt.prompt();

    // Aguarde a escolha do usuário
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuário aceitou o prompt de instalação');
      } else {
        console.log('Usuário rejeitou o prompt de instalação');
      }
      // Limpa o prompt de instalação armazenado
      deferredPrompt = null;
    });
  });
});
