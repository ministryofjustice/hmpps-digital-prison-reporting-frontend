Feature: Async Report

  Background:
    Given I navigate to the async-home page

  Scenario: The page is accessible
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on a ready report
    Then the page is accessible

  Scenario: Data is displayed correctly
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on a ready report
    


