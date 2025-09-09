import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { productService } from "@/services/productService";

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

export async function FeaturedProducts() {
  const products = await productService.getProducts(8);

  return (
    <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-balance mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover our handpicked selection of premium products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
