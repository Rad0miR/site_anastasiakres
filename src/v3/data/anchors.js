/**
 * Якоря разделов страницы.
 *
 * По ним прокручивают три ссылки: «Let’s connect ♡» в шапке и две кнопки
 * первого экрана. Держим их в одном месте, чтобы id в разметке и href
 * в ссылке не разошлись: переименовал здесь — поменялось везде.
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
  /** «WHERE YOU CAN FIND ME» — кнопка «My socials ↓» и шапка */
  social: 'find-me',
}
