/* eslint-disable no-param-reassign */
import { Router } from 'express'

// Routes
import listRoutes from './list/routes'
import { Services } from '../../../types/Services'
import BookmarkController from './controller'
import logger from '../../../utils/logger'

export function Routes({ layoutPath, services }: { services: Services; layoutPath: string }) {
  const router = Router({ mergeParams: true })

  const controller = new BookmarkController(layoutPath, services)

  router.post('/add-bookmark', controller.addBookmark)
  router.post('/remove-bookmark', controller.removeBookmark)
  router.use(`/list`, listRoutes({ layoutPath, services }))

  return router
}

export const BookmarkReportsRoutes = ({
  services,
  path,
  layoutPath,
}: {
  services: Services
  path: string
  layoutPath: string
}) => {
  const router = Router({ mergeParams: true })
  const { bookmarkService } = services
  if (bookmarkService) {
    logger.info('Initialiasing routes: Bookmarks')
    router.use(path, Routes({ services, layoutPath }))
  }
  return router
}
