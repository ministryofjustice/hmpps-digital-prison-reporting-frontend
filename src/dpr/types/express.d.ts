import { Flag } from "@flipt-io/flipt"

export declare global {
  namespace Express {
    interface Locals {
      featureFlags: {
        lastUpdated: number
        flags: Flag[]
      }
    }
  }
}