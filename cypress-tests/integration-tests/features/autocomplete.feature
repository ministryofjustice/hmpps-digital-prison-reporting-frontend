Feature: Autocomplete

  Background:
    Given I navigate to the handler page
    And I click the Show Filter button

  Scenario: Autocomplete filter is displayed
    Then the Autocomplete box is shown

  Scenario: Autocomplete options are displayed
    When I enter text longer than the minimum data length
    Then a list of matching options is displayed beneath the autocomplete box

  Scenario: Autocomplete options are not displayed if the text is too short
    When I enter text shorter than the minimum data length
    Then a list of options is not displayed

  Scenario: Autocomplete options are selectable
    Given I enter text longer than the minimum data length
    When I select an autocomplete option
    Then that value is displayed in the autocomplete box

  Scenario: Autocomplete options are submitted
    Given I enter text longer than the minimum data length
    And I select an autocomplete option
    When I apply the filters
    Then the selected option is displayed in the URL
    And the select option is displayed in the Selected Filters section
