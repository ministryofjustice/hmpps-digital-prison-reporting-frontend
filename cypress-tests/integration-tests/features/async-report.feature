Feature: Async Report

  Background:
    Given I navigate to the async-home page

  Scenario: The page is accessible
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on a ready report
    Then the page is accessible
    
  Scenario: Apply Columns
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on a ready report
    Then I open the columns options
    And I select the columns
    Then the URL will show the correct columns
    And I click apply columns
    Then the table will show the correct columns

  Scenario: Reset Columns
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on a ready report
    Then I open the columns options
    And I click reset columns
    Then the URL will show the default columns
    And the table will show the default columns

  Scenario: Changing the page size
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on a ready report
    And I change the page size to 10
    Then the page size is set in the URL
    And the totals should show the correct value

  Scenario: Changing the page
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on a ready report
    And I click on page 5
    Then the page number is set in the URL
    And the totals should show the correct pagination value



