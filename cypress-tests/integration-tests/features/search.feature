Feature: Search
  Background:
    Given I navigate to the search page

  Scenario: No search text, all results
    Then 6 results are displayed

  Scenario: Matching search text, matching results
    When I enter a search value of three
    Then 3 results are displayed

  Scenario: Unmatched search text, no results
    When I enter a search value of zero
    Then 0 results are displayed

  Scenario: Cleared search value, all results
    Given I enter a search value of zero
    And 0 results are displayed
    When I enter an empty search value
    Then 6 results are displayed

  Scenario: The page is accessible
    Then the page is accessible
