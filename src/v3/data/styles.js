/**
 * Одиннадцать стилей блока «MY VISUAL WORLD».
 *
 *  id    — по нему берётся подпись из словаря языка (styles.items
 *          в src/v3/data/content)
 *  image — имя файла в src/v3/assets БЕЗ расширения
 *
 * Соответствие «номер присланной картинки → стиль» взято из раздела 8 ТЗ
 * («использовать именно это соответствие») и проверено по самим файлам:
 *
 *   1 → Cinematic            7  → Luxury
 *   2 → Cartoon              8  → Dark
 *   3 → Disney / Pixar /     9  → Miniature Worlds
 *       DreamWorks           10 → Anime
 *   4 → Vintage Disney       11 → Cyberpunk
 *   5 → Surrealism
 *   6 → Ultra Realism
 *
 * Порядок массива = порядок карточек в карусели.
 * Чтобы заменить картинку — положи файл с тем же именем в src/v3/assets.
 */
export const styles = [
  { id: 'cinematic', image: 'style-cinematic' },
  { id: 'cartoon', image: 'style-cartoon' },
  { id: 'disney', image: 'style-disney-pixar-dreamworks' },
  { id: 'vintage-disney', image: 'style-vintage-disney' },
  { id: 'surrealism', image: 'style-surrealism' },
  { id: 'ultra-realism', image: 'style-ultra-realism' },
  { id: 'luxury', image: 'style-luxury' },
  { id: 'dark', image: 'style-dark' },
  { id: 'miniature-worlds', image: 'style-miniature-worlds' },
  { id: 'anime', image: 'style-anime' },
  { id: 'cyberpunk', image: 'style-cyberpunk' },
]
