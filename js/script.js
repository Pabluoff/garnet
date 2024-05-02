document.addEventListener("DOMContentLoaded", function () {
  displayInitialMessage();
});

function displayInitialMessage() {
  var outputDiv = document.getElementById("output");
  var initialMessage = document.createElement("div");
  initialMessage.textContent =
    "$ Bem-vindo ao Garnet. Clique em 'Executar' para iniciar.";
  initialMessage.style.paddingBottom = "15px";
  outputDiv.appendChild(initialMessage);
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

document.getElementById("submitBtn").addEventListener("click", function () {
  document.getElementById("submitBtn").disabled = true;
  executeCommands();
});

function executeCommands() {
  var outputDiv = document.getElementById("output");

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
    'console.log("Injetado com sucesso!")',
  ];

  function displayCode(index) {
    if (index < codes.length) {
      var code = codes[index];
      var newLine = document.createElement("div");
      newLine.textContent = "$ " + code;
      newLine.style.color = "#0F0";
      outputDiv.appendChild(newLine);

      outputDiv.scrollTop = outputDiv.scrollHeight;

      setTimeout(function () {
        displayCode(index + 1);
      }, Math.random() * 1000 + 500);
    } else {
      var confirmationMessage = document.createElement("div");
      confirmationMessage.textContent = "Abrindo o Free Fire...";
      outputDiv.appendChild(confirmationMessage);
      outputDiv.scrollTop = outputDiv.scrollHeight;
      setTimeout(function () {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          window.location.href = "freefire://";
        } else {
          window.location.href =
            "intent://com.dts.freefireth#Intent;scheme=package;end";
        }
        document.getElementById("submitBtn").disabled = false;
      }, 3000);
    }
  }

  displayCode(0);
}
