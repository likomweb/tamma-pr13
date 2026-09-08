import { fr } from './fr';
import { en } from './en';
import { ar } from './ar';
import { Language } from '../types';

export const translations = { fr, en, ar };

export function getTranslation(lang: Language) {
  return translations[lang] || translations.fr;
}
