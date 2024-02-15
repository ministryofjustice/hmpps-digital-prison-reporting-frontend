Feature: List report

   Scenario: The application does not crash when an API failure is received
    Given I navigate to the fail page
    When I navigate to the fail page
    Then The text Error: Internal Server Error is displayed on the page
