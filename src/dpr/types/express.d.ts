import { ExtraLocals } from './extraLocals'

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Locals extends ExtraLocals {}
  }
}
