"use client";

import type React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CartSidebar } from "@/components/cart/cart-sidebar";
import { useCart } from "@/components/cart/cart-provider";
import { useAuth } from "@/components/auth/auth-provider";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Cart", href: "/cart" },
  { name: "Blog", href: "/blog" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, setIsOpen } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value === "") {
      router.push("/products");
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              scroll={true}
              className="text-2xl font-bold text-primary hover:scale-105 transition-transform"
            >
              ModernStore
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {menuItems.map((item) => (
                <Button key={item.name} variant="ghost" asChild>
                  <Link
                    href={item.href}
                    scroll={true}
                    className="text-foreground  transition-colors hover:scale-105 transform"
                  >
                    {item.name}
                  </Link>
                </Button>
              ))}
            </div>

            <div className="hidden md:flex items-center flex-1 max-w-sm mx-8">
              <form onSubmit={handleSearch} className="relative w-full group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 pr-12 border-2 focus:border-primary transition-all duration-200 hover:shadow-md"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-3 bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
                >
                  Search
                </Button>
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:scale-110 transition-transform"
                onClick={() => setIsOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* User Account */}
              <Link href={user ? "/account" : "/login"} scroll={true}>
                <Button
                  variant="ghost"
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
                className="md:hidden hover:scale-110 transition-transform"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            <div className="md:hidden py-4 border-t animate-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col space-y-4">
                <form onSubmit={handleSearch} className="relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10 border-2 focus:border-primary transition-all duration-200"
                  />
                </form>
                {menuItems.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    asChild
                    className="w-full justify-center"
                  >
                    <Link
                      href={item.href}
                      scroll={true}
                      className="text-foreground transition-colors py-2 hover:translate-x-2 transform duration-200"
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
