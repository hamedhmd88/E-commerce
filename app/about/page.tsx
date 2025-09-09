import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Globe, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-balance mb-6">About ModernStore</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            We're passionate about bringing you the finest products from around the world, combining quality, style, and
            innovation in every purchase.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">50K+</div>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">1000+</div>
              <p className="text-sm text-muted-foreground">Premium Products</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">25+</div>
              <p className="text-sm text-muted-foreground">Countries Served</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">99%</div>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2020, ModernStore began as a vision to create a premium e-commerce experience that puts
                quality and customer satisfaction at the forefront. We believe that shopping online should be as
                enjoyable and trustworthy as visiting your favorite local store.
              </p>
              <p>
                Our carefully curated selection spans electronics, fashion, and jewelry, with each product chosen for
                its exceptional quality, innovative design, and value. We work directly with trusted manufacturers and
                brands to ensure authenticity and competitive pricing.
              </p>
              <p>
                Today, we're proud to serve customers worldwide, maintaining our commitment to excellence in every
                aspect of the shopping experience.
              </p>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">Every product is carefully selected and quality-tested</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <Badge className="mb-4">Quality First</Badge>
                <h3 className="text-xl font-semibold mb-3">Uncompromising Standards</h3>
                <p className="text-muted-foreground">
                  We source only the highest quality products from trusted suppliers and conduct rigorous quality
                  checks.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Badge className="mb-4">Customer Focus</Badge>
                <h3 className="text-xl font-semibold mb-3">Your Satisfaction Matters</h3>
                <p className="text-muted-foreground">
                  Our dedicated support team is here to ensure your shopping experience exceeds expectations.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Badge className="mb-4">Innovation</Badge>
                <h3 className="text-xl font-semibold mb-3">Always Evolving</h3>
                <p className="text-muted-foreground">
                  We continuously improve our platform and services to provide the best possible experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our passionate team works tirelessly to bring you the best products and shopping experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "CEO & Founder", avatar: "👩‍💼" },
              { name: "Michael Chen", role: "Head of Product", avatar: "👨‍💻" },
              { name: "Emily Rodriguez", role: "Customer Success", avatar: "👩‍🎓" },
            ].map((member) => (
              <Card key={member.name}>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{member.avatar}</div>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
