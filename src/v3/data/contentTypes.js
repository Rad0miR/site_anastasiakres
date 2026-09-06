/**
 * Одиннадцать категорий блока «WHAT I CREATE».
 *
 * Здесь только порядок и значок: название берётся по id из словаря языка
 * (types.items в src/v3/data/content). Ключ icon — из
 * src/v3/components/icons.jsx.
 *
 * Блок намеренно без картинок: только название и маленькая контурная иконка.
 */
export const contentTypes = [
  { id: 'ai-images', icon: 'image' },
  { id: 'ai-videos', icon: 'video' },
  { id: 'ai-animation', icon: 'sparkles' },
  { id: 'ai-characters', icon: 'person' },
  { id: 'ai-influencers', icon: 'star' },
  { id: 'cartoons', icon: 'cat' },
  { id: 'animated-stories', icon: 'book' },
  { id: 'animated-series', icon: 'clapper' },
  { id: 'product-content', icon: 'cube' },
  { id: 'social-content', icon: 'phone' },
  { id: 'visual-storytelling', icon: 'pencil' },
]
