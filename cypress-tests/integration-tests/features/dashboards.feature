Feature: Sync Dashboards

  Background:
    When I load a dashboard

  Scenario: Viewing Dashboard Data
    Then I see the dashboard data

  Scenario: Viewing Metric Data
    Then I see the metric data
    When I click the table tab
    Then I see the metric data in a table
