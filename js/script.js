document.getElementById('submitBtn').addEventListener('click', function() {
    executeCommand();
  });
  
  function executeCommand() {
    var outputDiv = document.getElementById('output');
    var newLine = document.createElement('div');
    newLine.textContent = '$ freefire';
    outputDiv.appendChild(newLine);
  
    newLine = document.createElement('div');
    newLine.textContent = 'Abrindo o Free Fire...';
    outputDiv.appendChild(newLine);
    setTimeout(function() {
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.location.href = 'https://apps.apple.com/app/id1300146617'; // Link para a App Store no iOS
      } else {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.dts.freefireth'; // Link para o Google Play
      }
    }, 4000);
  }
  