import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

/**
 * Открыта ли форма связи «Let’s connect ♡».
 *
 * Состояние вынесено в провайдер, потому что открывают форму из двух
 * разных мест страницы — кнопкой в шапке (components/Header.jsx) и
 * кнопкой под соцсетями (components/ConnectInvite.jsx), — а рисуется
 * она третьим (components/ConnectDialog.jsx). Провайдер стоит в
 * src/v3/App.jsx, рядом с LanguageProvider.
 *
 * Здесь только «открыто/закрыто». Всё, что посетитель набрал в полях,
 * живёт внутри самой формы и исчезает вместе с ней: заявка нигде не
 * сохраняется — ни в localStorage, ни на сайте.
 */
const ConnectContext = createContext(null)

export function ConnectProvider({ children }) {
  const [open, setOpen] = useState(false)

  /* Кнопка, которой открыли форму: закрыв окно, фокус возвращаем на неё.
     Иначе он остался бы в исчезнувшей разметке, и следующий Tab начал бы
     обход страницы с начала. */
  const opener = useRef(null)

  const openConnect = useCallback(() => {
    opener.current = document.activeElement
    setOpen(true)
  }, [])

  const closeConnect = useCallback(() => {
    setOpen(false)
    opener.current?.focus?.()
    opener.current = null
  }, [])

  const value = useMemo(
    () => ({ open, openConnect, closeConnect }),
    [open, openConnect, closeConnect],
  )

  return <ConnectContext.Provider value={value}>{children}</ConnectContext.Provider>
}

/** { open, openConnect, closeConnect } */
export function useConnect() {
  const value = useContext(ConnectContext)
  if (!value) {
    throw new Error('useConnect вне <ConnectProvider> — провайдер стоит в src/v3/App.jsx')
  }
  return value
}
