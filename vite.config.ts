import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { LLMS_TXT_PATH, PRICING_MD_PATH, llmsTxt, pricingMarkdown } from './content/agent-pricing'

// /pricing.md and /llms.txt for AI agents, written from content/pricing.ts on every build and served by the dev server.
const agentFiles = (): Plugin => {
  const files = (): Record<string, { type: string; body: string }> => ({
    [PRICING_MD_PATH]: { type: 'text/markdown; charset=utf-8', body: pricingMarkdown(new Date().toISOString().slice(0, 10)) },
    [LLMS_TXT_PATH]: { type: 'text/plain; charset=utf-8', body: llmsTxt() },
  })
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
