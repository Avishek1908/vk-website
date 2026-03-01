'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ImageTextSection() {
  return (
    <section className="py-24 bg-white relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src="https://www.ulistudio.in/static/media/team_image.0820056e.png"
                alt="Our Philosophy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="text-sm font-medium tracking-widest text-primary-600">
              OUR PHILOSOPHY
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-primary-900">
              Built for the way
              <br />
              you live.
            </h2>
            <p className="text-lg text-primary-600 leading-relaxed">
              Transform your spaces with unique accents and furnishing tailored to
              your style. Each piece is thoughtfully designed to balance form,
              comfort, and timeless elegance.
            </p>
            <motion.button
              className="mt-6 px-8 py-3 border-2 border-primary-900 text-primary-900 rounded-full font-medium hover:bg-primary-900 hover:text-white transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Furniture
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
