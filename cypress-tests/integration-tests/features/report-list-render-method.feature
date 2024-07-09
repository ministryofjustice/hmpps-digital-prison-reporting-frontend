Feature: List report
  Background:
    Given I navigate to the method page

   Scenario: Filters are displayed
    Given the Show Filter button is displayed
    And the Filter panel is closed
    When I click the Show Filter button
    Then the Filter panel is open
    And filters are displayed for filterable fields

  Scenario: Data is displayed correctly
    When I navigate to the method page
    Then the column headers are displayed correctly
    And date times are displayed in the correct format
    And the correct data is displayed on the page

  Scenario: Filtering data displays correct results
    Given I click the Show Filter button
    When I select a filter
    And I apply the filters
    Then the selected filter value is displayed
    And the selected filter value is shown in the URL
    And the definition path is shown in the URL

  Scenario: Clicking a selected filter removes it
    When I click the selected filter
    When I click the selected filter
    Then no filters are selected

  Scenario: Clicking 'Reset filter' resets all filters
    Given I click the Show Filter button
    And I select a filter
    And I apply the filters
    When I click the Show Filter button
    When I click a the Reset filter button
    Then only the default filter is selected
    And the definition path is shown in the URL

  Scenario: Sorting on a previously unselected column
    When I select a column to sort on
    Then the sorted column is shown as sorted ascending in the header
    And the sorted column is shown in the URL
    And the ascending sort direction is shown in the URL
    And the definition path is shown in the URL

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

  Scenario: Actions are displayed
    When I navigate to the handler page
    Then the icon list is visible
    And the print action is shown
    And the email action is shown
    And the copy url action is shown
