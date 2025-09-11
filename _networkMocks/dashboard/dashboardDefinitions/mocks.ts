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

export const mocks = [
  setupSimpleMock("/definitions/mock-dashboards/dashboards/age-breakdown-dashboard-1", ageBreakdownReport1),
  setupSimpleMock("/definitions/mock-dashboards/dashboards/age-breakdown-dashboard-2", ageBreakdownReport2),
  setupSimpleMock("/definitions/mock-dashboards/dashboards/age-breakdown-dashboard-3", ageBreakdownReport3),
  setupSimpleMock("/definitions/mock-dashboards/dashboards/data-quality-dashboard-base", dataQualityDashboardBase),
  setupSimpleMock("/definitions/mock-dashboards/dashboards/data-quality-dashboard-1", dataQualityDashboard1),
  setupSimpleMock("/definitions/mock-dashboards/dashboards/167078.RS", testingDashboard2),
  setupSimpleMock("/definitions/mock-dashboards/dashboards/test-dashboard-8", testingDashboard8),
  setupSimpleMock("/definitions/mock-dashboards/dashboards/scorecard-examples-data-quality", dataQualityScoreCards),
  setupSimpleMock("/definitions/mock-dashboards/dashboards/scorecard-examples-diet-totals", dietTotalsScoreCards),

  setupSimpleMock("/definitions/dashboard-visualisations/dashboards/list-examples-diet-totals", lists.dietTotals),
  setupSimpleMock("/definitions/dashboard-visualisations/dashboards/list-examples-diet-totals-historic", lists.historicDietTotals),
  setupSimpleMock("/definitions/dashboard-visualisations/dashboards/list-examples-diet-totals-full-set", lists.dietTotalsFullDataset),
  setupSimpleMock("/definitions/dashboard-visualisations/dashboards/list-examples-data-quality", lists.dataQuality),
  setupSimpleMock("/definitions/dashboard-visualisations/dashboards/list-examples-data-quality-historic", lists.dataQualityHistoric),
  setupSimpleMock("/definitions/dashboard-visualisations/dashboards/list-examples-data-quality-dataset", lists.dataQualityFullDataset),
  setupSimpleMock("/definitions/dashboard-visualisations/dashboards/list-examples-data-quality-flexible", lists.dataQualityFlexible),
  setupSimpleMock("/definitions/dashboard-visualisations/dashboards/list-examples-fallback-keys", lists.fallBackKeysDashboard),
  
  setupSimpleMock("/definitions/dashboard-visualisations/dashboards/chart-examples-data-quality-flexible", charts.dataQualityFlexible),
  setupSimpleMock("/definitions/dashboard-visualisations/dashboards/chart-examples-data-quality-historic", charts.dataQualityHistoric),
  setupSimpleMock("/definitions/dashboard-visualisations/dashboards/chart-examples-data-quality", charts.dataQuality),
  setupSimpleMock("/definitions/dashboard-visualisations/dashboards/chart-examples-diet-totals-flexible", charts.flexibleDietTotals),
  setupSimpleMock("/definitions/dashboard-visualisations/dashboards/chart-examples-diet-totals-historic-flexible", charts.historicFlexibleDietTotals),
  setupSimpleMock("/definitions/dashboard-visualisations/dashboards/chart-examples-diet-totals-historic", charts.historicDietTotals),
  setupSimpleMock("/definitions/dashboard-visualisations/dashboards/chart-examples-diet-totals", charts.dietTotals),
]