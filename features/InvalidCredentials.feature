Feature: Invalid Credentials
@Validations

  Scenario Outline: Logging in with invalid credentials should display an error message

  Given I am on the login page of the practice application
    When I enter invalid credentials "<username>" and "<password>"
    Then an error message should be displayed

    Examples:
      | username              | password |
      | hello@gmail.com       | Password123 |
      | kameswaridd@gmail.com | Password123 |