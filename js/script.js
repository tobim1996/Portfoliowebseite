/**
 * @author Tobias Madaj
 */

"use strict";


/**
 * Light and dark mode
 */

const /** {NodeElement} */ $themeBtn = document.querySelector("[data-theme-btn]");
const /** {NodeElement} */ $HTML = document.documentElement;
let /** {Boolean | String} */ isLight = window.matchMedia("(prefers-color-scheme: light)").matches;

if (sessionStorage.getItem("theme")) {
  $HTML.dataset.theme = sessionStorage.getItem("theme");
} else {
  $HTML.dataset.theme = isLight ? "dark" : "light";
}

const changeTheme = () => {

  $HTML.dataset.theme = sessionStorage.getItem("theme") === "dark" ? "light" : "dark";
  sessionStorage.setItem("theme", $HTML.dataset.theme);
  updateThemeIcons(); // <--- Icon beim Theme-Wechsel aktualisieren


}


$themeBtn.addEventListener("click", changeTheme);

const updateThemeIcons = () => {
  const currentTheme = $HTML.dataset.theme;

  const icons = document.querySelectorAll("[data-icon]");

  icons.forEach(icon => {
    const type = icon.dataset.icon;

    const iconMap = {
      resume: {
        light: "assets/images/resumetabicondark.png",
        dark:  "assets/images/resumetabiconlight.png"
      },
      project: {
        light: "assets/images/projecttabicondark.png",
        dark:  "assets/images/projecttabiconlight.png"
      },
      contact: {
        light: "assets/images/contactstabicondark.png",
        dark:  "assets/images/contactstabiconlight.png"
      }
    };

    if (iconMap[type]) {
      icon.src = iconMap[type][currentTheme];
    }
  });
};


// Beim Initialisieren: Icon setzen
updateThemeIcons();


/**
 * Language Switcher
 */

document.addEventListener("DOMContentLoaded", () => {
  const $languageBtn = document.querySelector("[data-language-btn]");
  
  // Sprache aus sessionStorage laden oder Standard setzen
  const storedLang = sessionStorage.getItem("language");
  if (storedLang) {
    document.documentElement.lang = storedLang;
    console.log("Gespeicherte Sprache gefunden:", storedLang);
    updateText();
  } else {
    document.documentElement.lang = "de";
    sessionStorage.setItem("language", "de");
    console.log("Standard-Sprache auf Deutsch gesetzt.");
  }

  // Funktion, um die Sprache zu wechseln
  const changeLanguage = () => {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === "de" ? "en" : "de";

    console.log(`Wechsel von ${currentLang} nach ${newLang}`);

    document.documentElement.lang = newLang;
    sessionStorage.setItem("language", newLang);
    updateText();
  };

  // Funktion, um den Text basierend auf der Sprache zu aktualisieren
  const updateText = () => {
    const lang = document.documentElement.lang;
    console.log("Aktualisiere Text für Sprache:", lang);

    // Alle Elemente mit data-lang-* Attributen aktualisieren
  const elements = document.querySelectorAll("[data-lang-de], [data-lang-en]");
  elements.forEach((element) => {
    const text = element.getAttribute(`data-lang-${lang}`);
    if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
      // Aktualisiere das placeholder-Attribut für Eingabefelder
      if (text) {
        element.setAttribute("placeholder", text);
      }
    } else {
      // Aktualisiere den innerHTML für andere Elemente
      if (text) {
        element.innerHTML = text;
      }
    }
  });
};

  // Event-Listener für den Button-Klick hinzufügen
  $languageBtn.addEventListener("click", () => {
    console.log("Language button clicked");
    changeLanguage();
  });

  // Text initial setzen
  updateText();
});


/**
 * TAB
 */


const /** {NodeList} */ $tabBtn = document.querySelectorAll("[data-tab-btn]");
const /** {NodeList} */ $tabContent = document.querySelectorAll("[data-tab-content]");

// Initialisiere die aktiven Tab-Elemente
let /** {NodeElement} */ lastActiveTab = document.querySelector("[data-tab-content].active");
let /** {NodeElement} */ lastActiveTabBtn = document.querySelector("[data-tab-btn].active");

$tabBtn.forEach(item => {
  item.addEventListener("click", function () {
    // Entferne die aktive Klasse von den vorherigen Tabs und Inhalten
    if (lastActiveTab) lastActiveTab.classList.remove("active");
    if (lastActiveTabBtn) lastActiveTabBtn.classList.remove("active");

    // Finde den zugehörigen Tab-Inhalt
    const /** {NodeElement} */ newTabContent = document.querySelector(`[data-tab-content="${item.dataset.tabBtn}"]`);
    if (newTabContent) {
      newTabContent.classList.add("active");
    }
    this.classList.add("active");

    // Aktualisiere die Referenzen für die aktiven Elemente
    lastActiveTab = newTabContent;
    lastActiveTabBtn = this;
  });
});