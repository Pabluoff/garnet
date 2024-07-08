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

document.addEventListener('DOMContentLoaded', function () {
    const rangeField = document.getElementById('touch-sensitivity');
    const geralSection = document.getElementById('geral-section');
    const aboutSection = document.getElementById('about-section');
    const speedSection = document.getElementById('speed-section');

    const backButton = document.getElementById("back-button");
    const settingsListGeral = document.querySelector(".settings-list-geral");
    const aboutItem = document.getElementById("about-item");
    const backButtonAbout = document.getElementById("back-button-about");
    const speedItem = document.getElementById("speed-item");
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

    let touchstartX = 0;
    let touchendX = 0;
    let isTouchOnRangeField = false;

    function checkSwipe(section, hideSection) {
        if (!isTouchOnRangeField && touchendX > touchstartX) { // Verifica se o movimento é para a direita e não iniciou no range field
            hideSection();
        }
    }

    [geralSection, aboutSection, speedSection].forEach(section => {
        section.addEventListener('touchstart', function(event) {
            touchstartX = event.changedTouches[0].screenX;
            isTouchOnRangeField = event.target === rangeField; // Verifica se o toque inicial foi no range field
        });

        section.addEventListener('touchend', function(event) {
            touchendX = event.changedTouches[0].screenX;
            if (section === geralSection) {
                checkSwipe(section, hideGeralSection);
            } else if (section === aboutSection) {
                checkSwipe(section, hideAboutSection);
            } else if (section === speedSection) {
                checkSwipe(section, hideSpeedSection);
            }
        });
    });

    const savedRangeValue = localStorage.getItem('rangeValue');
    if (savedRangeValue !== null) {
        rangeField.value = savedRangeValue;
        fillRange();
    }

    function fillRange() {
        const percent = (rangeField.value - rangeField.min) / (rangeField.max - rangeField.min) * 100;
        rangeField.style.background = `linear-gradient(to right, #007aff 0%, #007aff ${percent}%, #3a3a3c ${percent}%, #3a3a3c 100%)`;
    }

    rangeField.addEventListener('input', function () {
        fillRange();
        localStorage.setItem('rangeValue', rangeField.value);
    });

    fillRange();

    const email = localStorage.getItem("email");
    const aboutEmail = document.querySelector("#id-account");
    aboutEmail.textContent = email || "N/A";
});

document.addEventListener('DOMContentLoaded', function () {
    const touchFingerToggle = document.getElementById('touch-finger-toggle');
    const calibrationToggle = document.getElementById('calibration-toggle');

    const savedTouchFingerToggleState = localStorage.getItem('touchFingerToggleState');
    const savedCalibrationToggleState = localStorage.getItem('calibrationToggleState');

    if (savedTouchFingerToggleState !== null) {
        touchFingerToggle.checked = savedTouchFingerToggleState === 'true';
    }

    if (savedCalibrationToggleState !== null) {
        calibrationToggle.checked = savedCalibrationToggleState === 'true';
    }

    function saveToggleStateToLocalStorage() {
        localStorage.setItem('touchFingerToggleState', touchFingerToggle.checked);
        localStorage.setItem('calibrationToggleState', calibrationToggle.checked);
    }

    touchFingerToggle.addEventListener('change', function () {
        saveToggleStateToLocalStorage();
    });

    calibrationToggle.addEventListener('change', function () {
        saveToggleStateToLocalStorage();
    });
});


//select
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

    const savedSpeed = localStorage.getItem('cursorSpeed');
    if (savedSpeed !== null) {
        cursorSpeedInput.value = savedSpeed;
    }

    function updateSpeedValue(increment) {
        let currentValue = parseInt(cursorSpeedInput.value, 10);
        let newValue = currentValue + increment;
        if (newValue === 1) {
            decreaseSpeedButton.classList.add('exceeded-limit');
        } else if (newValue === 120) {
            increaseSpeedButton.classList.add('exceeded-limit');
        } else {
            decreaseSpeedButton.classList.remove('exceeded-limit');
            increaseSpeedButton.classList.remove('exceeded-limit');
        }

        if (newValue >= 1 && newValue <= 120) {
            cursorSpeedInput.value = newValue;
            localStorage.setItem('cursorSpeed', newValue);
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

    function checkSpeedLimit() {
        let currentValue = parseInt(cursorSpeedInput.value, 10);
        if (currentValue === 1) {
            decreaseSpeedButton.classList.add('exceeded-limit');
        } else if (currentValue === 120) {
            increaseSpeedButton.classList.add('exceeded-limit');
        } else {
            decreaseSpeedButton.classList.remove('exceeded-limit');
            increaseSpeedButton.classList.remove('exceeded-limit');
        }
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
            localStorage.setItem('selectedMode', mode);
        });
    });

    setInterval(checkSpeedLimit, 0);

    //field
    const savedMode = localStorage.getItem('selectedMode');
    if (savedMode) {
        const savedOption = Array.from(selectionMode).find(option => option.getAttribute('data-value') === savedMode);
        if (savedOption) {
            savedOption.click();
        }
    } else {
        if (selectionMode.length > 0) {
            selectionMode[0].click();
        }
    }
});

