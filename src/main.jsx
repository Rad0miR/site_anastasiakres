import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import V1App from './v1/V1App.jsx'
import { isV1 } from './lib/version'
import './index.css'

const Site = isV1() ? V1App : App

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* reducedMotion="user" — при системной настройке «уменьшить движение»
        Framer Motion сам гасит сдвиги и масштабы, оставляя мягкое проявление */}
    <MotionConfig reducedMotion="user">
      <Site />
    </MotionConfig>
  </React.StrictMode>,
)
