import React from "react";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { BreadcrumbNav } from "@/components/layout/breadcrumb-nav";

interface PageLayoutProps {
  children: React.ReactNode;
  customLastLabel?: string;
  variant?: "default" | "catalog";
}

export function PageLayout({
  children,
  customLastLabel,
  variant = "default",
}: PageLayoutProps) {
  return (
    <div
      className={
        variant === "catalog"
          ? "home-canvas catalog-page min-h-screen"
          : "min-h-screen"
      }
    >
      <Navigation />
      <main
        id="main-content"
        className="container mx-auto px-4 py-8 sm:px-6 lg:py-10"
      >
        <BreadcrumbNav customLastLabel={customLastLabel} />
        {children}
      </main>
      <Footer />
    </div>
  );
}
