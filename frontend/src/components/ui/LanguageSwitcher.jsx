import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  function changeLanguage(lang) {
    i18n.changeLanguage(lang);
    localStorage.setItem('palcoverde_lang', lang);
    // Recarrega para que os dados vindos da API sejam pedidos de novo no novo idioma
    window.location.reload();
  }

  return (
    <div className="flex items-center gap-1 font-mono text-xs">
      <button
        onClick={() => changeLanguage('pt')}
        className={`px-2 py-1 rounded-sm transition-colors ${
          i18n.language === 'pt' ? 'text-cue' : 'text-paper/40 hover:text-paper/70'
        }`}
      >
        PT
      </button>
      <span className="text-paper/20">/</span>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 rounded-sm transition-colors ${
          i18n.language === 'en' ? 'text-cue' : 'text-paper/40 hover:text-paper/70'
        }`}
      >
        EN
      </button>
    </div>
  );
}