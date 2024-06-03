document.addEventListener("DOMContentLoaded", function() {
    // Fetch the username from localStorage
    const savedUsername = localStorage.getItem("nome") || "user";
    // Display the username in the header
    document.getElementById("user-xp").textContent = savedUsername;
});

let userXP = 0;
let userLevel = 1;
const xpForNextLevel = 100;

function updateXP(amount) {
    userXP += amount;
    const xpBar = document.getElementById('xp-bar');
    const xpText = document.getElementById('xp-text');
    const userLevelElement = document.getElementById('user-level');

    if (userXP >= xpForNextLevel) {
        userXP -= xpForNextLevel;
        userLevel++;
    }

    const xpPercentage = (userXP / xpForNextLevel) * 100;
    xpBar.style.width = `${xpPercentage}%`;
    xpText.textContent = `${userXP}/${xpForNextLevel} XP`;
    userLevelElement.textContent = `Nível ${userLevel}`;
}

// Teste para adicionar XP
document.addEventListener('DOMContentLoaded', () => {
    updateXP(50); // Exemplo de como adicionar XP
});
