import { BookmarkService } from '../../../../services'
import { Services } from '../../../../types/Services'
import BookmarkUtils, { BookmarksByCaseload } from './utils'

describe('bookmarkUtils', () => {
  let services: Services
  let bookmarkService: BookmarkService
  let bookmarksByCaseload: BookmarksByCaseload

  beforeEach(() => {
    bookmarkService = {
      addBookmark: jest.fn(),
    } as unknown as BookmarkService

    services = {
      bookmarkService,
    } as unknown as Services

    bookmarksByCaseload = {
      activeCaseLoadId_ONE: [
        {
          reportId: 'reportId 1',
          variantId: 'variantId 1',
        },
      ],
      activeCaseLoadId_Two: [
        {
          reportId: 'reportId 2',
          variantId: 'variantId 2',
        },
        {
          reportId: 'reportId 3',
          variantId: 'variantId 3',
        },
        {
          reportId: 'reportId 4',
          variantId: 'variantId 4',
        },
      ],
      'activeCaseLoadId three': [
        {
          reportId: 'reportId 5',
          variantId: 'variantId 5',
        },
        {
          reportId: 'reportId 6',
          variantId: 'variantId 6',
        },
      ],
      'activeCaseLoadId-four': [
        {
          reportId: 'reportId 7',
          variantId: 'variantId 7',
        },
        {
          reportId: 'reportId 8',
          variantId: 'variantId 8',
        },
        {
          reportId: 'reportId 9',
          variantId: 'variantId 9',
        },
      ],
    }
  })

  describe('preBookmarkReportsByRoleId', () => {
    it('should add the bookmarks assigned to the correct caseload - activeCaseLoadId_ONE', async () => {
      const bms = await BookmarkUtils.preBookmarkReportsByRoleId(
        'userId',
        'activeCaseLoadId_ONE',
        services,
        bookmarksByCaseload,
      )

      expect(services.bookmarkService.addBookmark).toHaveBeenCalledTimes(1)
      expect(bms).toHaveLength(1)
      expect(bms[0].reportId).toEqual('reportId 1')
    })

    it('should add the bookmarks assigned to the correct caseload - activeCaseLoadId_Two', async () => {
      const bms = await BookmarkUtils.preBookmarkReportsByRoleId(
        'userId',
        'activeCaseLoadId_Two',
        services,
        bookmarksByCaseload,
      )

      expect(services.bookmarkService.addBookmark).toHaveBeenCalledTimes(3)
      expect(bms).toHaveLength(3)
      expect(bms[0].reportId).toEqual('reportId 2')
      expect(bms[1].reportId).toEqual('reportId 3')
      expect(bms[2].reportId).toEqual('reportId 4')
    })

    it('should add the bookmarks assigned to the correct caseload - activeCaseLoadId three', async () => {
      const bms = await BookmarkUtils.preBookmarkReportsByRoleId(
        'userId',
        'activeCaseLoadId three',
        services,
        bookmarksByCaseload,
      )

      expect(services.bookmarkService.addBookmark).toHaveBeenCalledTimes(2)
      expect(bms).toHaveLength(2)
      expect(bms[0].reportId).toEqual('reportId 5')
      expect(bms[1].reportId).toEqual('reportId 6')
    })

    it('should add the bookmarks assigned to the correct caseload - activeCaseLoadId-four', async () => {
      const bms = await BookmarkUtils.preBookmarkReportsByRoleId(
        'userId',
        'activeCaseLoadId-four',
        services,
        bookmarksByCaseload,
      )

      expect(services.bookmarkService.addBookmark).toHaveBeenCalledTimes(3)
      expect(bms).toHaveLength(3)
      expect(bms[0].reportId).toEqual('reportId 7')
      expect(bms[1].reportId).toEqual('reportId 8')
      expect(bms[2].reportId).toEqual('reportId 9')
    })

    it('should not run when no config is provided', async () => {
      const bms = await BookmarkUtils.preBookmarkReportsByRoleId('userId', 'activeCaseLoadId-four', services)

      expect(services.bookmarkService.addBookmark).toHaveBeenCalledTimes(0)
      expect(bms).toHaveLength(0)
    })
  })
})
