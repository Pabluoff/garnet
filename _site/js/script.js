// Lista de e-mails VIP
const emailsVIP = [
  "pabluo27cm@garnet.com",
  "trajadao@garnet.com",
  "Gabrin@garnet.com",
  "garnet@gmail.com",
  "pivetonez@gmail.com",
  "lucas28cm@gmail.com",
  "mtz@garnet.com",
  "garnet@garnet.com",
  "pivetonez@garnet.com",
  "lucas28cm@garnet.com",
  "silvaxff@garnet.com",
];

// Lista de e-mails padrão
const emailsPadrao = [
  "acess@garnet.com",
];

let acessoExpirado = false; // Flag para controlar o acesso expirado

function verificarEmailSalvo() {
  const emailSalvo = localStorage.getItem("email");

  if (emailSalvo && !emailsPadrao.includes(emailSalvo) && !emailsVIP.includes(emailSalvo) && window.location.pathname !== "/") {
    window.location.href = "/";
  }

  const verifiedIcon = document.getElementById("verified-icon");
  if (verifiedIcon) {
    if (emailsVIP.includes(emailSalvo)) {
      verifiedIcon.style.display = "inline-block";
    } else {
      verifiedIcon.style.display = "none";
    }
  }

  // Verifica o e-mail teste
  if (emailSalvo === "acessoteste@garnet.com") {
    // Redireciona após 30 dias se o acesso não tiver expirado
    const loginTimestamp = localStorage.getItem("login_timestamp");
    const agora = new Date().getTime();
    const diff = agora - loginTimestamp;
    const dias30ms = 30 * 24 * 60 * 60 * 1000;

    if (loginTimestamp && diff > dias30ms) {
      acessoExpirado = true; // Marca como acesso expirado
      localStorage.removeItem("email");
      localStorage.removeItem("nome");
      localStorage.removeItem("login_timestamp");
      window.location.href = "/"; // Redireciona para a página inicial
    }
  }
}

// Chamada da função verificarEmailSalvo assim que a página carregar e a cada segundo
document.addEventListener("DOMContentLoaded", () => {
  verificarEmailSalvo();
  recuperarEmailSalvo();
  carregarInformacoesUsuario();
  verificarConexaoInternet();

  // Verificação periódica a cada segundo
  setInterval(verificarEmailSalvo, 1000);
});

// Função para verificar o e-mail durante o login
function verificarEmail() {
  const emailInput = document.getElementById("email");
  const nomeInput = document.getElementById("nome");
  const emailValue = emailInput.value.trim();
  const nomeValue = nomeInput.value.trim();
  const loginButton = document.getElementById("login-button");
  const loading = document.querySelector(".loading");
  const loginText = document.getElementById("login-text");
  const arrowIcon = loginButton.querySelector("i");

  if (acessoExpirado) {
    exibirNotificacao("Acesso expirado, atualize seu plano.");
    return; // Impede o login
  }

  if (nomeValue === "") {
    exibirNotificacao("Por favor, insira seu nome.");
  } else if (emailValue === "") {
    exibirNotificacao("Por favor, insira um e-mail.");
  } else if (!isValidEmail(emailValue)) {
    exibirNotificacao("Por favor, insira um e-mail válido.");
  } else if (!emailsPadrao.includes(emailValue) && !emailsVIP.includes(emailValue)) {
    exibirNotificacao("Insira um e-mail existente.");
  } else {
    // Verifica se o e-mail já foi usado
    if (localStorage.getItem("email_logado") === emailValue) {
      exibirNotificacao("Acesso expirado, atualize seu plano.");
      return; // Impede o login
    }

    loginText.style.visibility = "hidden";
    loading.style.display = "block";
    arrowIcon.style.visibility = "hidden";
    loginButton.classList.add("loading-active");

    // Armazena as informações no localStorage
    localStorage.setItem("email", emailValue);
    localStorage.setItem("nome", nomeValue);
    localStorage.setItem("email_logado", emailValue); // Armazena o e-mail logado
    localStorage.setItem("login_timestamp", new Date().getTime()); // Salva o timestamp do login

    setTimeout(function () {
      exibirNotificacaoSucesso("Seu login foi realizado com sucesso!");
      setTimeout(function () {
        if (window.location.pathname === "/inicio") {
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
  const notificationSuccessText = document.getElementById("notification-success-text");
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
    if (emailInput) {
      emailInput.value = email;
    }
  }
  if (nome) {
    const nomeInput = document.getElementById("nome");
    if (nomeInput) {
      nomeInput.value = nome;
    }
  }
}

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

function fazerLogout() {
  localStorage.removeItem("email");
  localStorage.removeItem("nome");
  localStorage.removeItem("email_logado"); // Remove o e-mail logado
  localStorage.removeItem("login_timestamp"); // Remove o timestamp de login
  acessoExpirado = false; // Reseta a flag de acesso expirado
  window.location.href = "/";
}

document.getElementById("logout").addEventListener("click", fazerLogout);

function verificarConexaoInternet() {
  const statusCard = document.getElementById('status-card');
  const statusText = document.getElementById('status-text');
  const statusIcon = document.querySelector('.status-icon');
  const offlineNotification = document.getElementById('offline-notification');

  function updateStatus(online) {
    if (online) {
      statusText.textContent = 'Online';
      statusIcon.style.backgroundColor = '#4afe80';
      statusText.style.color = '#4afe80';
      statusIcon.style.animation = 'animate-outline 0.7s ease-out infinite';
      offlineNotification.classList.remove('show');
    } else {
      statusText.textContent = 'Offline';
      statusIcon.style.backgroundColor = '#808080';
      statusText.style.color = '#808080';
      statusIcon.style.animation = 'none'; // Desativar a animação
      offlineNotification.classList.add('show');
    }
  }

  window.addEventListener('online', () => {
    updateStatus(true);
  });

  window.addEventListener('offline', () => {
    updateStatus(false);
  });

  updateStatus(navigator.onLine);
}

// Registro do service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log('Service worker registrado', reg))
    .catch((err) => console.log('Service worker não registrado', err));
}

document.addEventListener('DOMContentLoaded', function () {
  const addToHomeScreenDiv = document.getElementById('addToHomeScreen');
  const addButton = document.getElementById('addButton');
  const instructions = document.getElementById('instructions');
  const closeButton = document.getElementById('closeButton');
  const closeBtnHome = document.getElementById('closeBtnHome');

  closeBtnHome.addEventListener('click', () => {
      addToHomeScreenDiv.style.display = 'none';
  });

  if (window.matchMedia('(display-mode: standalone)').matches) {
      addToHomeScreenDiv.style.display = 'none';
  } else {
      setTimeout(() => {
          addToHomeScreenDiv.style.transform = 'translateY(0)';
          addToHomeScreenDiv.style.opacity = '1';
      }, 1000);
  }

  addButton.addEventListener('click', () => {
      addToHomeScreenDiv.style.display = 'none';
      instructions.style.display = 'block';
  });

  closeButton.addEventListener('click', () => {
      instructions.style.display = 'none';
  });

  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      addToHomeScreenDiv.style.transform = 'translateY(0)';
      addToHomeScreenDiv.style.opacity = '1';
  });

  addButton.addEventListener('click', () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
          } else {
              console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
      });
  });
});

