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


document.addEventListener("DOMContentLoaded", () => {
  const $languageBtn = document.querySelector("[data-language-btn]");
  const $languageDropdown = document.querySelector("[data-language-dropdown]");
  const $languageMenu = document.querySelector("[data-language-menu]");
  const $languageOptions = document.querySelectorAll(".language-option");

  // Funktion, um den Text basierend auf der Sprache zu aktualisieren
  const updateText = () => {
    const lang = document.documentElement.lang;
    const elements = document.querySelectorAll("[data-lang-de], [data-lang-en], [data-lang-pl]");
    elements.forEach((element) => {
      const text = element.getAttribute(`data-lang-${lang}`);
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        if (text) element.setAttribute("placeholder", text);
      } else if (
        element.classList.contains("icon-title") &&
        element.querySelector("img")
      ) {
        // Nur den Textknoten nach dem <img> ersetzen
        const img = element.querySelector("img");
        let textNode = img.nextSibling;
        // Falls kein Textknoten existiert, neuen anlegen
        if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
          textNode = document.createTextNode("");
          img.after(textNode);
        }
        textNode.nodeValue = " " + text;
      } else {
        if (text) element.innerHTML = text;
      }
    });
  };

  // Sprache aus localStorage laden oder Standard setzen
  const storedLang = localStorage.getItem("language");
  if (storedLang) {
    document.documentElement.lang = storedLang;
  } else {
    document.documentElement.lang = "de";
    localStorage.setItem("language", "de");
  }
  updateText();
  updateLanguageMenuState();

  // Funktion, um den aktiven Sprach-Button zu markieren
  function updateLanguageMenuState() {
    const currentLang = document.documentElement.lang;
    $languageOptions.forEach(option => {
      if (option.getAttribute("data-lang") === currentLang) {
        option.classList.add("active");
      } else {
        option.classList.remove("active");
      }
    });
  }

  // Funktion, um die Sprache zu wechseln
  const changeLanguage = (newLang) => {
    document.documentElement.lang = newLang;
    localStorage.setItem("language", newLang);
    updateText();
    updateLanguageMenuState();
    closeLanguageDropdown();
  };

  // Dropdown öffnen/schließen
  const toggleLanguageDropdown = () => {
    $languageDropdown.classList.toggle("active");
  };

  const closeLanguageDropdown = () => {
    $languageDropdown.classList.remove("active");
  };

  // Event-Listener für den Dropdown-Button
  if ($languageBtn) {
    $languageBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleLanguageDropdown();
    });
  }

  // Event-Listener für die Sprach-Optionen
  $languageOptions.forEach(option => {
    option.addEventListener("click", (e) => {
      e.stopPropagation();
      const selectedLang = option.getAttribute("data-lang");
      changeLanguage(selectedLang);
    });
  });

  // Dropdown schließen, wenn außerhalb geklickt wird
  document.addEventListener("click", (e) => {
    if (!$languageDropdown.contains(e.target)) {
      closeLanguageDropdown();
    }
  });
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