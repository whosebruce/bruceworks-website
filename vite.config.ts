import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { AGENT_DOCS, LLMS_TXT_PATH, llmsTxt } from './content/agent-docs'

// The markdown copies of the key pages (/pricing.md, /faq.md, …) and /llms.txt for AI agents, written from content/ on
// every build and served by the dev server (content/agent-docs.ts).
const agentFiles = (): Plugin => {
  const files = (): Record<string, { type: string; body: string }> => {
    const generated = new Date().toISOString().slice(0, 10)
    return {
      ...Object.fromEntries(AGENT_DOCS.map((d) => [d.path, { type: 'text/markdown; charset=utf-8', body: d.body(generated) }])),
      [LLMS_TXT_PATH]: { type: 'text/plain; charset=utf-8', body: llmsTxt() },
    }
  }
  return {
    name: 'bruceworks-agent-files',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const file = files()[((req as { url?: string }).url ?? '').split('?')[0]]
        if (!file) return next()
        res.setHeader('Content-Type', file.type)
        res.end(file.body)
      })
    },
    generateBundle() {
      for (const [path, file] of Object.entries(files())) {
        this.emitFile({ type: 'asset', fileName: path.slice(1), source: file.body })
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), agentFiles()],
  // Use root base path for custom domains like bruceworks.net
  base: '/',
})
