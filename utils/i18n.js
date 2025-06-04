import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import common_az from '../public/locales/az/common.json';
import common_ru from '../public/locales/ru/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      az: { common: common_az },
      ru: { common: common_ru },
    },
    lng: 'az',
    fallbackLng: 'az',
    ns: ['common'], // bu önəmlidir
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
