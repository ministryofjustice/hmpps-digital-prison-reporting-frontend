'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var typescript = require('@rollup/plugin-typescript');
var pluginNodeResolve = require('@rollup/plugin-node-resolve');
var rollupPluginDts = require('rollup-plugin-dts');
var commonjs = require('@rollup/plugin-commonjs');
var copy = require('rollup-plugin-copy');
var fs = require('fs');
var glob = require('glob');
var path = require('path');
var pkg = require('./package.json');

/* eslint-disable import/no-extraneous-dependencies */

const cwd = process.cwd();

const publishPkg = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  main: './cjs/index.js',
  module: './index.js',
  sass: './dpr/all.scss',
  types: './index.d.ts',
  exports: {
    './api': {
      types: './dpr/types/api.d.ts',
    },
    './extraLocals': {
      types: './dpr/types/extraLocals.d.ts',
    },
    './catalogueUtils': {
      types: './dpr/components/_catalogue/catalogue/utils.d.ts',
      require: './cjs/dpr/components/_catalogue/catalogue/utils.js',
      import: './dpr/components/_catalogue/catalogue/utils.js',
    },
    './userReportsListUtils': {
      types: './dpr/components/user-reports/utils.d.ts',
      require: './cjs/dpr/components/user-reports/utils.js',
      import: './dpr/components/user-reports/utils.js',
    },
    './initDprReportingClients': {
      types: './dpr/data/dprReportingClient.d.ts',
      require: './cjs/dpr/data/dprReportingClient.js',
      import: './dpr/data/dprReportingClient.js',
    },
    './createDprServices': {
      types: './dpr/utils/CreateDprServices.d.ts',
      require: './cjs/dpr/utils/CreateDprServices.js',
      import: './dpr/utils/CreateDprServices.js',
    },
    './setUpDprResources': {
      types: './dpr/middleware/setUpDprResources.d.ts',
      require: './cjs/dpr/middleware/setUpDprResources.js',
      import: './dpr/middleware/setUpDprResources.js',
    },
    './dprUser': {
      types: './dpr/types/DprUser.d.ts',
      require: './cjs/dpr/types/DprUser.js',
      import: './dpr/types/DprUser.js',
    },
    './routes': {
      types: './dpr/routes/index.d.ts',
      require: './cjs/dpr/routes/index.js',
      import: './dpr/routes/index.js',
    },
    './all': {
      types: './dpr/all.d.ts',
      require: './all.js',
      import: './all.js',
    },
    '.': {
      types: './index.d.ts',
      require: './cjs/index.js',
      import: './index.js',
    },
  },
  sideEffects: false,
  engines: pkg.engines,
  license: pkg.license,
  author: pkg.author,
  repository: pkg.repository,
  dependencies: pkg.dependencies,
};

// Clean, then create the dist + dpr folder
if (fs.existsSync(path.join(cwd, 'dist'))) {
  fs.rmSync(path.join(cwd, 'dist'), {
    force: true,
    recursive: true,
  });
}
fs.mkdirSync(path.join(cwd, 'dist/dpr'), { recursive: true });

// Copy over package.json
fs.writeFileSync(path.join(cwd, 'dist/package.json'), `${JSON.stringify(publishPkg, null, 2)}\n`);

// Bundle up our scss
if (!fs.existsSync(path.join(cwd, 'dist/dpr/all.scss'))) {
  fs.writeFileSync(path.join(cwd, 'dist/dpr/all.scss'), '\n');
}
const scssFiles = glob.glob.sync(['src/**/*.scss']);
scssFiles.forEach((file) => fs.appendFileSync(path.join(cwd, 'dist/dpr/all.scss'), fs.readFileSync(path.join(cwd, file))));

