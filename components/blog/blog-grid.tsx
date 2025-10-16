import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";

export const blogPosts = [
  {
    id: "1",
    slug: "2024-tech-trends",
    title: "Top Technology Trends to Watch in 2024",
    excerpt:
      "Discover the latest innovations shaping the tech industry and how they impact your daily life.",
    category: "Technology",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "7 min read",
    image: "/modern-technology-trends.jpg",
    content: `
      <p>Technology in 2024 continues to evolve at a rapid pace, blurring the lines between the physical and digital worlds. From artificial intelligence that writes code to quantum computing that breaks today’s encryption standards, this year is set to redefine how we live and work.</p>

      <h2>1. Artificial Intelligence Everywhere</h2>
      <p>AI is no longer confined to tech giants. Small businesses, educational institutions, and even individuals are leveraging AI tools for creative work, automation, and data-driven decision-making. Tools like ChatGPT, Midjourney, and AI coding assistants are making advanced technology accessible to everyone.</p>
      <p>In 2024, we’ll see more emphasis on ethical AI — systems that are transparent, fair, and accountable. Governments are beginning to regulate AI behavior to prevent bias and misuse. Expect to see a balance between innovation and responsibility.</p>

      <h2>2. Quantum Computing</h2>
      <p>Quantum computing is transitioning from experimental to practical use. Tech leaders such as IBM, Google, and Intel are building quantum systems capable of solving complex optimization problems that classical computers cannot handle.</p>
      <p>Industries like finance, cybersecurity, and medicine are exploring how quantum computing can revolutionize their fields — from faster drug discovery to unbreakable encryption.</p>

      <h2>3. Sustainable and Green Tech</h2>
      <p>As climate change becomes a global priority, companies are integrating sustainability into every level of technology production. From recyclable hardware to energy-efficient data centers, eco-friendly innovation is the new norm.</p>
      <p>Data centers now use AI to optimize power consumption, and chip manufacturers are exploring low-carbon materials to minimize environmental impact.</p>

      <h2>4. Web3 and Digital Ownership</h2>
      <p>Despite fluctuations in cryptocurrency markets, the underlying blockchain technology continues to grow. In 2024, the focus shifts from speculation to utility — real-world applications like decentralized identity, digital certificates, and transparent supply chains.</p>

      <h2>5. Human-Centric Design and Accessibility</h2>
      <p>Tech design is becoming more inclusive. Devices and apps are built with accessibility in mind, ensuring that everyone — regardless of age or ability — can benefit from innovation. Features like voice navigation, adaptive contrast, and emotion-aware interfaces will become mainstream.</p>

      <p>Overall, 2024 is not about technology for technology’s sake. It’s about using innovation to create a more sustainable, ethical, and human-centered digital world.</p>
    `,
  },
  {
    id: "2",
    slug: "sustainable-fashion-guide",
    title: "The Complete Guide to Sustainable Fashion",
    excerpt:
      "Learn how to build a sustainable wardrobe without compromising on style or quality.",
    category: "Fashion",
    author: "Emily Rodriguez",
    date: "2024-01-12",
    readTime: "9 min read",
    image: "/sustainable-fashion.png",
    content: `
      <p>Sustainable fashion has moved from a niche concept to a mainstream movement. It’s about creating clothing that respects both people and the planet. The idea is simple: reduce waste, support fair labor, and prioritize longevity over short-term trends.</p>

      <h2>1. Understanding Sustainable Fashion</h2>
      <p>At its core, sustainable fashion means producing and consuming clothes responsibly. This includes ethical sourcing of materials, reducing carbon emissions, minimizing water waste, and promoting circular fashion — where garments are reused, recycled, or upcycled.</p>
      <p>Brands like Patagonia, Stella McCartney, and Everlane are setting new standards in transparency, showing customers exactly where and how their products are made.</p>

      <h2>2. Choosing the Right Fabrics</h2>
      <p>Opt for natural, renewable fabrics such as organic cotton, hemp, linen, and bamboo. These materials are biodegradable and often require fewer pesticides and less water to produce. Recycled polyester and regenerated fibers like Tencel are also excellent sustainable alternatives.</p>
      <p>Additionally, new fabric innovations like mushroom leather (Mylo) and pineapple fiber (Piñatex) are revolutionizing the industry, offering cruelty-free and eco-friendly options.</p>

      <h2>3. Slow Fashion Mindset</h2>
      <p>Fast fashion encourages mass consumption and frequent disposal, while slow fashion promotes thoughtful purchasing and timeless design. The goal is to buy less, choose well, and make it last. Investing in durable, high-quality items reduces environmental impact over time.</p>

      <h2>4. Building a Capsule Wardrobe</h2>
      <p>A capsule wardrobe is a small, versatile collection of clothes that can be mixed and matched for different occasions. Focus on neutral colors, classic cuts, and items that truly represent your personal style. This approach saves money and reduces clutter.</p>

      <h2>5. Conscious Consumer Habits</h2>
      <p>Repair your clothes instead of discarding them. Donate or sell unused items. Support local artisans and second-hand stores. Remember: every purchase is a reflection of your values and a contribution to a better future.</p>

      <p>Embracing sustainable fashion doesn’t mean sacrificing style — it means redefining it. By making small, consistent choices, you can help transform the fashion industry into a more responsible and compassionate one.</p>
    `,
  },
  {
    id: "3",
    slug: "jewelry-care-tips",
    title: "How to Care for Your Precious Jewelry",
    excerpt:
      "Expert tips on maintaining and preserving your jewelry collection for years to come.",
    category: "Jewelry",
    author: "Michael Chen",
    date: "2024-01-10",
    readTime: "6 min read",
    image: "/luxury-jewelry-care.jpg",
    content: `
      <p>Jewelry is more than just decoration — it’s a reflection of memories, milestones, and personal expression. Proper care ensures that your pieces remain beautiful and valuable for generations to come.</p>

      <h2>1. Regular Cleaning</h2>
      <p>Clean your jewelry regularly using a mild soap and warm water solution. Use a soft toothbrush to reach small crevices, especially for pieces with gemstones or engravings. Avoid ultrasonic cleaners for delicate stones like emeralds or opals, as vibrations may cause damage.</p>
      <p>After cleaning, pat dry with a soft, lint-free cloth and store immediately to prevent tarnish or oxidation.</p>

      <h2>2. Safe Storage</h2>
      <p>Jewelry should always be stored separately to avoid scratches and tangling. Use individual pouches, soft-lined boxes, or anti-tarnish strips for silver. Keep pearls and other organic gems in breathable fabric rather than airtight plastic bags.</p>

      <h2>3. Avoid Exposure to Chemicals</h2>
      <p>Perfumes, hairsprays, lotions, and household cleaners can damage metals and stones. Always remove jewelry before applying cosmetics, swimming, or cleaning. Even exposure to sweat can dull the shine of certain metals over time.</p>

      <h2>4. Professional Inspection and Maintenance</h2>
      <p>Have your jewelry inspected annually by a professional jeweler. They can check for loose prongs, worn clasps, and other signs of wear that might lead to stone loss or breakage. Professional polishing can also restore brilliance safely.</p>

      <h2>5. Long-Term Preservation Tips</h2>
      <p>Keep your jewelry away from direct sunlight and extreme temperature changes. For heirloom pieces, consider insurance or appraisals to protect their financial and sentimental value.</p>

      <p>By dedicating a few minutes each month to care and maintenance, you can keep your jewelry sparkling for a lifetime — a small effort for something truly priceless.</p>
    `,
  },
  {
    id: "4",
    slug: "home-office-setup",
    title: "Creating the Perfect Home Office Setup",
    excerpt:
      "Transform your workspace with the right electronics and accessories for maximum productivity.",
    category: "Lifestyle",
    author: "David Kim",
    date: "2024-01-08",
    readTime: "8 min read",
    image: "/modern-home-office.png",
    content: `
      <p>Working from home is no longer a temporary solution — it’s a lifestyle. Designing a productive home office involves balancing comfort, technology, and atmosphere to boost focus and creativity.</p>

      <h2>1. Ergonomic Furniture</h2>
      <p>An ergonomic chair with lumbar support and adjustable height can prevent back pain and fatigue. Standing desks are becoming popular for improving posture and reducing sedentary time. Remember: your workspace should adapt to you, not the other way around.</p>

      <h2>2. Lighting and Ambiance</h2>
      <p>Natural light improves mood and concentration. Position your desk near a window if possible. For evenings, use warm LED lights with adjustable brightness. Avoid harsh overhead lighting that causes glare on screens.</p>

      <h2>3. Essential Technology Setup</h2>
      <p>Equip your space with a reliable laptop or desktop, high-speed internet, a good-quality webcam, and noise-canceling headphones. A dual-monitor setup can significantly enhance productivity for multitasking professionals.</p>

      <h2>4. Decluttering and Organization</h2>
      <p>Minimalism leads to mental clarity. Use cable organizers, monitor stands, and drawer dividers to keep things tidy. A clutter-free environment reduces distractions and improves focus.</p>

      <h2>5. Personal Touch and Inspiration</h2>
      <p>Add items that inspire you: plants for freshness, artwork for creativity, or a small bookshelf to keep learning materials nearby. Your workspace should reflect who you are while motivating you to stay productive.</p>

      <p>A perfect home office isn’t about expensive furniture — it’s about balance, intention, and comfort. Small adjustments can transform how you feel and perform every day.</p>
    `,
  },
  {
    id: "5",
    slug: "spring-fashion-trends",
    title: "Spring Fashion Trends You Need to Know",
    excerpt:
      "Get ready for the new season with these must-have fashion pieces and styling tips.",
    category: "Fashion",
    author: "Lisa Wang",
    date: "2024-01-05",
    readTime: "7 min read",
    image: "/spring-fashion-trends.jpg",
    content: `
      <p>Spring 2024 celebrates color, freedom, and creativity. Designers are embracing individuality more than ever — from bold patterns to gender-neutral silhouettes, this season is all about self-expression.</p>

      <h2>1. Pastel Revival</h2>
      <p>Soft tones like lilac, mint, and peach are back. These colors bring calm energy and freshness, perfect for transitioning out of winter’s darker palette. Pastel suits and oversized blouses are particularly trendy this year.</p>

      <h2>2. Effortless Comfort</h2>
      <p>Comfort-driven style continues to rule. Expect relaxed tailoring, flowy skirts, and lightweight knitwear. Designers are proving that you can look elegant without sacrificing comfort.</p>

      <h2>3. Sustainable Fabrics</h2>
      <p>Eco-friendly fabrics like Tencel, linen, and organic cotton dominate the runways. Brands are proudly showcasing their environmental responsibility while maintaining luxurious textures.</p>

      <h2>4. Statement Accessories</h2>
      <p>Oversized earrings, chunky necklaces, and bright handbags are everywhere. The idea is to make a statement without overcomplicating the outfit — one bold piece can redefine your entire look.</p>

      <h2>5. Floral and Nature-Inspired Prints</h2>
      <p>Florals remain a spring favorite, but in 2024, they come with a twist: watercolor-like patterns and abstract plant motifs that blend modern art with nature.</p>

      <p>Spring fashion this year is about self-confidence, sustainability, and playfulness — embracing change with style.</p>
    `,
  },
  {
    id: "6",
    slug: "smart-shopping-tips",
    title: "Smart Shopping: How to Get the Best Deals",
    excerpt:
      "Insider secrets to finding quality products at great prices and making informed purchases.",
    category: "Shopping",
    author: "Alex Thompson",
    date: "2024-01-03",
    readTime: "8 min read",
    image: "/smart-shopping-deals.jpg",
    content: `
      <p>Smart shopping isn’t just about saving money — it’s about buying wisely. By understanding market cycles, product quality, and timing, you can stretch your budget while still enjoying premium goods.</p>

      <h2>1. Research and Compare Prices</h2>
      <p>Use price comparison tools like Google Shopping or Honey. Check historical pricing trends to see if “discounts” are genuine. Many online stores raise prices before a sale to make discounts look bigger than they are.</p>

      <h2>2. Understand Seasonal Cycles</h2>
      <p>Most products follow predictable sale patterns. Electronics drop in price after new versions launch, while clothing is cheapest at the end of each season. Patience and planning make a big difference.</p>

      <h2>3. Leverage Loyalty and Cashback Programs</h2>
      <p>Sign up for reward programs or browser extensions that give you cashback. Websites like Rakuten or Honey Gold can return a percentage of your purchase — savings that add up over time.</p>

      <h2>4. Read Reviews and Watch for Red Flags</h2>
      <p>Customer reviews reveal a lot. Look for patterns rather than isolated complaints. Be wary of listings with only generic five-star reviews — they might be fake.</p>

      <h2>5. Quality Over Quantity</h2>
      <p>Buying fewer, better-quality items saves money in the long run. Invest in products with warranties and durable materials. Avoid impulse buying — wait 24 hours before purchasing anything expensive.</p>

      <p>Smart shopping means thinking like an investor: every dollar spent should bring lasting value. Once you master the strategy, finding the best deals becomes second nature.</p>
    `,
  },
];

export function BlogGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogPosts.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}`}>
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
            <CardHeader className="p-0">
              <div className="relative aspect-video overflow-hidden rounded-t-lg bg-muted">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4">{post.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-primary">
                    <span>{post.readTime}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
