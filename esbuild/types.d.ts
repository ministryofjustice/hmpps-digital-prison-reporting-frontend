import type { BuildResult } from 'esbuild'

export interface BuildConfig {
  isProduction: boolean

  app: {
    outDir: string
    entryPoints: string[]
    copy: { from: string; to: string }[]
  }

  assets: {
    outDir: string
    entryPoints: string[]
    copy: { from: string; to: string }[]
    clear: string[]
  }
}

export type BuildStep = (arg0: BuildConfig) => Promise<BuildResult>
