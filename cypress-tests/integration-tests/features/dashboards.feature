Feature: Dashboards

  Background:
    Given I navigate to the async-home page
    When I enter a search value of dashboard
    When I click the dashboard link
    Then I am taken to the dashboard

  Scenario: Viewing Dashboard Data
    Then I see the dashboard data

  Scenario: Viewing Metric Data
    Then I see the metric data
    When I click the table tab


