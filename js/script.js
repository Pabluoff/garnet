// Obter informações do provedor de Internet
fetch("https://ipapi.co/json/")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("providerInfo").innerText =
      "" + data.org;
    document.getElementById("ipInfo").innerText = "" + data.ip;
  })
  .catch((error) => {
    console.error("Erro ao obter informações do provedor de Internet:", error);
  });

// Obter informações de geolocalização para a cidade
const request = new XMLHttpRequest();
request.open("GET", "https://wtfismyip.com/json", true);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    const data = JSON.parse(request.responseText);
    const location = data.YourFuckingLocation.replace(/\,.+/g, "$'");
    document.getElementById("cityInfo").innerText = "" + location;
  } else {
    document.getElementById("cityInfo").innerText =
      "Cidade Desconhecida";
  }
};

request.onerror = function () {
  document.getElementById("cityInfo").innerText = "Cidade: Erro na requisição";
};

request.send();

// Função para verificar o e-mail e realizar o login
function verificarEmail() {
  const emailInput = document.getElementById("email");
  const emailValue = emailInput.value.trim();
  const loginButton = document.getElementById("login-button");
  const loading = document.querySelector(".loading");
  const loginText = document.getElementById("login-text");
  const arrowIcon = loginButton.querySelector("i");

  const emailsPadrao = [
    "terminal@gmail.com",
    "garnetvip@gmail.com",
    "pabluo23cm@gmail.com",
  ];

  if (emailValue === "") {
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

    setTimeout(function () {
      exibirNotificacaoSucesso("Seu login foi realizado com sucesso!");
      setTimeout(function () {
        window.location.href = "/inicio";
      }, 1000);

      loginText.style.visibility = "visible";
      arrowIcon.style.visibility = "visible";
      loading.style.display = "none";
      loginButton.classList.remove("loading-active");
    }, 1000);
  }
}

// Função para verificar se o e-mail é válido
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

+function fecharNotificacaoSucesso() {
  const notificationSuccess = document.getElementById("notification-success");
  notificationSuccess.classList.remove("slide-in");
  notificationSuccess.classList.add("slide-out");
};

function recuperarEmailSalvo() {
  const email = localStorage.getItem("email");
  if (email) {
    const emailInput = document.getElementById("email");
    emailInput.value = email;
  }
}

window.onload = function () {
  recuperarEmailSalvo();
};

function mostrarUserDropdown() {
  const userDropdown = document.getElementById("user-dropdown-content");
  userDropdown.style.display = "block";

  document.addEventListener("click", fecharUserDropdownFora);
}

function ocultarUserDropdown() {
  const userDropdown = document.getElementById("user-dropdown-content");
  userDropdown.style.display = "none";

  document.removeEventListener("click", fecharUserDropdownFora);
}

function fecharUserDropdownFora(event) {
  const userDropdown = document.getElementById("user-dropdown-content");
  const userAvatar = document.getElementById("user-avatar");

  if (!userDropdown.contains(event.target) && event.target !== userAvatar) {
    ocultarUserDropdown();
  }
}

function carregarInformacoesUsuario() {
  const userEmail = localStorage.getItem("email");
  const userAvatar = document.getElementById("user-avatar");
  const userDropdown = document.getElementById("user-dropdown-content");
  const userLogout = document.getElementById("logout");
  const userEmailElement = document.getElementById("user-email");

  if (userEmail) {
    userEmailElement.textContent = userEmail;
    userDropdown.style.display = "none";
    userAvatar.addEventListener("click", mostrarUserDropdown);
  } else {
    userAvatar.style.display = "none";
    userDropdown.style.display = "none";
    userLogout.style.display = "none";

    if (!userEmail) {
      window.location.href = "/";
    }
  }
}

function fazerLogout() {
  localStorage.removeItem("email");
  window.location.href = "/";
}

carregarInformacoesUsuario();
document.getElementById("logout").addEventListener("click", fazerLogout);

const notificationsIcon = document.getElementById("notifications-icon");
const notificationDropdown = document.querySelector(".notification-dropdown");

function mostrarNotificationDropdown(event) {
  event.stopPropagation();
  notificationDropdown.style.display = "block";
  document.removeEventListener("click", ocultarNotificationDropdownFora);
  document.addEventListener("click", ocultarNotificationDropdownFora);
}

function ocultarNotificationDropdown() {
  notificationDropdown.style.display = "none";
  document.removeEventListener("click", ocultarNotificationDropdownFora);
}

function ocultarNotificationDropdownFora(event) {
  if (
    !notificationDropdown.contains(event.target) &&
    event.target !== notificationsIcon
  ) {
    ocultarNotificationDropdown();
  }
}

notificationsIcon.addEventListener("click", mostrarNotificationDropdown);

ocultarNotificationDropdown();

