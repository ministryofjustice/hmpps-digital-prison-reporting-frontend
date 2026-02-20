import { ExtraLocals } from './extraLocals'

declare global {
  namespace Express {
    interface Locals extends ExtraLocals { }
  }
}
