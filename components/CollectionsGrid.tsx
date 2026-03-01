'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface Collection {
  id: string
  name: string
  shortDescription: string
  expandedDescription: string
  highlights: string[]
  ctaLabel: string
  href: string
  color: string
  accentColor: string
  imageUrl: string
}

const collections: Collection[] = [
  {
    id: 'furniture',
    name: 'Furniture',
    shortDescription: 'Soft geometry for modern spaces.',
    expandedDescription:
      'Discover our curated furniture collection where timeless design meets everyday comfort. Each piece is crafted to elevate your living spaces with sophisticated simplicity.',
    highlights: [
      'Handcrafted quality materials',
      'Ergonomic comfort design',
      'Modular & customizable options',
      'Sustainable sourcing',
    ],
    ctaLabel: 'Explore Furniture',
    href: '/collections/furniture',
    color: 'from-slate-400 to-slate-500',
    accentColor: 'slate',
    imageUrl: 'https://t4.ftcdn.net/jpg/03/71/92/67/360_F_371926762_MdmDMtJbXt7DoaDrxFP0dp9Nq1tSFCnR.jpg',
  },
  {
    id: 'wall-finishes',
    name: 'Wall Finishes',
    shortDescription: 'Inspired by natural tones.',
    expandedDescription:
      'Transform your walls with textures and tones inspired by nature. Our wall finishes bring warmth, depth, and character to any interior space.',
    highlights: [
      'Natural & organic textures',
      'Zero-VOC eco-friendly paints',
      'Expert color consultation',
      'Durable & easy maintenance',
    ],
    ctaLabel: 'Explore Wall Finishes',
    href: '/collections/wall-finishes',
    color: 'from-amber-400 to-amber-600',
    accentColor: 'amber',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy4hAjHuGAdt8txsYjQ_VFQdIrx8lvE1xnWA&s',
  },
  {
    id: 'flooring',
    name: 'Flooring',
    shortDescription: 'Minimal comfort after dark.',
    expandedDescription:
      'Elevate your foundation with premium flooring solutions. From natural hardwood to contemporary composites, find the perfect ground for your space.',
    highlights: [
      'Wide range of materials',
      'Scratch & water-resistant',
      'Professional installation',
      'Lifetime warranty options',
    ],
    ctaLabel: 'Explore Flooring',
    href: '/collections/flooring',
    color: 'from-indigo-400 to-indigo-600',
    accentColor: 'indigo',
    imageUrl: 'https://mmllc-images.s3.amazonaws.com/blogs/446/blog_446_untitleddesign78.jpg',
  },
  {
    id: 'lighting',
    name: 'Lighting',
    shortDescription: 'Where structure meets softness.',
    expandedDescription:
      'Illuminate your spaces with sculptural lighting that doubles as art. Our collection balances form and function to create perfect ambient experiences.',
    highlights: [
      'Designer collaborations',
      'Energy-efficient LED options',
      'Dimmable & smart-home ready',
      'Statement & accent pieces',
    ],
    ctaLabel: 'Explore Lighting',
    href: '/collections/lighting',
    color: 'from-emerald-400 to-emerald-600',
    accentColor: 'emerald',
    imageUrl: 'https://interioworks.com/wp-content/uploads/2024/04/interiogroup_45015_A_conceptual_piece_of_furniture_with_integra_f1c311ec-5202-4b34-a3f3-773af2dba9bb.webp',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// Premium modal entrance animation with luxury glide
const popoverVariants = {
  hidden: {
    opacity: 0,
    scale: 0.985,
    y: 16,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1], // Premium cubic-bezier easing
    },
  },
  exit: {
    opacity: 0,
    scale: 0.985,
    y: 12,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// Staggered content reveal inside modal
const contentContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06, // 60ms stagger
      delayChildren: 0.1, // Wait for modal to settle
    },
  },
}

const contentItemVariants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false

interface DetailsPopoverProps {
  collection: Collection
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClose: () => void
}

