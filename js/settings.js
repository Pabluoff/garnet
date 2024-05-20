document.addEventListener("DOMContentLoaded", function () {
    // Recuperar o nome salvo no localStorage
    const userName = localStorage.getItem("nome");
    if (userName) {
        document.getElementById("user-settings").textContent = userName;

        // Definir a inicial do nome no perfil
        const profileInitial = document.getElementById("profile-initial");
        profileInitial.textContent = userName.charAt(0).toUpperCase();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("https://ipinfo.io/json")
        .then((response) => response.json())
        .then((data) => {
            let providerName = data.org.replace(/\d+/g, "").replace(/AS/g, "");
            document.getElementById("providerInfo").innerText = providerName.trim();
        });
});
