import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { PageLayout } from "@/components/layout/page-layout";

export const metadata: Metadata = {
  title: "Contact",
  description: "Try the contact form in the Morrow portfolio demo.",
};

export default function ContactPage() {
  return (
    <PageLayout customLastLabel="Contact">
      <section className="mx-auto max-w-6xl py-8 lg:py-16">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[.28em] text-primary">
          Get in touch
        </p>
        <h1 className="max-w-3xl font-serif text-5xl leading-tight tracking-tight sm:text-7xl">
          We’d love to hear <em className="text-primary">your thoughts.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Explore how a contact flow can feel in a modern storefront. This is a
          portfolio demo: messages are not sent to a support team.
        </p>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_.7fr]">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
            <h2 className="mb-6 font-serif text-3xl">Send a demo message</h2>
            <ContactForm />
          </div>
          <aside className="rounded-3xl bg-muted p-7 sm:p-10">
            <h2 className="font-serif text-3xl">A quick note</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              This form demonstrates validation and feedback. For questions
              about how the shopping demo works, see the FAQ. No real support,
              delivery, or order fulfillment is offered here.
            </p>
            <Link
              href="/faq"
              className="mt-7 inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4"
            >
              Read the FAQ
            </Link>
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