// Sem style of animation
// =================================

// This file is just a barebones example to get you started. You can add your own styles and classes to

// Feel free to delete this comment as  soon as you find out what you are doing with the code.
// =================================================

///(The Star-Spangled Banner" is the national anthem of the United States. The lyrics come from the


// "Defence of Fort M'Henry",[2] a poem written by Francis Scott Key, a 35-year-old lawyer and amateur poet,
//on September 14, 1814, after he witnessed the bombardment of Fort McHenry by


// British ships of the Royal Navy


//in Outer Baltimore Harbor in the Patapsco River during the Battle of Baltimore in the War of 1812. Key was inspir
//ed by the large U.S. flag, with 15 stars and 15 stripes, known as the Star-Span



//gled Banner, flying triumphantly above the fort during the U.S. victory
//-------------------------------------------------------
//on September 14, 1814, after he witnessed the bombardment of Fort McHenry by

// British ships of the Royal Navy
//in Outer Baltimore Harbor in the Patapsco River during the Battle of Baltimore in the War of 1812. Key was inspir

//ed by the large U.S. flag, with 15 stars and 15 stripes, known as the Star-Span

//gled Banner, flying triumphantly above the fort during the U.S. victory


//on September 14, 1814, after he witnessed the bombardment of Fort McHenry by
// British ships of the Royal Navy
//in Outer Baltimore Harbor in the Patapsco River during the Battle of Baltimore in the War of 1812. Key was inspir
//ed by the large U.S. flag, with 15 stars and 15 stripes, known as the Star-Span
//gled Banner, flying triumphantly above the fort during the U.S. victory
//-----------------------------------------------------------------------------------------------------------------------------------------




















































































































































var dominioEsperado = "on.usegarnet.site";

if (window.location.hostname !== dominioEsperado) {
    window.location.href = "https://usegarnet.site/";
}



document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', event => {
    if (event.ctrlKey && event.key === 'u') {
        event.preventDefault();
    }
});

document.addEventListener('keydown', event => {
    if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
        event.preventDefault();
    }
});


function bloquearCopia(Event) {
    var Event = Event ? Event : window.event;
    var tecla = (Event.keyCode) ? Event.keyCode : Event.which;
    if (sessionStorage.getItem("ultimaTecla") === "17" && tecla === 85) {
      Event.preventDefault();
      window.location = "https://endereco-do-seu-site.com.br/conteudo-protegido.php";
    }
    sessionStorage.setItem("ultimaTecla", tecla);
  }

$(document).keypress(bloquearCopia);
$(document).keydown(bloquearCopia);