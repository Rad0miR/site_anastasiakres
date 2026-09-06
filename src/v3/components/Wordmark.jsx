import { brand } from '../data/brand'

/**
 * Логотип. Пишется всегда цельно: «Kres AI».
 *
 * Разделение на два <span> — только чтобы покрасить «AI» в розовый;
 * для копирования и для скринридера это одна строка «Kres AI».
 */
export default function Wordmark({ className = '' }) {
  const { first, accent } = brand
  return (
    <span className={`font-v3-sans font-extrabold tracking-v3-wordmark ${className}`}>
      <span className="text-v3-blush-50">{first}</span>{' '}
      <span className="text-v3-blush-200">{accent}</span>
    </span>
  )
}
