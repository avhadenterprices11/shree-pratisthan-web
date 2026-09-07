"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import enTranslations from "@/locales/en.json";
import mrTranslations from "@/locales/mr.json";
import hiTranslations from "@/locales/hi.json";

export type Language = "en" | "hi" | "mr";

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "hi", label: "Hindi", nativeLabel: "हिंदी" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी" },
];

const STORAGE_KEY = "website-language";

const DICTIONARIES: Record<Language, any> = {
  en: enTranslations,
  mr: mrTranslations,
  hi: hiTranslations,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, fallback?: string) => string;
  tArray: (path: string) => string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getNestedValue(obj: any, path: string): string | undefined {
  if (!obj || typeof obj !== "object") return undefined;
  const keys = path.split(".");
  let current: any = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  return typeof current === "string" ? current : undefined;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [isMounted, setIsMounted] = useState(false);

  // Safely initialize from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved && (saved === "en" || saved === "hi" || saved === "mr")) {
        setLanguageState(saved);
      }
    } catch {
      // localStorage may be disabled or restricted in private browsing
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const t = useCallback(
    (path: string, fallback?: string): string => {
      // 1. Try selected language dictionary
      const activeDict = DICTIONARIES[language];
      const val = getNestedValue(activeDict, path);
      if (val !== undefined) {
        return val;
      }

      // 2. Fallback to English dictionary
      if (language !== "en") {
        const enVal = getNestedValue(DICTIONARIES.en, path);
        if (enVal !== undefined) {
          return enVal;
        }
      }

      // 3. Fallback to provided fallback argument or the key path itself
      return fallback !== undefined ? fallback : path;
    },
    [language]
  );

  const tArray = useCallback(
    (path: string): string[] => {
      const keys = path.split(".");
      const resolve = (dict: any): string[] | undefined => {
        let cur = dict;
        for (const k of keys) {
          if (cur && typeof cur === "object" && k in cur) {
            cur = cur[k];
          } else {
            return undefined;
          }
        }
        return Array.isArray(cur) ? cur : undefined;
      };

      return resolve(DICTIONARIES[language]) || resolve(DICTIONARIES.en) || [];
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