// esbuild is outputting incorrect sourcemaps, possibly because we have our source in src/dpr and output to dist/dpr
// moving all the files would be a major change right now, so fix them manually
const sourceMapFiles = glob.glob.sync(['dist/**/*.map']);
sourceMapFiles.forEach((filePath) => {
  const fileContents = fs.readFileSync(filePath).toString();
  const correctedContents = fileContents.replace(/\.\.\/src\//, '');
  fs.writeFileSync(filePath, correctedContents);
});

/**
 * @type {import('rollup').RollupOptions[]}
 */
const options = [
  {
    input: [
      path.join(cwd, 'src/dpr/components/_catalogue/catalogue/utils.ts'),
      path.join(cwd, 'src/dpr/components/user-reports/utils.ts'),
      path.join(cwd, 'src/dpr/data/dprReportingClient.ts'),
      path.join(cwd, 'src/dpr/utils/CreateDprServices.ts'),
      path.join(cwd, 'src/dpr/middleware/setUpDprResources.ts'),
      path.join(cwd, 'src/dpr/types/DprUser.ts'),
      path.join(cwd, 'src/dpr/routes/index.ts'),
      path.join(cwd, 'src/index.ts'),
    ],
    output: [
      {
        dir: path.join(cwd, 'dist/cjs'),
        format: 'cjs',
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    ],
    plugins: [
      pluginNodeResolve.nodeResolve({ preferBuiltins: true }),
      typescript({ tsconfig: './tsconfig.json', noEmitOnError: false, outDir: 'dist/cjs', declaration: false }),
      commonjs(),
    ],
    external: [...Object.keys(pkg.dependencies || {})],
  },
  {
    input: [path.join(cwd, 'src/dpr/all.ts')],
    output: [{ file: path.join(cwd, 'dist/all.js'), format: 'cjs', sourcemap: true }],
    plugins: [
      pluginNodeResolve.nodeResolve({ preferBuiltins: true }),
      typescript({ tsconfig: './tsconfig.json', noEmitOnError: false, outDir: 'dist', declaration: false }),
      commonjs(),
    ],
    external: [...Object.keys(pkg.dependencies || {})],
  },
  {
    input: [path.join(cwd, 'src/dpr/all.ts')],
    output: [{ file: path.join(cwd, 'dist/all.d.ts') }],
    plugins: [rollupPluginDts.dts()],
    external: [...Object.keys(pkg.dependencies || {})],
  },
  {
    input: [
      path.join(cwd, 'src/dpr/components/_catalogue/catalogue/utils.ts'),
      path.join(cwd, 'src/dpr/components/user-reports/utils.ts'),
      path.join(cwd, 'src/dpr/data/dprReportingClient.ts'),
      path.join(cwd, 'src/dpr/utils/CreateDprServices.ts'),
      path.join(cwd, 'src/dpr/middleware/setUpDprResources.ts'),
      path.join(cwd, 'src/dpr/types/DprUser.ts'),
      path.join(cwd, 'src/dpr/routes/index.ts'),
      path.join(cwd, 'src/index.ts'),
    ],
    output: [
      {
        dir: path.join(cwd, 'dist'),
        format: 'esm',
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    ],
    plugins: [
      pluginNodeResolve.nodeResolve({ preferBuiltins: true }),
      typescript({
        tsconfig: './tsconfig.json',
        noEmitOnError: false,
        noCheck: true,
        outDir: 'dist',
        declaration: true,
        declarationDir: path.join(cwd, 'dist'),
        noEmit: false,
      }),
      commonjs(),
      copy({
        targets: [
          { src: 'README.md', dest: 'dist' },
          { src: 'src/dpr/**/*.njk', dest: 'dist' },
          { src: 'src/dpr/types/api.d.ts', dest: 'dist' },
        ],
        hook: 'writeBundle',
        flatten: false,
      }),
    ],
    external: [...Object.keys(pkg.dependencies || {})],
  },
  {
    input: {
      'dpr/components/_catalogue/catalogue/utils': path.join(cwd, 'src/dpr/components/_catalogue/catalogue/utils.ts'),
      'dpr/components/user-reports/utils': path.join(cwd, 'src/dpr/components/user-reports/utils.ts'),
      'dpr/data/dprReportingClient': path.join(cwd, 'src/dpr/data/dprReportingClient.ts'),
      'dpr/utils/CreateDprServices': path.join(cwd, 'src/dpr/utils/CreateDprServices.ts'),
      'dpr/middleware/setUpDprResources': path.join(cwd, 'src/dpr/middleware/setUpDprResources.ts'),
      'dpr/types/DprUser': path.join(cwd, 'src/dpr/types/DprUser.ts'),
      'dpr/routes/index': path.join(cwd, 'src/dpr/routes/index.ts'),
      index: path.join(cwd, 'src/index.ts'),
    },
    output: [
      {
        dir: path.join(cwd, 'dist'),
        format: 'esm',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].d.ts',
      },
    ],
    plugins: [
      rollupPluginDts.dts(),
      copy({
        targets: [
          { src: 'README.md', dest: 'dist' },
          { src: 'src/dpr/**/*.njk', dest: 'dist' },
          { src: 'src/dpr/types/api.d.ts', dest: 'dist' },
          { src: 'src/dpr/types/extraLocals.d.ts', dest: 'dist' },
        ],
        hook: 'writeBundle',
        flatten: false,
      }),
    ],
    external: [...Object.keys(pkg.dependencies || {})],
  },
];

exports.default = options;
