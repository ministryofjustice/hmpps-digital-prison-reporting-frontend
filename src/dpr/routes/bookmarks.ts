import type { Router } from 'express'
import BookmarklistUtils from '../components/user-reports/bookmarks/utils'
import { Services } from '../types/Services'
import logger from '../utils/logger'

export default function routes({
  router,
  services,
  layoutPath,
  prefix,
}: {
  router: Router
  services: Services
  layoutPath: string
  prefix: string
}) {
  logger.info('Initialiasing routes: Bookmarks')

  router.post('/dpr/addBookmark/', async (req, res) => {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const { reportId, id, reportType } = req.body
    await services.bookmarkService.addBookmark(userId, reportId, id, reportType)
    res.end()
  })

  router.post('/dpr/removeBookmark/', async (req, res) => {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const { id, reportId } = req.body
    await services.bookmarkService.removeBookmark(userId, id, reportId)
    res.end()
  })

  router.get(`${prefix}/async-reports/bookmarks`, async (req, res) => {
    res.render(`dpr/views/async-reports`, {
      title: 'Bookmarks',
      layoutPath,
      catId: 'dpr-bookmarks-list',
      ...(await BookmarklistUtils.renderBookmarkList({ services, res, req })),
    })
  })
}