const clearNotificationLink = document.getElementById("clear-notification");

const notificationBadge = document.getElementById("notification-badge");

const notificationArea = document.querySelector(".notification-item p");

function limparNotificacoes() {
  notificationArea.innerHTML =
    '<p style="text-align: center; color: #949494;">Sem notificações</p>';

  notificationBadge.textContent = "0";

  const notificationLogo = document.querySelector(".notification-logo");

  if (notificationLogo) {
    notificationLogo.remove();
  }

  ocultarNotificationDropdown();
}

clearNotificationLink.addEventListener("click", limparNotificacoes);

const closeDropdownIcon = document.getElementById("close-dropdown");

function ocultarDropdownAoClicar(event) {
  event.stopPropagation();
  ocultarNotificationDropdown();
}

closeDropdownIcon.addEventListener("click", ocultarDropdownAoClicar);

document.addEventListener("DOMContentLoaded", function () {
  displayInitialMessage();
});

function displayInitialMessage() {
  var outputDiv = document.getElementById("output");
  var initialMessage = document.createElement("div");
  initialMessage.textContent =
    "$ Bem-vindo ao Garnet. Clique em 'Executar' para iniciar.";
  initialMessage.style.paddingBottom = "15px";
  outputDiv.appendChild(initialMessage);
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

document.getElementById("submitBtn").addEventListener("click", function () {
  document.getElementById("submitBtn").disabled = true;
  executeCommands();
});

function executeCommands() {
  var outputDiv = document.getElementById("output");

  var codes = [
    'console.log("Iniciando conexão com o servidor...")',
    "var connection = new Connection();",
    "connection.establish();",
    'console.log("Conexão estabelecida com sucesso.")',
    'console.log("Analisando dados do servidor...")',
    "var data = connection.getData();",
    'console.log("Dados recebidos:", data)',
    'console.log("Executando script de segurança...")',
    "securityScript.execute();",
    'console.log("Script de segurança concluído.")',
    'console.log("Iniciando script de red-head...")',
    "attackScript.execute();",
    'console.log("red-head bem-sucedido!")',
    'console.log("Finalizando conexão...")',
    "connection.close();",
    'console.log("Conexão encerrada.")',
    'console.log("Aguarde enquanto redirecionamos para o Free Fire...")',
    'console.log("Executando...")',
    'console.log("Injetado com sucesso!")',
  ];

  function displayCode(index) {
    if (index < codes.length) {
      var code = codes[index];
      var newLine = document.createElement("div");
      newLine.textContent = "$ " + code;
      newLine.style.color = "#0F0";
      outputDiv.appendChild(newLine);

      outputDiv.scrollTop = outputDiv.scrollHeight;

      setTimeout(function () {
        displayCode(index + 1);
      }, Math.random() * 1000 + 500);
    } else {
      var confirmationMessage = document.createElement("div");
      confirmationMessage.textContent = "Abrindo o Free Fire...";
      outputDiv.appendChild(confirmationMessage);
      outputDiv.scrollTop = outputDiv.scrollHeight;
      setTimeout(function () {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          window.location.href = "freefire://"; // abrir o Free Fire no iOS
        } else {
          // Verifica se é um dispositivo Android
          var isAndroid = userAgent.toLowerCase().indexOf("android") > -1;
          if (isAndroid) {
            window.location.href =
              "intent://com.dts.freefireth#Intent;scheme=package;end"; //  abrir o Free Fire no Android
          } else {
            var outputDiv = document.getElementById("output");
            var manualOpenMessage = document.createElement("div");
            manualOpenMessage.textContent =
              "Caso Free Fire não seja aberto automaticamente. Por favor, abra o aplicativo manualmente.";
            outputDiv.appendChild(manualOpenMessage);
            manualOpenMessage.style.color = "#0F0";
          }
        }
        document.getElementById("submitBtn").disabled = false;
      }, 1000);
    }
  }

  displayCode(0);
}

function navigateTo(page) {
  // Redirecionar para a página correspondente
  switch (page) {
    case "HOME":
      window.location.href = "/inicio";
      break;
    case "FPS":
      window.location.href = "/FPS";
      break;
    case "RECOIL":
      window.location.href = "/NoRecoil";
      break;
    case "MEMORY":
      window.location.href = "memory.html";
      break;

    default:
      break;
  }
}

function connecting() {
  var button = document.querySelector('.startButton');
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

  // Desativa temporariamente o clique no botão
  button.disabled = true;

  // Simula um tempo de otimização
  setTimeout(function() {
    // Termina a animação e exibe mensagem de conclusão
    button.innerHTML = '<i class="fa-solid fa-check"></i>';
    button.disabled = false; // Reativa o clique no botão
    button.style.backgroundColor = '#16ed68';
  }, 5000); // Tempo de simulação de otimização (5 segundos)
}
