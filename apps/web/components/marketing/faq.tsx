'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  eyebrow: string;
  title: string;
  items: FaqItem[];
}

export default function Faq({ eyebrow, title, items }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-4xl">
      <div className="text-center">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">{eyebrow}</p>
        <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">{title}</h2>
      </div>
      <div className="mt-8 space-y-3">
        {items.map((item, index) => {
          const open = openIndex === index;
          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-[var(--surface)] shadow-panel backdrop-blur-xl sm:rounded-[1.5rem]"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                onClick={() => setOpenIndex(open ? null : index)}
                aria-expanded={open}
              >
                <span className="text-sm font-semibold text-white sm:text-base">{item.question}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-sentinel-300 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
              </button>
              {open ? (
                <div className="border-t border-white/5 px-5 pb-5 pt-4 sm:px-6">
                  <p className="text-xs leading-6 text-slate-400 sm:text-sm">{item.answer}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
