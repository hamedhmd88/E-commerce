"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { faIR } from "date-fns/locale";
import { CalendarDays, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLanguage } from "@/components/layout/language-provider";

type DatePickerProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function DatePicker({
  id,
  value,
  onChange,
  placeholder = "Choose date",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const { locale } = useLanguage();
  const selected = value ? parseISO(value) : undefined;
  const dateLocale = locale === "fa" ? faIR : undefined;

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            aria-label={
              value
                ? `${locale === "fa" ? "تاریخ انتخاب‌شده" : "Selected date"}: ${format(selected!, "MMMM d, yyyy", { locale: dateLocale })}`
                : placeholder
            }
            className="h-11 min-w-0 flex-1 justify-start gap-3 rounded-xl bg-background/60 px-3 text-left font-normal hover:bg-primary/5"
          >
            <CalendarDays className="size-4 shrink-0 text-primary" />
            <span
              className={value ? "truncate" : "truncate text-muted-foreground"}
            >
              {selected
                ? format(selected, "MMM d, yyyy", { locale: dateLocale })
                : placeholder}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-auto rounded-2xl border-border/70 bg-card/95 p-2 shadow-xl backdrop-blur-xl"
        >
          <Calendar
            dir={locale === "fa" ? "rtl" : "ltr"}
            locale={dateLocale}
            mode="single"
            selected={selected}
            onSelect={(date) => {
              if (date) onChange(format(date, "yyyy-MM-dd"));
              setOpen(false);
            }}
            defaultMonth={selected}
            className="rounded-xl bg-transparent"
          />
        </PopoverContent>
      </Popover>
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-10 shrink-0 rounded-xl"
          aria-label="Clear date"
          onClick={() => onChange("")}
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}
