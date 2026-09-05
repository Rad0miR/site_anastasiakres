/**
 * Одиннадцать стилей блока «MY VISUAL WORLD».
 *
 *  name  — подпись на карточке
 *  image — имя файла в src/assets/kres БЕЗ расширения
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
 * Чтобы заменить картинку — положи файл с тем же именем в src/assets/kres.
 */
export const styles = [
  { id: 'cinematic', name: 'Cinematic', image: 'style-cinematic' },
  { id: 'cartoon', name: 'Cartoon', image: 'style-cartoon' },
  { id: 'disney', name: 'Disney / Pixar / DreamWorks', image: 'style-disney-pixar-dreamworks' },
  { id: 'vintage-disney', name: 'Vintage Disney', image: 'style-vintage-disney' },
  { id: 'surrealism', name: 'Surrealism', image: 'style-surrealism' },
  { id: 'ultra-realism', name: 'Ultra Realism', image: 'style-ultra-realism' },
  { id: 'luxury', name: 'Luxury', image: 'style-luxury' },
  { id: 'dark', name: 'Dark', image: 'style-dark' },
  { id: 'miniature-worlds', name: 'Miniature Worlds', image: 'style-miniature-worlds' },
  { id: 'anime', name: 'Anime', image: 'style-anime' },
  { id: 'cyberpunk', name: 'Cyberpunk', image: 'style-cyberpunk' },
]
