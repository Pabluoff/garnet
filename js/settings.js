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
    const realtimeFps = document.getElementById("realtime-fps");

    // Variável para verificar se o toggle está bloqueado
    let toggleBlocked = false;
    let connectedTime;

    // Verificar o estado do toggle no localStorage ao carregar a página
    const toggleState = localStorage.getItem("toggleState");
    const connectedSince = localStorage.getItem("connectedSince");

    if (toggleState === "true") {
        fpsToggle.checked = true;
        statusFps.textContent = "Conectado";
        connectedTime = new Date(connectedSince);
        updateConnectedTime();
    } else {
        statusFps.textContent = "Desconectado";
    }

    // Adicionar evento de mudança ao toggle
    fpsToggle.addEventListener("change", function (e) {
        if (!toggleBlocked) {
            if (e.target.checked) {
                e.target.checked = false; 
                fpsModal.style.display = "block";
            } else {
                statusFps.textContent = "Desconectado";
                localStorage.removeItem("toggleState"); // Remover o estado do toggle ao desativar
                localStorage.removeItem("connectedSince"); // Remover o tempo de conexão
                realtimeFps.textContent = ""; // Limpar o tempo conectado
            }
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
        toggleBlocked = true; // Bloquear o toggle
        fpsToggle.disabled = true; // Desabilitar o toggle enquanto estiver conectando
        fpsModal.style.animation = "fadeOut 0.1s ease-in-out forwards";
        setTimeout(function () {
            fpsModal.style.display = "none";
            fpsModal.style.animation = ""; 
            setTimeout(function () {
                fpsToggle.checked = true;
                statusFps.textContent = "Conectado";
                localStorage.setItem("toggleState", "true"); // Salvar o estado do toggle ao ativar
                connectedTime = new Date();
                localStorage.setItem("connectedSince", connectedTime); // Salvar o tempo de conexão
                toggleBlocked = false; // Desbloquear o toggle após a conexão ser estabelecida
                fpsToggle.disabled = false; // Habilitar o toggle novamente
                updateConnectedTime();
            }, 4000); // 4 segundos delay
        }, 100);
    });

    // Atualizar o tempo conectado em tempo real
    function updateConnectedTime() {
        setInterval(function () {
            if (statusFps.textContent === "Conectado") {
                const now = new Date();
                const diff = now - connectedTime;
                const seconds = Math.floor((diff / 1000) % 60);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const hours = Math.floor(diff / (1000 * 60 * 60));

                let timeString = "";
                if (hours > 0) timeString += `${hours}h `;
                if (minutes > 0) timeString += `${minutes}m `;
                timeString += `${seconds}s`;

                realtimeFps.textContent = `(${timeString})`;
            }
        }, 1000); // Atualizar a cada segundo
    }

    // Adicionar classe loading-border quando o status for "Conectando..."
    setInterval(function () {
        if (statusFps.textContent === "Conectando...") {
            statusItem.classList.add("loading-border");
        } else {
            statusItem.classList.remove("loading-border");
        }
    }, 100); // Verificar a cada 100ms o status e aplicar/remover a classe loading-border conforme necessário
});
