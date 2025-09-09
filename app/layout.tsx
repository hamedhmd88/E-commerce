import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { CartProvider } from "@/components/cart/cart-provider"
import { AuthProvider } from "@/components/auth/auth-provider"
import { WishlistProvider } from "@/components/account/wishlist-provider"
import { Suspense } from "react"
import "./globals.css"
import { ReactQueryProvider } from "@/lib/react-query"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "ModernStore - Premium E-commerce",
  description: "Discover premium products with our modern e-commerce experience",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`} suppressHydrationWarning>
        <Suspense>
          <ReactQueryProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <AuthProvider>
                <WishlistProvider>
                  <CartProvider>{children}</CartProvider>
                </WishlistProvider>
              </AuthProvider>
              <Toaster />
            </ThemeProvider>
          </ReactQueryProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
