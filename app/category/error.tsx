"use client";

import {
  RouteError,
  type RouteErrorProps,
} from "@/components/feedback/route-error";

export default function CategoryError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="Category could not load"
      description="Products in this category are temporarily unavailable. Try again or browse from the home page."
    />
  );
}
