Feature: Requested Reports

  Background:
    Given I navigate to the async-home page

  Scenario: The page is accessible
    Then the page is accessible

  Scenario: Requested reports are visible
    When I navigate to the async-home page
    And I click on the requested reports tab
    Then the requested reports are displayed correctly
    And the status and timestamp is displayed for each request


  Scenario: Refresh an expired report
    When I navigate to the async-home page
    And I click on the requested reports tab
    And I click on the Refresh button on a expired report 
    Then I am taken to the report query page

  Scenario: Refresh an expired reportV2
    When I navigate to the async-home page
    And I click on the requested reports tab
    And I click on the Refresh button on a expired reportV2 
    Then I am taken to the reportV2 query page

  Scenario: Refresh an expired dashboard
    When I navigate to the async-home page
    And I click on the requested reports tab
    And I click on the Refresh button on a expired dashboard 
    Then I am taken to the dashboard query page

  Scenario: Retry a failed report
    When I navigate to the async-home page
    And I click on the requested reports tab
    And I click on the Retry button on a failed report 
    Then I am taken to the report status page

  Scenario: Retry a failed reportV2
    When I navigate to the async-home page
    And I click on the requested reports tab
    And I click on the Retry button on a failed reportV2 
    Then I am taken to the reportV2 status page

  Scenario: Retry a failed dashboard
    When I navigate to the async-home page
    And I click on the requested reports tab
    And I click on the Retry button on a failed dashboard 
    Then I am taken to the dashboard status page

  Scenario: Remove an expired report
    When I navigate to the async-home page
    And I click on the requested reports tab
    And I click on the Remove button on a expired report
    Then the expired report is removed from the list

  Scenario: Remove an expired reportV2
    When I navigate to the async-home page
    And I click on the requested reports tab
    And I click on the Remove button on a expired reportV2
    Then the expired reportV2 is removed from the list

  Scenario: Remove an expired dashboard
    When I navigate to the async-home page
    And I click on the requested reports tab
    And I click on the Remove button on a expired dashboard
    Then the expired dashboard is removed from the list

  Scenario: Remove failed report
    When I navigate to the async-home page
    And I click on the requested reports tab
    And I click on the Remove button on a failed report
    Then the failed report is removed from the list

  Scenario: Remove failed reportV2
    When I navigate to the async-home page
    And I click on the requested reports tab
    And I click on the Remove button on a failed reportV2
    Then the failed reportV2 is removed from the list

  Scenario: Remove failed dashboard
    When I navigate to the async-home page
    And I click on the requested reports tab
    And I click on the Remove button on a failed dashboard
    Then the failed dashboard is removed from the list

  Scenario: View a finished report
    When I navigate to the async-home page
    And I click on the requested reports tab
    And I click on a finished report
    Then I am taken to the report page
    When I navigate to the async-home page
    Then the finished report is removed from the list

  Scenario: View a finished reportV2
    When I navigate to the async-home page
    And I click on the requested reports tab
    And I click on a finished reportV2
    Then I am taken to the reportV2 page
    When I navigate to the async-home page
    Then the finished reportV2 is removed from the list

  Scenario: View a finished dashboard
    When I navigate to the async-home page
    And I click on the requested reports tab
    And I click on a finished dashboard
    Then I am taken to the dashboard page
    When I navigate to the async-home page
    Then the finished dashboard is removed from the list

