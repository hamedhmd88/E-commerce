"use client";

import {
  RouteError,
  type RouteErrorProps,
} from "@/components/feedback/route-error";

export default function ProductsError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="Products could not load"
      description="The catalog is temporarily unavailable. Try again or return to the storefront."
    />
  );
}
