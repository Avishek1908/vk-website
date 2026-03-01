'use client'

import { motion } from 'framer-motion'

export default function BalanceSection() {
  return (
    <section className="py-24 bg-primary-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-5xl md:text-6xl font-serif font-light text-primary-900 mb-6">
            The art of balance
          </h2>
          <p className="text-xl text-primary-600 max-w-2xl mx-auto">
            Transform your spaces with unique accents and furnishing tailored to
            your style.
          </p>
        </motion.div>

        <motion.div
          className="relative aspect-[16/9] max-w-6xl mx-auto rounded-3xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-200 via-primary-300 to-primary-400">
            {/* Placeholder for balance image */}
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-primary-600 text-lg">Balance Lifestyle Image</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
