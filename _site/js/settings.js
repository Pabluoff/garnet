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

    function updateConnectionTime() {
        if (connectStartTime) {
            const elapsedTime = Math.floor((Date.now() - connectStartTime) / 1000);
            const hours = Math.floor(elapsedTime / 3600);
            const minutes = Math.floor((elapsedTime % 3600) / 60);
            const seconds = elapsedTime % 60;
            realtimeFps.textContent = `(${hours}h ${minutes}m ${seconds}s)`;
        }
    }

    const toggleState = localStorage.getItem("toggleState");
    if (toggleState === "true") {
        fpsToggle.checked = true;
        statusFps.textContent = "Conectado";
        connectStartTime = parseInt(localStorage.getItem("connectStartTime"), 10) || Date.now();
        updateTimeInterval = setInterval(updateConnectionTime, 1000);
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
                statusFps.textContent = "Desconectado";
                realtimeFps.textContent = "";
                clearInterval(updateTimeInterval);
                localStorage.removeItem("toggleState");
                localStorage.removeItem("connectStartTime");
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
                connectStartTime = Date.now();
                localStorage.setItem("toggleState", "true");
                localStorage.setItem("connectStartTime", connectStartTime);
                updateTimeInterval = setInterval(updateConnectionTime, 1000);
                updateConnectionTime();
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
