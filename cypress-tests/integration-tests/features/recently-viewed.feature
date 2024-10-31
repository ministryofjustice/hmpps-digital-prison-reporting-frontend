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
    And I click on a expired viewed report
    Then I am taken to the query page for the viewed report

  Scenario: Refresh an expired reportV2
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on a expired viewed reportV2
    Then I am taken to the query page for the viewed reportV2

 Scenario: Refresh an expired dashboard 
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on a expired viewed dashboard
    Then I am taken to the query page for the viewed dashboard

  Scenario: Refresh an expired report via action button
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on the refresh button of an expired viewed report 
    Then I am taken to the query page for the viewed report

  Scenario: Refresh an expired report via action button v2
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on the refresh button of an expired viewed reportV2
    Then I am taken to the query page for the viewed reportV2

  Scenario: Refresh an expired dashboard via action button
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on the refresh button of an expired viewed dashboard 
    Then I am taken to the query page for the viewed dashboard

  Scenario: Remove an expired report
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on the remove button of an expired viewed report
    Then the expired report is removed from the viewed reports list

  Scenario: Remove an expired reportV2
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on the remove button of an expired viewed reportV2
    Then the expired reportV2 is removed from the viewed reports list

  Scenario: Remove an expired dashboard
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on the remove button of an expired viewed dashboard
    Then the expired dashboard is removed from the viewed reports list

  Scenario: View a report
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on a ready viewed report
    Then I am taken to the async report

  Scenario: View a reportV2
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on a ready viewed reportV2
    Then I am taken to the async reportV2

  Scenario: View a dashboard
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on a ready viewed dashboard
    Then I am taken to the async dashboard



