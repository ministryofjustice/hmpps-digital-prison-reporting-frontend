Feature: Validation

  Background:
    Given I navigate to the validation page
    And I click the Show Filter button

  Scenario: Text filter is displayed
    Then the text box is shown

  Scenario: Mandatory filters do not have empty options
    Given the Show Filter button is displayed
    When I click the Show Filter button
    Then there is no empty radio option
    And there is no empty select option

  Scenario: Text filter content is validated using a pattern
    When I type an invalid string into the text box
    Then the text box fails pattern validation

  Scenario: Filters are not applied if none are chosen
    When I apply the filters
    Then all the filters are not valid
    And the filter form is not valid
