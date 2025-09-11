import React from 'react'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'

interface PageLayoutProps {
  children: React.ReactNode
  customLastLabel?: string
}

export function PageLayout({ children, customLastLabel }: PageLayoutProps) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <BreadcrumbNav customLastLabel={customLastLabel} />
        {children}
      </main>
      <Footer />
    </div>
  )
}