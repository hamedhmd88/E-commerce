interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  link: string;
}

export const dataSlider : Slide[] = [
  {
    id: 1,
    title: "Summer Collection 2024",
    subtitle: "Discover the latest trends",
    description: "Explore our curated selection of premium fashion and accessories",
    image: "/photo-slider/womanclth1.jpg",
    cta: "Shop Now",
    link: "/category/women's clothing",
  },
  {
    id: 2,
    title: "Men's Collection 2024",
    subtitle: "Discover the latest trends",
    description: "Explore our curated selection of premium fashion and accessories",
    image: "/photo-slider/manclth1.jpg",
    cta: "Shop Now",
    link: "/category/men's clothing",
  },

  {
    id: 3,
    title: "Tech Innovation",
    subtitle: "Latest Electronics",
    description: "Cutting-edge technology for the modern lifestyle",
    image: "/photo-slider/electronic1.jpg",
    cta: "Explore Tech",
    link: "/category/electronics",
  },

  {
    id: 4,
    title: "Luxury Jewelry",
    subtitle: "Timeless Elegance",
    description: "Exquisite pieces that define sophistication",
    image: "/photo-slider/jewelry1.jpg",
    cta: "View Collection",
    link: "/category/jewelery",
  },
  {
    id: 5,
    title: "Home Decor",
    subtitle: "Transform Your Space",
    description: "Create a home that reflects your style and personality",
    image: "/photo-slider/electronic2.jpg",
    cta: "Shop Now",
    link: "/category/electronics",
  },
   {
    id: 6,
    title: "Summer Collection 2024",
    subtitle: "Discover the latest trends",
    description: "Explore our curated selection of premium fashion and accessories",
    image: "/photo-slider/womanclth2.jpg",
    cta: "Shop Now",
    link: "/category/women's clothing",
  },
  {
    id: 7,
    title: "Men's Collection 2024",
    subtitle: "Discover the latest trends",
    description: "Explore our curated selection of premium fashion and accessories",
    image: "/photo-slider/manclth2.jpg",
    cta: "Shop Now",
    link: "/category/men's clothing",
  },
  
  {
    id: 8,
    title: "Luxury Jewelry",
    subtitle: "Timeless Elegance",
    description: "Exquisite pieces that define sophistication",
    image: "/photo-slider/jewelry2.jpg",
    cta: "View Collection",
    link: "/category/jewelery",
  },
]

///////////////////////////////////////////////////////

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export const testimonials: Testimonial[] = [
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
  // New testimonials added below
  {
    id: 4,
    name: "John Smith",
    role: "Home Decor Expert",
    content: "Great variety in home decor items. Transformed my living space with affordable and stylish pieces!",
    rating: 4,
    avatar: "JS",
  },
  {
    id: 5,
    name: "Lisa Wong",
    role: "Fitness Trainer",
    content: "Excellent sports wear collection. Comfortable, durable, and perfect for my daily workouts.",
    rating: 5,
    avatar: "LW",
  },
  {
    id: 6,
    name: "David Kim",
    role: "Gadget Lover",
    content: "Top-notch gadgets with quick delivery. The quality exceeds expectations every time!",
    rating: 5,
    avatar: "DK",
  },
];


/////////////////////////////////////////////////////////

// Define TypeScript interface for FAQ items
export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "How can I track my order?",
    answer: "After placing an order, you'll receive a confirmation email. You can track the status in your account dashboard."
  },
  {
    question: "What are the available payment methods?",
    answer: "We support online payments via bank gateways, credit cards, and cash on delivery."
  },
  {
    question: "How long does shipping take?",
    answer: "Orders are typically shipped within 1-3 business days. Exact time depends on your location."
  },
  {
    question: "Is there a return policy?",
    answer: "Yes, you can return items within 7 days of receipt, provided they are unused and in original packaging."
  },
  {
    question: "How do I create an account?",
    answer: "Click on the register button and enter your details. The process is quick and simple."
  },
  {
    question: "Are there any special discounts?",
    answer: "Yes, check the featured products section or subscribe to our newsletter for exclusive deals."
  },
  {
    question: "How can I contact support?",
    answer: "Reach us via the contact page or email us at support@example.com."
  }
];