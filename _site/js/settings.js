document.addEventListener("DOMContentLoaded", function() {
    // Recuperar o nome salvo no localStorage
    const userName = localStorage.getItem("nome");
    if (userName) {
        document.getElementById("user-settings").textContent = userName;
        
        // Definir a inicial do nome no perfil
        const profileInitial = document.getElementById("profile-initial");
        profileInitial.textContent = userName.charAt(0).toUpperCase();
    }
});
