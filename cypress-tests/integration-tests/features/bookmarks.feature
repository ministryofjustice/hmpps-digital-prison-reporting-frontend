Feature: Bookmarking
  Background:
    Given I navigate to the async-home page

  Scenario: The page is accessible
    Then the page is accessible

  Scenario: Bookmarks are visible
    When I navigate to the async-home page
    And I click on the bookmarks tab
    Then the bookmarks are displayed correctly with a length of 3

  Scenario: Removing a bookmarked report
    When I navigate to the async-home page
    And I click on the bookmarks tab
    And I click on a bookmark button of a report
    Then the report bookmark is removed

  Scenario: Removing a bookmarked dashboard
    When I navigate to the async-home page
    And I click on the bookmarks tab
    And I click on a bookmark button of a dashboard
    Then the dashboard bookmark is removed

  Scenario: Adding a report bookmark from the reports list
    When I navigate to the async-home page
    And I click on the bookmarks tab
    And I click a report bookmark button from the reports list
    Then the report bookmark is added

  Scenario: Removing a report bookmark from the reports list
    When I navigate to the async-home page
    And I click on the bookmarks tab
    And I click on a selected report bookmark button from the reports list
    Then the report bookmark is removed 

  Scenario: Adding a dashboard bookmark from the reports list
    When I navigate to the async-home page
    And I click on the bookmarks tab
    And I click a dashboard bookmark button from the reports list
    Then the dashboard bookmark is added

  Scenario: Removing a dashboard bookmark from the reports list
    When I navigate to the async-home page
    And I click on the bookmarks tab
    And I click on a selected dashboard bookmark button from the reports list
    Then the dashboard bookmark is removed 

  Scenario: Adding a bookmark from the report
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on a ready report
    And I click the bookmark button on the report
    When I navigate to the async-home page
    And I click on the bookmarks tab
    Then the bookmarks are displayed correctly with a length of 2

 Scenario: Viewing a bookmarked report
    When I navigate to the async-home page
    And I click on the bookmarks tab
    And I click on a bookmarked report
    Then I am taken to the query page of the bookmarked report
  


  