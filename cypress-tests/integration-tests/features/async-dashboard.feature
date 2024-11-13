Feature: Async Dashboard

  Background:
    Given I navigate to the async-home page

  Scenario: The page is accessible
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on a ready viewed dashboard
    Then the page is accessible

  Scenario: The dashboard is displayed correctly
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on a ready viewed dashboard
    Then I see the dashboard data
    Then I see the metric data
    When I click the table tab
    Then I see the metric data in a table



