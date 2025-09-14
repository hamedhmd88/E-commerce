"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqItems } from "@/data/data";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";



export function FAQSection() {
  return (
    <section className="py-12 bg-gradient-to-br from-accent/10 via-background to-primary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions
</h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-medium">
                {item.question}
                <motion.span
                  initial={false}
                  className="ml-auto"
                  transition={{ duration: 0.3 }}
                >
                  {/* <ChevronDownIcon className="size-5" /> */}
                </motion.span>
              </AccordionTrigger>
              <AccordionContent>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-muted-foreground"
                >
                  {item.answer}
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}