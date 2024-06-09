//install
self.addEventListener ('install', evt => {
    console.log ('Service Worker instalado');
});

self.addEventListener ('activate', evt => {
    console.log ('Service Worker ativado');
});

// service-worker.js

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('push', (event) => {
    const options = {
        body: 'Esta é uma notificação enviada automaticamente.',
        icon: '/img/logo.jpg', // Caminho para um ícone opcional
        badge: '/img/logo.jpg' // Caminho para um ícone opcional
    };
    event.waitUntil(
        self.registration.showNotification('Notificação Automática', options)
    );
});
