import type { ModuleId } from './modules';

// The "your app stack" calculator on Home. Kinds of apps, not brands: the examples are only there so people recognize
// them, and every price is an editable estimate of a typical single-person monthly plan (the visitor changes it to
// what they really pay). `by` is the module that covers it; `note` says how, honestly, where it isn't a 1-for-1 swap.

export type StackItem = { id: string; kind: string; examples: string; monthly: number; by: ModuleId[]; note?: string };

export const STACK: StackItem[] = [
  { id: 'notes', kind: 'Notes and workspace', examples: 'Notion, Evernote', monthly: 12, by: ['pages', 'jot'], note: 'Pages imports your Notion workspace.' },
  { id: 'office', kind: 'Office suite', examples: 'Microsoft 365, Google Workspace', monthly: 10, by: ['office'] },
  { id: 'pdf', kind: 'PDF editing and e-signing', examples: 'Acrobat, DocuSign', monthly: 20, by: ['office'] },
  { id: 'design', kind: 'Design and graphics', examples: 'Canva', monthly: 15, by: ['studio', 'office'] },
  { id: 'images', kind: 'AI image generator', examples: 'Midjourney', monthly: 10, by: ['studio'], note: 'Runs on the AI plan you already have.' },
  { id: 'voice', kind: 'Voiceovers', examples: 'ElevenLabs', monthly: 11, by: ['voice'], note: 'Pay only for what you generate.' },
  { id: 'motion', kind: 'Motion template packs', examples: 'stock motion subscriptions', monthly: 16, by: ['motion'] },
  { id: 'storage', kind: 'Cloud storage', examples: 'Dropbox, iCloud+', monthly: 12, by: ['files', 'library'], note: 'On storage you own.' },
  { id: 'todo', kind: 'To-dos and reminders', examples: 'Todoist', monthly: 5, by: ['jot'] },
  { id: 'automation', kind: 'Automations', examples: 'Zapier, Make', monthly: 20, by: ['crew'], note: 'Agents and scheduled jobs.' },
  { id: 'writing', kind: 'Writing assistant', examples: 'Grammarly', monthly: 12, by: ['crew'] },
  { id: 'homework', kind: 'Homework planner', examples: 'school planner apps', monthly: 5, by: ['school'] },
  { id: 'projects', kind: 'Project tracker', examples: 'Trello, Asana', monthly: 10, by: ['projects'] },
  { id: 'invoices', kind: 'Invoicing', examples: 'invoicing apps', monthly: 15, by: ['finance'] },
  { id: 'content', kind: 'Content planning', examples: 'content calendars', monthly: 15, by: ['content'], note: 'Plans and drafts; posting stays in each app.' },
];

/** The ones ticked when the page loads: a believable starting stack. */
export const STACK_DEFAULT = ['notes', 'office', 'pdf', 'design', 'storage', 'automation', 'writing'];
