Feature: Interactive journey

  Background:
    Given I navigate to the async-home page

  Scenario: The page is accessible
    When I navigate to the interactive report page
    Then the page is accessible

  Scenario: Filters are displayed
    When I navigate to the interactive report page
    Given the Update filters button is displayed
    And the Update filters panel is closed
    When I click the Update filters button
    Then the Update filters panel is open

  Scenario: Filtering data displays correct results
    When I navigate to the interactive report page
    When I click the Update filters button
    When I update the filter inputs
    And I click the Apply filters button
    Then the selected filter values are displayed
    Then the selected filter values are shown in the URL

  Scenario: Clicking a selected filter removes it
    When I navigate to the interactive report page
    When I click a selected filter button
    Then the selected filter is removed

  Scenario: Clicking 'Reset filter' resets all filters
    When I navigate to the interactive report page
    When I click the Update filters button
    When I click the reset filter button
    Then the filters are reset
