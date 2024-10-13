let fala;
let falando = false;

function falarFrase(frases, index = 0, callback) {
    if (index < frases.length) {
        const frase = new SpeechSynthesisUtterance(frases[index]);
        frase.lang = 'pt-BR';
        frase.rate = 1;

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
        "Executando Inteligência artificial.",
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

const checkbox = document.getElementById('unique-checkbox');

checkbox.addEventListener('change', function () {
    if (!falando) {
        bloquearCheckbox();
        if (this.checked) {
            localStorage.setItem('checkboxStatus', 'checked');
            bemVindoVoz();
        } else {
            localStorage.setItem('checkboxStatus', 'unchecked');
            desativarIA();
        }
    }
});

// Restaurar o estado do checkbox ao carregar a página
window.onload = function () {
    const checkboxStatus = localStorage.getItem('checkboxStatus');

    if (checkboxStatus === 'checked') {
        checkbox.checked = true;
        bloquearCheckbox(); // Bloquear checkbox se estiver ativado
        bemVindoVoz(); // Falar as frases de boas-vindas
    } else {
        checkbox.checked = false;
    }

    desbloquearCheckbox(); // Habilitar o checkbox para que o usuário possa interagir
};

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
