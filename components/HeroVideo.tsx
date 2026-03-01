'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface HeroVideoProps {
  videoSrc?: string
  posterImage?: string
  overlayOpacity?: number
}

export default function HeroVideo({
  videoSrc = 'https://videos.pexels.com/video-files/5823583/5823583-uhd_3840_2160_24fps.mp4',
  posterImage = 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1920&q=80&auto=format&fit=crop',
  overlayOpacity = 0.5,
}: HeroVideoProps) {
  const heroRef = useRef<HTMLElement>(null)
  
  // Track scroll progress of hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Transform scroll to animation values
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])
  const overlayOpacityValue = useTransform(scrollYProgress, [0, 0.8], [overlayOpacity, 0])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        {/* Desktop Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterImage}
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Fallback to poster image if video fails to load
            const video = e.currentTarget;
            video.style.display = 'none';
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Mobile Fallback Image */}
        <div
          className="block md:hidden absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${posterImage})` }}
        />

        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"
          style={{ opacity: overlayOpacityValue }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 text-center text-white"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.span
          className="inline-block text-sm font-medium tracking-widest text-white/80 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          ©18-25
        </motion.span>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-6 leading-[1.1] drop-shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Built for the way
          <br />
          <span className="italic">you live.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Explore our furniture collection designed to bring timeless elegance
          into every space.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.button
            className="px-8 py-4 bg-white text-primary-900 rounded-full font-medium shadow-xl hover:bg-white/90 transition-colors"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Explore Collection
          </motion.button>
          <motion.button
            className="px-8 py-4 border-2 border-white text-white rounded-full font-medium backdrop-blur-sm hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
        transition={{
          opacity: { delay: 1.4, duration: 0.6 },
          y: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
        }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
