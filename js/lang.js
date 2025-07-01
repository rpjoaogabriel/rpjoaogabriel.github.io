const translations = {
  en: {
    title: "My Website",
    welcome: "Welcome",
    description: "This is a multilingual website."
  },
  pt: {
    title: "Meu Site",
    welcome: "Bem-vindo",
    description: "Este é um site multilíngue."
  },
  es: {
    title: "Mi Sitio Web",
    welcome: "Bienvenido",
    description: "Este es un sitio web multilingüe."
  }
};

function setLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Opcional: salvar no localStorage
  localStorage.setItem('lang', lang);
}

// Aplicar idioma salvo no carregamento
window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'en';
  setLanguage(savedLang);
});
