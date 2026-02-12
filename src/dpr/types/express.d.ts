import { ExtraLocals } from './extraLocals'

declare global {
  namespace Express {
    type Locals = ExtraLocals
  }
}
