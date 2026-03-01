import HeroVideo from '@/components/HeroVideo'
import Header from '@/components/Header'
import ImageTextSection from '@/components/ImageTextSection'
import ShopTheLook from '@/components/ShopTheLook'
import CollectionsGrid from '@/components/CollectionsGrid'
import ProductShowcase from '@/components/ProductShowcase'
import Testimonials from '@/components/Testimonials'
import InstagramFeed from '@/components/InstagramFeed'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import StickySection from '@/components/StickySection'

export default function Home() {
  const shopTheLookHotspots = [
    {
      id: 'pendant-light',
      label: 'Pendant Light',
      description: 'Woven natural fiber design',
      price: '₹38,000',
      href: '/shop/pendant-light',
      position: { x: 50.0, y: 18.0 },
      tooltipPlacement: 'bottom' as const,
    },
    {
      id: 'wall-art',
      label: 'Wall Art Frame',
      description: 'Minimalist canvas with wood frame',
      price: '₹27,500',
      href: '/shop/wall-art',
      position: { x: 50.0, y: 35.0 },
      tooltipPlacement: 'bottom' as const,
    },
    {
      id: 'plant-left',
      label: 'Decorative Plant (Left)',
      description: 'Ceramic pot with live plant',
      price: '₹15,900',
      href: '/shop/plants',
      position: { x: 22.0, y: 52.0 },
      tooltipPlacement: 'right' as const,
    },
    {
      id: 'sofa-center',
      label: 'Modular Sofa',
      description: 'Olive green upholstered sectional',
      price: '₹2,09,000',
      href: '/shop/modular-sofa',
      position: { x: 50.0, y: 58.0 },
      tooltipPlacement: 'top' as const,
    },
    {
      id: 'plant-right',
      label: 'Decorative Plant (Right)',
      description: 'Ceramic pot with live plant',
      price: '₹15,900',
      href: '/shop/plants',
      position: { x: 78.0, y: 52.0 },
      tooltipPlacement: 'left' as const,
    },
    {
      id: 'coffee-table',
      label: 'Round Coffee Table',
      description: 'Natural wood with pedestal base',
      price: '₹74,900',
      href: '/shop/coffee-table',
      position: { x: 50.0, y: 75.0 },
      tooltipPlacement: 'bottom' as const,
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Video - Sticky Panel 1 */}
      <StickySection zIndex={1} scrollHeight="150vh">
        <HeroVideo />
      </StickySection>

      {/* Image Text Section - Regular flow */}
      <ImageTextSection />

      {/* Shop the Look - Sticky Panel 2 (creeps over Hero) */}
      <StickySection zIndex={2} scrollHeight="150vh" backgroundColor="#f5ebe0">
        <ShopTheLook
          title="Shop the Look"
          subtitle="Explore our carefully curated living room collection"
          imageSrc="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=90&auto=format&fit=crop"
          imageAlt="Curated Living Room Setup"
          hotspots={shopTheLookHotspots}
          imagePosition="center center"
        />
      </StickySection>

      {/* Collections Grid - Sticky Panel 3 (creeps over Shop the Look) */}
      <StickySection zIndex={3} scrollHeight="150vh" backgroundColor="#ffffff">
        <CollectionsGrid />
      </StickySection>

      {/* Product Showcase - Sticky Panel 4 (slides over Collections) */}
      <StickySection zIndex={4} scrollHeight="150vh" backgroundColor="#f5f7f6">
        <ProductShowcase />
      </StickySection>

      {/* Remaining sections - Regular flow */}
      <Testimonials />
      <InstagramFeed />
      <CTASection />
      <Footer />
    </main>
  )
}
