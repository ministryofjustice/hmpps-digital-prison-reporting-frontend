import type { Router } from 'express'
import BookmarkService from '../services/bookmarkService'

export default function routes({ router, bookmarkService }: { router: Router; bookmarkService: BookmarkService }) {
  router.post('/addBookmark/', (req, res) => {
    bookmarkService.addBookmark(req.body.reportId, req.body.variantId)
    res.end()
  })

  router.post('/removeBookmark/', (req, res) => {
    bookmarkService.removeBookmark(req.body.reportId, req.body.variantId)
    res.end()
  })
}
