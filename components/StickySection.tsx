'use client'

import { ReactNode } from 'react'

interface StickySectionProps {
  children: ReactNode
  zIndex?: number
  scrollHeight?: string
  className?: string
  backgroundColor?: string
}

/**
 * StickySection creates a "stacked panel" effect where sections pin to the viewport
 * and subsequent sections creep in from the bottom to cover previous ones.
 * 
 * How it works:
 * - Wrapper has extra height (e.g., 200vh) to create scroll range
 * - Content is position: sticky, so it stays pinned while scrolling through wrapper
 * - Higher z-index on subsequent sections creates the "creep over" effect
 * 
 * Usage:
 * <StickySection zIndex={1} scrollHeight="150vh">
 *   <YourContent />
 * </StickySection>
 */
export default function StickySection({
  children,
  zIndex = 1,
  scrollHeight = '150vh',
  className = '',
  backgroundColor = 'transparent',
}: StickySectionProps) {
  return (
    <div
      className="sticky-section-wrapper relative"
      style={{
        height: scrollHeight,
      }}
    >
      <div
        className={`sticky-section-content sticky top-0 h-screen overflow-hidden ${className}`}
        style={{
          zIndex,
          backgroundColor,
          // Ensure smooth rendering
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      >
        {children}
      </div>
    </div>
  )
}
