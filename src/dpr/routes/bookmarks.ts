import type { Router } from 'express'
import BookmarklistUtils from '../utils/bookmarkListUtils'
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
    const { reportId, variantId } = req.body
    await services.bookmarkService.addBookmark(res.locals.user.uuid, reportId, variantId)
    res.end()
  })

  router.post('/removeBookmark/', async (req, res) => {
    await services.bookmarkService.removeBookmark(res.locals.user.uuid, req.body.variantId)
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
