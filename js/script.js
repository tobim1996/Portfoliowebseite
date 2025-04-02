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

}

$themeBtn.addEventListener("click", changeTheme);

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

    // Alle Elemente mit dem data-lang-* Attribut aktualisieren
    const elements = document.querySelectorAll("[data-lang-de], [data-lang-en]");
    elements.forEach((element) => {
      const text = element.getAttribute(`data-lang-${lang}`);
      if (text) {
        element.innerHTML = text;
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
let /** {NodeElement} */[lastActiveTab] = document.querySelectorAll("[data-tab-content]");
let /** {NodeElement} */[lastActiveTabBtn] = $tabBtn;

$tabBtn.forEach(item => {
  item.addEventListener("click", function () {

    lastActiveTab.classList.remove("active");
    lastActiveTabBtn.classList.remove("active");

    const /** {NodeElement} */ $tabContent = document.querySelector(`[data-tab-content="${item.dataset.tabBtn}"]`);
    $tabContent.classList.add("active");
    this.classList.add("active");

    lastActiveTab = $tabContent;
    lastActiveTabBtn = this;

  });
});
