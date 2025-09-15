import { setupSimpleMock } from "@networkMocks/generateNetworkMock";
import { ageBreakdownReport1 } from "./dashboard-definition-1";
import { ageBreakdownReport2 } from "./dashboard-definition-2";
import { ageBreakdownReport3 } from "./dashboard-definition-3";
import { dataQualityDashboardBase } from "./dashboard-definition-base";
import { dataQualityDashboard1 } from "./dashboard-definition";
import { testingDashboard2 } from "./dashboard-definition-2-summary";
import { testingDashboard8 } from "./dashboard-definiton-1-nat-eth-relig";
import { dataQualityScoreCards, dietTotalsScoreCards } from "./scorecards";
import * as lists from "./lists";
import * as charts from "./charts"


export const ageBreakdownReport1Mock = setupSimpleMock("/definitions/mock-dashboards/dashboards/age-breakdown-dashboard-1", ageBreakdownReport1)
export const ageBreakdownReport2Mock = setupSimpleMock("/definitions/mock-dashboards/dashboards/age-breakdown-dashboard-2", ageBreakdownReport2)
export const ageBreakdownReport3Mock = setupSimpleMock("/definitions/mock-dashboards/dashboards/age-breakdown-dashboard-3", ageBreakdownReport3)
export const dataQualityDashboardBaseMock = setupSimpleMock("/definitions/mock-dashboards/dashboards/data-quality-dashboard-base", dataQualityDashboardBase)
export const dataQualityDashboard1Mock = setupSimpleMock("/definitions/mock-dashboards/dashboards/data-quality-dashboard-1", dataQualityDashboard1)
export const testingDashboard2Mock = setupSimpleMock("/definitions/mock-dashboards/dashboards/167078.RS", testingDashboard2)
export const testingDashboard8Mock = setupSimpleMock("/definitions/mock-dashboards/dashboards/test-dashboard-8", testingDashboard8)
export const dataQualityScoreCardsMock = setupSimpleMock("/definitions/mock-dashboards/dashboards/scorecard-examples-data-quality", dataQualityScoreCards)
export const dietTotalsScoreCardsMock = setupSimpleMock("/definitions/mock-dashboards/dashboards/scorecard-examples-diet-totals", dietTotalsScoreCards)

export const dietTotalsMockLists = setupSimpleMock("/definitions/dashboard-visualisations/dashboards/list-examples-diet-totals", lists.dietTotals)
export const historicDietTotalsMockLists = setupSimpleMock("/definitions/dashboard-visualisations/dashboards/list-examples-diet-totals-historic", lists.historicDietTotals)
export const dietTotalsFullDatasetMockLists = setupSimpleMock("/definitions/dashboard-visualisations/dashboards/list-examples-diet-totals-full-set", lists.dietTotalsFullDataset)
export const dataQualityMockLists = setupSimpleMock("/definitions/dashboard-visualisations/dashboards/list-examples-data-quality", lists.dataQuality)
export const dataQualityHistoricMockLists = setupSimpleMock("/definitions/dashboard-visualisations/dashboards/list-examples-data-quality-historic", lists.dataQualityHistoric)
export const dataQualityFullDatasetMockLists = setupSimpleMock("/definitions/dashboard-visualisations/dashboards/list-examples-data-quality-dataset", lists.dataQualityFullDataset)
export const dataQualityFlexibleMockLists = setupSimpleMock("/definitions/dashboard-visualisations/dashboards/list-examples-data-quality-flexible", lists.dataQualityFlexible)
export const fallBackKeysDashboardMockLists = setupSimpleMock("/definitions/dashboard-visualisations/dashboards/list-examples-fallback-keys", lists.fallBackKeysDashboard)

export const dataQualityFlexibleMockCharts = setupSimpleMock("/definitions/dashboard-visualisations/dashboards/chart-examples-data-quality-flexible", charts.dataQualityFlexible)
export const dataQualityHistoricMockCharts = setupSimpleMock("/definitions/dashboard-visualisations/dashboards/chart-examples-data-quality-historic", charts.dataQualityHistoric)
export const dataQualityMockCharts = setupSimpleMock("/definitions/dashboard-visualisations/dashboards/chart-examples-data-quality", charts.dataQuality)
export const flexibleDietTotalsMockCharts = setupSimpleMock("/definitions/dashboard-visualisations/dashboards/chart-examples-diet-totals-flexible", charts.flexibleDietTotals)
export const historicFlexibleDietTotalsMockCharts = setupSimpleMock("/definitions/dashboard-visualisations/dashboards/chart-examples-diet-totals-historic-flexible", charts.historicFlexibleDietTotals)
export const historicDietTotalsMockCharts = setupSimpleMock("/definitions/dashboard-visualisations/dashboards/chart-examples-diet-totals-historic", charts.historicDietTotals)
export const dietTotalsMockCharts = setupSimpleMock("/definitions/dashboard-visualisations/dashboards/chart-examples-diet-totals", charts.dietTotals)

export const mocks = [
  ageBreakdownReport1Mock,
  ageBreakdownReport2Mock,
  ageBreakdownReport3Mock,
  dataQualityDashboardBaseMock,
  dataQualityDashboard1Mock,
  testingDashboard2Mock,
  testingDashboard8Mock,
  dataQualityScoreCardsMock,

  dietTotalsScoreCardsMock,
  dietTotalsMockLists,
  historicDietTotalsMockLists,
  dietTotalsFullDatasetMockLists,
  dataQualityMockLists,
  dataQualityHistoricMockLists,
  dataQualityFullDatasetMockLists,
  dataQualityFlexibleMockLists,
  fallBackKeysDashboardMockLists,

  dataQualityFlexibleMockCharts,
  dataQualityHistoricMockCharts,
  dataQualityMockCharts,
  flexibleDietTotalsMockCharts,
  historicFlexibleDietTotalsMockCharts,
  historicDietTotalsMockCharts,
  dietTotalsMockCharts
]