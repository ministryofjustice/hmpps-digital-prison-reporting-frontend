import * as esbuild from 'esbuild'
import { glob } from 'glob'

esbuild
  .build({
    entryPoints: ['./src/dpr/all.mjs'],
    bundle: true,
    sourcemap: true,
    minify: true,
    target: 'es6',
    outfile: 'web/js/bundle.mjs',
  })
  .then(() => console.log('⚡ Javascript build complete! ⚡'))
  .catch(() => process.exit(1))
