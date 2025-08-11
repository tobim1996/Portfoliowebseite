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

  // Funktion, um den Text basierend auf der Sprache zu aktualisieren
  const updateText = () => {
  const lang = document.documentElement.lang;
  const elements = document.querySelectorAll("[data-lang-de], [data-lang-en]");
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

  // Funktion, um die Sprache zu wechseln
  const changeLanguage = () => {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === "de" ? "en" : "de";
    document.documentElement.lang = newLang;
    localStorage.setItem("language", newLang);
    updateText();
  };

  // Event-Listener für den Button-Klick hinzufügen
  if ($languageBtn) {
    $languageBtn.addEventListener("click", changeLanguage);
  }
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