document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchIcon = document.querySelector('.search-icon');

    function searchRedirect() {
        const searchQuery = searchInput.value.toLowerCase();

        if (searchQuery.includes('como dar capa') || searchQuery.includes('como ajustar mira') ||
            searchQuery.includes('ajustar mira') || searchQuery.includes('headshot') ||
            searchQuery.includes('ajuste de mira') || searchQuery.includes('no recoil') ||
            searchQuery.includes('sensibilidade')) {
            window.location.href = '/subpagina1';
        } else if (searchQuery.includes('lag') || searchQuery.includes('diminuir lag') ||
            searchQuery.includes('como diminuir o lag do celular') || searchQuery.includes('aumentar FPS') ||
            searchQuery.includes('melhorar internet') || searchQuery.includes('FPS') ||
            searchQuery.includes('como remover o travamento') || searchQuery.includes('como remover o lag')) {
            window.location.href = '/subpagina2';
        }
    }

    searchButton.addEventListener('click', searchRedirect);
    searchIcon.addEventListener('click', searchRedirect);

    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            searchRedirect();
        }
    });
});
