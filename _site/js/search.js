document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchIcon = document.querySelector('.search-icon');
    const historyList = document.getElementById('historyList');
    const searchMessage = document.querySelector('.search-message');

    // Função para exibir a mensagem
    function showMessage() {
        searchMessage.style.display = 'block';
        historyList.style.display = 'none'; // Torna o historyList invisível
        setTimeout(function () {
            searchMessage.style.display = 'none';
            historyList.style.display = 'block'; // Torna o historyList visível novamente
        }, 3000); // Oculta a mensagem após 3 segundos
    }

    // Função para ocultar a mensagem
    function hideMessage() {
        searchMessage.style.display = 'none';
        historyList.style.display = 'block'; // Torna o historyList visível novamente
    }

    // Função para redirecionar a pesquisa
    function searchRedirect(searchQuery) {
        searchQuery = searchQuery.toLowerCase().trim();

        if (searchQuery === '') return; // Não adicionar histórico em branco

        let redirectFlag = false; // Variável para indicar se a pesquisa correspondeu a algum critério

        if (searchQuery.includes('como dar capa') || searchQuery.includes('como ajustar mira') ||
            searchQuery.includes('ajustar mira') || searchQuery.includes('headshot') ||
            searchQuery.includes('ajuste de mira') || searchQuery.includes('no recoil') ||
            searchQuery.includes('sensibilidade')) {
            window.location.href = '/subpagina1';
            redirectFlag = true;
        } else if (searchQuery.includes('lag') || searchQuery.includes('diminuir lag') ||
            searchQuery.includes('como diminuir o lag do celular') || searchQuery.includes('aumentar FPS') ||
            searchQuery.includes('melhorar internet') || searchQuery.includes('FPS') ||
            searchQuery.includes('como remover o travamento') || searchQuery.includes('como remover o lag')) {
            window.location.href = '/subpagina2';
            redirectFlag = true;
        }

        if (!redirectFlag) {
            showMessage(); // Exibir mensagem se não houver redirecionamento
        } else {
            hideMessage(); // Ocultar mensagem se houver redirecionamento
        }

        // Adicionar o termo de pesquisa ao histórico e ao localStorage
        addToHistory(searchQuery);
        saveToLocalStorage(searchQuery);

        // Limpar o campo de pesquisa após a pesquisa
        searchInput.value = '';
    }

    // Função para adicionar um termo de pesquisa ao histórico
    function addToHistory(searchQuery) {
        if (historyList.querySelector(`li span:first-of-type[title="${searchQuery}"]`)) return; // Evita adicionar itens duplicados
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <ion-icon name="time" class="time-icon"></ion-icon>
            <span title="${searchQuery}">${searchQuery}</span>
            <ion-icon name="close-outline" class="close-icon"></ion-icon>
        `;
        historyList.appendChild(listItem);

        // Adicionar evento de clique para remover o item do histórico
        const closeIcon = listItem.querySelector('.close-icon');
        closeIcon.addEventListener('click', function (event) {
            event.stopPropagation(); // Impede a propagação do evento de clique para o elemento pai
            const itemText = this.previousElementSibling.textContent;
            removeFromLocalStorage(itemText);
            this.parentNode.remove();
        });

        // Adicionar evento de clique para redirecionar ao clicar no termo de pesquisa
        listItem.addEventListener('click', function () {
            const searchQuery = this.querySelector('span').textContent;
            searchInput.value = searchQuery;
            searchRedirect(searchQuery);
        });
    }

    // Função para salvar o termo de pesquisa no localStorage
    function saveToLocalStorage(searchQuery) {
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        if (!searchHistory.includes(searchQuery)) {
            searchHistory.push(searchQuery);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
    }

    // Função para remover um termo de pesquisa do localStorage
    function removeFromLocalStorage(searchQuery) {
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        searchHistory = searchHistory.filter(item => item !== searchQuery);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }

    // Função para carregar o histórico de pesquisa do localStorage
    function loadFromLocalStorage() {
        const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        searchHistory.forEach(item => addToHistory(item));
    }

    // Carregar o histórico de pesquisa ao carregar a página
    loadFromLocalStorage();

    searchButton.addEventListener('click', function () {
        searchRedirect(searchInput.value);
    });

    searchIcon.addEventListener('click', function () {
        searchRedirect(searchInput.value);
    });

    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            searchRedirect(searchInput.value);
        }
    });
});
