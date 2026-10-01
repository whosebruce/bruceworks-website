import type { ModuleId } from './modules';

// "One place for every mission": a day in the Command Center for different people. Each step names the module it uses.
export type UseCase = { id: string; who: string; line: string; day: { time: string; what: string; module: ModuleId }[] };

export const USE_CASES: UseCase[] = [
  {
    id: 'business', who: 'Business owner', line: 'Run the shop from one screen instead of nine tabs.',
    day: [
      { time: '0700', what: 'Check what came in overnight: one bell for leads, invoices paid and jobs that ran.', module: 'notifications' },
      { time: '0730', what: 'Ask your agent to draft the three follow-ups and the estimate for the Hernandez job.', module: 'crew' },
      { time: '0900', what: 'Approve the agent’s request to send the estimate, from your phone.', module: 'approvals' },
      { time: '1300', what: 'Fill and sign the vendor PDF without printing anything.', module: 'office' },
      { time: '1700', what: 'Send two invoices and see what’s still unpaid.', module: 'finance' },
    ],
  },
  {
    id: 'creator', who: 'Creator', line: 'Ideas to posted, with your scripts, art and edits in one pipeline.',
    day: [
      { time: '0900', what: 'Drop three video ideas on the board and pull a YouTube reference with its transcript.', module: 'content' },
      { time: '1000', what: 'Have your agent turn the best idea into a script with a hook and a shot list.', module: 'crew' },
      { time: '1130', what: 'Generate four thumbnail options at once.', module: 'studio' },
      { time: '1300', what: 'Render the intro and the lower thirds in your brand.', module: 'motion' },
      { time: '1500', what: 'Record the voiceover for the skit from the script.', module: 'voice' },
    ],
  },
  {
    id: 'student', who: 'Student', line: 'Every class, every assignment, every file, sorted by week.',
    day: [
      { time: '0800', what: 'See what’s due this week from Canvas, on the same calendar as everything else.', module: 'school' },
      { time: '1000', what: 'Open the assignment’s folder: what the class handed out on one side, your work on the other.', module: 'school' },
      { time: '1400', what: 'Write the essay in a real document editor, then export it to Word.', module: 'office' },
      { time: '1600', what: 'Ask your agent to quiz you on chapter five.', module: 'crew' },
      { time: '2100', what: 'Tick off the day’s don’t-forgets before they reset at midnight.', module: 'jot' },
    ],
  },
  {
    id: 'home', who: 'Home and family', line: 'The family’s files, plans and reminders on a machine you own.',
    day: [
      { time: '0700', what: 'The daily don’t-forget list: meds, trash day, permission slip.', module: 'jot' },
      { time: '1200', what: 'Find the warranty PDF in seconds, wherever it was saved.', module: 'files' },
      { time: '1800', what: 'Every photo from the trip in one Library, not five phones.', module: 'library' },
      { time: '1900', what: 'Hand your agent the Wi-Fi password through the Vault, never the chat.', module: 'vault' },
      { time: '2000', what: 'Plan the weekend with your agent and turn it into reminders.', module: 'crew' },
    ],
  },
];
