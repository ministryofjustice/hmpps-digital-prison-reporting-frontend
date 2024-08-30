Feature: Async Query

  Background:
    Given I navigate to the async-query page

  Scenario: The page is accessible
    Then the page is accessible

  Scenario: The reports meta data is displayed
    When I navigate to the async-query page
    And I click the reports details button
    Then the report details are displayed 

  Scenario: Filter values updated correctly
    When I navigate to the async-query page
    Then the url is set to the default values
    When I update the filters values
    And I update the sort values
    Then the URL is updated

  Scenario: Reset filters
    When I navigate to the async-query page
    And I update the filters values
    And I update the sort values
    And the URL is updated
    And I click the reset filters button
    Then the url is set to the default values 

  Scenario: Request submit
    When I navigate to the async-query page
    And I update the filters values
    And I update the sort values
    And the URL is updated
    And I click the submit button
    Then I am take to the polling page 
  
