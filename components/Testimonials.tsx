'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const testimonials = [
  {
    name: 'Luca Moretti',
    role: 'Interior Designer',
    content:
      "I've ordered several pieces from this store, and each one feels handcrafted with real attention to detail. The textures, packaging, and finish all scream quality.",
    avatar: 'LM',
  },
  {
    name: 'Sofia Marino',
    role: 'Architect',
    content:
      'The balance between comfort and form is just incredible. Every piece elevates the space it inhabits.',
    avatar: 'SM',
  },
  {
    name: 'Daniel Cruz',
    role: 'Product Designer',
    content:
      'Each piece feels intentional — nothing unnecessary, nothing loud. Pure functional beauty.',
    avatar: 'DC',
  },
  {
    name: 'Giulia Rossi',
    role: 'Art Director',
    content:
      'The materials speak for themselves. Subtle and timeless. Exactly what modern living needs.',
    avatar: 'GR',
  },
  {
    name: 'Marco Bellini',
    role: 'Furniture Maker',
    content:
      'I bought one of their ceramic sets for my studio, and it instantly elevated the whole space. Minimal, elegant, and made to last.',
    avatar: 'MB',
  },
  {
    name: 'Ana Duarte',
    role: 'Interior Architect',
    content:
      'Every detail was perfect — from materials to final finish. True craftsmanship you can feel.',
    avatar: 'AD',
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-5xl md:text-6xl font-serif font-light text-primary-900 mb-6">
            What our clients say
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Real impressions from designers, architects, and homeowners who've
            experienced our furniture firsthand.
          </p>
        </motion.div>

        {/* Horizontal scroll carousel */}
        <div className="relative">
          <motion.div
            className="flex gap-6 pb-6"
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
            dragElastic={0.1}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="flex-shrink-0 w-80 bg-primary-50 rounded-2xl p-8"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -8 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-300 flex items-center justify-center text-primary-800 font-medium">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-primary-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-primary-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-primary-700 leading-relaxed">
                  {testimonial.content}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
