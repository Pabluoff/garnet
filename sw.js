self.addEventListener('install', function(event) {
    console.log('Service Worker instalado');
    self.skipWaiting();
});

self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : { title: 'Sem título', body: 'Sem corpo' };
    const options = {
        body: data.body,
        icon: '/img/logo.jpg', 
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});
