import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { CURRENT, resolveVersion } from './versions'
import './index.css'

/**
 * Точка входа, общая на все версии сайта.
 *
 * Делает ровно три вещи: узнаёт по адресу, какую версию открыли
 * (правило — в src/versions.js), приводит <head> в соответствие с ней
 * и рисует её. Ничего оформительского здесь нет и быть не должно.
 */
const version = resolveVersion()

applyHead(version)

// Код версии приезжает отдельным файлом — грузится только та, которую
// открыли. Пока файл в пути, показывать нечего: фон уже закрашен в
// src/index.css, поэтому пустой fallback выглядит как обычная загрузка.
const Site = lazy(version.load)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* reducedMotion="user" — при системной настройке «уменьшить движение»
        Framer Motion сам гасит сдвиги и масштабы, оставляя мягкое проявление */}
    <MotionConfig reducedMotion="user">
      <Suspense fallback={null}>
        <Site />
      </Suspense>
    </MotionConfig>
  </React.StrictMode>,
)

/**
 * Заголовок вкладки, описание, цвет строки браузера и шрифты — у каждой
 * версии свои. В index.html лежат значения актуальной версии (чтобы
 * браузер увидел их до всякого JS), остальные проставляются здесь.
 */
function applyHead({ id, lang, title, description, themeColor, fonts }) {
  document.documentElement.lang = lang
  document.title = title

  setMeta('name', 'description', description)
  setMeta('name', 'theme-color', themeColor)
  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', description)

  // Старые версии остаются доступными по ссылке, но в поиске не должны
  // конкурировать с актуальной.
  if (id !== CURRENT) setMeta('name', 'robots', 'noindex, follow')

  loadFonts(fonts)
}

function setMeta(attribute, name, content) {
  if (!content) return
  const selector = `meta[${attribute}="${name}"]`
  const tag = document.head.querySelector(selector) ?? document.createElement('meta')
  tag.setAttribute(attribute, name)
  tag.setAttribute('content', content)
  if (!tag.isConnected) document.head.append(tag)
}

/** Шрифты актуальной версии уже подключены в index.html — тогда пропускаем. */
function loadFonts(href) {
  if (!href || document.head.querySelector(`link[href="${href}"]`)) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  document.head.append(link)
}
