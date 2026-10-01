import{t as e}from"./public-url-C8xtHrRy.js";var t=`Sample Co`,n=e=>new Date(Date.now()-e*36e5).toISOString(),r=`# Sample Co

A made-up small business, so you can click around Files in the live demo. Nothing here is real, and nothing you do is saved.

- **Clients/** — a folder per client: notes, a proposal, a landing page
- **Invoices/** — the budget and a parts order form (a fillable PDF)
- **Brand/** — the logo and the style notes
- **School/** — a class essay

Open any file to preview it. Word, Excel and PDF files open in Office too: press **Edit**.
`,i=`# Northwind Coffee — kickoff

**When:** Tuesday, 10:00 · **Who:** the owner, the shift lead, me

## What they want
1. Menu boards in two sizes (counter and window), matte, by the 14th
2. A loyalty card that fits a wallet
3. Weekly specials they can change themselves

## Decisions
- Brown and cream, no gloss
- The specials board uses the same type as the menu

## Next
- [x] Send the proposal (Proposal.docx)
- [ ] Mock up the counter board
- [ ] Price the window vinyl
`,a=`# Brand notes

| Use | Colour |
|---|---|
| Ink | \`#15181C\` |
| Paper | \`#E8E4DA\` |
| Signal | \`#FEB019\` |

- Headings in caps, short and direct
- One accent colour per page
- The logo always on plain ground, never on a photo
`,o=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Harbor Dental — book a cleaning</title>
<style>
  body { margin: 0; font: 16px/1.5 Georgia, serif; color: #12324a; background: #f4f8fb; }
  header { padding: 48px 32px; background: #0e5a7a; color: #fff; }
  h1 { margin: 0 0 8px; font: 700 34px/1.15 system-ui, sans-serif; }
  main { max-width: 720px; margin: 0 auto; padding: 32px; }
  .card { background: #fff; border: 1px solid #d5e3ec; padding: 20px 24px; margin-bottom: 16px; }
  .btn { display: inline-block; padding: 10px 18px; background: #f2a541; color: #12324a; font: 700 14px system-ui, sans-serif; text-decoration: none; }
  ul { padding-left: 20px; }
</style></head>
<body>
  <header><h1>A cleaning that fits your morning.</h1><p>Early appointments from 7 AM, Monday to Saturday. A sample page from the live demo.</p></header>
  <main>
    <div class="card"><h2>What a visit looks like</h2><ul><li>Check-in in two minutes</li><li>Cleaning and a quick exam</li><li>A reminder text the day before</li></ul></div>
    <div class="card"><h2>New patients</h2><p>Bring your insurance card. We'll handle the rest.</p><a class="btn" href="#book">Book a cleaning</a></div>
  </main>
</body></html>
`,s=e=>Math.round(e*1024),c=e=>new TextEncoder().encode(e).length,l=[{path:`README.md`,size:c(r),text:r},{path:`Brand/Logo mark.png`,size:s(84)},{path:`Brand/Style notes.md`,size:c(a),text:a},{path:`Clients/Harbor Dental/Landing page.html`,size:c(o),text:o},{path:`Clients/Northwind Coffee/Kickoff notes.md`,size:c(i),text:i},{path:`Clients/Northwind Coffee/Proposal.docx`,size:s(12),office:`proposal`},{path:`Invoices/Parts Order Form.pdf`,size:s(40),office:`form`},{path:`Invoices/Shop Budget.xlsx`,size:s(10),office:`budget`},{path:`School/Essay - Why Checklists Work.docx`,size:s(18),office:`essay`}],u=[3,30,52,5,2,26,75,49,120],d=e=>e.split(`/`).map(encodeURIComponent).join(`/`),f=l.filter(e=>/\.html?$/.test(e.path)).map(e=>({path:e.path,text:e.text})),p=()=>l.map((e,t)=>({...e,mtime:n(u[t]??24)}));function m(e,t){return String(e)===`0`?p().find(e=>e.path===t)??null:null}function h(e,t){let n=m(e,t);return n?.text===void 0?null:`data:${/\.html?$/.test(t)?`text/html`:`text/plain`};charset=utf-8,${encodeURIComponent(n.text)}`}function g(t,n){return m(t,n)&&f.some(e=>e.path===n)?e(`/samples/${d(n)}`):null}function _(e){let t=e.replace(/^\/+|\/+$/g,``),n=new Map;for(let e of p()){if(t&&!e.path.startsWith(`${t}/`))continue;let r=t?e.path.slice(t.length+1):e.path,i=r.split(`/`)[0],a=r.includes(`/`);n.set(i,{name:i,dir:a,path:t?`${t}/${i}`:i})}return[...n.values()].sort((e,t)=>e.dir===t.dir?e.name.localeCompare(t.name):e.dir?-1:1)}function v(e){let t=p().find(t=>t.path===e);return t?t.text===void 0?{kind:/\.png$/.test(e)?`image`:`binary`,size:t.size,writable:!1}:{kind:`text`,size:t.size,content:t.text,mtime:t.mtime,writable:!1}:null}var y=()=>p().map(e=>e.path);export{v as a,y as i,_ as n,m as o,g as r,h as s,t};