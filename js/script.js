document.getElementById("submitBtn").addEventListener("click", function () {
    // Desativa o botão para evitar múltiplos cliques
    document.getElementById("submitBtn").disabled = true;
    executeCommands();
  });
    
  function executeCommands() {
    var outputDiv = document.getElementById("output");
  
    // Códigos fictícios
    var codes = [
      'console.log("Iniciando conexão com o servidor...")',
      "var connection = new Connection();",
      "connection.establish();",
      'console.log("Conexão estabelecida com sucesso.")',
      'console.log("Analisando dados do servidor...")',
      "var data = connection.getData();",
      'console.log("Dados recebidos:", data)',
      'console.log("Executando script de segurança...")',
      "securityScript.execute();",
      'console.log("Script de segurança concluído.")',
      'console.log("Iniciando script de red-head...")',
      "attackScript.execute();",
      'console.log("red-head bem-sucedido!")',
      'console.log("Finalizando conexão...")',
      "connection.close();",
      'console.log("Conexão encerrada.")',
      'console.log("Aguarde enquanto redirecionamos para o Free Fire...")',
      'console.log("Executando...")',
      'console.log("Injetado sucesso!")',
    ];
  
    // Função para exibir os códigos fictícios com efeito de "hacking"
    function displayCode(index) {
      if (index < codes.length) {
        var code = codes[index];
        var newLine = document.createElement("div");
        newLine.textContent = "$ " + code;
        newLine.style.color = "#0F0"; // Cor verde para simular "hacking"
        outputDiv.appendChild(newLine);
  
      // Rola o terminal até o final
      outputDiv.scrollTop = outputDiv.scrollHeight;

      setTimeout(function () {
        displayCode(index + 1); // Chama a função recursivamente para exibir o próximo código
      }, Math.random() * 1000 + 500); // Intervalo aleatório entre 500ms e 1500ms
    } else {
      // Quando todos os códigos forem exibidos, exibe a mensagem de confirmação
      var confirmationMessage = document.createElement("div");
      confirmationMessage.textContent = "Abrindo o Free Fire...";
      outputDiv.appendChild(confirmationMessage);
      // Abrir o link do Free Fire após um pequeno atraso
      setTimeout(function () {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          window.location.href = "https://apps.apple.com/app/id1300146617"; // Link para a App Store no iOS
        } else {
          window.location.href =
            "https://play.google.com/store/apps/details?id=com.dts.freefireth"; // Link para o Google Play
        }
        // Reativa o botão após abrir o link
        document.getElementById("submitBtn").disabled = false;
      }, 3000); // 3 segundos de atraso antes de abrir o link
    }
  }

  // Inicia a exibição dos códigos fictícios
  displayCode(0);
}
