import ReportDataStore from "../../data/reportDataStore"
import logger from "../../utils/logger"
import ReportStoreService from "../reportStoreService"

export class CatalogueCollectionService extends ReportStoreService {
  constructor(reportDataStore: ReportDataStore) {
    super(reportDataStore)
    logger.info('Service created: CatalogueCollectionService')
  }

  async getSelectedCatalogueCollection(userId: string): Promise<string | undefined> {
    const userConfig = await this.getState(userId)
    return userConfig.catalogueCollectionInfo?.selectedCatalogueCollection
  }
}
