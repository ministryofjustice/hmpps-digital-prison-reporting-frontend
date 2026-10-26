import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition as boxPlotDataset } from './definitions/definition'

const prefix = '/definitions/dashboard-visualisations/dashboards'

export const boxPlotMock = setupSimpleMock(`${prefix}/${boxPlotDataset.id}`, boxPlotDataset)

export const boxPlotMocks = {
  boxPlotMock,
}
