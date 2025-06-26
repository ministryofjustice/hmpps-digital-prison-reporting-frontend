/* eslint-disable no-param-reassign */
import { Router } from 'express'
import BookmarkListingController from './controller'
import { Services } from '../../../../types/Services'

export default function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })

  const controller = new BookmarkListingController(layoutPath, services)
  router.get(`/`, controller.GET)

  return router
}
