document.addEventListener("DOMContentLoaded", function () {
    // Recuperar o nome salvo no localStorage
    const userName = localStorage.getItem("nome");
    if (userName) {
        document.getElementById("user-settings").textContent = userName;

        // Definir a inicial do nome no perfil
        const profileInitial = document.getElementById("profile-initial");
        profileInitial.textContent = userName.charAt(0).toUpperCase();
    }

    // Obter informações de IP e localização
    fetch("https://wtfismyip.com/json")
        .then((response) => response.json())
        .then((data) => {
            // Obter o nome do provedor de Internet
            document.getElementById("providerInfo").innerText = data.YourFuckingISP;

            // Obter o endereço IP
            document.getElementById("ipInfo").innerText = data.YourFuckingIPAddress;

            // Obter a localização (cidade e estado)
            let location = data.YourFuckingLocation;
            document.getElementById("locationInfo").innerText = location;
        })
        .catch((error) => {
            console.error('Error fetching IP info:', error);
        });

    // FPS Toggle functionality
    const fpsToggle = document.getElementById("fps-toggle");
    const fpsModal = document.getElementById("fps-confirmation-modal");
    const fpsCancelButton = document.getElementById("fps-cancel-button");
    const fpsActivateButton = document.getElementById("fps-activate-button");
    const statusFps = document.getElementById("status-fps");
    const statusItem = document.getElementById("status-item");

    // Verificar o estado do toggle no localStorage ao carregar a página
    const toggleState = localStorage.getItem("toggleState");
    if (toggleState === "true") {
        fpsToggle.checked = true;
        statusFps.textContent = "Conectado";
    } else {
        statusFps.textContent = "Desconectado";
    }

    // Adicionar evento de mudança ao toggle
    fpsToggle.addEventListener("change", function (e) {
        if (e.target.checked) {
            e.target.checked = false; 
            fpsModal.style.display = "block";
        } else {
            statusFps.textContent = "Desconectado";
            localStorage.removeItem("toggleState"); // Remover o estado do toggle ao desativar
        }
    });

    // Adicionar evento de clique ao botão de cancelar
    fpsCancelButton.addEventListener("click", function () {
        fpsModal.style.animation = "fadeOut 0.1s ease-in-out forwards";
        setTimeout(function () {
            fpsModal.style.display = "none";
            fpsModal.style.animation = ""; 
        }, 100);
    });

    // Adicionar evento de clique ao botão de ativar
    fpsActivateButton.addEventListener("click", function () {
        statusFps.textContent = "Conectando...";
        fpsModal.style.animation = "fadeOut 0.1s ease-in-out forwards";
        setTimeout(function () {
            fpsModal.style.display = "none";
            fpsModal.style.animation = ""; 
            setTimeout(function () {
                fpsToggle.checked = true;
                statusFps.textContent = "Conectado";
                localStorage.setItem("toggleState", "true"); // Salvar o estado do toggle ao ativar
            }, 4000); // 4 segundos delay
        }, 100);
    });

    // Adicionar classe loading-border quando o status for "Conectando..."
    setInterval(function () {
        if (statusFps.textContent === "Conectando...") {
            statusItem.classList.add("loading-border");
        } else {
            statusItem.classList.remove("loading-border");
        }
    }, 100); // Verificar a cada 100ms o status e aplicar/remover a classe loading-border conforme necessário
});
