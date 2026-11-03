"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/faq";
import { useLanguage } from "@/components/layout/language-provider";
import { translate } from "@/lib/i18n/translate";

export function FAQSection() {
  const { locale } = useLanguage();
  return (
    <section
      className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-14 lg:py-28"
      aria-labelledby="home-faq-heading"
      data-i18n-ignore
    >
      <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        <div>
          <p className="text-sm font-medium text-primary">
            {translate("A little more clarity", locale)}
          </p>
          <h2
            id="home-faq-heading"
            className="mt-3 max-w-md text-4xl font-medium tracking-[-.055em] sm:text-5xl"
          >
            {translate("Questions, answered simply.", locale)}
          </h2>
          <p className="mt-5 max-w-sm leading-7 text-muted-foreground">
            {translate("Everything you need to know about exploring this demo storefront.", locale)}
          </p>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`item-${index}`}
              className="glass-panel overflow-hidden rounded-2xl border border-border/70 px-5 transition-colors data-[state=open]:border-primary/40"
            >
              <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline sm:text-lg">
                {translate(item.question, locale)}
              </AccordionTrigger>
              <AccordionContent className="pb-5 leading-7 text-muted-foreground">
                {translate(item.answer, locale)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
