document.addEventListener("DOMContentLoaded", function () {
    const userName = localStorage.getItem("nome");
    if (userName) {
        document.getElementById("user-settings").textContent = userName;

        const profileInitial = document.getElementById("profile-initial");
        profileInitial.textContent = userName.charAt(0).toUpperCase();
    }

    fetch("https://wtfismyip.com/json")
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("providerInfo").innerText = data.YourFuckingISP;
            document.getElementById("ipInfo").innerText = data.YourFuckingIPAddress;
            let location = data.YourFuckingLocation;
            document.getElementById("locationInfo").innerText = location;
        })
        .catch((error) => {
            console.error('Error fetching IP info:', error);
        });

    const fpsToggle = document.getElementById("fps-toggle");
    const fpsModal = document.getElementById("fps-confirmation-modal");
    const fpsCancelButton = document.getElementById("fps-cancel-button");
    const fpsActivateButton = document.getElementById("fps-activate-button");
    const statusFps = document.getElementById("status-fps");
    const statusItem = document.getElementById("status-item");
    const realtimeFps = document.getElementById("realtime-fps");

    let toggleBlocked = false;
    let connectStartTime = null;
    let updateTimeInterval = null;
    let disconnectTimeout = null;

    const FOUR_HOURS_IN_MS = 3 * 60 * 60 * 1000;

    function updateConnectionTime() {
        if (connectStartTime) {
            const elapsedTime = Date.now() - connectStartTime;
            const remainingTime = FOUR_HOURS_IN_MS - elapsedTime;
            if (remainingTime <= 0) {
                disconnect();
            } else {
                const hours = Math.floor(remainingTime / 3600000);
                const minutes = Math.floor((remainingTime % 3600000) / 60000);
                const seconds = Math.floor((remainingTime % 60000) / 1000);
                realtimeFps.textContent = `(${hours}h ${minutes}m ${seconds}s)`;
            }
        }
    }

    function startConnection() {
        connectStartTime = Date.now();
        localStorage.setItem("toggleState", "true");
        localStorage.setItem("connectStartTime", connectStartTime);
        updateTimeInterval = setInterval(updateConnectionTime, 1000);
        disconnectTimeout = setTimeout(disconnect, FOUR_HOURS_IN_MS);
        updateConnectionTime();
    }

    function disconnect() {
        statusFps.textContent = "Desconectado";
        realtimeFps.textContent = "";
        clearInterval(updateTimeInterval);
        clearTimeout(disconnectTimeout);
        localStorage.removeItem("toggleState");
        localStorage.removeItem("connectStartTime");
        fpsToggle.checked = false;
    }

    const toggleState = localStorage.getItem("toggleState");
    if (toggleState === "true") {
        fpsToggle.checked = true;
        statusFps.textContent = "Conectado";
        connectStartTime = parseInt(localStorage.getItem("connectStartTime"), 10) || Date.now();
        updateTimeInterval = setInterval(updateConnectionTime, 1000);
        disconnectTimeout = setTimeout(disconnect, FOUR_HOURS_IN_MS - (Date.now() - connectStartTime));
        updateConnectionTime();
    } else {
        statusFps.textContent = "Desconectado";
    }

    fpsToggle.addEventListener("change", function (e) {
        if (!toggleBlocked) {
            if (e.target.checked) {
                e.target.checked = false;
                fpsModal.style.display = "block";
            } else {
                disconnect();
            }
        } else {
            e.preventDefault();
        }
    });

    fpsCancelButton.addEventListener("click", function () {
        fpsModal.style.animation = "fadeOut 0.1s ease-in-out forwards";
        setTimeout(function () {
            fpsModal.style.display = "none";
            fpsModal.style.animation = "";
        }, 100);
    });

    fpsActivateButton.addEventListener("click", function () {
        statusFps.textContent = "Conectando...";
        toggleBlocked = true;
        fpsToggle.disabled = true;
        fpsModal.style.animation = "fadeOut 0.1s ease-in-out forwards";
        setTimeout(function () {
            fpsModal.style.display = "none";
            fpsModal.style.animation = "";
            setTimeout(function () {
                fpsToggle.checked = true;
                statusFps.textContent = "Conectado";
                startConnection();
                toggleBlocked = false;
                fpsToggle.disabled = false;
            }, 4000);
        }, 100);
    });

    setInterval(function () {
        if (statusFps.textContent === "Conectando...") {
            statusItem.classList.add("loading-border");
        } else {
            statusItem.classList.remove("loading-border");
        }
    }, 100);
});

document.addEventListener("DOMContentLoaded", function () {
    const geralItem = document.querySelector(".settings-list-geral .settings-item");
    const geralSection = document.getElementById("geral-section");
    const settingsContainer = document.querySelector(".container-config");
    const backButton = document.getElementById("back-button");

    geralItem.addEventListener("click", function () {
        settingsContainer.classList.add("slide-out");
        geralSection.classList.add("slide-in");
        geralSection.style.display = "block";
        
        // Esconde o container de configurações depois da animação
        setTimeout(function () {
            settingsContainer.style.display = "none";
            settingsContainer.classList.remove("slide-out");
        }, 300); // Tempo igual ao da animação CSS
    });

    backButton.addEventListener("click", function () {
        geralSection.classList.remove("slide-in");
        geralSection.classList.add("slide-out");

        setTimeout(function () {
            geralSection.style.display = "none";
            geralSection.classList.remove("slide-out");
            settingsContainer.style.display = "block";
        }, 300); // Tempo igual ao da animação CSS
    });
});
