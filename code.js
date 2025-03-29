/* DruckundStick
  Autor: Nando Schlegel

  °°°content°°°
  ************
  01: code for the nav
    01.1 code für scroll nav
  02: Code für das Ausblender der Bereits geschehenen Events
  03: Galerie lightbox
*/
/* _______________________________________________________________________________________________________________________________________________________________ */

// --------------------
// 01: code for the nav
// --------------------
document.addEventListener("DOMContentLoaded", function () {
  // Get the checkbox element
  const checkbox = document.getElementById("toggle");
  // Get the main-nav element
  const mainNav = document.querySelector(".main-nav");
  // Get all links inside the main-nav
  const navLinks = mainNav.querySelectorAll("a");

  // Add an event listener to each link inside the main-nav
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      // Überprüfen, ob die Bildschirmbreite kleiner als 768px ist (mobiles Gerät)
      if (window.innerWidth < 1200) {
        // Uncheck the checkbox when a link is clicked (nur auf mobilen Geräten)
        checkbox.checked = false;

        // Hide the main-nav after a short delay
        setTimeout(function () {
          mainNav.style.display = "none";
        }, 200); // Adjust the delay time as needed
      }
    });
  });

  // Add an event listener to the checkbox
  checkbox.addEventListener("change", function () {
    // Check if the checkbox is checked
    if (this.checked) {
      // If checked, display the main-nav
      mainNav.style.display = "flex";
    } else {
      // If unchecked, hide the main-nav (nur auf mobilen Geräten)
      if (window.innerWidth < 1200) {
        mainNav.style.display = "none";
      }
    }
  });

  // Wenn der Bildschirm größer als 768px ist (Desktop), stelle sicher, dass die Navigation immer sichtbar ist
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1200) {
      mainNav.style.display = "flex"; // Zeige die Navigation auf Desktop-Bildschirmen
    } else {
      if (!checkbox.checked) {
        mainNav.style.display = "none"; // Verstecke die Navigation auf mobilen Bildschirmen
      }
    }
  });
});

// 01.1 code für scroll nav
// ------------------------

let lastScrollTop = 0;

window.addEventListener(
  "scroll",
  function () {
    let currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.getElementById("navbar");

    if (currentScroll > lastScrollTop) {
      // Scrollt nach unten
      navbar.style.top = "-100px"; // Versteckt die Navigation
      navbar.style.transition = "top 0.5s"; // Fügt Übergangseffekt hinzu
    } else {
      // Scrollt nach oben
      navbar.style.top = "0"; // Zeigt die Navigation wieder an
      navbar.style.transition = "top 0.5s"; // Fügt Übergangseffekt hinzu
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  },
  false
);

// _______________________________________________________________________________________________________________________________________________________________

// 02: Code für das Ausblender der Bereits geschehenen Events
// ----------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const today = new Date(); // Heutiges Datum

  // Hilfsfunktion zum Konvertieren von Datumsangaben
  function parseDate(dateString) {
    const months = {
      Januar: 0,
      Februar: 1,
      März: 2,
      April: 3,
      Mai: 4,
      Juni: 5,
      Juli: 6,
      August: 7,
      September: 8,
      Oktober: 9,
      November: 10,
      Dezember: 11,
    };

    // Entfernen von überflüssigen Zeichen und Aufteilen der Datumsteile
    const parts = dateString.replace(/[\s./-]+/, " ").split(" ");

    if (parts.length >= 3) {
      const day = parseInt(parts[0], 10);
      const month = months[parts[1]]; // Monat in Zahlen
      const year = parseInt(parts[2], 10);

      return new Date(year, month, day); // Gib ein Date-Objekt zurück
    }
    return null;
  }

  document.querySelectorAll("#auftritte li").forEach(function (event) {
    const dateText = event.querySelector(".title").innerText; // Hole das Datums-Textfeld

    // Wenn mehrere Daten angegeben sind, nimm das späteste Datum
    const dateParts = dateText.split("/");
    const eventDate =
      dateParts.length > 1
        ? parseDate(dateParts[dateParts.length - 1].trim())
        : parseDate(dateText.trim());

    // Vergleich des Event-Datums mit dem aktuellen Datum
    if (eventDate && eventDate < today) {
      event.style.display = "none"; // Event ausblenden, wenn es in der Vergangenheit liegt
    }
  });
});
// _______________________________________________________________________________________________________________________________________________________________

// 03: Galerie lightbox
// --------------------

// Hole alle Bilder
const galleryItems = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

// Zeige das Bild in der Lightbox, wenn ein Bild angeklickt wird
galleryItems.forEach((item) => {
  item.addEventListener("click", function () {
    lightbox.style.display = "flex";
    lightboxImg.src = this.src; // Das angeklickte Bild in die Lightbox setzen
  });
});

// Schließe die Lightbox, wenn auf das "X" geklickt wird
closeBtn.addEventListener("click", function () {
  lightbox.style.display = "none";
});

// Schließe die Lightbox, wenn auf den Hintergrund (Overlay) geklickt wird
lightbox.addEventListener("click", function (event) {
  // Prüfe, ob der Klick auf das Overlay selbst war (nicht auf das Bild oder den Close-Button)
  if (event.target === lightbox) {
    lightbox.style.display = "none";
  }
});
