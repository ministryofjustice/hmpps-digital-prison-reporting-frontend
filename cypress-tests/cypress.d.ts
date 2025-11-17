import { DashboardStubsKeys } from "./mockApis/dashboards";
import { ReportingStubsKeys } from "./mockApis/reporting";

type StubsKeys = DashboardStubsKeys | ReportingStubsKeys

export declare global {
  namespace Cypress {
    interface Chainable {
      task<S = unknown>(event: StubsKeys & string): Chainable<S>
    }
  }
}