import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react"
import * as motion from "motion/react-client"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles className="h-4 w-4" />
            New Collection Available
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl lg:text-6xl font-bold text-balance mb-6"
          >
            Discover Premium Products for{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Modern Living
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto"
          >
            Shop our curated collection of electronics, fashion, and jewelry. Experience quality, style, and innovation
            in every purchase.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="text-lg px-8 hover:scale-105 transition-all duration-300 group">
              <Link href="/products">
                <ShoppingBag className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Shop Now
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 bg-transparent hover:scale-105 transition-all duration-300 group"
            >
              <Link href="/about">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>
          </motion.div>

          <div className="mt-16 relative">
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping delay-1000" />
            <div className="absolute top-8 right-1/4 w-1 h-1 bg-secondary rounded-full animate-ping delay-2000" />
            <div className="absolute -top-4 left-1/3 w-1.5 h-1.5 bg-accent rounded-full animate-ping delay-3000" />
          </div>
        </div>
      </div>
    </section>
  )
}
