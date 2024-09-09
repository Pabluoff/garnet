  // Salva a escolha do idioma em um cookie
  function setLanguageCookie(lang) {
    document.cookie = "googtrans=/pt/" + lang + "; path=/; domain=" + window.location.hostname;
    document.cookie = "googtrans=/pt/" + lang + "; path=/";
  }

  // Observa as mudanças no seletor de idiomas e ajusta o cookie
  document.addEventListener('DOMContentLoaded', function() {
    var select = document.querySelector('#google_translate_element select');
    if (select) {
      select.addEventListener('change', function() {
        var lang = select.value.split('|')[1]; // Captura o código do idioma
        setLanguageCookie(lang);
        location.reload(); // Atualiza a página para aplicar a tradução
      });
    }
  });
