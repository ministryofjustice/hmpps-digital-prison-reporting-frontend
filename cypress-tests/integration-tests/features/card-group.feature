Feature: Card Group

  Scenario: The expected number of cards are displayed in the group
    When I navigate to the reports page
    Then 4 cards are displayed
    And the page is accessible

  Scenario Outline: The card information is correctly rendered
    When I navigate to the reports page
    Then a card is displayed with the title <name>
    And it has the description <description>
    And it has a link of <link>

    Examples:
      | name          | description                                                                                       | link                                              |
      | Method        | A test page rendered using the renderListWithData method.                                         | /test-reports/method?dataProductDefinitionsPath=test-location  |
      | Handler       | A test page rendered using the createReportListRequestHandler method to create a request handler. | /test-reports/handler                                          |
      | Validation    | A test page for field validation.                                                                 | /test-reports/validation                                       |
      | Failing page  | This page will fail to retrieve the definition and fail gracefully.                               | /test-reports/fail                                             |
