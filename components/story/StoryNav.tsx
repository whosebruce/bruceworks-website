import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GridBand, SectionHeader } from '../brand';
import { Swipe } from '../Swipe';

// The story pages link to each other at the bottom ("keep reading"), so a reader who wants the person, the record,
// the standard, the approach or the proof is one tap away from it. A swipe row on phones.
export const STORY_PAGES = [
  { href: '/about-bruce/', label: 'About Bruce', line: 'Who I am and why I build this.' },
  { href: '/experience/', label: 'Service record', line: 'IT, logistics, systems and leadership.' },
  { href: '/why-hire-bruce/', label: 'Why Bruce', line: 'The person and the standard.' },
  { href: '/why-us/', label: 'The approach', line: 'Client-owned, documented, handed off.' },
  { href: '/our-work/', label: 'Systems in use', line: 'What I run my own company on.' },
] as const;

export const StoryNav: React.FC<{ current: string; num: string }> = ({ current, num }) => (
  <GridBand tone="raised">
    <div className="py-12 md:py-16">
      <SectionHeader num={num} label="Keep reading" />
      <Swipe label="More about Bruce Works" desktop="md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-4" item="basis-[70%] sm:basis-[45%]" className="mt-8">
        {STORY_PAGES.filter((p) => p.href !== current).map((p) => (
          <Link key={p.href} to={p.href} className="panel group flex h-full min-h-[44px] flex-col gap-2 p-5 transition-colors hover:border-ink-3">
            <span className="flex items-center justify-between gap-3">
              <span className="display text-3xl">{p.label}</span>
              <ArrowRight size={20} className="shrink-0 text-ink-3 transition-colors group-hover:text-ink" aria-hidden="true" />
            </span>
            <span className="text-ink-2">{p.line}</span>
          </Link>
        ))}
      </Swipe>
    </div>
  </GridBand>
);
