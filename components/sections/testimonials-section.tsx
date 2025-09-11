"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { testimonials } from "@/data/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules"; // Added for pagination
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination"; // Added for pagination styles


export function TestimonialsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-accent/10 via-background to-primary/10 cursor-pointer">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Don't just take our word for it - hear from our satisfied customers
          </motion.p>
        </div>

        <Swiper
          modules={[Pagination]}
          spaceBetween={24}
          slidesPerView={1.5}
          centeredSlides={true}
          loop={true}
          pagination={{
            clickable: true,
            type: "bullets",
            el: ".swiper-pagination",
            bulletClass: "inline-block w-2 h-2 rounded-full bg-foreground transition-all duration-300",
            bulletActiveClass: "bg-primary scale-125"
          }}
          breakpoints={{
            // صفحات کوچک (موبایل)
            640: { 
              slidesPerView: 1.5,
              centeredSlides: true,
              slidesPerGroup: 1
            },
            // صفحات متوسط (تبلت)
            768: { 
              slidesPerView: 1.5,
              centeredSlides: true,
              slidesPerGroup: 1
            },
            // صفحات بزرگ (دسکتاپ)
            1024: { 
              slidesPerView: 2.5,
              centeredSlidesBounds: true,
              slidesPerGroup: 2
            },
          }}
          className="relative pb-16"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="cursor-pointer">
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { 
                    opacity: 1, 
                    scale: 1,
                    transition: { 
                      duration: 0.5,
                      ease: "easeOut" as const
                    }
                  },
                  exit: { 
                    opacity: 0, 
                    scale: 0.9,
                    transition: { duration: 0.3 }
                  }
                }}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
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
              </motion.div>
            </SwiperSlide>
          ))}
          {/* <div className="swiper-pagination flex justify-center absolute left-0 right-0 -bottom-8" />  */}
          {/* // Moved back inside, positioned lower with -bottom-8 (adjust as needed) */}
        </Swiper>
      </div>
    </section>
  );
}
