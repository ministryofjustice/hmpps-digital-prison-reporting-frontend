import { Flag } from '@flipt-io/flipt'

declare global {
  namespace Express {
    interface Locals {
      featureFlags: {
        lastUpdated: number
        flags: {
          [flagName: string]: Flag
        }
      }
    }
  }
}
