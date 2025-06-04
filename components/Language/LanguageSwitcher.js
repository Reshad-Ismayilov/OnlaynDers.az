'use client';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const languages = [
  { code: 'az', label: 'AZ' },
  { code: 'ru', label: 'RU' },
];

const LanguageSwitcher = () => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const currentLang = i18n.language || 'az';

  const changeLanguage = (lng) => {
    if (lng === currentLang) return;
    i18n.changeLanguage(lng);
    router.push(router.pathname, router.asPath, { locale: lng });
  };

  return (
    <div className="inline-flex rounded-full bg-gray-100 p-1 shadow-inner border border-gray-300">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => changeLanguage(code)}
          className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-200
            ${currentLang === code
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-200'
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
