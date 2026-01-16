import * as esbuild from 'esbuild'

esbuild
  .build({
    entryPoints: ['./dpr/all.mjs'],
    bundle: true,
    sourcemap: false,
    minify: true,
    target: 'es6',
    outfile: './dpr/all.min.mjs',
    format: 'esm',
  })
  .then(() => console.log('⚡ Javascript build complete! ⚡'))
  .catch(() => process.exit(1))
