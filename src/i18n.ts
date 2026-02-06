import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./translations";

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "ar", // Default language
        fallbackLng: "ar",
        interpolation: {
            escapeValue: false
        }
    });

// Handle Direction Change
i18n.on('languageChanged', (lng) => {
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
});

// Initialize direction on load
document.documentElement.dir = 'rtl';
document.documentElement.lang = 'ar';

export default i18n;
