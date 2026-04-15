import { createContext, useContext, useState } from 'react'
import translations from '../i18n'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en')

  function t(key) {
    const val = translations[lang]?.[key] ?? translations['en']?.[key] ?? key
    return val
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
