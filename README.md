# ULI - Modern Indian Furniture Website

A Next.js furniture e-commerce website with smooth animations powered by Framer Motion.

## 🚀 Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **TypeScript** for type safety

## 📦 Installation

```bash
npm install
```

## 🏃 Running the Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Animation Features

### Scroll-Triggered Animations
- **Fade Up Effect**: Elements fade in and translate from Y: 60px with custom easing `[0.16, 1, 0.3, 1]`
- **Viewport Detection**: Animations trigger when 30% of element is visible
- **Once Mode**: Animations play only once (no re-triggering on scroll up)

### Staggered Animations
- **Collections Grid**: Cards animate in sequence with 150ms delay between each
- **Product Showcase**: Products stagger with 120ms delay
- **Instagram Feed**: Grid items stagger with 80ms delay

### Hover Interactions
- **Card Lift**: Hover translates Y: -8px to -12px with scale 1.02
- **Image Zoom**: Product images scale to 1.1 on hover within overflow-hidden containers
- **Button Effects**: Buttons scale and translate on hover/tap

### Page Load Animations
- **Hero Video Section**: 
  - Full-screen background video with autoplay, mute, loop
  - Scroll-driven parallax text movement (0 → -80px)
  - Crossfade overlay effect as user scrolls (opacity 1 → 0)
  - Mobile fallback to static image for performance
  - Sequential content fade-in (badge → title → description → buttons)
- **Header**: Slides down from Y: -100px with smooth easing
- **Banner**: Infinite horizontal scroll animation

### Easing Curves
- Custom cubic-bezier: `[0.16, 1, 0.3, 1]` for smooth, natural motion
- Duration: 600ms - 800ms for most interactions
- Slower for images: 1000ms - 1200ms

## 📱 Responsive Design

- Mobile-first approach with Tailwind breakpoints
- Collapsing navigation on mobile
- Responsive grid layouts (1, 2, 3, 4 columns)
- Touch-friendly interactions

## 🎯 Component Architecture

```
components/
├── AnnouncementBanner.tsx  - Scrolling text banner
├── Header.tsx              - Sticky navigation with scroll effect
├── Hero.tsx                - Main hero section
├── ImageTextSection.tsx    - Image + text layout
├── BalanceSection.tsx      - Full-width image section
├── CollectionsGrid.tsx     - 4-column collection cards
├── ProductShowcase.tsx     - Product grid with pricing
├── Testimonials.tsx        - Horizontal scroll testimonials
├── InstagramFeed.tsx       - Social media grid
├── CTASection.tsx          - Call-to-action banner
└── Footer.tsx              - Site footer
```

## 🎭 Animation Patterns Used

1. **Initial + Animate** - For page load animations
2. **whileInView** - For scroll-triggered effects
3. **whileHover** - For interactive hover states
4. **whileTap** - For button press feedback
5. **Stagger Children** - For sequential card animations
6. **Viewport Once** - Prevent re-triggering animations

## 🎨 Design System

### Colors
- **Primary**: Green/Teal tones (50-900 scale)
- **Accent**: Yellow/Amber tones (50-900 scale)

### Typography
- **Sans**: Inter, System UI
- **Serif**: Georgia (for headings)

### Spacing
- Consistent padding: 24px (py-24), 32px (py-32)
- Gap spacing: 4px, 6px, 8px, 12px

## 🎬 Customizing Hero Video

The `HeroVideo` component accepts these props:

```tsx
<HeroVideo 
  videoSrc="/videos/your-video.mp4"      // Your video file
  posterImage="/images/poster.jpg"        // Fallback image
  overlayOpacity={0.5}                    // 0-1, default 0.5
/>
```

### Replacing the Video
1. Add your video to `/public/videos/`
2. Update the `videoSrc` prop in `app/page.tsx`
3. Recommended specs:
   - Format: MP4 (H.264 codec)
   - Resolution: 1920x1080 or 1280x720
   - File size: < 5MB for best performance
   - Duration: 10-30 seconds (will loop)

### Performance Tips
- Video only loads on desktop (>768px)
- Mobile devices see static image
- Use `preload="metadata"` for faster page load
- Host large videos on CDN for production

## 🔧 Build & Deploy

```bash
npm run build
npm start
```

## 📝 Notes

- All animations preserve momentum and feel natural
- Smooth scroll enabled globally
- Images use Next.js Image component (placeholders used in demo)
- SEO-optimized with metadata in layout.tsx

---

Built with ❤️ using Next.js, Tailwind CSS, and Framer Motion
