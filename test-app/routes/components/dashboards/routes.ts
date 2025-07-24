/* eslint-disable no-param-reassign */
import { Router } from 'express'

// Routes

export default function routes({ layoutPath }: { layoutPath: string }) {
  const router = Router({ mergeParams: true })

  return router
}
