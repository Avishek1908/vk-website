'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export interface Hotspot {
  id: string
  label: string
  description?: string
  price?: string
  href: string
  position: {
    x: number // percentage 0-100
    y: number // percentage 0-100
  }
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right'
}

interface ShopTheLookProps {
  imageSrc: string
  imageAlt?: string
  hotspots: Hotspot[]
  title?: string
  subtitle?: string
  imagePosition?: string // object-position for image (e.g., 'center', 'right center')
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const hotspotVariants = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
}

const tooltipVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
}

export default function ShopTheLook({
  imageSrc = 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1920&q=80',
  imageAlt = 'Shop the Look',
  hotspots = [],
  title = 'Shop the Look',
  subtitle = 'Hover over the products to explore and shop our curated collection',
  imagePosition = 'center', // Default to center, can be 'right center', 'left center', etc.
}: ShopTheLookProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null)
  const [debugPositions, setDebugPositions] = useState<Record<string, { x: number; y: number }>>(
    hotspots.reduce((acc, h) => ({ ...acc, [h.id]: h.position }), {})
  )
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  
  // Debug mode: Enable with ?debugHotspots=true
  const isDebugMode = searchParams?.get('debugHotspots') === 'true'

  const handleHotspotClick = (hotspot: Hotspot) => {
    if (activeHotspot === hotspot.id) {
      // Second tap on mobile or click on desktop - navigate
      window.location.href = hotspot.href
    } else {
      // First tap on mobile - show tooltip
      setActiveHotspot(hotspot.id)
    }
  }

  const isHotspotActive = (id: string) => {
    return activeHotspot === id || hoveredHotspot === id
  }

  const getTooltipPosition = (placement?: string) => {
    switch (placement) {
      case 'top':
        return 'bottom-full mb-4 left-1/2 -translate-x-1/2'
      case 'bottom':
        return 'top-full mt-4 left-1/2 -translate-x-1/2'
      case 'left':
        return 'right-full mr-4 top-1/2 -translate-y-1/2'
      case 'right':
        return 'left-full ml-4 top-1/2 -translate-y-1/2'
      default:
        return 'bottom-full mb-4 left-1/2 -translate-x-1/2'
    }
  }

  const handleDragEnd = (hotspotId: string, event: any, info: any) => {
    if (!imageContainerRef.current) return

    const container = imageContainerRef.current.getBoundingClientRect()
    const newX = ((info.point.x - container.left) / container.width) * 100
    const newY = ((info.point.y - container.top) / container.height) * 100

    // Clamp between 0-100%
    const clampedX = Math.max(0, Math.min(100, newX))
    const clampedY = Math.max(0, Math.min(100, newY))

    setDebugPositions((prev) => ({
      ...prev,
      [hotspotId]: { x: clampedX, y: clampedY },
    }))

    console.log(`🎯 Hotspot "${hotspotId}" repositioned:`)
    console.log(`position: { x: ${clampedX.toFixed(1)}, y: ${clampedY.toFixed(1)} },`)
  }

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f5ebe0] to-[#ede0d4]">
      {/* Contained Layout with Max Width */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        {/* Header Section */}
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {title && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-primary-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base md:text-lg text-primary-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
            {isDebugMode && (
              <div className="mt-4 inline-block px-4 py-2 bg-red-500 text-white text-sm rounded-full font-medium">
                🐛 Debug Mode Active - Drag hotspots to reposition
              </div>
            )}
          </motion.div>
        )}

        {/* Split Layout: Image + Product List */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left Side: Featured Image with Hotspots (60% - 3 cols) */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              ref={imageContainerRef}
              className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl bg-white"
              onClick={() => setActiveHotspot(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: imagePosition }}
                />
              </div>

              {/* Subtle Vignette for Depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

              {/* Subtle Vignette for Depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

              {/* Hotspots Container */}
              <motion.div
                className="absolute inset-0"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                {hotspots.map((hotspot) => {
                  const currentPosition = isDebugMode
                    ? debugPositions[hotspot.id] || hotspot.position
                    : hotspot.position

                  return (
                    <motion.div
                      key={hotspot.id}
                      className="absolute z-20"
                      style={{
                        left: `${currentPosition.x}%`,
                        top: `${currentPosition.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      variants={hotspotVariants}
                      drag={isDebugMode}
                      dragMomentum={false}
                      dragElastic={0}
                      onDragEnd={(e, info) => handleDragEnd(hotspot.id, e, info)}
                      onMouseEnter={() => !isDebugMode && setHoveredHotspot(hotspot.id)}
                      onMouseLeave={() => !isDebugMode && setHoveredHotspot(null)}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (!isDebugMode) {
                          handleHotspotClick(hotspot)
                        }
                      }}
                    >
                      {/* Debug Mode Overlay */}
                      {isDebugMode && (
                        <div className="absolute -inset-8 border-2 border-dashed border-red-500 bg-red-500/10 rounded-lg pointer-events-none">
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap font-mono">
                            {hotspot.id}: {currentPosition.x.toFixed(1)}%, {currentPosition.y.toFixed(1)}%
                          </div>
                        </div>
                      )}

                      {/* Hotspot Button */}
                      <motion.button
                        className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/95 backdrop-blur-sm shadow-lg cursor-pointer border-2 border-white flex items-center justify-center group"
                        animate={{
                          scale: isHotspotActive(hotspot.id) ? 1.2 : 1,
                          boxShadow: isHotspotActive(hotspot.id)
                            ? '0 0 0 12px rgba(255, 255, 255, 0.2), 0 8px 30px rgba(0, 0, 0, 0.4)'
                            : '0 4px 15px rgba(0, 0, 0, 0.25)',
                        }}
                        whileHover={{ scale: isDebugMode ? 1 : 1.15 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        {/* Pulse Animation */}
                        {!isDebugMode && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-white/60"
                            animate={{
                              scale: [1, 1.6, 1],
                              opacity: [0.6, 0, 0.6],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />
                        )}

                        {/* Plus Icon */}
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 text-primary-900 relative z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </motion.button>

                      {/* Tooltip - Show on hover over hotspot */}
                      <AnimatePresence>
                        {isHotspotActive(hotspot.id) && (
                          <motion.div
                            className={`absolute ${getTooltipPosition(
                              hotspot.tooltipPlacement
                            )} z-50 pointer-events-auto`}
                            variants={tooltipVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-4 min-w-[180px] max-w-[240px] border border-white/50">
                              <h3 className="text-base font-semibold text-primary-900 mb-1">
                                {hotspot.label}
                              </h3>
                              {hotspot.description && (
                                <p className="text-xs text-primary-600 mb-2">
                                  {hotspot.description}
                                </p>
                              )}
                              {hotspot.price && (
                                <p className="text-base font-medium text-primary-900">
                                  {hotspot.price}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Mobile Helper Text */}
              <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 text-center z-30">
                <p className="text-xs text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                  Tap the + to explore
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Product List (40% - 2 cols) */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-serif font-light text-primary-900 mb-6 lg:mb-8">
              Featured Products
            </h3>
            <div className="space-y-3">
              {hotspots.map((hotspot, index) => (
                <motion.div
                  key={hotspot.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                    delay: index * 0.1,
                  }}
                >
                  <Link
                    href={hotspot.href}
                    className="group block bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300"
                    onMouseEnter={() => setHoveredHotspot(hotspot.id)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Product Number */}
                        <div className="text-xs font-medium text-primary-400 mb-1">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        
                        {/* Product Name */}
                        <h4 className="text-lg font-semibold text-primary-900 mb-1 group-hover:text-orange-500 transition-colors">
                          {hotspot.label}
                        </h4>
                        
                        {/* Product Description */}
                        {hotspot.description && (
                          <p className="text-sm text-primary-600 mb-2 line-clamp-2">
                            {hotspot.description}
                          </p>
                        )}
                        
                        {/* Price */}
                        {hotspot.price && (
                          <p className="text-lg font-medium text-primary-900">
                            {hotspot.price}
                          </p>
                        )}
                      </div>

                      {/* Arrow Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-primary-50 group-hover:bg-orange-500 flex items-center justify-center transition-all duration-300">
                          <svg
                            className="w-5 h-5 text-primary-900 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Active Indicator */}
                    {isHotspotActive(hotspot.id) && (
                      <motion.div
                        className="mt-3 pt-3 border-t border-primary-200"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <span className="text-xs font-medium text-orange-500 flex items-center gap-1">
                          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                          Currently viewing on image
                        </span>
                      </motion.div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
