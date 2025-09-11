import { setupSimpleMock } from "@networkMocks/generateNetworkMock";
import { generateData } from "./age-breakdown/dataGenerator";
import { generateData as generateDataQualityData } from "./data-quality-metrics/dataGenerator";
import { generateData as generateDietData } from "./diet-data/dataGenerator";
import { generateAgeBreakdownData } from "./age-breakdown/data";

const dataQualityDashboards = [
  'list-examples-data-quality',
  'list-examples-data-quality-historic',
  'list-examples-data-quality-flexible',
  'list-examples-data-quality-dataset',
  'chart-examples-data-quality',
  'chart-examples-data-quality-historic',
  'scorecard-examples-data-quality',
  'data-quality-dashboard-base',
]

const dietDashboards = [
  'list-examples-diet-totals',
  'list-examples-fallback-keys',
  'list-examples-diet-totals-historic',
  'list-examples-diet-totals-full-set',
  'chart-examples-diet-totals',
  'chart-examples-diet-totals-flexible',
  'chart-examples-diet-totals-historic',
  'chart-examples-diet-totals-historic-flexible',
  'scorecard-examples-diet-totals',
]

export const mocks = [
  setupSimpleMock(`/reports/[a-zA-Z0-9-_]+/dashboards/(age-breakdown-dashboard-3|lists-example-dashboard)/tables/tblId_[a-zA-Z0-9]+/result`, generateData({})),
  setupSimpleMock(`/reports/[a-zA-Z0-9-_]+/dashboards/age-breakdown-dashboard-[1-2]/tables/tblId_[a-zA-Z0-9]+/result`, generateAgeBreakdownData('MDI', 'I')),
  setupSimpleMock(`/reports/dashboard-visualisations/dashboards/(${dataQualityDashboards.join('|')})/tables/tblId_[0-9]+/result`, generateDataQualityData({})),
  setupSimpleMock(`/reports/dashboard-visualisations/dashboards/(${dietDashboards.join('|')})/tables/tblId_[0-9]+/result`, generateDietData({})),
  setupSimpleMock(`/reports/dashboard-visualisations/dashboards/[a-zA-Z0-9-_]+/tables/tblId_[0-9]+/result`, generateDataQualityData({}), 100),
]