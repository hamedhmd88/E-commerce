"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CartSidebar } from "@/components/cart/cart-sidebar";
import { useCart } from "@/components/cart/cart-provider";
import { useAuth } from "@/components/auth/auth-provider";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const { user } = useAuth();
  const pathname = usePathname();

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
        className="glass-surface sticky top-0 z-50 border-b border-border"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14">
          <div className="flex h-[4.5rem] items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              scroll={true}
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

            <div className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <Button key={item.name} variant="ghost" asChild>
                  <Link
                    href={item.href}
                    scroll={true}
                    className={`hover:!bg-primary/10 hover:!text-foreground dark:hover:!text-foreground ${
                      pathname === item.href
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                </Button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <ThemeToggle />

              {/* Cart Button */}
              <Button
                variant={pathname === "/cart" ? "default" : "ghost"}
                size="icon"
                className="relative hover:scale-110 transition-transform"
                onClick={() => setIsOpen(true)}
                aria-label={`Open cart, ${totalItems} items`}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* User Account */}
              <Link
                href={user ? "/account" : "/login"}
                scroll={true}
                aria-label={user ? "Account" : "Sign in"}
              >
                <Button
                  variant={
                    pathname === "/account" || pathname === "/login"
                      ? "default"
                      : "ghost"
                  }
                  size="icon"
                  className="hover:scale-110 transition-transform"
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>

              {/* Mobile Menu Button */}
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
                    variant={pathname === item.href ? "default" : "ghost"}
                    asChild
                    className="w-full justify-center"
                  >
                    <Link
                      href={item.href}
                      scroll={true}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-foreground transition-colors py-2 hover:!text-foreground"
                    >
                      {item.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
      <CartSidebar />
    </>
  );
}
