"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Categories } from "./categories";

const stats = [
  { label: "Happy Customers", value: 10000, suffix: "+" },
  { label: "Products Sold", value: 50000, suffix: "+" },
  { label: "Countries Served", value: 25, suffix: "" },
  { label: "Years Experience", value: 5, suffix: "+" },
];

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("stats-section");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats-section"
      className="py-16 bg-gradient-to-br from-accent/10 via-background to-primary/10"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
            Trusted by Thousands
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
            Join our growing community of satisfied customers worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="text-center hover:scale-105 transition-transform duration-300 animate-in fade-in-0 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100 + 400}ms` }}
            >
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {isVisible ? (
                    <CountUpAnimation
                      target={stat.value}
                      suffix={stat.suffix}
                    />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Categories />
    </section>
  );
}

function CountUpAnimation({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  );
}
