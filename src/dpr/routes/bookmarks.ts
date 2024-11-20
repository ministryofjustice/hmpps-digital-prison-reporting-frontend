import type { Router } from 'express'
import BookmarklistUtils from '../components/user-reports/bookmarks/utils'
import { Services } from '../types/Services'

export default function routes({
  router,
  services,
  layoutPath,
  templatePath = 'dpr/views/',
}: {
  router: Router
  services: Services
  layoutPath: string
  templatePath?: string
}) {
  router.post('/addBookmark/', async (req, res) => {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const { reportId, id, reportType } = req.body
    await services.bookmarkService.addBookmark(userId, reportId, id, reportType)
    res.end()
  })

  router.post('/removeBookmark/', async (req, res) => {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    await services.bookmarkService.removeBookmark(userId, req.body.id)
    res.end()
  })

  router.get('/async-reports/bookmarks', async (req, res) => {
    res.render(`${templatePath}/async-reports`, {
      title: 'Requested Reports',
      layoutPath,
      ...(await BookmarklistUtils.renderBookmarkList({ services, res, req })),
    })
  })
}
