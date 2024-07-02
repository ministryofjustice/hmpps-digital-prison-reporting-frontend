import BookmarkService from './bookmarkService'
import UserDataStore from '../data/userDataStore'
import { BookmarkStoreData } from '../types/Bookmark'

let mockUserStore: jest.Mocked<UserDataStore>

describe('BookmarkService', () => {
  let bookmarkService: BookmarkService

  beforeEach(() => {
    mockUserStore = {
      setUserConfig: jest.fn(),
      getUserConfig: jest.fn().mockImplementation(() => {
        return Promise.resolve({
          bookmarks: [],
        })
      }),
      ensureConnected: jest.fn(),
      init: jest.fn(),
    } as unknown as jest.Mocked<UserDataStore>

    bookmarkService = new BookmarkService(mockUserStore)
    bookmarkService.init('userId')
  })

  describe('getState', () => {
    it('should get the state from the store', async () => {
      await bookmarkService.getBookmarkState()
      expect(mockUserStore.getUserConfig).toHaveBeenCalledWith('userId')
    })
  })

  describe('saveState', () => {
    it('should save the state to the store', async () => {
      const item = { variantId: '1', reportId: '2' }
      bookmarkService.bookmarks = [{ variantId: '1', reportId: '2' }] as unknown as BookmarkStoreData[]
      await bookmarkService.saveBookmarkState()
      expect(mockUserStore.setUserConfig).toHaveBeenCalledWith('userId', { bookmarks: [item] })
    })
  })
})
