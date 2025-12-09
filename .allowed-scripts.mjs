import { configureAllowedScripts } from '@ministryofjustice/hmpps-npm-script-allowlist'

export default configureAllowedScripts({
  allowlist: {
    'node_modules/cypress@14.5.4': 'ALLOW',
    'node_modules/esbuild@0.25.5': 'ALLOW',
    'node_modules/@parcel/watcher@2.5.1': 'FORBID',
    'node_modules/dtrace-provider@0.8.8': 'FORBID',
    'node_modules/fsevents@2.3.3': 'FORBID',
    'node_modules/unrs-resolver@1.9.2': 'FORBID',
    'node_modules/@badeball/cypress-cucumber-preprocessor@22.2.0': 'FORBID',
  },
})
