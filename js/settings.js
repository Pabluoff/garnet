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

    fpsToggle.addEventListener("change", function (e) {
        if (e.target.checked) {
            e.target.checked = false; 
            fpsModal.style.display = "block";
        }
    });

    fpsCancelButton.addEventListener("click", function () {
        fpsModal.style.animation = "fadeOut 0.3s ease-in-out forwards";
        setTimeout(function () {
            fpsModal.style.display = "none";
            fpsModal.style.animation = ""; 
        }, 300);
    });

    fpsActivateButton.addEventListener("click", function () {
        fpsToggle.checked = true;
        fpsModal.style.animation = "fadeOut 0.3s ease-in-out forwards";
        setTimeout(function () {
            fpsModal.style.display = "none";
            fpsModal.style.animation = ""; 
        }, 300);
    });
});
