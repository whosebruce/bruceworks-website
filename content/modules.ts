// What's inside the Command Center. Only modules that ship today are "live"; anything designed but not built says so.
// Each is a switch in the OS (Settings → Features), so a client turns on what they use and nothing else.

export type ModuleId =
  | 'crew' | 'jot' | 'office' | 'files' | 'library' | 'studio' | 'motion' | 'voice' | 'content' | 'school'
  | 'projects' | 'finance' | 'approvals' | 'notifications' | 'vault' | 'web' | 'pages';

export type Module = {
  id: ModuleId;
  name: string;
  /** One line, plain. */
  does: string;
  /** What it stands in for, in plain words (not brand names). */
  instead: string;
  group: 'Work' | 'Agents' | 'Make' | 'System';
  status: 'live' | 'coming';
  /** A motion loop for it, when one exists (content/media.ts). */
  loop?: string;
};

export const MODULES: Module[] = [
  { id: 'crew', name: 'Crew', does: 'Chat with your AI agents, see what each one is working on, and hand them real work.', instead: 'a separate chatbot tab for every job', group: 'Agents', status: 'live', loop: 'crew' },
  { id: 'approvals', name: 'Approvals', does: 'An agent asks before it does anything risky. You approve or deny from the dashboard or your phone.', instead: 'hoping the bot does the right thing', group: 'Agents', status: 'live', loop: 'approvals' },
  { id: 'jot', name: 'Jot', does: 'Sticky notes, tasks that archive when done, daily don’t-forgets that reset at midnight, and reminders.', instead: 'a notes app, a to-do app and a reminders app', group: 'Work', status: 'live', loop: 'jot' },
  { id: 'office', name: 'Office', does: 'Documents, spreadsheets and slide decks, plus PDFs you can fill and sign with a finger or a pen.', instead: 'an office suite and a PDF signer', group: 'Work', status: 'live', loop: 'office' },
  { id: 'files', name: 'Files', does: 'Every folder on your own machine and storage, with a preview for every kind of file.', instead: 'paying for cloud storage', group: 'Work', status: 'live' },
  { id: 'library', name: 'Library', does: 'Every image, video, audio file and document in one place, tagged and searchable.', instead: 'a photo app plus a downloads folder', group: 'Work', status: 'live' },
  { id: 'projects', name: 'Projects', does: 'A folder and a scope for each client or venture. Switch projects and the whole dashboard follows.', instead: 'a project tracker', group: 'Work', status: 'live' },
  { id: 'school', name: 'School', does: 'Classes and assignments from Canvas, a folder per assignment, and handing work in from one place.', instead: 'a homework planner app', group: 'Work', status: 'live', loop: 'school' },
  { id: 'finance', name: 'Finance', does: 'Accounts, spending, bills and invoices you can send.', instead: 'an invoicing app', group: 'Work', status: 'live' },
  { id: 'studio', name: 'Studio', does: 'Generate images from a prompt, up to four at a time, straight into your Library.', instead: 'a separate image generator', group: 'Make', status: 'live', loop: 'studio' },
  { id: 'motion', name: 'Motion', does: 'Motion graphics written by an AI and rendered on your machine: title cards, lower thirds, intros.', instead: 'motion template subscriptions', group: 'Make', status: 'live' },
  { id: 'voice', name: 'Voice', does: 'Turn a script into a voiceover, in several languages and voices.', instead: 'a voiceover app', group: 'Make', status: 'live' },
  { id: 'content', name: 'Content studio', does: 'Video projects, scripts, slides, social drafts, an idea board and YouTube research in one pipeline.', instead: 'a content calendar and a pile of docs', group: 'Make', status: 'live' },
  { id: 'notifications', name: 'Notifications', does: 'One bell for everything, with push to the phones you choose.', instead: 'a notification from every app', group: 'System', status: 'live' },
  { id: 'vault', name: 'Vault', does: 'Hand an agent a key or a private file without pasting it into a chat.', instead: 'secrets pasted into chats', group: 'System', status: 'live' },
  { id: 'web', name: 'Web', does: 'Your sites and services in one directory, and a browser that runs on your own machine.', instead: 'a dozen bookmarks', group: 'System', status: 'live' },
  { id: 'pages', name: 'Pages', does: 'Notion-style pages and linked databases with tables, boards and calendars.', instead: 'a separate workspace app', group: 'Work', status: 'coming' },
];

export const LIVE_MODULES = MODULES.filter((m) => m.status === 'live');
export const moduleById = (id: ModuleId) => MODULES.find((m) => m.id === id)!;
