Feature: Bookmarking
  Background:
    Given I navigate to the async-home page

  Scenario: The page is accessible
    Then the page is accessible

  Scenario: Bookmarks are visible
    When I navigate to the async-home page
    And I click on the bookmarks tab
    Then the bookmarks are displayed correctly

  Scenario: Removing a bookmark
    When I navigate to the async-home page
    And I click on the bookmarks tab
    And I click on a bookmark button
    Then the bookmark is removed

  Scenario: Adding a bookmark from the reports list
    When I navigate to the async-home page
    And I click on the bookmarks tab
    And I click a bookmark button from the reports list
    Then the bookmark is added

  Scenario: Removing a bookmark from the reports list
    When I navigate to the async-home page
    And I click on the bookmarks tab
    And I click on a selected bookmark button from the reports list
    Then the bookmark is removed 

  Scenario: Adding a bookmark from the report
    When I navigate to the async-home page
    And I click on the recently viewed reports tab
    And I click on a ready report
    And I click the bookmark button on the report
    When I navigate to the async-home page
    And I click on the bookmarks tab
    Then the bookmarks are displayed correctly

  Scenario: Viewing a bookmarked report
    When I navigate to the async-home page
    And I click on the bookmarks tab
    And I click on a bookmarked report
    Then I am taken to the query page of the bookmarked report

  