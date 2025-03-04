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

const /** {NodeElement} */ $languageBtn = document.querySelector("[data-language-btn]");

if (sessionStorage.getItem("language")) {
  document.documentElement.lang = sessionStorage.getItem("language");
} else {
  document.documentElement.lang = "de"; // Standardmäßig auf Deutsch setzen
}

const changeLanguage = () => {
  const currentLang = document.documentElement.lang;
  const newLang = currentLang === "de" ? "en" : "de";
  
  document.documentElement.lang = newLang;
  sessionStorage.setItem("language", newLang);
}

$languageBtn.addEventListener("click", changeLanguage);




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
