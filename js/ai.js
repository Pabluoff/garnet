document.addEventListener("DOMContentLoaded", () => {
    const userLevelElement = document.getElementById("user-level");
    const userXpElement = document.getElementById("user-xp");
    const levelProgressElement = document.getElementById("level-progress");

    const xpPerLevel = 100;
    const rewardAmounts = [300, 500, 1000, 500]; // Valores das recompensas por dia
    const totalDays = rewardAmounts.length;

    // Load stored data
    let userLevel = parseInt(localStorage.getItem("userLevel")) || 1;
    let userXp = parseInt(localStorage.getItem("userXp")) || 0;
    let lastClaimedDay = parseInt(localStorage.getItem("lastClaimedDay")) || 0;
    let lastClaimDate = localStorage.getItem("lastClaimDate") || null;

    function addXp(amount) {
        userXp += amount;
        while (userXp >= xpPerLevel) {
            userXp -= xpPerLevel;
            userLevel++;
        }
        updateLevelInfo();
        saveProgress();
    }

    function updateLevelInfo() {
        userLevelElement.textContent = userLevel;
        userXpElement.textContent = userXp;
        const progressPercent = (userXp / xpPerLevel) * 100;
        levelProgressElement.style.width = `${progressPercent}%`;
    }

    function saveProgress() {
        localStorage.setItem("userLevel", userLevel);
        localStorage.setItem("userXp", userXp);
    }

    function claimDailyReward(day, cardElement) {
        if ((day === lastClaimedDay + 1 || (day === 1 && lastClaimedDay === totalDays)) && isNewDay()) {
            addXp(rewardAmounts[day - 1] / 10); 
            cardElement.classList.add('collected');
            const rewardIcon = cardElement.querySelector('.reward-icon');
            rewardIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
            cardElement.querySelector('.reward-amount').style.color = '#5d5d5d';
            if (cardElement.classList.contains('bonus')) {
                cardElement.querySelector('.reward-day').style.backgroundColor = '#5d5d5d';
                cardElement.querySelector('.reward-day').style.color = '#000';
                cardElement.querySelector('.message-bonus').style.backgroundColor = '#5d5d5d';
                cardElement.querySelector('.message-bonus').style.color = '#000';
                cardElement.querySelector('.highlught-bonus').style.color = '#5d5d5d';
            }
            cardElement.removeEventListener('click', handleRewardClick);
            lastClaimedDay = day === totalDays ? 0 : day;
            lastClaimDate = new Date().toISOString().split('T')[0];
            localStorage.setItem("lastClaimedDay", lastClaimedDay);
            localStorage.setItem("lastClaimDate", lastClaimDate);
        }
    }

    function isNewDay() {
        const today = new Date().toISOString().split('T')[0];
        return today !== lastClaimDate;
    }

    function handleRewardClick(event) {
        const cardElement = event.currentTarget;
        const day = parseInt(cardElement.querySelector('.reward-day').textContent.split('º')[0]);
        claimDailyReward(day, cardElement);
    }

    function initRewardCards() {
        document.querySelectorAll('.reward-card').forEach((card, index) => {
            const day = index + 1;
            if (day <= lastClaimedDay) {
                card.classList.add('collected');
                const rewardIcon = card.querySelector('.reward-icon');
                rewardIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
                card.querySelector('.reward-amount').style.color = '#5d5d5d';
                if (card.classList.contains('bonus')) {
                    card.querySelector('.reward-day').style.backgroundColor = '#5d5d5d';
                    card.querySelector('.reward-day').style.color = '#000';
                    card.querySelector('.message-bonus').style.backgroundColor = '#5d5d5d';
                    card.querySelector('.message-bonus').style.color = '#000';
                    card.querySelector('.highlught-bonus').style.color = '#5d5d5d';
                }
            } else if ((day === lastClaimedDay + 1 || (lastClaimedDay === totalDays && day === 1)) && isNewDay()) {
                card.addEventListener('click', handleRewardClick);
            } else {
                card.classList.add('locked');
            }
        });

        if (lastClaimedDay === totalDays && isNewDay()) {
            resetRewardCards();
        }
    }

    function resetRewardCards() {
        document.querySelectorAll('.reward-card').forEach((card) => {
            card.classList.remove('collected', 'locked');
            const rewardIcon = card.querySelector('.reward-icon');
            rewardIcon.innerHTML = '<i class="fa-solid fa-coins"></i>';
            card.querySelector('.reward-amount').style.color = '';
            if (card.classList.contains('bonus')) {
                card.querySelector('.reward-day').style.backgroundColor = '';
                card.querySelector('.reward-day').style.color = '';
                card.querySelector('.message-bonus').style.backgroundColor = '';
                card.querySelector('.message-bonus').style.color = '';
                card.querySelector('.highlught-bonus').style.color = '';
            }
        });
        lastClaimedDay = 0;
    }

    updateLevelInfo();
    initRewardCards();
});
