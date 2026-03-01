'use client'

import { motion } from 'framer-motion'

export default function AnnouncementBanner() {
  const text = 'Get 10% Off Black Friday Sale'
  const repeatedText = Array(20).fill(text).join(' • ')

  return (
    <div className="bg-primary-900 text-white py-3 overflow-hidden relative">
      <motion.div
        className="whitespace-nowrap flex"
        animate={{
          x: [0, -1920],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <span className="text-sm font-medium tracking-wide">
          {repeatedText} • {repeatedText}
        </span>
      </motion.div>
    </div>
  )
}
