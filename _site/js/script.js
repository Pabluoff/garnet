// Função para verificar o e-mail e realizar o login
function verificarEmail() {
  const emailInput = document.getElementById("email");
  const emailValue = emailInput.value.trim();
  const loginButton = document.getElementById("login-button");
  const loading = document.querySelector(".loading");
  const loginText = document.getElementById("login-text");
  const arrowIcon = loginButton.querySelector("i");

  const emailsPadrao = ["terminal@gmail.com", "garnet@gmail.com", "exemplo2@gmail.com"];

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
    }, 1000);
  }
}

// Função que é executada quando a página é carregada
window.onload = function () {
  const email = recuperarEmailSalvo();
  const isLoginPage = window.location.pathname === "/";

  if (!email || !isValidEmail(email)) {
    if (!isLoginPage) {
      window.location.href = "/";
    }
  } else {
    const emailInput = document.getElementById("email");
    emailInput.value = email;

    // Trecho específico a ser executado apenas uma vez
    const loginButton = document.getElementById("login-button");
    const loading = document.querySelector(".loading");
    const loginText = document.getElementById("login-text");
    const arrowIcon = loginButton.querySelector("i");

    loginText.style.visibility = "visible";
    arrowIcon.style.visibility = "visible";
    loading.style.display = "none";
    loginButton.classList.remove("loading-active");
  }
};

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
  return localStorage.getItem("email");
}

window.onload = function () {
  const email = recuperarEmailSalvo();
  const isLoginPage = window.location.pathname === "/";

  if (!email || !isValidEmail(email)) {
    if (!isLoginPage) {
      window.location.href = "/";
    }
  } else {
    const emailInput = document.getElementById("email");
    emailInput.value = email;
  }
};

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
      }, 3000);
    }
  }

  displayCode(0);
}
