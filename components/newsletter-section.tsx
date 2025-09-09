"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Gift } from "lucide-react"
import { toast } from "sonner"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success("Successfully subscribed to newsletter!")
    setEmail("")
    setLoading(false)
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto hover:shadow-xl transition-shadow duration-300 animate-in fade-in-0 zoom-in-95">
          <CardContent className="p-8 md:p-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-primary/10 p-4 rounded-full animate-pulse">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                Stay Updated with Our Newsletter
              </h2>

              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
                Get the latest updates on new products, exclusive offers, and fashion trends delivered straight to your
                inbox.
              </p>

              <div className="flex items-center justify-center mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
                <Gift className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">Get 10% off your first order when you subscribe!</span>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-500"
              >
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 transition-all duration-200 focus:scale-105"
                  required
                />
                <Button type="submit" disabled={loading} className="hover:scale-105 transition-transform">
                  {loading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-700">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
