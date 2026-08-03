import { memo } from 'react'

/**
 * Нарисованная кодом атмосфера карточки.
 *
 * Работает как самостоятельный фон — сайт красивый даже без фотографий.
 * Когда в src/assets/images появится файл, он ложится сверху,
 * а эти слои остаются как свет, частицы и глубина.
 *
 * Все слои анимируются только transform / opacity → 60 fps на телефоне.
 */

const repeat = (n, fn) => Array.from({ length: n }, (_, i) => fn(i))

/* ---------------------------------------------------------------- *
 *  1. apartment — стильная квартира, путешествия, мягкий свет
 * ---------------------------------------------------------------- */
function Apartment() {
  return (
    <>
      <div className="layer bg-[linear-gradient(155deg,#F5E3E0_0%,#E8CFCB_38%,#B99A96_72%,#4A3B3A_100%)]" />

      {/* тёплый свет из окна — слева, чтобы не спорить со стикером справа */}
      <div
        className="layer opacity-70 mix-blend-screen"
        style={{
          background:
            'radial-gradient(60% 55% at 20% 10%, rgba(255,238,220,0.95) 0%, rgba(255,214,190,0.35) 45%, transparent 72%)',
          animation: 'aurora 14s var(--ease-silk) infinite',
        }}
      />

      {/* окно с переплётом — от него читается «квартира» */}
      <div className="pointer-events-none absolute left-[9%] top-[9%] h-[40%] w-[33%]">
        <div className="absolute -inset-4 rounded-[18px] bg-[radial-gradient(circle,rgba(255,236,214,0.6),transparent_72%)] blur-[12px]" />
        <div className="absolute inset-0 rounded-[6px] bg-[linear-gradient(168deg,rgba(255,251,242,0.95),rgba(255,224,200,0.45))] blur-[1px]" />
        <div className="absolute left-1/2 top-0 h-full w-[2.5px] -translate-x-1/2 bg-[rgba(74,59,58,0.32)]" />
        <div className="absolute left-0 top-[44%] h-[2.5px] w-full bg-[rgba(74,59,58,0.32)]" />
        <div className="absolute inset-0 rounded-[6px] ring-[2.5px] ring-inset ring-[rgba(74,59,58,0.28)]" />
      </div>

      {/* штора справа от окна */}
      <div className="pointer-events-none absolute left-[43%] top-0 h-[62%] w-[13%] bg-[linear-gradient(90deg,rgba(255,246,238,0.55),transparent)] blur-[8px]" />

      {/* лучи из окна */}
      <div className="layer overflow-hidden opacity-45 mix-blend-screen">
        {repeat(3, (i) => (
          <div
            key={i}
            className="absolute -top-[30%] h-[170%] w-[16%] -rotate-[18deg] bg-[linear-gradient(180deg,rgba(255,244,232,0.85),transparent_78%)] blur-[6px]"
            style={{ left: `${8 + i * 17}%`, animation: `drift ${16 + i * 4}s ease-in-out infinite` }}
          />
        ))}
      </div>

      {/* пылинки в луче */}
      <div className="layer overflow-hidden">
        {repeat(14, (i) => (
          <span
            key={i}
            className="absolute h-[3px] w-[3px] rounded-full bg-white/85"
            style={{
              left: `${12 + ((i * 37) % 80)}%`,
              top: `${45 + ((i * 23) % 50)}%`,
              animation: `dust ${9 + (i % 5) * 2.4}s linear ${i * 0.7}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="layer bg-[radial-gradient(120%_90%_at_50%_115%,rgba(46,32,34,0.82)_0%,transparent_60%)]" />
    </>
  )
}

/* ---------------------------------------------------------------- *
 *  2. lab — футуристическая лаборатория, голограммы, неон
 * ---------------------------------------------------------------- */
function Lab() {
  return (
    <>
      <div className="layer bg-[linear-gradient(165deg,#14141A_0%,#1B1B24_45%,#2E2129_78%,#3D2730_100%)]" />

      {/* перспективная сетка */}
      <div
        className="layer opacity-[0.22]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(236,185,196,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(236,185,196,0.45) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          transform: 'perspective(420px) rotateX(62deg) translateY(24%) scale(1.7)',
          transformOrigin: 'bottom',
          maskImage: 'linear-gradient(to top, black 0%, transparent 62%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 62%)',
        }}
      />

      {/* голографические кольца */}
      <div className="layer grid place-items-center">
        {repeat(3, (i) => (
          <div
            key={i}
            className="absolute rounded-full border border-rose-300/40"
            style={{
              width: `${34 + i * 16}%`,
              aspectRatio: '1',
              animation: `pulse-ring ${5 + i * 1.6}s ease-in-out ${i * 0.5}s infinite`,
              boxShadow: '0 0 34px rgba(236,185,196,0.28)',
            }}
          />
        ))}
      </div>

      {/* неоновые линии данных */}
      <div className="layer overflow-hidden">
        {repeat(5, (i) => (
          <span
            key={i}
            className="absolute h-px w-[42%] bg-[linear-gradient(90deg,transparent,rgba(244,214,222,0.95),transparent)]"
            style={{
              top: `${18 + i * 15}%`,
              left: i % 2 ? '-40%' : '55%',
              animation: `streak ${4.5 + i * 1.1}s ease-in-out ${i * 0.8}s infinite`,
            }}
          />
        ))}
      </div>

      {/* сканирующий луч */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[16%] bg-[linear-gradient(180deg,transparent,rgba(255,225,232,0.18),transparent)]"
        style={{ animation: 'scan 7s linear infinite' }}
      />

      {/* частицы данных */}
      <div className="layer overflow-hidden">
        {repeat(16, (i) => (
          <span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-rose-200"
            style={{
              left: `${(i * 61) % 96}%`,
              top: `${(i * 43) % 92}%`,
              boxShadow: '0 0 8px rgba(243,210,218,0.9)',
              animation: `floaty ${4 + (i % 6)}s ease-in-out ${i * 0.35}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="layer bg-[radial-gradient(120%_90%_at_50%_118%,rgba(10,10,14,0.92)_0%,transparent_58%)]" />
    </>
  )
}

/* ---------------------------------------------------------------- *
 *  3. desk — рабочий стол, блокнот, кофе, тёплый свет
 * ---------------------------------------------------------------- */
function Desk() {
  return (
    <>
      <div className="layer bg-[linear-gradient(160deg,#EADACD_0%,#D6BCAE_40%,#8E6E60_74%,#3B2C27_100%)]" />

      {/* свет настольной лампы */}
      <div
        className="layer mix-blend-screen"
        style={{
          background:
            'radial-gradient(48% 46% at 24% 16%, rgba(255,232,198,0.95) 0%, rgba(255,206,168,0.32) 46%, transparent 74%)',
          animation: 'aurora 12s var(--ease-silk) infinite',
        }}
      />

      {/* столешница */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(180deg,rgba(94,70,58,0.55),rgba(48,34,28,0.9))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[38%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,232,206,0.55),transparent)]" />

      {/* открытый блокнот — выше подписи, чтобы не спорить с текстом */}
      <div
        className="pointer-events-none absolute bottom-[24%] left-[29%] h-[19%] w-[34%] rounded-[3px] bg-[linear-gradient(160deg,#FBF3E8,#D8C3AE)] shadow-[0_14px_26px_-12px_rgba(30,20,16,0.7)]"
        style={{ transform: 'rotate(-7deg)' }}
      >
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[rgba(120,96,80,0.45)]" />
        <div
          className="absolute inset-y-[18%] left-[8%] w-[34%] opacity-45"
          style={{
            backgroundImage: 'linear-gradient(rgba(90,70,56,0.9) 1px, transparent 1px)',
            backgroundSize: '100% 9px',
          }}
        />
      </div>

      {/* кофе */}
      <svg
        viewBox="0 0 62 60"
        className="pointer-events-none absolute bottom-[29%] left-[11%] h-[15%] w-auto"
        aria-hidden="true"
      >
        <ellipse cx="27" cy="54" rx="25" ry="4.5" fill="rgba(24,16,12,0.45)" />
        <path d="M10 17 H44 V37 C44 45 38 51 30 51 H24 C16 51 10 45 10 37 Z" fill="#33241E" />
        <path d="M44 21 C53 21 58 25 58 30 C58 35 53 39 44 39 V34 C49 34 52 32 52 30 C52 28 49 26 44 26 Z" fill="#33241E" />
        <ellipse cx="27" cy="17" rx="17" ry="4" fill="#6B5245" />
      </svg>

      {/* пар над кофе */}
      <div className="layer overflow-hidden">
        {repeat(4, (i) => (
          <span
            key={i}
            className="absolute bottom-[42%] h-14 w-[6px] rounded-full bg-[linear-gradient(180deg,rgba(255,246,236,0.75),transparent)] blur-[5px]"
            style={{
              left: `${13 + i * 4}%`,
              animation: `steam ${5 + i * 1.3}s ease-out ${i * 1.1}s infinite`,
            }}
          />
        ))}
      </div>

      {/* тёплая пыль */}
      <div className="layer overflow-hidden">
        {repeat(9, (i) => (
          <span
            key={i}
            className="absolute h-[3px] w-[3px] rounded-full bg-[#FFE9CF]"
            style={{
              left: `${(i * 53) % 90}%`,
              top: `${50 + ((i * 29) % 44)}%`,
              animation: `dust ${11 + (i % 4) * 2.5}s linear ${i * 1.2}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="layer bg-[radial-gradient(120%_92%_at_50%_115%,rgba(38,27,23,0.85)_0%,transparent_60%)]" />
    </>
  )
}

/* ---------------------------------------------------------------- *
 *  4. ocean — тёмный океан, кит, лунный свет (главная карточка)
 * ---------------------------------------------------------------- */
function Ocean() {
  return (
    <>
      <div className="layer bg-[linear-gradient(180deg,#0B1620_0%,#0C2030_34%,#0A2436_58%,#061219_100%)]" />

      {/* луна */}
      <div
        className="layer mix-blend-screen"
        style={{
          background:
            'radial-gradient(34% 44% at 72% -6%, rgba(226,240,248,0.9) 0%, rgba(180,206,224,0.28) 40%, transparent 70%)',
        }}
      />

      {/* лунные столбы света */}
      <div className="layer overflow-hidden opacity-55 mix-blend-screen">
        {repeat(4, (i) => (
          <div
            key={i}
            className="absolute -top-[20%] h-[150%] w-[13%] rotate-[10deg] bg-[linear-gradient(180deg,rgba(214,234,246,0.7),transparent_72%)] blur-[8px]"
            style={{ left: `${44 + i * 13}%`, animation: `drift ${18 + i * 5}s ease-in-out infinite` }}
          />
        ))}
      </div>

      {/* каустика воды */}
      <div
        className="layer mix-blend-soft-light"
        style={{
          background:
            'radial-gradient(38% 22% at 24% 30%, rgba(190,226,244,0.85), transparent 60%), radial-gradient(30% 18% at 66% 52%, rgba(214,238,250,0.7), transparent 62%), radial-gradient(44% 24% at 44% 74%, rgba(168,212,236,0.6), transparent 64%)',
          animation: 'caustic 16s ease-in-out infinite',
        }}
      />

      {/* силуэт кита */}
      <div className="layer grid place-items-center overflow-hidden">
        <svg
          viewBox="0 0 200 100"
          className="w-[86%] max-w-[600px] translate-y-[4%] opacity-55 blur-[1px]"
          style={{ animation: 'swim 26s ease-in-out infinite' }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="whaleFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9CC4DC" />
              <stop offset="55%" stopColor="#3E6D8C" />
              <stop offset="100%" stopColor="#0A1C2A" />
            </linearGradient>
          </defs>
          <g fill="url(#whaleFill)">
            {/* тело горбача */}
            <path d="M8 56 C26 33 62 23 100 29 C122 32 140 41 154 50 L176 37 C181 34 186 38 183 43 L174 59 L187 73 C191 77 186 83 181 80 L154 66 C138 75 112 81 86 79 C52 76 22 68 8 56 Z" />
            {/* грудной плавник */}
            <path d="M80 68 C88 82 102 93 120 96 C104 86 92 76 88 65 Z" opacity="0.9" />
            {/* спинной плавник */}
            <path d="M104 28 C110 19 120 14 130 13 C119 19 111 25 108 31 Z" opacity="0.8" />
            {/* светлое брюхо */}
            <path
              d="M26 60 C48 71 78 77 104 76 C88 79 56 78 26 60 Z"
              fill="#BBD8E8"
              opacity="0.45"
            />
          </g>
        </svg>
      </div>

      {/* пузырьки */}
      <div className="layer overflow-hidden">
        {repeat(12, (i) => (
          <span
            key={i}
            className="absolute bottom-0 rounded-full border border-cyan-100/45 bg-cyan-50/15"
            style={{
              left: `${(i * 47) % 94}%`,
              width: `${3 + (i % 4) * 2}px`,
              height: `${3 + (i % 4) * 2}px`,
              animation: `rise ${12 + (i % 6) * 3}s linear ${i * 1.4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* планктон / искры */}
      <div className="layer overflow-hidden">
        {repeat(10, (i) => (
          <span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-[#DCEFFA]"
            style={{
              left: `${(i * 71) % 92}%`,
              top: `${(i * 37) % 88}%`,
              boxShadow: '0 0 10px rgba(220,239,250,0.9)',
              animation: `floaty ${5 + (i % 5) * 1.7}s ease-in-out ${i * 0.6}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="layer bg-[radial-gradient(130%_95%_at_50%_112%,rgba(3,10,16,0.92)_0%,transparent_62%)]" />
    </>
  )
}

/* ---------------------------------------------------------------- *
 *  5. city — яркие городские огни
 * ---------------------------------------------------------------- */
function City() {
  return (
    <>
      <div className="layer bg-[linear-gradient(170deg,#161018_0%,#241722_42%,#3A1E2B_72%,#120C11_100%)]" />

      {/* зарево города */}
      <div
        className="layer mix-blend-screen"
        style={{
          background:
            'radial-gradient(70% 40% at 50% 104%, rgba(236,150,170,0.6) 0%, rgba(255,196,168,0.22) 40%, transparent 72%)',
          animation: 'aurora 11s var(--ease-silk) infinite',
        }}
      />

      {/* силуэт зданий */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] opacity-90"
        style={{
          background:
            'linear-gradient(90deg, #0E0A0E 0 9%, transparent 9% 12%, #120C12 12% 22%, transparent 22% 26%, #0D090D 26% 38%, transparent 38% 41%, #140D14 41% 55%, transparent 55% 59%, #0E0A0E 59% 70%, transparent 70% 74%, #120C12 74% 88%, transparent 88% 91%, #0D090D 91% 100%)',
          maskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
        }}
      />

      {/* окна */}
      <div className="layer overflow-hidden">
        {repeat(26, (i) => (
          <span
            key={i}
            className="absolute h-[3px] w-[5px] rounded-[1px] bg-[#FFD9C0]"
            style={{
              left: `${(i * 29) % 96}%`,
              bottom: `${4 + ((i * 17) % 32)}%`,
              opacity: 0.25 + ((i * 7) % 6) / 10,
              animation: `floaty ${6 + (i % 5) * 2}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      {/* боке */}
      <div className="layer overflow-hidden">
        {repeat(11, (i) => (
          <span
            key={i}
            className="absolute rounded-full blur-[7px]"
            style={{
              left: `${(i * 53) % 92}%`,
              top: `${(i * 41) % 78}%`,
              width: `${14 + (i % 5) * 9}px`,
              height: `${14 + (i % 5) * 9}px`,
              background:
                i % 3 === 0
                  ? 'rgba(255,206,214,0.55)'
                  : i % 3 === 1
                    ? 'rgba(255,224,196,0.5)'
                    : 'rgba(226,232,244,0.42)',
              animation: `bokeh ${7 + (i % 6) * 2}s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </div>

      {/* неоновые росчерки */}
      <div className="layer overflow-hidden">
        {repeat(3, (i) => (
          <span
            key={i}
            className="absolute h-[2px] w-[55%] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,190,205,0.95),transparent)] blur-[1px]"
            style={{
              top: `${26 + i * 20}%`,
              left: '-50%',
              animation: `streak ${5 + i * 1.4}s ease-in-out ${i * 1.3}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="layer bg-[radial-gradient(120%_92%_at_50%_116%,rgba(9,6,9,0.9)_0%,transparent_58%)]" />
    </>
  )
}

/* ---------------------------------------------------------------- *
 *  6. moodboard — фотографии, палитры, интерьер
 * ---------------------------------------------------------------- */
function Moodboard() {
  const cards = [
    { left: '8%', top: '14%', w: 26, h: 32, tilt: '-7deg' },
    { left: '38%', top: '8%', w: 22, h: 27, tilt: '4deg' },
    { left: '64%', top: '18%', w: 27, h: 33, tilt: '-4deg' },
    { left: '16%', top: '52%', w: 24, h: 29, tilt: '6deg' },
    { left: '52%', top: '56%', w: 29, h: 30, tilt: '-3deg' },
  ]
  const swatches = ['#F3D2DA', '#E7C3B4', '#C99AA6', '#8E6C74', '#F7EDE7']

  return (
    <>
      <div className="layer bg-[linear-gradient(160deg,#F2E4E2_0%,#E3C9C8_36%,#B08D92_70%,#3A2A2E_100%)]" />

      <div
        className="layer mix-blend-screen"
        style={{
          background:
            'radial-gradient(55% 50% at 22% 10%, rgba(255,244,238,0.9) 0%, transparent 68%)',
          animation: 'aurora 15s var(--ease-silk) infinite',
        }}
      />

      {/* полароиды */}
      <div className="layer overflow-hidden">
        {cards.map((c, i) => (
          <div
            key={i}
            className="absolute rounded-[6px] border border-white/60 bg-white/25 p-[6%] backdrop-blur-[2px]"
            style={{
              left: c.left,
              top: c.top,
              width: `${c.w}%`,
              height: `${c.h}%`,
              '--tilt': c.tilt,
              boxShadow: '0 14px 30px -14px rgba(58,36,42,0.55)',
              animation: `sway ${9 + i * 2.2}s ease-in-out ${i * 0.7}s infinite`,
            }}
          >
            <div
              className="h-full w-full rounded-[3px]"
              style={{
                background: `linear-gradient(150deg, ${swatches[i % swatches.length]}, rgba(255,255,255,0.35))`,
              }}
            />
          </div>
        ))}
      </div>

      {/* палитра-чипы */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[16%] flex justify-center gap-[6px]">
        {swatches.map((s, i) => (
          <span
            key={i}
            className="h-3 w-3 rounded-full ring-1 ring-white/60"
            style={{
              background: s,
              animation: `floaty ${5 + i}s ease-in-out ${i * 0.4}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="layer bg-[radial-gradient(120%_92%_at_50%_114%,rgba(40,26,30,0.86)_0%,transparent_60%)]" />
    </>
  )
}

const SCENES = {
  apartment: Apartment,
  lab: Lab,
  desk: Desk,
  ocean: Ocean,
  city: City,
  moodboard: Moodboard,
}

function CardAtmosphere({ theme }) {
  const Scene = SCENES[theme] ?? Apartment
  return (
    <div className="layer overflow-hidden" aria-hidden="true">
      <Scene />
    </div>
  )
}

export default memo(CardAtmosphere)
