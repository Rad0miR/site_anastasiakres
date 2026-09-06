import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_LANGUAGE, dictionaries } from '../data/content'

/**
 * Выбранный язык — единственное, что версия хранит между визитами.
 *
 * Ключ с номером версии: у v3 своя память, и она не спорит ни с чем
 * другим на этом домене.
 */
const STORAGE_KEY = 'kres-v3-lang'

const LanguageContext = createContext(null)

/**
 * Язык всего сайта.
 *
 * Провайдер один на версию и стоит в самом верху (src/v3/App.jsx), потому
 * что текст нужен всем блокам сразу. Компоненты берут отсюда две вещи:
 * useText() — готовый словарь, useLanguage() — сам выбор для кнопки в шапке.
 *
 * Смена языка перерисовывает страницу целиком и меняет <html lang> —
 * это важно не только формально: по нему браузер выбирает переносы,
 * а скринридер — произношение.
 */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(restore)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  /* Запоминаем только осознанный выбор. Пока посетитель ничего не
     выбирал, в хранилище пусто — и он видит язык по умолчанию. */
  const choose = useCallback((next) => {
    if (!dictionaries[next]) return
    setLang(next)
    remember(next)
  }, [])

  const value = useMemo(() => ({ lang, choose, text: dictionaries[lang] }), [lang, choose])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

/** Весь текст сайта на выбранном языке — дерево из data/content. */
export function useText() {
  return use().text
}

/** Что выбрано и чем менять: { lang, choose }. */
export function useLanguage() {
  const { lang, choose } = use()
  return { lang, choose }
}

function use() {
  const value = useContext(LanguageContext)
  if (!value) {
    throw new Error('useText/useLanguage вне <LanguageProvider> — провайдер стоит в src/v3/App.jsx')
  }
  return value
}

/* Приватное окно и запрет на хранение данных роняют обращение к
   localStorage целиком, поэтому обе функции молча переживают отказ:
   сайт от невозможности запомнить язык ломаться не должен. */

function restore() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved && dictionaries[saved]) return saved
  } catch {
    /* не страшно: покажем язык по умолчанию */
  }
  return DEFAULT_LANGUAGE
}

function remember(lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    /* не страшно: выбор проживёт до перезагрузки */
  }
}
