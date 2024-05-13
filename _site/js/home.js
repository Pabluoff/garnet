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


//storya
let slideModalInstance = null;

class SlideStories {
    constructor(id) {
        this.slide = document.querySelector(`[data-slide="${id}"]`);
        this.active = 0;
        this.init();
    }

    activeSlide(index) {
        this.active = index;
        this.items.forEach((item) => item.classList.remove('active'));
        this.items[index].classList.add('active');
        this.thumbItems.forEach((item) => item.classList.remove('active'));
        this.thumbItems[index].classList.add('active');
        this.autoSlide();
    }

    prev() {
        if (this.active > 0) {
            this.activeSlide(this.active - 1);
        } else {
            this.activeSlide(this.items.length - 1);
        }
    }

    next() {
        if (this.active < this.items.length - 1) {
            this.activeSlide(this.active + 1);
        } else {
            this.activeSlide(0);
        }
    }

    addNavigation() {
        const nextBtn = this.slide.querySelector('.slide-next');
        const prevBtn = this.slide.querySelector('.slide-prev');
        nextBtn.addEventListener('click', this.next.bind(this)); // Use bind para manter o contexto
        prevBtn.addEventListener('click', this.prev.bind(this)); // Use bind para manter o contexto
    }

    addThumbItems() {
        // Limpa os elementos slide-thumb antes de adicionar novos
        this.thumb.innerHTML = '';
        this.items.forEach(() => (this.thumb.innerHTML += `<span></span>`));
        this.thumbItems = Array.from(this.thumb.children);
    }

    autoSlide() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.next.bind(this), 5000); // Use bind para manter o contexto
    }

    init() {
        this.items = this.slide.querySelectorAll('.slide-items > *');
        this.thumb = this.slide.querySelector('.slide-thumb');
        this.addThumbItems();
        this.activeSlide(0);
        this.addNavigation();
    }
}

function openModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('show-modal');
    document.body.style.overflow = 'hidden';
    if (!slideModalInstance) {
        slideModalInstance = new SlideStories('slide-modal');
    } else {
        // Reinicia a passagem da imagem
        slideModalInstance.activeSlide(0);
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show-modal');
    document.body.style.overflow = '';
    clearTimeout(slideModalInstance.timeout); // Limpa o timeout do autoSlide ao fechar o modal
}

window.onclick = function (event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
};

document.querySelectorAll('.highlight-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        openModal();
        const slideStories = document.querySelector('[data-slide="slide-modal"]');
        const slideItems = slideStories.querySelectorAll('.slide-items > *');
        if (slideItems[index]) {
            slideModalInstance.activeSlide(index);
        }
    });
});

document.querySelector('.close').addEventListener('click', () => {
    closeModal();
});

// Função para abrir ou fechar o dropdown e alternar o ícone
function toggleNotificationDropdown() {
    const dropdown = document.getElementById("notification-dropdown");
    const icon = document.getElementById("notification-icon");
    const badge = document.getElementById("notification-badge");

    // Verifica se o dropdown está atualmente oculto
    const isHidden = dropdown.style.visibility === "hidden" || dropdown.style.visibility === "";

    if (isHidden) {
        badge.style.display = "none";
    }

    dropdown.style.visibility = isHidden ? "visible" : "hidden";
    dropdown.classList.toggle("show-drop");

    if (dropdown.classList.contains("show-drop")) {
        icon.setAttribute("name", "notifications");
    } else {
        icon.setAttribute("name", "notifications-outline");
    }
}

document.addEventListener("click", function (event) {
    const dropdown = document.getElementById("notification-dropdown");
    const icon = document.getElementById("notification-icon");
    const badge = document.getElementById("notification-badge");

    if (!dropdown.contains(event.target) && event.target !== icon && event.target !== badge) {
        dropdown.style.visibility = "hidden";
        dropdown.classList.remove("show-drop");
        icon.setAttribute("name", "notifications-outline");
    }
});

document.getElementById("notification-badge").addEventListener("click", function () {
    toggleNotificationDropdown();
});

document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.display = "flex";

    loadingScreen.style.display = "none";
});
