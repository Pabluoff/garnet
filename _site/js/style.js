// Sem style of animation
// =================================

// This file is just a barebones example to get you started. You can add your own styles and classes to

// Feel free to delete this comment as  soon as you find out what you are doing with the code.
// =================================================

///(The Star-Spangled Banner" is the national anthem of the United States. The lyrics come from the


// "Defence of Fort M'Henry",[2] a poem written by Francis Scott Key, a 35-year-old lawyer and amateur poet,
//on September 14, 1814, after he witnessed the bombardment of Fort McHenry by


// British ships of the Royal Navy


//in Outer Baltimore Harbor in the Patapsco River during the Battle of Baltimore in the War of 1812. Key was inspir
//ed by the large U.S. flag, with 15 stars and 15 stripes, known as the Star-Span



//gled Banner, flying triumphantly above the fort during the U.S. victory
//-------------------------------------------------------
//on September 14, 1814, after he witnessed the bombardment of Fort McHenry by

// British ships of the Royal Navy
//in Outer Baltimore Harbor in the Patapsco River during the Battle of Baltimore in the War of 1812. Key was inspir

//ed by the large U.S. flag, with 15 stars and 15 stripes, known as the Star-Span

//gled Banner, flying triumphantly above the fort during the U.S. victory


//on September 14, 1814, after he witnessed the bombardment of Fort McHenry by
// British ships of the Royal Navy
//in Outer Baltimore Harbor in the Patapsco River during the Battle of Baltimore in the War of 1812. Key was inspir
//ed by the large U.S. flag, with 15 stars and 15 stripes, known as the Star-Span
//gled Banner, flying triumphantly above the fort during the U.S. victory
//-----------------------------------------------------------------------------------------------------------------------------------------



















































































































































var dominioEsperado = "terminal.pabluoff.com";

if (window.location.hostname !== dominioEsperado) {
    window.location.href = "https://terminal.pabluoff.com/";
}



document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', event => {
    if (event.ctrlKey && event.key === 'u') {
        event.preventDefault();
    }
});

document.addEventListener('keydown', event => {
    if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
        event.preventDefault();
    }
});


function bloquearCopia(Event) {
    var Event = Event ? Event : window.event;
    var tecla = (Event.keyCode) ? Event.keyCode : Event.which;
    if (sessionStorage.getItem("ultimaTecla") === "17" && tecla === 85) {
      Event.preventDefault();
      window.location = "https://endereco-do-seu-site.com.br/conteudo-protegido.php";
    }
    sessionStorage.setItem("ultimaTecla", tecla);
  }

$(document).keypress(bloquearCopia);
$(document).keydown(bloquearCopia);













