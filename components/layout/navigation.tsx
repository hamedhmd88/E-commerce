"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useCart } from "@/components/cart/cart-provider";
import { useAuth } from "@/components/auth/auth-provider";
import { BackToTop } from "@/components/layout/back-to-top";
import { LanguageToggle } from "@/components/layout/language-toggle";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Carts", href: "/carts/explore" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function isMenuActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/carts/explore") return pathname.startsWith("/carts");
  return pathname === href || pathname.startsWith(`${href}/`);
}

const CartSidebar = dynamic(
  () =>
    import("@/components/cart/cart-sidebar").then(
      (module) => module.CartSidebar,
    ),
  { ssr: false },
);

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, isOpen, setIsOpen } = useCart();
  const { user } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    setPendingHref(null);
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) setCartLoaded(true);
  }, [isOpen]);

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 32);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const beginNavigation = (href: string) => {
    if (href !== pathname) setPendingHref(href);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
      <nav
        aria-label="Main navigation"
        className="site-header sticky top-0 z-50"
        data-scrolled={isScrolled}
      >
        <div className="site-header-shell mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-10">
          <div className="site-header-row flex h-[4.5rem] items-center justify-between gap-3">
            <Link
              href="/"
              scroll={true}
              onClick={() => beginNavigation("/")}
              className="flex items-center gap-2.5 font-semibold tracking-[-.055em] text-foreground sm:text-xl"
            >
              <Image
                src="/morrow-mark.svg"
                alt=""
                width={33}
                height={33}
                className="size-8"
                priority
              />
              <span>
                Morrow<span className="text-primary">.</span>
              </span>
            </Link>

            <div className="hidden items-center gap-1 rounded-full border border-border/60 bg-background/35 p-1 shadow-sm lg:flex">
              {menuItems.map((item) => (
                <Button key={item.name} variant="ghost" asChild>
                  <Link
                    href={item.href}
                    scroll={true}
                    onClick={() => beginNavigation(item.href)}
                    className={`site-nav-link rounded-full px-4 transition-transform hover:!bg-primary/10 hover:!text-foreground dark:hover:!text-foreground ${isMenuActive(pathname, item.href) ? "site-nav-active text-primary" : "text-foreground"}`}
                    aria-current={
                      isMenuActive(pathname, item.href) ? "page" : undefined
                    }
                  >
                    {item.name}
                  </Link>
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <LanguageToggle />
              <ThemeToggle />

              <Button
                variant={pathname === "/cart" ? "default" : "ghost"}
                size="icon"
                className="relative hover:scale-110 transition-transform"
                onClick={() => {
                  setCartLoaded(true);
                  setIsOpen(true);
                }}
                aria-label={`Open cart, ${totalItems} items`}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Button>

              <Button
                variant={
                  pathname.startsWith("/account") || pathname === "/login"
                    ? "default"
                    : "ghost"
                }
                size="icon"
                className="hover:scale-110 transition-transform"
                asChild
              >
                <Link
                  href={user ? "/account" : "/login"}
                  scroll={true}
                  onClick={() => beginNavigation(user ? "/account" : "/login")}
                  aria-label={user ? "Account" : "Sign in"}
                >
                  <User className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <div
              id="mobile-navigation"
              className="animate-in slide-in-from-top-2 border-t py-4 duration-200 lg:hidden"
            >
              <div className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <Button
                    key={item.name}
                    variant={
                      isMenuActive(pathname, item.href) ? "default" : "ghost"
                    }
                    asChild
                    className="w-full justify-center"
                  >
                    <Link
                      href={item.href}
                      scroll={true}
                      onClick={() => {
                        setIsMenuOpen(false);
                        beginNavigation(item.href);
                      }}
                      className="py-2 transition-colors"
                      aria-current={
                        isMenuActive(pathname, item.href) ? "page" : undefined
                      }
                    >
                      {item.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
        {pendingHref && (
          <div
            className="nav-route-progress"
            role="status"
            aria-label="Loading page"
          />
        )}
      </nav>
      {cartLoaded && <CartSidebar />}
      <BackToTop />
    </>
  );
}
