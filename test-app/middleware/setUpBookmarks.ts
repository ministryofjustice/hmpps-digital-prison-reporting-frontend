import { featureTesting } from '@networkMocks/report/mockVariants/feature-testing/bigReport'
import { featureTestingEmptyQuery } from '@networkMocks/report/mockVariants/feature-testing/emptyQuery'
import { featureTestingUnprintable } from '@networkMocks/report/mockVariants/feature-testing/unprintable'
import { RequestHandler } from 'express'
import { BookmarkStoreData } from 'src/dpr/types/Bookmark'
import { Services } from 'src/dpr/types/Services'
import { BookmarkUtils } from 'src/dpr/utils'
import logger from 'src/dpr/utils/logger'

export const automaticBookmarkConfig = {
  caseloads: {
    KMI: [
      { reportId: 'feature-testing', variantId: featureTestingUnprintable.id },
      { reportId: 'feature-testing', variantId: featureTestingEmptyQuery.id },
    ],
    LEI: [
      { reportId: 'feature-testing', variantId: featureTesting.id },
    ],
  },
}

export default function setUpBookmarks(services: Services): RequestHandler {
  return async (req, res, next) => {
    try {
      const bookmarks: BookmarkStoreData[] = await services.bookmarkService.getAllBookmarks(res.locals.dprUser.id)
      if (res.locals.dprUser && (!bookmarks || bookmarks.length === 0)) {
        const { id, activeCaseLoadId } = res.locals.dprUser
        // Hardcoded config just for test purposes

        logger.info(` Initialising bookmarks for user: ${res.locals.dprUser && JSON.stringify(res.locals.dprUser)}`)

        await BookmarkUtils.preBookmarkReportsByRoleId(
          id,
          activeCaseLoadId,
          services,
          automaticBookmarkConfig.caseloads,
        )
        logger.info(`Initialised bookmarks for user: ${res.locals.dprUser && JSON.stringify(res.locals.dprUser)}`)
      }
      res.locals.bookmarksInitialised = true
      return next()
    } catch (error) {
      logger.error(error, `Failed to initialise bookmarks : ${res.locals.dprUser && res.locals.dprUser.displayName}`)
      return next(error)
    }
  }
}