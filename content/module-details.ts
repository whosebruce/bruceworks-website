import type { ModuleId } from './modules';

// The deeper story for each module on /command-center/ (the explorer). content/modules.ts says what each one is and
// whether it's live; this says what it really does, in the field. Every line here is something the OS does today
// (Bruce Works OS AGENTS.md and its feature registry); "coming" modules say so.

export type ModuleDetail = {
  /** What you'd notice using it, one line each. */
  points: string[];
  /** Modules it works hand in hand with (chips in the explorer). */
  with: ModuleId[];
  /** One honest footnote, when it needs one. */
  note?: string;
};

export const MODULE_DETAILS: Record<ModuleId, ModuleDetail> = {
  crew: {
    points: [
      'A chat with each agent, with the model and reasoning picked per chat and a meter for how full the conversation is.',
      'Rooms: group chats where agents hand work to each other by name, and stop to ask you when it’s your call.',
      'One search across every conversation, with keys and passwords blanked out before anything is indexed.',
      'Start a chat inside a project and the agent gets that project’s brief and folder. The transcript is saved to the project.',
      'Schedules: every recurring job in one list, with an alert when one fails.',
    ],
    with: ['approvals', 'projects', 'vault'],
  },
  approvals: {
    points: [
      'An agent that wants to send, delete or run something risky stops and asks.',
      'Answer from the dashboard or your phone. The first answer wins.',
      'A countdown shows how long it waits. No answer means no.',
      'Agents can’t answer approvals, including their own. The door is locked to their keys.',
      'Every request is kept with how it ended: approved, denied or expired.',
    ],
    with: ['crew', 'notifications'],
  },
  jot: {
    points: [
      'Sticky notes on a board you arrange. Every screen shows the same board.',
      'Tasks move to the archive when you tick them off, and come back if you need them.',
      'Don’t-forget: your daily routine, unticked again at midnight. Past its time and not done, it shows late.',
      'Reminders in plain words, like “tomorrow at 9”, delivered as a notification on time.',
      'Agents can file a task or a reminder for you. They can’t read your notes.',
    ],
    with: ['notifications', 'crew'],
  },
  office: {
    points: [
      'Word documents in a page-like editor: styles, tables, pictures, headers and page numbers. Export to PDF.',
      'Spreadsheets with formulas, several sheets, sort and filter. Saved as Excel or CSV.',
      'Slide decks with speaker notes and present mode. Export to PowerPoint or PDF.',
      'PDFs: highlight, draw, type, fill forms and sign with a finger or a pen.',
      'The first save over a file keeps the untouched original beside it.',
    ],
    with: ['files', 'projects', 'school'],
    note: 'It runs in your browser on your machine: no office server, nothing loaded from anyone’s cloud.',
  },
  files: {
    points: [
      'The folders on your machine and your storage, one click away.',
      'A preview for every kind of file: pictures, video, PDFs, Word, Excel, slides, code and web pages.',
      'Notes open and save in place. Documents open in Office.',
    ],
    with: ['office', 'library', 'projects'],
  },
  library: {
    points: [
      'Every image, video, audio file and document in one place, tagged and searchable.',
      'What your agents make lands in their inbox here by itself, with the prompt saved beside it.',
      'Each project’s assets show up here too.',
      'Nothing is deleted. Removing a file moves it to an archive.',
    ],
    with: ['studio', 'files', 'projects'],
  },
  projects: {
    points: [
      'One folder per client or venture, with the same layout every time: assets, chats, docs, web pages, files.',
      'Pick a project in the title bar and the whole dashboard follows: its files, its chats, where new work saves.',
      'Your own ventures and your clients’ work stay in separate places.',
    ],
    with: ['crew', 'files', 'library'],
  },
  school: {
    points: [
      'Classes and assignments from Canvas, by access token, by the calendar feed, or typed in by hand.',
      'A folder per assignment, by week: what the class handed out on one side, your work on the other.',
      'A heads-up when something’s new, due tomorrow, due in two hours, or graded.',
      'Hand work in from the dashboard, after a confirm page that says exactly what goes where.',
      'Your agent can read the instructions and quiz you. It never submits.',
    ],
    with: ['office', 'crew', 'notifications'],
    note: 'Off unless it’s switched on: it goes into a student’s build.',
  },
  finance: {
    points: [
      'Accounts, spending and bills in one view.',
      'Invoices numbered so two can never collide, filed as PDFs, marked paid when the money lands.',
      'What’s still unpaid, at a glance.',
    ],
    with: ['projects', 'office'],
  },
  studio: {
    points: [
      'Generate images from a prompt, up to four at a time.',
      'Presets that put your brand’s look in front of every prompt.',
      'Image tools: resize, compress, cut out a background, vectorize.',
      'Results go straight into the Library, or the project’s assets, with the prompt kept.',
    ],
    with: ['library', 'motion', 'content'],
  },
  motion: {
    points: [
      'Describe a motion graphic. A model writes it and your machine renders the MP4.',
      'Wide, tall or square, one to sixty seconds. Title cards, lower thirds, intros.',
      'Ask for changes and it renders a new version. Old versions stay.',
      'Your style guide drives it, so it designs in your brand.',
    ],
    with: ['studio', 'library', 'content'],
    note: 'The model that writes the graphic gets no shell and no internet. It only touches its own job folder.',
  },
  voice: {
    points: [
      'Paste a script, pick a voice and a language, get a voiceover.',
      'Takes save into the Library or the project you’re in.',
    ],
    with: ['content', 'motion'],
  },
  content: {
    points: [
      'A folder per video in a fixed layout: script, creative, audio, images, clips, edit, exports, thumbnail.',
      'One script per video. Agents propose drafts; you accept or dismiss. Notes pin to the exact words.',
      'Slides for screen recordings, an idea board with link previews, and drawing boards.',
      'Save a YouTube video with its transcript for research and commentary.',
      'Drafts for X and Instagram in a queue. You post them yourself.',
    ],
    with: ['studio', 'voice', 'motion', 'library'],
  },
  notifications: {
    points: [
      'One bell for everything, newest first. Click one to jump to it.',
      'Push to the phones and computers you pick.',
      'Reminders and approvals stay on screen until you clear them.',
      'Summaries only: a notification never carries a password, a prompt or private text.',
    ],
    with: ['jot', 'approvals', 'school'],
  },
  vault: {
    points: [
      'Hand an agent an API key without pasting it into a chat.',
      'The key goes straight to where the agent reads it and works on its next message.',
      'Private files like certificates are stored locked down and referred to by path, never copied around.',
    ],
    with: ['crew'],
  },
  web: {
    points: [
      'Your sites and services in one directory, grouped by machine, each with an up or down light.',
      'A real browser running on your own machine, shown in the dashboard. Its logins stay put.',
    ],
    with: ['files', 'vault'],
  },
  pages: {
    points: [
      'Pages built from blocks: type / for headings, to-dos, toggles, callouts, code and a database right on the page, and @ to link another page.',
      'Databases where every row is a page. Table, board, calendar, gallery and list views, with relations between databases, rollups, filters and sorts.',
      'Import from Notion: the Markdown and CSV export comes back as the same pages, databases and links.',
      'In a student’s build, School shows up as Classes and Assignments databases that stay in step with Canvas. Your own columns and notes stay yours.',
      'Share a page with your agents and they can read it and add to it. Everything else stays private.',
    ],
    with: ['jot', 'office', 'school', 'crew'],
  },
};
