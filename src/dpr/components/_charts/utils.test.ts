/* eslint-disable prefer-destructuring */
import { DashboardDataResponse } from '../../types/Metrics'
import ChartCardUtils from './utils'
import { mockTimeSeriesDataLastSixMonths } from '../../../../test-app/mocks/mockClients/dashboards/data/data-quality-metrics/data'
import {
  barChartDataHasEthnicity,
  barChartFromListDataHasEthnicity,
} from '../../../../test-app/mocks/mockClients/dashboards/definitions/data-quality/chart-data'
import { mockEthnicityBarChart } from '../../../../test-app/mocks/mockClients/dashboards/definitions/data-quality/visualisations'
import { DashboardVisualisation, DashboardVisualisationColumn } from '../_dashboards/dashboard/types'

describe('ChartCard Utils', () => {
  let dashboardMetricsData: DashboardDataResponse[][]
  let visualisationDefinition: DashboardVisualisation

  beforeEach(() => {
    visualisationDefinition = mockEthnicityBarChart as unknown as DashboardVisualisation
    dashboardMetricsData = mockTimeSeriesDataLastSixMonths
  })

  describe('getChartData', () => {
    it('should get the snapshot chart data', async () => {
      const expectedResult = barChartDataHasEthnicity
      const result = ChartCardUtils.createChart(visualisationDefinition, dashboardMetricsData.flat())
      expect(result).toEqual(expectedResult)
    })

    it('should create the snapshot chart data from a list', () => {
      const expectedResult = barChartFromListDataHasEthnicity
      const result = ChartCardUtils.createChart(visualisationDefinition, dashboardMetricsData.flat())
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getChartGroupKey', () => {
    let keys: DashboardVisualisationColumn[]
    beforeEach(() => {
      keys = [
        {
          id: 'key1',
        },
        {
          id: 'key2',
        },
        {
          id: 'key3',
        },
      ] as unknown as DashboardVisualisationColumn[]
    })

    it('should set the correct key - value is empty string - key3', () => {
      const data: DashboardDataResponse[] = [
        {
          key1: { raw: 'value' },
          key2: { raw: 'value' },
          key3: { raw: 'value' },
          measure1: { raw: 'value' },
          measure2: { raw: 'value' },
        },
      ]

      const result = ChartCardUtils.getChartGroupKey(keys, data)
      expect(result).toEqual({ id: 'key3' })
    })

    it('should set the correct key - value is empty string - key2', () => {
      const data: DashboardDataResponse[] = [
        {
          key1: { raw: 'value' },
          key2: { raw: 'value' },
          key3: { raw: '' },
          measure1: { raw: 'value' },
          measure2: { raw: 'value' },
        },
      ]

      const result = ChartCardUtils.getChartGroupKey(keys, data)
      expect(result).toEqual({ id: 'key2' })
    })

    it('should set the correct key - value is empty string - key1', () => {
      const data: DashboardDataResponse[] = [
        {
          key1: { raw: 'value' },
          key2: { raw: '' },
          key3: { raw: '' },
          measure1: { raw: 'value' },
          measure2: { raw: 'value' },
        },
      ]

      const result = ChartCardUtils.getChartGroupKey(keys, data)
      expect(result).toEqual({ id: 'key1' })
    })

    it('should set the correct key - value is empty string - none', () => {
      const data: DashboardDataResponse[] = [
        { key1: { raw: '' } },
        { key2: { raw: '' } },
        { key3: { raw: '' } },
        { measure1: { raw: 'value' } },
        { measure2: { raw: 'value' } },
      ]

      const result = ChartCardUtils.getChartGroupKey(keys, data)
      expect(result).toEqual(undefined)
    })

    it('should set the correct key - value is undefined - key2', () => {
      const data: DashboardDataResponse[] = [
        {
          key1: { raw: 'value' },
          key2: { raw: 'value' },
          key3: { raw: undefined },
          measure1: { raw: 'value' },
          measure2: { raw: 'value' },
        },
      ]

      const result = ChartCardUtils.getChartGroupKey(keys, data)
      expect(result).toEqual({ id: 'key2' })
    })

    it('should set the correct key - value is undefined - key1', () => {
      const data: DashboardDataResponse[] = [
        {
          key1: { raw: 'value' },
          key2: { raw: undefined },
          key3: { raw: undefined },
          measure1: { raw: 'value' },
          measure2: { raw: 'value' },
        },
      ]

      const result = ChartCardUtils.getChartGroupKey(keys, data)
      expect(result).toEqual({ id: 'key1' })
    })

    it('should set the correct key - value is undefined - none', () => {
      const data: DashboardDataResponse[] = [
        { key1: { raw: undefined } },
        { key2: { raw: undefined } },
        { key3: { raw: undefined } },
        { measure1: { raw: 'value' } },
        { measure2: { raw: 'value' } },
      ]

      const result = ChartCardUtils.getChartGroupKey(keys, data)
      expect(result).toEqual(undefined)
    })

    it('should set the correct key - value is null - key2', () => {
      const data: DashboardDataResponse[] = [
        {
          key1: { raw: 'value' },
          key2: { raw: 'value' },
          key3: { raw: null },
          measure1: { raw: 'value' },
          measure2: { raw: 'value' },
        },
      ]

      const result = ChartCardUtils.getChartGroupKey(keys, data)
      expect(result).toEqual({ id: 'key2' })
    })

    it('should set the correct key - value is null - key1', () => {
      const data: DashboardDataResponse[] = [
        {
          key1: { raw: 'value' },
          key2: { raw: null },
          key3: { raw: null },
          measure1: { raw: 'value' },
          measure2: { raw: 'value' },
        },
      ]

      const result = ChartCardUtils.getChartGroupKey(keys, data)
      expect(result).toEqual({ id: 'key1' })
    })

    it('should set the correct key - value is null - none', () => {
      const data: DashboardDataResponse[] = [
        { key1: { raw: null } },
        { key2: { raw: null } },
        { key3: { raw: null } },
        { measure1: { raw: 'value' } },
        { measure2: { raw: 'value' } },
      ]

      const result = ChartCardUtils.getChartGroupKey(keys, data)
      expect(result).toEqual(undefined)
    })

    it('should set the correct key - key is undefined - key2', () => {
      const data: DashboardDataResponse[] = [
        {
          key1: { raw: 'value' },
          key2: { raw: 'value' },
          measure1: { raw: 'value' },
          measure2: { raw: 'value' },
        },
      ]

      const result = ChartCardUtils.getChartGroupKey(keys, data)
      expect(result).toEqual({ id: 'key2' })
    })

    it('should set the correct key - key is undefined - key1', () => {
      const data: DashboardDataResponse[] = [
        {
          key1: { raw: 'value' },
          measure1: { raw: 'value' },
          measure2: { raw: 'value' },
        },
      ]

      const result = ChartCardUtils.getChartGroupKey(keys, data)
      expect(result).toEqual({ id: 'key1' })
    })

    it('should set the correct key - key is undefined - none', () => {
      const data: DashboardDataResponse[] = [{ measure1: { raw: 'value' } }, { measure2: { raw: 'value' } }]

      const result = ChartCardUtils.getChartGroupKey(keys, data)
      expect(result).toEqual(undefined)
    })
  })
})
