"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { useWishlist } from "@/components/account/wishlist-provider";
import { useAuth } from "@/components/auth/auth-provider";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, updateQuantity, removeItem, items } = useCart();
  const { user } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();

  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast({
        title: "To add product to cart, please log in first.",
        className: " bg-muted dark:text-white text-black border-4 border-b-destructive"
      });
      return;
    }
    setIsAddingToCart(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    setIsAddingToCart(false);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast({
        title: "To add to wishlist, please log in first.",
        className: " bg-muted dark:text-white text-black border-4 border-b-destructive"
      });
      return;
    }

    const isCurrentlyWishlisted = isInWishlist(product.id);

    if (isCurrentlyWishlisted) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        className: " bg-muted dark:text-white text-black border-4 border-b-accent"
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist",
        className: " bg-muted dark:text-white text-black border-4 border-b-accent"
      });
    }
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] h-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardContent className="p-4 relative z-10">
          <div className="relative w-full max-w-[200px] mx-auto h-[180px] sm:h-[200px] mb-4 overflow-hidden rounded-lg bg-transparent">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="object-contain group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              style={{ objectFit: "contain" }}
              fill
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 left-2 bg-white/80 hover:bg-white hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100"
              onClick={handleWishlist}
            >
              <Heart
                className={`h-4 w-4 transition-all duration-200 ${
                  isInWishlist(product.id)
                    ? "fill-red-500 text-red-500 scale-110"
                    : "text-muted-foreground hover:text-red-400"
                }`}
              />
            </Button>
          </div>

          <Badge className="absolute top-4 right-6 capitalize animate-in fade-in-0 slide-in-from-top-2 duration-300 delay-200">
            {product.category}
          </Badge>

          <div className="space-y-2">
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {product.title}
            </h3>

            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm text-muted-foreground">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>

            <p className="text-lg font-bold text-primary group-hover:scale-105 transition-transform duration-200 origin-left">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 relative z-10">
          {quantity > 0 ? (
            <div className="flex items-center justify-between w-full border border-border rounded-md overflow-hidden">
              <Button
                variant="outline"
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleUpdateQuantity(quantity - 1);
                }}
              >
                {quantity === 1 ? <Trash2 className="h-4 w-4" /> : "-"}
              </Button>
              <span className="flex-1 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleUpdateQuantity(quantity + 1);
                }}
              >
                +
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleAddToCart}
              className="w-full hover:scale-105 transition-all duration-200 relative overflow-hidden"
              size="sm"
              disabled={isAddingToCart}
            >
              <div
                className={`absolute inset-0 bg-white/20 transform transition-transform duration-300 ${
                  isAddingToCart ? "translate-x-0" : "-translate-x-full"
                }`}
              />
              <ShoppingCart
                className={`mr-2 h-4 w-4 transition-transform duration-200 ${
                  isAddingToCart ? "animate-bounce" : ""
                }`}
              />
              {isAddingToCart ? "Adding..." : "Add to Cart"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
