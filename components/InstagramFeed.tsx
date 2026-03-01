'use client'

import { motion } from 'framer-motion'

export default function InstagramFeed() {
  const posts = Array(6).fill(null)

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
            On the Feed
          </h2>
          <p className="text-xl text-primary-600 max-w-2xl mx-auto">
            Follow our journey — where craftsmanship meets everyday living.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {posts.map((_, index) => (
            <motion.div
              key={index}
              className="aspect-square rounded-xl bg-primary-200 overflow-hidden cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                <span className="text-primary-500 text-xs">Instagram {index + 1}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
