export default {}

declare module 'express-session' {
  // Declare that the session will potentially contain these additional fields
  interface SessionData {
    nowInMinutes: number
  }
}

export declare global {
  namespace Express {
    interface Request {
      id: string
    }
  }
}
