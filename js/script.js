// JavaScript para lidar com o envio e instalação do arquivo IPA
const ipaForm = document.getElementById('ipaForm'); // Obter o elemento do formulário
const ipaFileInput = document.getElementById('ipaFileInput'); // Obter o elemento de entrada de arquivo

ipaForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir a submissão do formulário
    const ipaFile = ipaFileInput.files[0]; // Obter o arquivo IPA selecionado

    if (ipaFile) {
        try {
            const installed = await installIPA(ipaFile); // Chamar a função de instalação do IPA
            console.log(installed ? 'Instalação concluída.' : 'Falha na instalação.');
        } catch (error) {
            console.error('Erro durante a instalação:', error.message);
        }
    } else {
        console.error('Nenhum arquivo IPA selecionado.');
    }
});

// Função para instalar o arquivo IPA
function installIPA(ipaFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader(); // Criar um leitor de arquivo
        reader.onload = function(event) {
            const url = event.target.result; // Obter o URL do arquivo
            if (confirm('Deseja instalar o aplicativo?')) {
                window.location.href = url; // Redirecionar para o URL do arquivo
                resolve(true); // Resolução bem-sucedida
            } else {
                reject(new Error('Instalação cancelada pelo usuário.')); // Rejeitar com erro
            }
        };
        reader.readAsDataURL(ipaFile); // Ler o arquivo como URL
    });
}
