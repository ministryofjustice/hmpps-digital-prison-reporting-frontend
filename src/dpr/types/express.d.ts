declare namespace Express {
  interface Locals {
    featureFlags: {
      lastUpdated: number
      flags: {
        [flagName: string]: boolean
      }
    }
  }
}
