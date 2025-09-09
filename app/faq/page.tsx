import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const faqCategories = [
  {
    title: "Orders & Payment",
    badge: "Popular",
    questions: [
      {
        question: "How do I place an order?",
        answer:
          "Simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or sign in to complete your purchase.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay for your convenience.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "You can modify or cancel your order within 1 hour of placing it. After that, please contact our customer service team for assistance.",
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    questions: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 3-7 business days. Express shipping (1-3 business days) is available for an additional fee.",
      },
      {
        question: "Do you offer free shipping?",
        answer: "Yes! We offer free standard shipping on orders over $50 within the continental United States.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "We currently ship to over 25 countries. International shipping times vary by location, typically 7-14 business days.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for unused items in original packaging. Return shipping is free for defective items.",
      },
      {
        question: "How do I return an item?",
        answer:
          "Log into your account, go to order history, and select 'Return Item'. We'll provide a prepaid return label and instructions.",
      },
      {
        question: "When will I receive my refund?",
        answer:
          "Refunds are processed within 3-5 business days after we receive your returned item. It may take additional time for your bank to process the refund.",
      },
    ],
  },
  {
    title: "Account & Security",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "Click 'Sign Up' in the top right corner and fill out the registration form. You'll receive a confirmation email to verify your account.",
      },
      {
        question: "Is my personal information secure?",
        answer:
          "Yes, we use industry-standard SSL encryption to protect your personal and payment information. We never share your data with third parties.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Click 'Forgot Password' on the login page and enter your email address. We'll send you instructions to reset your password.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-balance mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Find quick answers to common questions about shopping with ModernStore.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {category.title}
                    {category.badge && <Badge variant="secondary">{category.badge}</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, questionIndex) => (
                      <AccordionItem key={questionIndex} value={`item-${categoryIndex}-${questionIndex}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact CTA */}
          <Card className="mt-12">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Our customer support team is here to help you with any additional questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Contact Support
                </a>
                <a
                  href="mailto:support@modernstore.com"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                  Email Us
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
