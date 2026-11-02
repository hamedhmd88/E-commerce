"use client";

import { useToast } from "@/hooks/use-toast";
import { CircleCheck, Info } from "lucide-react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <span
              className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/12 text-primary"
              aria-hidden="true"
            >
              {variant === "success" ? (
                <CircleCheck className="size-5" />
              ) : (
                <Info className="size-5" />
              )}
            </span>
            <div className="grid min-w-0 flex-1 gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
