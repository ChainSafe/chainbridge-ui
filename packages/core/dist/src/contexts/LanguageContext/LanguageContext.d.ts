import React from "react";
export declare type LanguageContext = {
    availableLanguages: Language[];
    selectedLanguage: string;
    selectedLocale: string;
    setActiveLanguage(newLanguage: string): void | Promise<void>;
    formatLocaleDate(date: Date): string;
};
declare type Language = {
    id: string;
    label: string;
};
declare type LanguageProviderProps = {
    children: React.ReactNode | React.ReactNode[];
    availableLanguages: Language[];
};
declare const LanguageProvider: ({ children, availableLanguages, }: LanguageProviderProps) => JSX.Element;
declare function useLanguageContext(): LanguageContext;
export { LanguageProvider, useLanguageContext };
//# sourceMappingURL=LanguageContext.d.ts.map