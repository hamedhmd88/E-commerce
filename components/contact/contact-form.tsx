"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Send } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-primary/25 bg-primary/5 p-8 text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Demo message recorded</h3>
        <p className="text-muted-foreground mb-4">
          Your form was validated locally. No message was sent to a support
          team.
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline">
          Try Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="mb-2 text-sm font-semibold">
            Your name{" "}
            <span className="text-primary" aria-hidden="true">
              *
            </span>
          </Label>
          <Input
            id="name"
            autoComplete="name"
            required
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Your full name"
          />
        </div>
        <div>
          <Label htmlFor="email" className="mb-2 text-sm font-semibold">
            Email address{" "}
            <span className="text-primary" aria-hidden="true">
              *
            </span>
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="category" className="mb-2 text-sm font-semibold">
          What is this about?{" "}
          <span className="font-normal text-muted-foreground">Optional</span>
        </Label>
        <Select
          value={formData.category}
          onValueChange={(value) => handleChange("category", value)}
        >
          <SelectTrigger id="category" className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-border bg-card/95 shadow-xl backdrop-blur-xl">
            <SelectItem value="general">General Inquiry</SelectItem>
            <SelectItem value="order">Demo Order Flow</SelectItem>
            <SelectItem value="product">Product Question</SelectItem>
            <SelectItem value="shipping">Storefront Experience</SelectItem>
            <SelectItem value="technical">Technical Feedback</SelectItem>
            <SelectItem value="partnership">Partnership</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="subject" className="mb-2 text-sm font-semibold">
          Subject{" "}
          <span className="text-primary" aria-hidden="true">
            *
          </span>
        </Label>
        <Input
          id="subject"
          required
          value={formData.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          placeholder="Brief description of your inquiry"
        />
      </div>

      <div>
        <Label htmlFor="message" className="mb-2 text-sm font-semibold">
          Your message{" "}
          <span className="text-primary" aria-hidden="true">
            *
          </span>
        </Label>
        <Textarea
          id="message"
          required
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="Please provide details about your inquiry..."
          rows={6}
        />
      </div>

      <Button
        type="submit"
        className="w-full min-h-12 rounded-xl transition-transform hover:-translate-y-0.5 motion-reduce:transform-none"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          "Processing..."
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Submit Demo Message
          </>
        )}
      </Button>
    </form>
  );
}
