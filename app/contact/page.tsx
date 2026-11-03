import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CircleHelp,
  LockKeyhole,
  MessageCircleMore,
} from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { PageLayout } from "@/components/layout/page-layout";

export const metadata: Metadata = {
  title: "Contact",
  description: "Try the contact form in the Morrow portfolio demo.",
};

export default function ContactPage() {
  return (
    <PageLayout customLastLabel="Contact" variant="catalog">
      <section className="mx-auto max-w-6xl py-4 lg:py-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[.28em] text-primary">
          Get in touch
        </p>
        <h1 className="max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          We’d love to hear <em className="text-primary">your thoughts.</em>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Explore how a contact flow can feel in a modern storefront. This is a
          portfolio demo: messages are not sent to a support team.
        </p>
        <div className="mt-7 grid items-start gap-5 lg:grid-cols-[1.3fr_.7fr]">
          <div className="glass-panel contact-glass relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="relative mb-6 flex items-start gap-4 border-b border-border/60 pb-5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <MessageCircleMore className="size-6" />
              </span>
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl">
                  Send a demo message
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  A small note is all it takes to try the interaction.
                </p>
              </div>
            </div>
            <ContactForm />
          </div>
          <aside className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
              <CircleHelp className="size-6" />
            </span>
            <h2 className="mt-4 font-serif text-2xl sm:text-3xl">
              A quick note
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              This form demonstrates validation and feedback. For questions
              about how the shopping demo works, see the FAQ. No real support,
              delivery, or order fulfillment is offered here.
            </p>
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-border/70 bg-background/45 p-4 text-sm text-muted-foreground">
              <LockKeyhole className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                Everything here is a local demonstration. Your message is not
                delivered or stored.
              </span>
            </div>
            <Link
              href="/faq"
              className="mt-5 inline-flex min-h-11 items-center gap-2 font-medium text-primary underline underline-offset-4"
            >
              Read the FAQ <ArrowUpRight className="size-4" />
            </Link>
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
