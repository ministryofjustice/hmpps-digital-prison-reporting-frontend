Feature: Requested Reports

  Background:
    Given I navigate to the async-home page

  Scenario: The page is accessible
    Then the page is accessible

  Scenario: Requested reports are visible
    When I navigate to the async-home page
    Then the requested reports are displayed correctly
    And the status is displayed for each request
    And the timestamp is displayed for each request

  Scenario: Refresh an expired report
    When I navigate to the async-home page
    And I click on an expired report
    Then I am taken to the query page

  Scenario: Refresh an expired report via action button
    When I navigate to the async-home page
    And I click on the refresh button on an expired report 
    Then I am taken to the query page

  Scenario: Retry a failed report
    When I navigate to the async-home page
    And I click on a failed report
    Then I am taken to the status page

  Scenario: Retry a failed report via action button
    When I navigate to the async-home page
    And I click on the retry button on a failed report 
    Then I am taken to the status page

  Scenario: Remove an expired report
    When I navigate to the async-home page
    And I click on the remove button of the expired report
    Then the expired report is removed from the list

  Scenario: Remove failed report
    When I navigate to the async-home page
    And I click on the remove button of the failed report
    Then the failed report is removed from the list

  Scenario: View a finished report
    When I navigate to the async-home page
    And I click on a finished report
    Then I am taken to the report page