function DetailsPopover({
  collection,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: DetailsPopoverProps) {
  // Body scroll lock on mount (mobile)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
      
      return () => {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }
    }
  }, [])

  return (
    <>
      {/* Full-page Backdrop Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-lg z-[100]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
      />

      {/* Centered Modal Dialog */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8">
        <motion.div
          layoutId="collection-popover"
          className="relative w-full max-w-5xl"
          {...(prefersReducedMotion ? {} : {
            variants: popoverVariants,
            initial: "hidden",
            animate: "show",
            exit: "exit",
          })}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={(e) => e.stopPropagation()}
        >
        <div className="bg-white rounded-3xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden">
          {/* Close Button - Floating Outside */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 md:-top-5 md:-right-5 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white hover:bg-orange-500 flex items-center justify-center transition-all duration-300 group z-30 shadow-xl border-2 border-white"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-primary-900 group-hover:text-white group-hover:rotate-90 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Split Layout: Image + Content */}
          <div className="grid lg:grid-cols-5 min-h-[500px] md:min-h-[550px]">
            {/* Left: Collection Image (2 cols) */}
            <div className="lg:col-span-2 relative overflow-hidden h-64 lg:h-auto">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${collection.imageUrl})` }}
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${collection.color} opacity-40`} />
              
              {/* Collection Badge - Floating */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm shadow-lg">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${collection.color}`} />
                  <span className="text-xs font-medium text-primary-900 tracking-wide uppercase">Collection</span>
                </div>
              </div>
            </div>

            {/* Right: Content (3 cols) */}
            <div className="lg:col-span-3 p-8 md:p-10 lg:p-12 flex flex-col">
              {/* Content with staggered reveal */}
              <motion.div
                className="flex-1"
                {...(prefersReducedMotion ? {} : {
                  variants: contentContainerVariants,
                  initial: "hidden",
                  animate: "show",
                })}
              >
                {/* Title Section */}
                <motion.div
                  {...(prefersReducedMotion ? {} : { variants: contentItemVariants })}
                  className="mb-6"
                >
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-primary-900 mb-3 leading-tight">
                    {collection.name}
                  </h3>
                  <div className={`h-1 w-16 bg-gradient-to-r ${collection.color} rounded-full mb-4`} />
                </motion.div>

                {/* Description */}
                <motion.p
                  {...(prefersReducedMotion ? {} : { variants: contentItemVariants })}
                  className="text-base md:text-lg text-primary-700 leading-relaxed mb-8"
                >
                  {collection.expandedDescription}
                </motion.p>

                {/* Highlights - Elegant List */}
                <motion.div
                  className="mb-10"
                  {...(prefersReducedMotion ? {} : {
                    variants: contentContainerVariants,
                    initial: "hidden",
                    animate: "show",
                  })}
                >
                  <motion.h4 
                    {...(prefersReducedMotion ? {} : { variants: contentItemVariants })}
                    className="text-sm font-medium tracking-wider text-primary-500 uppercase mb-4"
                  >
                    Key Features
                  </motion.h4>
                  <ul className="space-y-3">
                    {collection.highlights.map((highlight, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3 text-sm md:text-base text-primary-800"
                        {...(prefersReducedMotion ? {} : { variants: contentItemVariants })}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <svg
                            className="w-5 h-5 text-orange-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>

              {/* CTA Button - Pinned at Bottom */}
              <motion.div
                {...(prefersReducedMotion ? {} : { variants: contentItemVariants })}
                className="pt-4 border-t border-primary-100"
              >
                <Link
                  href={collection.href}
                  className="group inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-primary-900 hover:bg-orange-500 text-white rounded-2xl font-medium text-base transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 relative overflow-hidden"
                  tabIndex={0}
                >
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  
                  <span className="relative">{collection.ctaLabel}</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform relative"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    </>
  )
}

export default function CollectionsGrid() {
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Detect mobile/touch devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeCard) {
        setActiveCard(null)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [activeCard])

  const handleCardEnter = (cardId: string) => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    // Immediately show the new card (smooth transition)
    setActiveCard(cardId)
  }

  const handleCardLeave = () => {
    // Start close timer with refined grace period for luxury feel
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveCard(null)
    }, 150) // 150ms grace period
  }

  const handlePopoverEnter = () => {
    // Cancel close timer when hovering popover
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const handlePopoverLeave = () => {
    // Start close timer when leaving popover
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveCard(null)
    }, 150)
  }

  const handleCardClick = (cardId: string) => {
    if (isMobile) {
      // Toggle on mobile
      setActiveCard(activeCard === cardId ? null : cardId)
    }
  }

  const handleClose = () => {
    setActiveCard(null)
  }

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white via-[#f9f7f4] to-white">
      <div className="container mx-auto px-6 max-w-[1600px]">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-sm font-medium tracking-[0.3em] text-orange-500 uppercase">
              Collections
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-primary-900 mb-6 leading-tight">
            Explore our collections
          </h2>
          <p className="text-lg md:text-xl text-primary-600 max-w-2xl mx-auto leading-relaxed">
            Choose from our curated collections — designed to bring timeless
            Indian elegance into every space.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {collections.map((collection, index) => {
            const isActive = activeCard === collection.id

            return (
              <motion.div
                key={collection.id}
                variants={itemVariants}
                className="relative"
                onMouseEnter={() => !isMobile && handleCardEnter(collection.id)}
                onMouseLeave={() => !isMobile && handleCardLeave()}
                onClick={() => handleCardClick(collection.id)}
              >
                <motion.div
                  className="group cursor-pointer relative"
                  whileHover={!isMobile ? { y: -8 } : {}}
                  animate={isActive ? { y: -8 } : {}}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Card Container with Shadow */}
                  <div
                    className={`relative aspect-[3/4] rounded-3xl overflow-hidden transition-all duration-500 ${
                      isActive ? 'ring-4 ring-orange-400 shadow-2xl' : 'shadow-lg group-hover:shadow-2xl'
                    } ${activeCard && !isActive ? 'opacity-40 scale-95' : ''}`}
                  >
                    {/* Background Image with Ken Burns Effect */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${collection.imageUrl})` }}
                    />
                    
                    {/* Multi-layer Gradient System for Depth */}
                    {/* Base gradient - always visible for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Accent color overlay - fades on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${collection.color} opacity-25 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    {/* Hover vignette effect */}
                    <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Content Overlay - Bottom Section */}
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 z-10 translate-y-0 transition-transform duration-500">
                      {/* Collection Number */}
                      <motion.div 
                        className="mb-3 opacity-70"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 0.7, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <span className="text-xs tracking-[0.2em] text-white/80 font-medium uppercase">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </motion.div>
                      
                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 transform transition-all duration-300 group-hover:translate-x-1">
                        {collection.name}
                      </h3>
                      
                      {/* Short Description */}
                      <p className="text-sm md:text-base text-white/90 mb-4 leading-relaxed">
                        {collection.shortDescription}
                      </p>
                      
                      {/* Interactive Indicator */}
                      <div className="flex items-center gap-2 text-white/90 group-hover:text-white transition-colors">
                        <span className="text-sm font-medium">Explore</span>
                        <svg
                          className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Top Right Badge - Active State or Hover Indicator */}
                    <div className="absolute top-5 right-5 z-20">
                      {isActive ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shadow-lg"
                        >
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </motion.div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Mobile Tap Indicator */}
                    {isMobile && !isActive && (
                      <div className="absolute bottom-5 right-5 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl z-20">
                        <svg
                          className="w-6 h-6 text-primary-900"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Details Popover with shared layout for smooth morphing */}
                <AnimatePresence>
                  {isActive && (
                    <DetailsPopover
                      collection={collection}
                      onMouseEnter={handlePopoverEnter}
                      onMouseLeave={handlePopoverLeave}
                      onClose={handleClose}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
