function togglePictureOptions() {
    const savedProfilePicture = localStorage.getItem('profilePicture');
    const pictureOptions = document.getElementById('picture-options');
    if (savedProfilePicture) {
        pictureOptions.classList.toggle('show');
    } else {
        openFileInput();
    }
}

document.addEventListener('click', function (event) {
    const pictureButton = document.getElementById('change-picture-btn');
    const pictureOptions = document.getElementById('picture-options');
    if (event.target !== pictureButton && !pictureButton.contains(event.target)) {
        pictureOptions.classList.remove('show');
    }
});

function removeProfilePicture() {
    const profilePicture = document.getElementById('profile-picture');
    profilePicture.src = "/img/user.webp"; // Define a imagem padrão
    localStorage.removeItem('profilePicture'); // Remove a imagem do armazenamento local
    const pictureOptions = document.getElementById('picture-options');
    pictureOptions.classList.remove('show'); // Esconde as opções de imagem
}

function openFileInput() {
    document.getElementById('file-input').click();
}

// Função para atualizar a foto de perfil quando um novo arquivo for selecionado
function updateProfilePicture(input) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const profilePicture = document.getElementById('profile-picture');
        profilePicture.src = e.target.result;

        // Salvar a imagem no armazenamento local
        localStorage.setItem('profilePicture', e.target.result);
    }

    reader.readAsDataURL(file);
}

// Função para carregar a imagem de perfil salva no armazenamento local ao carregar a página
window.onload = function () {
    const savedProfilePicture = localStorage.getItem('profilePicture');
    if (savedProfilePicture) {
        const profilePicture = document.getElementById('profile-picture');
        profilePicture.src = savedProfilePicture;
    }
}

function toggleUserOptions() {
    const userOptions = document.getElementById('user-options');
    userOptions.classList.toggle('show-user');
}

// Fechar o menu de opções do usuário quando o usuário clicar fora dele
document.addEventListener('click', function (event) {
    const userIcon = document.querySelector('.user-icon');
    const userOptions = document.getElementById('user-options');
    if (event.target !== userIcon && !userOptions.contains(event.target)) {
        userOptions.classList.remove('show-user');
    }
});

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

verificarConexaoInternet();

function openHighlightModal(highlight) {
    var modal = document.getElementById('highlight-modal');
    var modalContent = document.getElementById('highlight-content');

    // Preencher o conteúdo do modal com base no destaque selecionado
    if (highlight === 'função1') {
        modalContent.innerHTML = "<img src='/img/o.jpeg' alt='função1'>";
    } else if (highlight === 'função2') {
        modalContent.innerHTML = "<img src='função2.jpg' alt='função2'>";
    } else if (highlight === 'função3') {
        modalContent.innerHTML = "<img src='função3.jpg' alt='função3'>";
    }
    
    modal.style.display = 'block';
}

function closeHighlightModal() {
    var modal = document.getElementById('highlight-modal');
    modal.style.display = 'none';
}
