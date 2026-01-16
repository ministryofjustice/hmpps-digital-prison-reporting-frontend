/* eslint-disable import/no-extraneous-dependencies */

import session from 'express-session'
import { RedisStore } from 'connect-redis'
import express, { Router } from 'express'
import { randomUUID } from 'crypto'
import { createClient } from 'redis'
import logger from 'dpr/utils/logger'


export default function setUpWebSession(): Router {
  const client = createClient()
  client.connect().catch((err: Error) => logger.error(`Error connecting to Redis`, err))
  const store = new RedisStore({ client })

  const router = express.Router()
  router.use(
    session({
      store,
      name: 'hmpps-digital-prison-reporting-frontend.session',
      cookie: { secure: false, sameSite: 'lax', maxAge: 120 * 60 * 1000 },
      secret: 'fiweofwfio',
      resave: false, // redis implements touch so shouldn't need this
      saveUninitialized: false,
      rolling: true,
    }),
  )

  // Update a value in the cookie so that the set-cookie will be sent.
  // Only changes every minute so that it's not sent with every request.
  router.use((req, _res, next) => {
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
    next()
  })

  router.use((req, res, next) => {
    const headerName = 'X-Request-Id'
    const oldValue = req.get(headerName)
    const id = oldValue === undefined ? randomUUID() : oldValue

    res.set(headerName, id)
    req.id = id

    next()
  })

  return router
}
