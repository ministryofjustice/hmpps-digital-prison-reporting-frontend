Feature: Autocomplete

  Background:
    Given I navigate to the handler page
    And I click the Show Filter button

  Scenario: Static autocomplete filter is displayed
    Then the static Autocomplete box is shown

  Scenario: Static autocomplete options are displayed
    When I enter text longer than the minimum data length into the static Autocomplete box
    Then a list of matching options is displayed

  Scenario: Static autocomplete options are not displayed if the text is too short
    When I enter text shorter than the minimum data length into the static Autocomplete box
    Then a list of options is not displayed

  Scenario: Static autocomplete options are selectable
    Given I enter text longer than the minimum data length into the static Autocomplete box
    When I select an autocomplete option
    Then that value is displayed in the autocomplete box

  Scenario: Static autocomplete options are submitted
    Given I enter text longer than the minimum data length into the static Autocomplete box
    And I select an autocomplete option
    When I apply the filters
    Then the selected option is displayed in the URL
    And the select option is displayed in the Selected Filters section

  Scenario Outline: Static autocomplete filter option name values are submitted
    Given I enter "<text>" into the static Autocomplete box which matches an option which has different name and display values
    And I select an autocomplete option
    When I apply the filters
    Then the name value of the selected option is displayed in the URL
    And the display value of the selected option is displayed in the Selected Filters section
    Examples:
        |text    |
        |prb     |
        |princes |
