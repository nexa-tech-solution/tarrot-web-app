import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import EN from "./en/index.json";
import VI from "./vi/index.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { ...EN },
      vi: { ...VI },
    },

    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
