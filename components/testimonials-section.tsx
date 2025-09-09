"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Enthusiast",
    content:
      "Amazing quality products and fast shipping. I've been shopping here for over a year and never disappointed!",
    rating: 5,
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Tech Professional",
    content: "The electronics section has everything I need. Great prices and authentic products. Highly recommended!",
    rating: 5,
    avatar: "MC",
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Jewelry Collector",
    content: "Beautiful jewelry collection with unique pieces. The customer service is exceptional and very helpful.",
    rating: 5,
    avatar: "ED",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="hover:shadow-lg hover:scale-105 transition-all duration-300 animate-in fade-in-0 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 200 + 400}ms` }}
            >
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
