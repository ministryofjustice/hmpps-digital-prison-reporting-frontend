import type { Router } from 'express'
import BookmarklistUtils from '../components/user-reports-bookmarks-list/utils'
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
    console.log('POST /addBookmark/')
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const { reportId, variantId } = req.body
    await services.bookmarkService.addBookmark(userId, reportId, variantId)
    res.end()
  })

  router.post('/removeBookmark/', async (req, res) => {
    console.log('POST /removeBookmark/')
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    await services.bookmarkService.removeBookmark(userId, req.body.variantId)
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
