// این فایل بدون تغییر می‌مونه، چون مشکلی نداره. برای کامل بودن می‌ذارم:
"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface CustomSliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
  // می‌تونی props اضافی اضافه کنی اگر لازم باشه
}

export function CustomSlider({ className, value = [0, 100], onValueChange, min = 0, max = 100, ...props }: CustomSliderProps) {
  return (
    <TooltipProvider>
      <SliderPrimitive.Root
        value={value}
        onValueChange={onValueChange}
        min={min}
        max={max}
        className={cn("relative flex w-full touch-none items-center", className)}
        {...props}
      >
        <SliderPrimitive.Track className="bg-muted relative grow overflow-hidden rounded-full h-1.5 w-full cursor-pointer">
          <SliderPrimitive.Range className="bg-primary absolute h-full" />
        </SliderPrimitive.Track>
        {value?.map((val, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <SliderPrimitive.Thumb className="border-primary bg-background ring-ring/50 block size-4 rounded-full border shadow-sm transition-colors focus-visible:ring-4" />
            </TooltipTrigger>
            <TooltipContent side="top" className="px-2 py-1">
              ${val}
            </TooltipContent>
          </Tooltip>
        ))}
      </SliderPrimitive.Root>
    </TooltipProvider>
  );
}