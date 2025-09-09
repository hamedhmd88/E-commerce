"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <div className="text-center space-y-8 p-8">
        {/* 404 Animation */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-primary/20 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-primary/10 animate-pulse"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-balance">Page Not Found</h2>
          <p className="text-muted-foreground text-pretty max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the
            wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="group">
            <Link href="/">
              <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Go Home
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="group bg-transparent">
            <Link href="/products">
              <Search className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Browse Products
            </Link>
          </Button>

          <Button variant="ghost" size="lg" onClick={() => window.history.back()} className="group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            Go Back
          </Button>
        </div>

        {/* Help Text */}
        <div className="pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Need help?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
