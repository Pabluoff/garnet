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
    const backButton = document.getElementById("back-button");
    const geralSection = document.getElementById("geral-section");
    const settingsListGeral = document.querySelector(".settings-list-geral");
    const aboutItem = document.getElementById("about-item");
    const aboutSection = document.getElementById("about-section");
    const backButtonAbout = document.getElementById("back-button-about");
    const speedItem = document.getElementById("speed-item");
    const speedSection = document.getElementById("speed-section");
    const backButtonSpeed = document.getElementById("back-button-speed");

    settingsListGeral.addEventListener("click", function () {
        showGeralSection();
    });

    backButton.addEventListener("click", function () {
        hideGeralSection();
    });

    aboutItem.addEventListener("click", function () {
        showAboutSection();
    });

    backButtonAbout.addEventListener("click", function () {
        hideAboutSection();
    });

    speedItem.addEventListener("click", function () {
        showSpeedSection();
    });

    backButtonSpeed.addEventListener("click", function () {
        hideSpeedSection();
    });

    function showGeralSection() {
        geralSection.classList.remove("hidden");
        geralSection.classList.add("show");
    }

    function hideGeralSection() {
        geralSection.classList.remove("show");
        geralSection.classList.add("hidden");
    }

    function showAboutSection() {
        geralSection.classList.remove("show");
        geralSection.classList.add("hidden");
        aboutSection.classList.remove("hidden");
        aboutSection.classList.add("show");
    }

    function hideAboutSection() {
        aboutSection.classList.remove("show");
        aboutSection.classList.add("hidden");
        geralSection.classList.remove("hidden");
        geralSection.classList.add("show");
    }

    function showSpeedSection() {
        geralSection.classList.remove("show");
        geralSection.classList.add("hidden");
        speedSection.classList.remove("hidden");
        speedSection.classList.add("show");
    }

    function hideSpeedSection() {
        speedSection.classList.remove("show");
        speedSection.classList.add("hidden");
        geralSection.classList.remove("hidden");
        geralSection.classList.add("show");
    }

    const email = localStorage.getItem("email");
    const aboutEmail = document.querySelector("#id-account");
    aboutEmail.textContent = email || "N/A";
});

const rangeField = document.getElementById('touch-sensitivity');

function fillRange() {
    const percent = (rangeField.value - rangeField.min) / (rangeField.max - rangeField.min) * 100;
    rangeField.style.background = `linear-gradient(to right, #007aff 0%, #007aff ${percent}%, #3a3a3c ${percent}%, #3a3a3c 100%)`;
}

rangeField.addEventListener('input', fillRange);

fillRange();

document.addEventListener('DOMContentLoaded', function () {
    const selectionMode = document.querySelectorAll('.selection-mode .option');
    const selectionDescription = document.getElementById('selection-description');
    const descriptions = {
        Singular: "Modo Singular: Oferece seleção rápida tanto na vertical quanto na horizontal, ideal para capturar alvos com maior precisão no jogo.",
        Apurado: "Modo Apurado: Permite ajustar o alvo em todas as direções, realizando um segundo escaneamento para refinamento dentro da área inicial de seleção.",
        Detalhado: "Modo Detalhado: Realiza um escaneamento em baixa velocidade para uma precisão extrema na definição do alvo, garantindo uma sensibilidade refinada."
    };

    const cursorSpeedInput = document.getElementById('cursor-speed');
    const decreaseSpeedButton = document.getElementById('decrease-speed');
    const increaseSpeedButton = document.getElementById('increase-speed');

    let intervalId = null;
    let timeoutId = null;
    let singleUpdateTimeoutId = null;

    function updateSpeedValue(increment) {
        let currentValue = parseInt(cursorSpeedInput.value, 10);
        let newValue = currentValue + increment;
        if (newValue >= 1 && newValue <= 120) {
            cursorSpeedInput.value = newValue;
        }
    }

    function startUpdatingSpeed(increment) {
        timeoutId = setTimeout(() => {
            intervalId = setInterval(() => {
                updateSpeedValue(increment);
            }, 100);
        }, 600);

        singleUpdateTimeoutId = setTimeout(() => {
            updateSpeedValue(increment);
        }, 0);
    }

    function stopUpdatingSpeed() {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        clearTimeout(singleUpdateTimeoutId);
    }

    decreaseSpeedButton.addEventListener('mousedown', function () {
        startUpdatingSpeed(-1);
    });

    increaseSpeedButton.addEventListener('mousedown', function () {
        startUpdatingSpeed(1);
    });

    document.addEventListener('mouseup', function () {
        stopUpdatingSpeed();
    });

    decreaseSpeedButton.addEventListener('touchstart', function (event) {
        event.preventDefault();
        startUpdatingSpeed(-1);
    });

    increaseSpeedButton.addEventListener('touchstart', function (event) {
        event.preventDefault();
        startUpdatingSpeed(1);
    });

    document.addEventListener('touchend', function () {
        stopUpdatingSpeed();
    });

    selectionMode.forEach(option => {
        option.addEventListener('click', function () {
            selectionMode.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            const mode = this.getAttribute('data-value');
            selectionDescription.innerHTML = descriptions[mode];
        });
    });

    // Selecionar a primeira opção por padrão
    if (selectionMode.length > 0) {
        selectionMode[0].click();
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const selectionModeOptions = document.querySelectorAll('.speed-section .selection-mode .option');
    let timeoutId;

    selectionModeOptions.forEach(option => {
        option.addEventListener('mouseenter', function () {
            clearTimeout(timeoutId); 
            timeoutId = setTimeout(() => {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            }, 1000);
        });

        option.addEventListener('mouseleave', function () {
            clearTimeout(timeoutId);
            this.style.backgroundColor = '';
        });
    });
});
