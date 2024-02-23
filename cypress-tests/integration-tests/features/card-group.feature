Feature: Card Group

  Scenario: The expected number of cards are displayed in the group
    When I navigate to the reports page
    Then 1 cards are displayed
    When I navigate to the render types page
    Then 3 cards are displayed

  Scenario Outline: The card information is correctly rendered
    When I navigate to the render types page
    Then a card is displayed with the title <name>
    And it has the description <description>
    And it has a link of <link>

    Examples:
      | name          | description                                                                                       | link                                              |
      | Method        | A test page rendered using the renderListWithData method.                                         | /reports/render-types/method?dataProductDefinitionsPath=test-location  |
      | Handler       | A test page rendered using the createReportListRequestHandler method to create a request handler. | /reports/render-types/handler                                          |
      | Failing page  | This page will fail to retrieve the definition and fail gracefully.                               | /reports/render-types/fail                                             |
