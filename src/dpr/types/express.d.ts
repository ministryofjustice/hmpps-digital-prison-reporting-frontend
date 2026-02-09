declare namespace Express {
  interface Locals {
    featureFlags: {
      flags: {
        [flagName: string]: boolean
      }
    }
  }
}
