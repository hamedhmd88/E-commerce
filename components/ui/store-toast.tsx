"use client";

import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

/** Shared, theme-aware feedback for storefront actions. */
export const storeToast = {
  signIn(action: "add items to your bag" | "save items", redirect?: string) {
    toast({
      variant: "notice",
      title: "Sign in to continue",
      description: `Sign in to ${action} in this demo storefront.`,
      action: (
        <ToastAction altText="Sign in" asChild>
          <Link
            href={
              redirect
                ? `/login?redirect=${encodeURIComponent(redirect)}`
                : "/login"
            }
          >
            Sign in
          </Link>
        </ToastAction>
      ),
    });
  },
  success(title: string, description?: string) {
    toast({ variant: "success", title, description });
  },
};
