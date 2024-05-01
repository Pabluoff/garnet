function instalarIPA() {
    var ipaFileInput = document.getElementById('ipaFileInput');
    var mensagem = document.getElementById('mensagem');

    if (ipaFileInput.files.length === 0) {
        mensagem.textContent = 'Por favor, selecione um arquivo IPA.';
        return;
    }

    var ipaFile = ipaFileInput.files[0];

    if (navigator.userAgentData && navigator.userAgentData.brands && navigator.userAgentData.brands.length > 0) {
        var reader = new FileReader();
        reader.onload = function(event) {
            // Lógica de instalação de aplicativo para navegadores que suportam a instalação
            // Aqui você deve usar a API específica para a plataforma
            var ipaDataURL = event.target.result;
            
            // Exemplo de lógica para instalação no iOS (Safari)
            if (navigator.platform === 'iPhone' || navigator.platform === 'iPad') {
                var a = document.createElement('a');
                a.href = ipaDataURL;
                a.download = 'app.ipa'; // Nome do arquivo IPA
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else {
                mensagem.textContent = 'Este navegador não suporta a instalação de aplicativos iOS.';
            }
        };
        reader.readAsDataURL(ipaFile);
    } else {
        mensagem.textContent = 'A instalação de aplicativos não é suportada neste navegador.';
    }
}
