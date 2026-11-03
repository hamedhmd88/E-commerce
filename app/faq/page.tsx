import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageLayout } from "@/components/layout/page-layout";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "How the catalog, demo account, and simulated checkout work.",
};

export default function FaqPage() {
  return (
    <PageLayout customLastLabel="FAQ">
      <section className="mx-auto max-w-4xl py-10 lg:py-20">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[.28em] text-primary">
          Good to know
        </p>
        <h1 className="font-serif text-5xl tracking-tight sm:text-7xl">
          Frequently asked <em className="text-primary">questions.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          The essentials about this portfolio shopping experience, its real
          catalog, and simulated features.
        </p>
        <Accordion
          type="single"
          collapsible
          className="mt-12 rounded-3xl border border-border bg-card px-6 sm:px-9"
        >
          {faqItems.map(({ question, answer }, index) => (
            <AccordionItem key={question} value={`question-${index}`}>
              <AccordionTrigger className="py-6 text-left text-base font-medium sm:text-lg">
                {question}
              </AccordionTrigger>
              <AccordionContent className="max-w-2xl pb-6 leading-relaxed text-muted-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </PageLayout>
  );
}
