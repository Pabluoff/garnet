// script.js

function solicitarPermissaoNotificacao() {
  if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
              registrarServiceWorker();
              enviarNotificacaoDiaria();
          }
      });
  } else {
      registrarServiceWorker();
      enviarNotificacaoDiaria();
  }
}

function registrarServiceWorker() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
          console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(function(error) {
          console.error('Falha ao registrar o Service Worker:', error);
      });
  } else {
      console.warn('Push messaging não é suportado');
  }
}

function enviarNotificacao(titulo, mensagem) {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification(titulo, {
              body: mensagem,
              icon: '/img/logo.jpg', // Caminho para o ícone da notificação, se desejado
          });
      });
  }
}

function enviarNotificacaoDiaria() {
  const tempoRestante = 5000; // 5 segundos para teste

  setTimeout(function() {
      enviarNotificacao('Lembrete Diário', 'Esta é sua notificação diária!');
      setInterval(function() {
          enviarNotificacao('Lembrete Diário', 'Esta é sua notificação diária!');
      }, 24 * 60 * 60 * 1000);
  }, tempoRestante);
}

document.addEventListener('DOMContentLoaded', solicitarPermissaoNotificacao);
