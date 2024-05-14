//install
self.addEventListener ('install', evt => {
    console.log ('Service Worker instalado');
});

self.addEventListener ('activate', evt => {
    console.log ('Service Worker ativado');
});

