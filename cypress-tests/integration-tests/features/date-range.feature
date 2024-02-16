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

  Scenario: Daterange selection constrains to min and max settings
    When I enter a start date before the min date
    When I enter a end date after the max date
    When I apply the filters
    Then the daterange is displays the min and max values in the URL