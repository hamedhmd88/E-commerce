"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { AlertTriangle, RefreshCw, Home, Mail } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ContactError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Contact page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-destructive" />
            </div>
          </div>

          {/* Error Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-destructive">
                Oops! Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We encountered an error while loading the contact page. This
                  might be a temporary issue.
                </p>

                {process.env.NODE_ENV === "development" && (
                  <div className="bg-muted p-4 rounded-lg text-left">
                    <p className="text-sm font-mono text-destructive">
                      Error: {error.message}
                    </p>
                    {error.digest && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Error ID: {error.digest}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={reset} className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>

                <Button variant="outline" asChild>
                  <Link href="/" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Go Home
                  </Link>
                </Button>
              </div>

              {/* Alternative Contact Methods */}
              <div className="pt-6 border-t">
                <h3 className="font-semibold mb-4">
                  Need immediate assistance?
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Email us at: support@modernstore.com</span>
                  </div>
                  <p>We'll get back to you within 24 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
