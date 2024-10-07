Feature: Daterange

  Background:
    Given I navigate to the handler page
    And I click the Show Filter button

  Scenario: The daterange filter is displayed
    Then the daterange filter is shown

  Scenario: Daterange selection works correctly
    When I enter a start date
    When I enter a end date
    When I apply the filters
    Then the daterange is displays the values in the URL
