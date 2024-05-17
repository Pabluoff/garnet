document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchIcon = document.querySelector('.search-icon');
    const historyList = document.getElementById('historyList');
    const searchMessage = document.querySelector('.search-message');
    const searchDestaqueItems = document.querySelectorAll('.destaque-item');

    function showMessage() {
        searchMessage.style.display = 'block';
        historyList.style.display = 'none';
        setTimeout(function () {
            searchMessage.style.display = 'none';
            historyList.style.display = 'block'; 
        }, 3000); 
    }

    function hideMessage() {
        searchMessage.style.display = 'none';
        historyList.style.display = 'block'; 
    }

    function searchRedirect(searchQuery) {
        searchQuery = searchQuery.trim().toLowerCase();

        if (searchQuery === '') return;

        let redirectFlag = false; 

        if (searchQuery.includes('insightshot v2') || searchQuery.includes('como ajustar mira') ||
            searchQuery.includes('ajustar mira') || searchQuery.includes('headshot') ||
            searchQuery.includes('ajuste de mira') || searchQuery.includes('no recoil') ||
            searchQuery.includes('sensibilidade')) {
            window.location.href = '/subpagina1';
            redirectFlag = true;
        } else if (searchQuery.includes('lag') || searchQuery.includes('diminuir lag') ||
            searchQuery.includes('como diminuir o lag do celular') || searchQuery.includes('aumentar fps') ||
            searchQuery.includes('melhorar internet') || searchQuery.includes('fps') ||
            searchQuery.includes('como remover o travamento') || searchQuery.includes('como remover o lag')) {
            window.location.href = '/subpagina2';
            redirectFlag = true;
        }

        if (!redirectFlag) {
            showMessage(); 
        } else {
            hideMessage();
        }

        addToHistory(searchQuery);
        saveToLocalStorage(searchQuery);

        searchInput.value = '';
    }

    function addToHistory(searchQuery) {
        if (historyList.querySelector(`li span:first-of-type[title="${searchQuery}"]`)) return; 
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <ion-icon name="time" class="time-icon"></ion-icon>
            <span title="${searchQuery}">${searchQuery}</span>
            <ion-icon name="close-outline" class="close-icon"></ion-icon>
        `;
        historyList.appendChild(listItem);

        const closeIcon = listItem.querySelector('.close-icon');
        closeIcon.addEventListener('click', function (event) {
            event.stopPropagation(); 
            const itemText = this.previousElementSibling.textContent;
            removeFromLocalStorage(itemText);
            this.parentNode.remove();
        });

        listItem.addEventListener('click', function () {
            const searchQuery = this.querySelector('span').textContent;
            searchInput.value = searchQuery;
            searchRedirect(searchQuery);
        });
    }

    function saveToLocalStorage(searchQuery) {
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        if (!searchHistory.includes(searchQuery)) {
            searchHistory.push(searchQuery);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
    }

    function removeFromLocalStorage(searchQuery) {
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        searchHistory = searchHistory.filter(item => item !== searchQuery);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }

    function loadFromLocalStorage() {
        const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        searchHistory.forEach(item => addToHistory(item));
    }

    loadFromLocalStorage();

    searchDestaqueItems.forEach(item => {
        item.addEventListener('click', function () {
            const searchQuery = this.textContent;
            searchInput.value = searchQuery;
            searchRedirect(searchQuery);
        });
    });

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
