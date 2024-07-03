import type { Router } from 'express'
import BookmarkService from '../services/bookmarkService'
import BookmarklistUtils from '../utils/bookmarkListUtils'
import { components } from '../types/api'

export default function routes({
  router,
  bookmarkService,
  layoutPath,
  templatePath = 'dpr/views/',
}: {
  router: Router
  bookmarkService: BookmarkService
  layoutPath: string
  templatePath?: string
  definitions: components['schemas']['ReportDefinitionSummary'][]
}) {
  router.post('/addBookmark/', (req, res) => {
    const { reportId, variantId } = req.body
    bookmarkService.addBookmark(reportId, variantId)
    res.end()
  })

  router.post('/removeBookmark/', (req, res) => {
    bookmarkService.removeBookmark(req.body.variantId)
    res.end()
  })

  router.get('/async-reports/bookmarks', async (req, res) => {
    res.render(`${templatePath}/async-reports`, {
      title: 'Requested Reports',
      layoutPath,
      ...(await BookmarklistUtils.renderBookmarkList({ bookmarkService, res })),
    })
  })
}
