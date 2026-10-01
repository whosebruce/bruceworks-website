import React from 'react';
import { Swipe } from '../Swipe';

// The stack of apps next to one Command Center, line by line. Plain claims only: everything on the right is what the
// OS does today; what it doesn't replace is said underneath.
const ROWS: [string, string, string][] = [
  ['Logins', 'One per app, each with its own password reset.', 'One login, on your own network.'],
  ['Bills', 'A subscription per app, every month, each with its own price hike.', 'An install, done once. Monthly care only if you want it.'],
  ['Your files', 'A copy in every app, and the newest one is somewhere.', 'One copy, in one folder structure, on storage you own.'],
  ['Your AI', 'Knows what you paste into it, then forgets.', 'Works next to your files, projects and calendar.'],
  ['Risky actions', 'Whatever the bot decides to do.', 'Wait for your OK. Agents can’t approve themselves.'],
  ['The look', 'Twelve brands, none of them yours.', 'Your colors, your type, your logo.'],
  ['Changes', 'Each app moves things around on its own schedule.', 'New features arrive as switches. Your look and data stay.'],
  ['Leaving', 'Export from twelve places and hope.', 'It’s already on your machine, in ordinary files.'],
];

export const StackCompare: React.FC = () => (
  <>
    {/* phones: one card per line, swiped */}
    <Swipe label="The stack vs one Command Center" desktop="md:hidden" item="basis-[80%] sm:basis-[48%]" className="md:hidden">
      {ROWS.map(([k, stack, one]) => (
        <div key={k} className="panel flex h-full flex-col p-5">
          <p className="display text-3xl">{k}</p>
          <p className="label mt-4">The stack</p>
          <p className="mt-1 text-[15px] leading-snug text-ink-3">{stack}</p>
          <p className="label mt-4 !text-ink">One Command Center</p>
          <p className="mt-1 text-[15px] leading-snug text-ink"><span className="text-signal-text">☑</span> {one}</p>
        </div>
      ))}
    </Swipe>
    {/* md and up: the table */}
    <div className="panel hidden overflow-hidden md:block">
      <div className="grid grid-cols-[220px_1fr_1fr] border-b border-line bg-ground-3">
        <span className="label px-5 py-3" />
        <span className="label px-5 py-3">The stack</span>
        <span className="label px-5 py-3 !text-ink">One Command Center</span>
      </div>
      <ul className="divide-y divide-line-2">
        {ROWS.map(([k, stack, one]) => (
          <li key={k} className="grid grid-cols-[220px_1fr_1fr]">
            <span className="chip px-5 py-4 text-lg text-ink">{k}</span>
            <span className="px-5 py-4 text-[15px] leading-snug text-ink-3">{stack}</span>
            <span className="border-l border-line-2 px-5 py-4 text-[15px] leading-snug text-ink"><span className="text-signal-text">☑</span> {one}</span>
          </li>
        ))}
      </ul>
    </div>
  </>
);
