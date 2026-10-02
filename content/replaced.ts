// The blocks that fall on the booking page (/book/): an app people pay for, and what takes its place. `module` is a
// Command Center module (content/modules.ts); `open` is an open-source app Bruce self-hosts and ties in (the same
// list as HOSTING in content/pricing.ts). Names only, never logos. Keep it to swaps the site already claims
// (content/stack.ts, content/pricing.ts): a block is a promise.

export type Swap = { paid: string; with: string; kind: 'module' | 'open'; note?: string };

export const SWAPS: Swap[] = [
  { paid: 'Notion', with: 'Jot + Office', kind: 'module', note: 'Pages coming' },
  { paid: 'Evernote', with: 'Jot', kind: 'module' },
  { paid: 'Microsoft 365', with: 'Office', kind: 'module' },
  { paid: 'Google Workspace', with: 'Office', kind: 'module' },
  { paid: 'Acrobat', with: 'Office', kind: 'module', note: 'Fill and sign PDFs' },
  { paid: 'DocuSign', with: 'Documenso', kind: 'open' },
  { paid: 'Canva', with: 'Studio', kind: 'module' },
  { paid: 'Midjourney', with: 'Studio', kind: 'module' },
  { paid: 'ElevenLabs', with: 'Voice', kind: 'module' },
  { paid: 'Dropbox', with: 'Files', kind: 'module' },
  { paid: 'iCloud+', with: 'Files + Library', kind: 'module' },
  { paid: 'Google Photos', with: 'Nextcloud', kind: 'open' },
  { paid: 'Todoist', with: 'Jot', kind: 'module' },
  { paid: 'Zapier', with: 'n8n', kind: 'open' },
  { paid: 'Make', with: 'Crew', kind: 'module', note: 'Agents and scheduled jobs' },
  { paid: 'Grammarly', with: 'Crew', kind: 'module' },
  { paid: 'Trello', with: 'Projects', kind: 'module' },
  { paid: 'Asana', with: 'Projects', kind: 'module' },
  { paid: '1Password', with: 'Vaultwarden', kind: 'open' },
  { paid: 'HubSpot', with: 'Twenty CRM', kind: 'open' },
  { paid: 'Calendly', with: 'Cal.com', kind: 'open', note: 'This calendar' },
  { paid: 'Google Search', with: 'SearXNG', kind: 'open', note: 'Without the tracking' },
  { paid: 'Invoicing app', with: 'Finance', kind: 'module' },
  { paid: 'Content calendar', with: 'Content', kind: 'module' },
  { paid: 'Homework planner', with: 'School', kind: 'module' },
];

/** On phones only the best-known ones fall, so the calendar stays the point. */
export const PHONE_SWAPS = ['Notion', 'Microsoft 365', 'DocuSign', 'Canva', 'Dropbox', 'Zapier', '1Password', 'Calendly', 'Trello', 'HubSpot'];
