/**
 * Якоря разделов страницы.
 *
 * По ним прокручивают три ссылки: логотип в шапке и две кнопки первого
 * экрана. Держим их в одном месте, чтобы id в разметке и href в ссылке
 * не разошлись: переименовал здесь — поменялось везде.
 *
 * «Let’s connect ♡» в этом списке нет: она никуда не прокручивает, а
 * открывает форму связи поверх сайта (components/ConnectDialog.jsx).
 *
 * Плавность прокрутки задана один раз в src/index.css
 * (`scroll-behavior: smooth`) и сама отключается при системной настройке
 * «уменьшить движение».
 */
export const ANCHORS = {
  /** Верх страницы — логотип в шапке */
  top: 'top',
  /** «WHAT I CREATE» — кнопка «Content types ↓» */
  types: 'what-i-create',
  /** «MY VISUAL WORLD» */
  styles: 'visual-world',
  /** «WHERE YOU CAN FIND ME» — кнопка «My socials ↓» первого экрана */
  social: 'find-me',
}
