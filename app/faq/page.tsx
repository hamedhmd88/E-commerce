import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageLayout } from "@/components/layout/page-layout";

export const metadata: Metadata = {
  title: "FAQ",
  description: "How the catalog, demo account, and simulated checkout work.",
};

const questions = [
  {
    q: "Are these real products?",
    a: "The product catalog is fetched from Fake Store API. Product details and prices are provided by that demonstration service and may change or become unavailable.",
  },
  {
    q: "Will I be charged at checkout?",
    a: "No. Checkout is a simulation for this portfolio project. Never enter real card information; no payment is processed.",
  },
  {
    q: "Will an order be shipped?",
    a: "No. Order confirmation and history demonstrate a shopping flow only. There is no fulfillment, shipping, email, or SMS service.",
  },
  {
    q: "Is my account a real customer account?",
    a: "No. Account features demonstrate the user experience of a storefront. Do not use personal credentials that you use elsewhere.",
  },
  {
    q: "Can I return or cancel an order?",
    a: "Because every order is simulated, there is nothing to return or cancel with a merchant. You can clear local demo data in your browser to reset the experience.",
  },
  {
    q: "Does the contact form reach a support team?",
    a: "No. The contact form shows a local demo response and does not send a message to anyone.",
  },
];

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
          {questions.map(({ q, a }, index) => (
            <AccordionItem key={q} value={`question-${index}`}>
              <AccordionTrigger className="py-6 text-left text-base font-medium sm:text-lg">
                {q}
              </AccordionTrigger>
              <AccordionContent className="max-w-2xl pb-6 leading-relaxed text-muted-foreground">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </PageLayout>
  );
}
