// Verificar se o navegador suporta Service Workers e Notificações
if ('serviceWorker' in navigator && 'Notification' in window) {
    // Registrar o Service Worker
    navigator.serviceWorker.register('/sw.js')
        .then(function (registration) {
            console.log('Service Worker registrado com sucesso:', registration);

            // Solicitar permissão para notificações
            return Notification.requestPermission();
        })
        .then(function (permission) {
            if (permission === 'granted') {
                console.log('Permissão para notificações concedida');
                
                // Mostrar uma notificação
                navigator.serviceWorker.ready.then(function (registration) {
                    registration.showNotification('Título da Notificação', {
                        body: 'Corpo da Notificação',
                        icon: '/icone.png',
                        tag: 'tag-notificacao'
                    });
                });
            } else {
                console.log('Permissão para notificações negada');
            }
        })
        .catch(function (error) {
            console.log('Falha ao registrar o Service Worker ou solicitar permissão:', error);
        });
}

// service-worker.js
self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    // Lógica para tratar o clique na notificação
});
