// Field notes: Bruce's articles, as data. /field-notes/ lists them and /field-notes/<slug>/ renders one. Each needs a
// matching entry in seo/routes.json (title, description, Article JSON-LD) and public/sitemap.xml; keep the title and
// summary there in step with this file.
//
// Body blocks are plain data. Inline text may use **bold** and [a link](/path/); nothing else is parsed, and no HTML.

export type NoteBlock =
  | { t: 'p'; text: string }
  | { t: 'h2'; text: string }
  | { t: 'list'; items: string[] }
  | { t: 'steps'; items: [string, string][] }
  | { t: 'pairs'; items: [string, string][] }
  | { t: 'tree'; lines: string[] }
  | { t: 'callout'; label: string; text: string };

export type FieldNote = {
  slug: string;
  /** "FN-01": the series tag. */
  code: string;
  title: string;
  /** ISO date. */
  date: string;
  tag: string;
  summary: string;
  blocks: NoteBlock[];
};

export const FIELD_NOTES: FieldNote[] = [
  {
    slug: 'stop-paying-for-twelve-apps',
    code: 'FN-01',
    title: 'Stop paying for twelve apps',
    date: '2026-10-01',
    tag: 'Consolidation',
    summary: 'How I fold a stack of subscriptions into one Command Center: what it really replaces, what it doesn’t, and how to make the move without breaking your week.',
    blocks: [
      { t: 'p', text: 'Here’s the outcome first. You open one thing in the morning, and your files, notes, documents, tasks and AI agents are all in it. One login. One copy of your files. A lot fewer bills. That’s what a Command Center is for, and it’s what I install for people.' },
      { t: 'p', text: 'Here’s the honest part, too: it doesn’t replace everything, and you shouldn’t cancel anything on day one. Below is how I look at a stack, what folds in, what stays, and the order I make the move in.' },
      { t: 'h2', text: 'Count the stack first' },
      { t: 'p', text: 'Most people I sit down with guess they pay for four or five apps. Then we write them down. A notes app. An office suite. A PDF signer. A design tool. An AI image generator. A voiceover app. Cloud storage. A to-do app. An automation tool. A writing assistant. A project tracker. An invoicing app. That’s twelve, and nobody planned it. Each one showed up to fix one problem.' },
      { t: 'p', text: 'The money adds up, but the money isn’t the worst of it. Every app wants its own login, its own copy of your files and its own idea of where things go. So you spend your day moving things between them. You download a PDF from one, sign it in another, upload it to a third, and then search all three when you need it again. Every AI tool starts from zero, so you paste the same background into each one. That’s friction, and you pay it every day.' },
      { t: 'h2', text: 'What one Command Center replaces' },
      { t: 'p', text: 'The Command Center is one dashboard with modules inside it. Each module is a switch: on if you use it, off and gone if you don’t. Here’s how the usual stack maps onto it.' },
      { t: 'pairs', items: [
        ['Notes app, to-do app, reminders', '**Jot**: sticky notes, tasks, a daily don’t-forget list and reminders.'],
        ['Notion, a workspace app', '**Pages**: linked pages and databases, with an import from Notion.'],
        ['Office suite, PDF signer', '**Office**: documents, spreadsheets, slide decks, and PDFs you fill and sign.'],
        ['Cloud storage, the downloads folder', '**Files** and **Library**, on storage you own.'],
        ['AI image generator', '**Studio**, running on the AI plan you already have.'],
        ['Voiceover app, motion template packs', '**Voice** and **Motion**.'],
        ['Automation tool, writing assistant, chatbot tabs', '**Crew**: agents that work inside the dashboard.'],
        ['Project tracker', '**Projects**: a folder and a scope for each client or venture.'],
        ['Invoicing app', '**Finance**: accounts, bills and invoices.'],
        ['Content calendar, a pile of script docs', '**Content studio**.'],
        ['Homework planner', '**School**, in a student’s build.'],
      ] },
      { t: 'p', text: 'The point isn’t that every module beats the best app in its category on every feature. Some don’t. The point is that they all share one set of files, one search, one bell and one crew of agents. The PDF you sign in Office is already in the project folder. The image Studio makes is already in your Library, with the prompt saved beside it. Your agent can read the script it’s helping with, because the script lives in the same place.' },
      { t: 'h2', text: 'What it doesn’t replace' },
      { t: 'p', text: 'I’d rather tell you this now than have you find out later.' },
      { t: 'list', items: [
        '**Email and your phone.** Keep them. The Command Center sends you notifications; it isn’t your inbox.',
        '**Your bank.** Finance tracks accounts, bills and invoices. Your money still lives at your bank.',
        '**The social apps.** Content studio keeps drafts for X and Instagram in a queue. You post them yourself.',
        '**Canvas.** School pulls classes and assignments from it. The school still runs Canvas.',
        '**Your AI plan.** Agents and Studio use a plan you pay for. That one stays, and it does the heavy lifting.',
        '**Big-team tools.** If forty people edit the same document at the same time all day, keep the tool built for that.',
      ] },
      { t: 'h2', text: 'How the move goes' },
      { t: 'steps', items: [
        ['Write it all down', 'Every app, what you pay, and what you actually use it for. Usually it’s one or two features per app. That’s the [$197 audit](/ai-leverage-audit/), if you want me to do it with you.'],
        ['Map it', 'Each app gets a module or a “keep.” No module gets switched on unless something real moves into it.'],
        ['Install', 'The Command Center goes on a machine you own, with only those modules on, wearing your theme.'],
        ['Move in', 'Notes, documents and files come over into one folder structure. Every client or venture gets its project folder.'],
        ['Run both', 'For two weeks, the old app and the new module run side by side. You work from the dashboard. If you catch yourself reaching for the old app, we find out why.'],
        ['Cancel one at a time', 'When a module has carried the load for two weeks, cancel that subscription. Then the next one.'],
      ] },
      { t: 'p', text: 'Doing it in that order means nothing breaks in the middle of your week. Worst case, you keep an app a month longer than you needed to.' },
      { t: 'h2', text: 'Do the math on your own stack' },
      { t: 'p', text: 'Prices are different for everybody, so don’t take my word for it. The [stack calculator](/command-center/#math) lets you tick what you pay for, fix each price to what you really pay, and see the year’s total next to the module that covers it. It doesn’t count your AI plan or the machine, because those stay either way.' },
      { t: 'callout', label: 'Bottom line', text: 'You don’t need more apps. You need a system that holds your files, your work and your agents in one place, on hardware you own. Look through the [Command Center](/command-center/), click around the [live demo](/live-demo/), and when you’re ready, [book the audit](/ai-leverage-audit/) and we’ll count your stack together.' },
    ],
  },
  {
    slug: 'agent-native',
    code: 'FN-02',
    title: 'Agent-native: why your AI should live where your files are',
    date: '2026-10-01',
    tag: 'Agents',
    summary: 'An AI that works inside your dashboard sees the real project, the real file and the real assignment. What that changes, and the locks that keep it in line.',
    blocks: [
      { t: 'p', text: 'Outcome first: when your AI agents live inside the same dashboard as your files, you stop pasting context into a chat box, the work they make lands where it belongs, and nothing risky happens without your OK. That’s what I mean by agent-native. It’s how my own company runs, and it’s how I build Command Centers for clients.' },
      { t: 'h2', text: 'The problem with a chatbot tab' },
      { t: 'p', text: 'Here’s how most people use AI today. Open a tab. Paste in the background. Paste in the document. Ask for the thing. Copy the answer out. Download the file it made, which lands in Downloads with a name like image-4.png. Tomorrow, do it all again, because the tab forgot.' },
      { t: 'p', text: 'The model isn’t the problem. Context is. A smart model that can’t see your work is guessing. And every paste is a chance to leave something out, or to put something in a chat that should never be there, like a password.' },
      { t: 'h2', text: 'What changes when the agent lives where the files are' },
      { t: 'list', items: [
        '**It starts with the right brief.** Start a chat inside a project and the agent is handed that project’s name, its folder and where things go. You don’t explain it again.',
        '**Your files reach it without a paste.** Drop a file into a chat and it’s saved on your machine. The agent reads it from there.',
        '**Its work lands in the right place.** Images an agent makes go into its inbox in the Library, with the prompt saved beside them. Work for a project goes into that project’s folder.',
        '**It files things for you.** An agent can put a task or a reminder into Jot, and the reminder reaches you on time. It can’t read your notes.',
        '**It proposes; you decide.** In Content studio an agent proposes a new draft of a script. You accept it or dismiss it, and the old version goes to history.',
        '**It reads; it doesn’t submit.** In School an agent can read an assignment’s instructions and quiz you. It never hands anything in.',
        '**The chat is kept.** A project chat’s transcript is written into that project’s folder, with secrets blanked out.',
      ] },
      { t: 'p', text: 'That’s the difference between an assistant and a coworker. A coworker knows where the files are.' },
      { t: 'h2', text: 'Approvals: the brakes' },
      { t: 'p', text: 'An agent with real context can do real work, which means it can also do real damage. So the risky stuff waits. When an agent wants to send something, delete something or run something that matters, it stops and asks. You see the request on the dashboard and on your phone. Approve it once, or deny it. The first answer wins. If nobody answers in time, the answer is no.' },
      { t: 'p', text: 'You can run a sample one yourself on the [Command Center page](/command-center/#agents).' },
      { t: 'h2', text: 'Agents can’t approve themselves' },
      { t: 'p', text: 'This is the part I care about most. An agent can’t answer an approval, including its own request. That isn’t a line in a prompt asking it nicely. The approval door doesn’t open for an agent’s key. A request that carries one is refused, every time, even if it also carries your login.' },
      { t: 'p', text: 'The same idea runs through the whole system. Agents can’t publish your posts. They can’t delete or move your projects. They can’t submit schoolwork, tick off your tasks or change your settings. Those are your calls, and the system is built so they stay your calls.' },
      { t: 'h2', text: 'How I set an agent up' },
      { t: 'steps', items: [
        ['Give it one job', 'Follow-ups, or content, or the books. Not “everything.” A crew works because each one knows its lane.'],
        ['Give it a folder', 'The project it works in is its context. If it’s not in reach, it’s not in play.'],
        ['Set the brakes first', 'Decide which actions wait for your OK before it does a single one.'],
        ['Hand it keys through the Vault', 'Never in a chat, not even once.'],
        ['Read its work for a week', 'Then widen what it can reach. Trust gets earned here the same way it does on a jobsite.'],
      ] },
      { t: 'h2', text: 'Where privacy really stands' },
      { t: 'p', text: 'I’ll be straight about this, because a lot of people selling “private AI” aren’t.' },
      { t: 'list', items: [
        '**Your files live on your machine.** The Command Center runs on hardware you own. Your documents, notes and history sit on storage you can unplug.',
        '**Keys never touch the chat.** The Vault hands an agent an API key or a private file without it being typed into a conversation.',
        '**Notifications carry summaries only.** No passwords, no prompts and no private text on your lock screen.',
        '**Some tools run walled off.** The model that writes a motion graphic gets no shell and no internet, only its own job folder.',
        '**The AI model is still somebody’s.** When an agent works on a document, the parts it reads go to the AI model you picked, under that plan’s terms. That’s true of every AI tool. The difference here is that you decide what’s in reach, and nothing else is.',
      ] },
      { t: 'p', text: 'If some of your work can’t go to an AI model at all, say so in the audit. We draw that line on day one, and it stays drawn.' },
      { t: 'callout', label: 'Bottom line', text: 'The bot isn’t the point. Context is. Put your agents where your files are, give them brakes they can’t release, and they stop being a toy and start being crew. Meet the squad on the [Command Center page](/command-center/), or watch it work in the [live demo](/live-demo/).' },
    ],
  },
  {
    slug: 'one-dashboard-for-school',
    code: 'FN-03',
    title: 'One dashboard for school',
    date: '2026-10-01',
    tag: 'School',
    summary: 'Canvas sync, a folder for every assignment, a real document editor and handing work in, all from one screen. Here’s how School works in the Command Center.',
    blocks: [
      { t: 'p', text: 'Outcome first: every class, every assignment and every file, sorted by week, in one dashboard. You write in a real document editor, keep your work in the assignment’s own folder, and hand it in from the same screen. No more digging through Canvas, a downloads folder and three apps to find what’s due and where you left it.' },
      { t: 'p', text: 'School is a module in the Command Center. It stays off unless it’s switched on, so it only shows up in a student’s build. Here’s how it works.' },
      { t: 'h2', text: 'The mess it replaces' },
      { t: 'p', text: 'Watch a student do homework for ten minutes. Canvas in one tab to see what’s due. The teacher’s PDF in Downloads. The essay in some online doc. A planner app with half the due dates in it. A photo of the whiteboard on the phone. Then, at 11:40 at night, the hunt for the right version to upload.' },
      { t: 'p', text: 'None of those apps is bad. The problem is that nothing holds them together, so the student is the glue.' },
      { t: 'h2', text: 'Connecting Canvas' },
      { t: 'p', text: 'There are three ways in, picked in Settings:' },
      { t: 'steps', items: [
        ['An access token', 'Made in Canvas under Account, then Settings. This one gets everything: classes, assignments with their instructions and files, what’s been handed in, grades, and handing work in.'],
        ['The calendar feed', 'The feed link from the Canvas calendar. Due dates and events only: no files and no submitting, but almost nothing to set up.'],
        ['By hand', 'Type in a class and its assignments. No Canvas at all. You still get the folders, the editor and the reminders.'],
      ] },
      { t: 'p', text: 'The token is write-only. Once it’s saved, the dashboard never shows it again, never logs it and never hands it to an agent.' },
      { t: 'h2', text: 'A folder per assignment' },
      { t: 'p', text: 'This is the part that changes the most. Every assignment gets its own folder, sorted by term, class and week:' },
      { t: 'tree', lines: [
        'Fall 2026/',
        '  BIO 101 — Biology/',
        '    Week 05 (Sep 28 – Oct 4)/',
        '      Lab report 3/',
        '        From Canvas/   handed out',
        '        My work/       yours',
      ] },
      { t: 'p', text: '**From Canvas** holds what the class handed out: the instructions, the rubric and the files they link to. **My work** holds yours. The sync only ever adds. It never overwrites, moves or deletes anything, and it never touches My work. If a due date moves, the folder stays put. If the teacher changes the instructions, you get a dated copy beside the first one, so you can see what changed.' },
      { t: 'h2', text: 'A real document editor' },
      { t: 'p', text: 'The essay gets written in Office, the Command Center’s own editor, right in the dashboard. It’s a page-like Word editor with styles, tables, pictures, headers and page numbers, and it saves real .docx files that open anywhere. Export a PDF when the class wants one. Lab data goes in a spreadsheet with formulas. The presentation gets built as a slide deck with speaker notes and a present mode. And the permission slip that came home as a PDF gets filled in and signed with a finger. No printer.' },
      { t: 'p', text: 'It all saves into My work, so the essay and the assignment it’s for sit in the same folder.' },
      { t: 'h2', text: 'Handing it in' },
      { t: 'p', text: 'When it’s done, hand it in from the dashboard. Pick the files from My work, or paste text or a link. A confirm page shows exactly what goes to which assignment. Then it’s submitted to Canvas. It never happens on its own. Handing work in is the student’s decision, every time.' },
      { t: 'h2', text: 'The agent as a study partner' },
      { t: 'p', text: 'A student’s agent can read the instructions in From Canvas, find the right folder, and quiz you on chapter five. It can’t submit anything, tick an assignment off, change School’s settings or sign in to Canvas as you. It won’t put a file in your folders unless you ask for that file in that conversation.' },
      { t: 'h2', text: 'Heads-ups, not nagging' },
      { t: 'list', items: [
        'A new assignment shows up.',
        'Something’s due tomorrow.',
        'Something’s due in two hours and hasn’t been handed in.',
        'Something got graded. The score stays in the dashboard, not on the lock screen.',
      ] },
      { t: 'p', text: 'Each one goes out once, to the bell and to the phones you picked.' },
      { t: 'h2', text: 'A school night, start to finish' },
      { t: 'pairs', items: [
        ['1600', 'See what’s due this week, on the same calendar as everything else.'],
        ['1605', 'Open the assignment’s folder: the instructions on one side, your draft on the other.'],
        ['1610', 'Write in Office. Ask the agent to quiz you on the reading when you get stuck.'],
        ['2030', 'Export the PDF, hand it in from My work, and close the laptop before nine.'],
      ] },
      { t: 'h2', text: 'Who it’s for' },
      { t: 'p', text: 'A high school or college student whose school runs Canvas, or a parent setting one up for them. If the school doesn’t use Canvas, the by-hand mode still gives you the folders, the editor and the reminders, without the sync.' },
      { t: 'callout', label: 'Bottom line', text: 'One dashboard, one folder per assignment, one place to write and hand it in. Open School in the [live demo](/live-demo/): a made-up student’s classes and assignments, nothing real. Then [book the audit](/ai-leverage-audit/) and we’ll set it up for your student.' },
    ],
  },
];

export const noteBySlug = (slug: string | undefined) => FIELD_NOTES.find((n) => n.slug === slug);

/** Words in a note (for the read time). */
export function noteWords(n: FieldNote): number {
  const text = n.blocks.map((b) => {
    switch (b.t) {
      case 'p': case 'h2': return b.text;
      case 'list': return b.items.join(' ');
      case 'steps': case 'pairs': return b.items.flat().join(' ');
      case 'tree': return b.lines.join(' ');
      case 'callout': return `${b.label} ${b.text}`;
    }
  }).join(' ');
  return text.replace(/\*\*|\[|\]\([^)]*\)/g, '').split(/\s+/).filter(Boolean).length;
}
export const readMinutes = (n: FieldNote) => Math.max(1, Math.round(noteWords(n) / 220));
export const noteDate = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
