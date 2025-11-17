import { Flag } from "@flipt-io/flipt/dist/flags/models"

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