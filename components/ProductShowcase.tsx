'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'

const products = [
  { 
    name: 'Chair 1', 
    price: '₹66,400', 
    image: 'chair',
    imageUrl: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    name: 'Sofa 1', 
    price: '₹82,000', 
    image: 'lounge',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    name: 'Chair 2', 
    price: '₹34,000', 
    image: 'stool',
    imageUrl: 'https://images.unsplash.com/photo-1612372606404-0ab33e7187ee?q=80&w=756&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    name: 'Coffee Table', 
    price: '₹1,56,000', 
    image: 'bench',
    imageUrl: 'https://images.unsplash.com/photo-1542372147193-a7aca54189cd?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    name: 'Chair 3', 
    price: '₹27,500', 
    image: 'lume',
    imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    name: 'Table 2', 
    price: '₹17,500', 
    image: 'cava',
    imageUrl: 'https://images.unsplash.com/photo-1565791380713-1756b9a05343?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  
  // Track scroll progress through this section's parent wrapper
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Map scroll progress to translateY: starts at 100% (below viewport), ends at 0%
  const translateY = useTransform(scrollYProgress, [0, 0.5], ["100%", "0%"])
  
  return (
    <motion.section 
      ref={sectionRef}
      style={{ translateY }}
      className="py-24 bg-primary-50 relative"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-5xl md:text-6xl font-serif font-light text-primary-900 mb-6">
            Pieces that speak softly.
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8">
            Explore a curated selection of modern Indian furniture — designed to
            balance form, comfort, and emotion.
          </p>
          <motion.button
            className="px-8 py-3 bg-primary-900 text-white rounded-full font-medium hover:bg-primary-800 transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Discover the Goodies
          </motion.button>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/shop/${product.name.toLowerCase().replace(' ', '-')}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-square rounded-2xl bg-white mb-4 overflow-hidden relative shadow-sm">
                    {/* Product image with zoom effect on hover */}
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-medium text-primary-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-primary-600">
                    {product.price}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
