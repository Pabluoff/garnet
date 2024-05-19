function carregarNomeSalvo() {
    const nomeSalvo = localStorage.getItem("nome");

    if (nomeSalvo) {
        const userSettingsElement = document.getElementById("user-settings");
        userSettingsElement.textContent = nomeSalvo;
    }
}

window.onload = function () {
    carregarNomeSalvo();
};
