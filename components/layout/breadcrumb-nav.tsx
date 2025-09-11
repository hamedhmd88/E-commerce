'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

interface BreadcrumbNavProps {
  customLastLabel?: string
}

const nameMap: { [key: string]: string } = {
  'about': 'About Us',
  'account': 'Account',
  'orders': 'Orders',
  'profile': 'Profile',
  'wishlist': 'Wishlist',
  'blog': 'Blog',
  'cart': 'Cart',
  'category': 'Category',
  'checkout': 'Checkout',
  'contact': 'Contact Us',
  'faq': 'FAQ',
  'login': 'Login',
  'register': 'Register',
  'products': 'Products',
  'order-success': 'Order Success',
};

export function BreadcrumbNav({ customLastLabel }: BreadcrumbNavProps) {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter((p) => p)

  if (pathSegments.length === 0) return null; // No breadcrumb for home page

  const items = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/')
    let label = nameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)

    if (index === pathSegments.length - 1 && customLastLabel) {
      label = customLastLabel
    }

    return { label, href }
  })

  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index < items.length - 1 ? (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}