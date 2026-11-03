import type React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistSerif } from "geist/font/serif";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { CartProvider } from "@/components/cart/cart-provider";
import { AuthProvider } from "@/components/auth/auth-provider";
import { WishlistProvider } from "@/components/account/wishlist-provider";
import { Suspense } from "react";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/react-query";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/components/layout/language-provider";
import { isLocale, localeCookie } from "@/lib/i18n/locale";

export async function generateMetadata(): Promise<Metadata> {
  const value = (await cookies()).get(localeCookie)?.value;
  const locale = isLocale(value) ? value : "en";
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    ),
    title: {
      default:
        locale === "fa" ? "مورو | فروشگاه نمایشی" : "Morrow | Demo Storefront",
      template: "%s | Morrow",
    },
    description:
      locale === "fa"
        ? "فروشگاه نمایشی مورو برای دیدن پوشاک، زیورآلات و فناوری کاربردی."
        : "Explore a considered mix of everyday style, jewelry, and useful technology in this portfolio demo storefront.",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const value = (await cookies()).get(localeCookie)?.value;
  const locale = isLocale(value) ? value : "en";
  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${GeistSerif.variable} antialiased`}
        suppressHydrationWarning
      >
        <Suspense>
          <ReactQueryProvider>
            <LanguageProvider initialLocale={locale}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <AuthProvider>
                  <WishlistProvider>
                    <CartProvider>{children}</CartProvider>
                  </WishlistProvider>
                </AuthProvider>
                <Toaster />
              </ThemeProvider>
            </LanguageProvider>
          </ReactQueryProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
