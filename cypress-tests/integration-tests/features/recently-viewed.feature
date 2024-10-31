Feature: Recently viewed Reports

  Background:
    Given I navigate to the async-home page

  Scenario: The page is accessible
    Then the page is accessible

  Scenario: Viewed reports are visible
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    Then the viewed reports are displayed correctly
    And the status and timestamp is displayed for each viewed report

  Scenario: Refresh an expired report
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on an expired viewed report
    Then I am taken to the query page for the viewed report

  Scenario: Refresh an expired report v2
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on an expired viewed report v2
    Then I am taken to the query page for the viewed report v2

 Scenario: Refresh an expired dashboard 
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on an expired viewed dashboard
    Then I am taken to the query page for the viewed dashboard

  Scenario: Refresh an expired report via action button
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on the refresh button on an expired viewed report 
    Then I am taken to the query page for the viewed report

  Scenario: Refresh an expired report via action button v2
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on the refresh button on an expired viewed report v2
    Then I am taken to the query page for the viewed report v2

  Scenario: Refresh an expired dashboard via action button
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on the refresh button on an expired viewed dashboard 
    Then I am taken to the query page for the viewed dashboard

  Scenario: Remove an expired report
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on the remove button of the expired viewed report
    Then the expired report is removed from the viewed reports list

  Scenario: Remove an expired report v2
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on the remove button of the expired viewed report v2
    Then the expired report v2 is removed from the viewed reports list

  Scenario: Remove an expired dashboard
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on the remove button of the expired viewed dashboard
    Then the expired dashboard is removed from the viewed reports list

  Scenario: View a report
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on a ready report
    Then I am taken to the report

  Scenario: View a report v2
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on a ready report v2
    Then I am taken to the report v2

  Scenario: View a dashboard
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on a ready dashboard
    Then I am taken to the async dashboard



