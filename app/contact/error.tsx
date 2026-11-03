"use client";

import {
  RouteError,
  type RouteErrorProps,
} from "@/components/feedback/route-error";

export default function ContactError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="Contact page could not load"
      description="The demo contact form is temporarily unavailable. Try again or browse the FAQ."
    />
  );
}
