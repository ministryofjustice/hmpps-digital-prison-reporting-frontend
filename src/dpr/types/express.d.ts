import { ExtraLocals } from './extraLocals'

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Locals extends ExtraLocals {}
  }
}
