import { content } from '../data/content'

/**
 * Логотип. Пишется всегда цельно: «Kres AI».
 *
 * Разделение на два <span> — только чтобы покрасить «AI» в розовый;
 * для копирования и для скринридера это одна строка «Kres AI».
 */
export default function Wordmark({ className = '' }) {
  const { first, accent } = content.brand
  return (
    <span className={`font-v2-sans font-extrabold tracking-v2-wordmark ${className}`}>
      <span className="text-v2-blush-50">{first}</span>{' '}
      <span className="text-v2-blush-200">{accent}</span>
    </span>
  )
}
