import { Response } from 'express'
import CatalogueUtils from './utils'
import CatalogueListUtils from '../catalogue-list/utils'
import { Services } from '../../../types/Services'

describe('CatalogueUtils', () => {
  jest.spyOn(CatalogueListUtils, 'getReportsList').mockResolvedValue({
    head: [],
    rows: [],
  })

  describe('init', () => {
    let services: Services
    let res: Response

    beforeEach(() => {
      res = {
        locals: {
          dprUser: {
            token: 'T0k3n',
          },
        },
      } as unknown as Response

      services = {
        productCollectionService: {
          getProductCollections: jest.fn(() => []),
          getProductCollection: jest.fn()
        },
        productCollectionStoreService: {
          getSelectedProductCollectionId: jest.fn()
        },
      } as unknown as Services
    })

    it('should init the catalogue with defaults', async () => {
      const result = await CatalogueUtils.init({ features: {}, res, services })

      expect(result).toEqual({
        data: { head: [], rows: [] },
        features: {
          bookmarkingEnabled: undefined,
          filteringEnabled: true,
          howToUseEnabled: true,
          unauthorisedToggleEnabled: true,
        },
        productCollectionInfo: {
          productCollections: [],
        },
      })
    })

    it('should init the catalogue with configured features', async () => {
      const result = await CatalogueUtils.init({
        features: {
          filteringEnabled: false,
          unauthorisedToggleEnabled: false,
          bookmarkingEnabled: false,
        },
        res,
        services,
      })

      expect(result).toEqual({
        data: { head: [], rows: [] },
        features: {
          bookmarkingEnabled: false,
          filteringEnabled: false,
          howToUseEnabled: true,
          unauthorisedToggleEnabled: false,
        },
        productCollectionInfo: {
          productCollections: [],
        },
      })
    })
  })
})
