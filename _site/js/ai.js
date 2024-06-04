document.addEventListener("DOMContentLoaded", function () {
    // Fetch the username from localStorage
    const savedUsername = localStorage.getItem("nome") || "user";
    // Display the username in the header
    document.getElementById("user-xp").textContent = savedUsername;
});

let userXP = 0;
let userLevel = 1;
const xpForNextLevel = 100;

const defaultMissions = [
    { id: 1, description: "Login diário", xp: 10, completed: false },
    { id: 2, description: "Compartilhar com amigo", xp: 20, completed: false },
    { id: 3, description: "Assistir vídeo Surpresa", xp: 30, completed: false }
];

function loadUserData() {
    const savedXP = localStorage.getItem('userXP');
    const savedLevel = localStorage.getItem('userLevel');
    const savedMissions = localStorage.getItem('missions');
    const lastVisit = localStorage.getItem('lastVisit');

    if (savedXP) userXP = parseInt(savedXP, 10);
    if (savedLevel) userLevel = parseInt(savedLevel, 10);
    if (savedMissions) missions = JSON.parse(savedMissions);
    else missions = defaultMissions;

    const today = new Date().toLocaleDateString();
    if (lastVisit !== today) {
        missions = defaultMissions.map(mission => ({ ...mission }));
        localStorage.setItem('lastVisit', today);
    }

    updateUI();
}

function saveUserData() {
    localStorage.setItem('userXP', userXP);
    localStorage.setItem('userLevel', userLevel);
    localStorage.setItem('missions', JSON.stringify(missions));
}

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

    saveUserData();
}

function renderMissions() {
    const missionsList = document.getElementById('missions-list');
    missionsList.innerHTML = '';
    missions.forEach(mission => {
        const missionItem = document.createElement('li');
        missionItem.innerHTML = `
        <span>${mission.description}</span>
        <button onclick="completeMission(${mission.id})" ${mission.completed ? 'disabled' : ''}>
            ${mission.completed ? 'Completada' : 'Completar'}
        </button>
`;
        missionsList.appendChild(missionItem);
    });
}

function completeMission(missionId) {
    const mission = missions.find(m => m.id === missionId);
    if (mission && !mission.completed) {
        mission.completed = true;
        updateXP(mission.xp);
        renderMissions();
    }
}

function updateUI() {
    const xpBar = document.getElementById('xp-bar');
    const xpText = document.getElementById('xp-text');
    const userLevelElement = document.getElementById('user-level');
    const xpPercentage = (userXP / xpForNextLevel) * 100;

    xpBar.style.width = `${xpPercentage}%`;
    xpText.textContent = `${userXP}/${xpForNextLevel} XP`;
    userLevelElement.textContent = `Nível ${userLevel}`;

    renderMissions();
}

document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
});