//reset
document.addEventListener('DOMContentLoaded', function () {
    const resetItem = document.getElementById('settings-reset');
    const modalReset = document.getElementById('modal-reset');
    const btnResetConfirm = document.getElementById('btn-reset-confirm');
    const btnResetCancel = document.getElementById('btn-reset-cancel');
    const touchFingerToggle = document.getElementById('touch-finger-toggle');
    const calibrationToggle = document.getElementById('calibration-toggle');

    resetItem.addEventListener('click', function () {
        modalReset.style.display = 'block';
    });

    btnResetCancel.addEventListener('click', function () {
        modalReset.style.display = 'none';
    });

    btnResetConfirm.addEventListener('click', function () {
        localStorage.removeItem('cursorSpeed');
        localStorage.removeItem('touchFingerToggleState');
        localStorage.removeItem('calibrationToggleState');

        localStorage.setItem('rangeValue', 0);
        localStorage.setItem('selectedMode', 'Singular');
        localStorage.setItem('touchFingerToggleState', false);
        localStorage.setItem('calibrationToggleState', false);

        const rangeField = document.getElementById('touch-sensitivity');
        const cursorSpeedInput = document.getElementById('cursor-speed');
        rangeField.value = 0;
        cursorSpeedInput.value = 120;

        const fillRange = () => {
            const percent = (rangeField.value - rangeField.min) / (rangeField.max - rangeField.min) * 100;
            rangeField.style.background = `linear-gradient(to right, #007aff 0%, #007aff ${percent}%, #3a3a3c ${percent}%, #3a3a3c 100%)`;
        };

        fillRange();

        const selectedOption = document.querySelector('.selection-mode .option.selected');
        if (selectedOption) {
            selectedOption.classList.remove('selected');
        }

        const singularOption = document.querySelector('.selection-mode .option[data-value="Singular"]');
        if (singularOption) {
            singularOption.classList.add('selected');
        }

        touchFingerToggle.checked = false;
        calibrationToggle.checked = false;

        modalReset.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modalReset) {
            modalReset.style.display = 'none';
        }
    });
});

document.getElementById('btn-enter-game').addEventListener('click', function() {
    var loadingText = document.getElementById('loading-text');
    var loadingMessage = document.getElementById('loading-message');
    var btnEnterGame = document.getElementById('btn-enter-game');
  
    if (btnEnterGame.classList.contains('disabled')) {
      return; // Retorna se o botão já estiver desabilitado
    }
  
    // Desabilita o botão para evitar múltiplos cliques
    btnEnterGame.classList.add('disabled');
  
    var loadingMessages = [
      "Carregando...",
      "Executando IA...",
      "InsightShot..."
    ];
  
    function displayLoadingMessages(index) {
      if (index < loadingMessages.length) {
        loadingMessage.textContent = loadingMessages[index];
        loadingText.style.display = 'block';
  
        setTimeout(function() {
          loadingText.style.display = 'none';
          displayLoadingMessages(index + 1);
        }, 2000);
      } else {
        openFreeFire();
      }
    }
  
    function openFreeFire() {
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.location.href = "freefire://";
      } else {
        var isAndroid = userAgent.toLowerCase().indexOf("android") > -1;
        if (isAndroid) {
          window.location.href = "intent://com.dts.freefireth#Intent;scheme=package;end";
        } else {
          alert("Caso Free Fire não seja aberto automaticamente, por favor, abra o aplicativo manualmente.");
        }
      }
  
      // Habilita o botão novamente após abrir o link
      btnEnterGame.classList.remove('disabled');
    }
  
    displayLoadingMessages(0);
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    // Exibir o contêiner de carregamento
    const loaderContainer = document.querySelector('.loader-container');
    loaderContainer.style.display = 'flex';
  
    // Simular um carregamento de página com timeout
    setTimeout(function() {
      // Ocultar o contêiner de carregamento após 3 segundos (simulando o fim do carregamento)
      loaderContainer.style.display = 'none';
    }, 2000);
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const rangeField = document.getElementById("touch-sensitivity");
    const percentageLabel = document.getElementById("percentage-value");

    function updatePercentage() {
        percentageLabel.textContent = `${rangeField.value}%`;
    }

    rangeField.addEventListener("input", updatePercentage);

    updatePercentage();

    setInterval(updatePercentage, 1000);
});
