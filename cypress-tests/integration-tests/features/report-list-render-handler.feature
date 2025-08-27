Feature: List report
  Background:
    Given I navigate to the handler page

  Scenario: Data is displayed correctly
    When I navigate to the handler page
    Then the column headers are displayed correctly
    And date times are displayed in the correct format
    And html types are displayed in the correct format
    And the correct data is displayed on the page

  Scenario: Sorting on a previously unselected column
    When I select a column to sort on
    Then the sorted column is shown as sorted ascending in the header
    And the sorted column is shown in the URL
    And the ascending sort direction is shown in the URL

  Scenario: Sorting on a selected column
    When I select a previously selected column to sort on
    Then the sorted column is shown as sorted descending in the header
    And the sorted column is shown in the URL
    And the descending sort direction is shown in the URL

  Scenario: Changing page size
    When I select a page size of 10
    Then the page size is shown in the URL

  Scenario: Navigating paging
    When I click a paging link
    Then the current page is shown in the URL

