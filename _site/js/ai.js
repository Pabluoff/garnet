let fala;
let falando = false;

function falarFrase(frases, index = 0, callback) {
    if (index < frases.length) {
        const frase = new SpeechSynthesisUtterance(frases[index]);
        frase.lang = 'pt-BR';
        frase.rate = 1;

        // Definir voz masculina se disponível
        window.speechSynthesis.onvoiceschanged = function () {
            const vozes = window.speechSynthesis.getVoices();
            let vozMasculina = vozes.find(voz => voz.lang === 'pt-BR' && (voz.name.includes('Google Brasileiro Masculino') || voz.name.includes('Diego')));
            if (vozMasculina) {
                frase.voice = vozMasculina;
            }
        };

        frase.onend = function () {
            falarFrase(frases, index + 1, callback);
        };

        window.speechSynthesis.speak(frase);
    } else if (callback) {
        callback();
    }
}

function bemVindoVoz() {
    const nome = localStorage.getItem('nome') || 'usuário';
    const frasesBemVindo = [
        `Bem-vindo, ${nome}.`,
        "Ativando calibração automática.",
        "Executando IA.",
        "Processando dados e informações.",
        "Banco de dados acessado.",
        "Verificação concluída com sucesso."
    ];

    falarFrase(frasesBemVindo, 0, desbloquearCheckbox);
}

function desativarIA() {
    const nome = localStorage.getItem('nome') || 'usuário';
    const fraseDesativacao = [`Inteligência artificial desativada, até logo, ${nome}.`];

    falarFrase(fraseDesativacao, 0, desbloquearCheckbox);
}

function bloquearCheckbox() {
    document.getElementById('unique-checkbox').disabled = true;
    falando = true;
}

function desbloquearCheckbox() {
    document.getElementById('unique-checkbox').disabled = false;
    falando = false;
}

document.getElementById('unique-checkbox').addEventListener('change', function () {
    if (!falando) {
        bloquearCheckbox();
        if (this.checked) {
            bemVindoVoz();
        } else {
            desativarIA();
        }
    }
});
