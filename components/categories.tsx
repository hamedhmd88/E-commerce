import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, Gem, ShirtIcon, Cross as Dress } from "lucide-react"

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    icon: Smartphone,
    description: "Latest gadgets and tech",
    color: "text-blue-600",
  },
  {
    name: "Jewelry",
    slug: "jewelery",
    icon: Gem,
    description: "Elegant accessories",
    color: "text-purple-600",
  },
  {
    name: "Men's Clothing",
    slug: "men's clothing",
    icon: ShirtIcon,
    description: "Stylish menswear",
    color: "text-green-600",
  },
  {
    name: "Women's Clothing",
    slug: "women's clothing",
    icon: Dress,
    description: "Fashion for her",
    color: "text-pink-600",
  },
]

export function Categories() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-balance mb-4">Shop by Category</h2>
          <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
            Explore our diverse range of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <IconComponent
                        className={`h-12 w-12 mx-auto ${category.color} group-hover:scale-110 transition-transform`}
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
