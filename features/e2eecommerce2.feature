Feature: Ecommerce validations
@Regression
  Scenario Outline: Place the order and validate it in the orders page

  Given I am a registered user and I have logged in to the ecommerce application with "<username>" and "<password>"          
    When I add the product "<desiredProductName>" to the cart
    And I proceed to checkout
    Then the order should be placed successfully with same user "<username>"
    And the order details should be visible in the orders page

    Examples:
      | username              | password | desiredProductName |
      | kameswaridd@gmail.com | Password123 | ZARA COAT 3 |
    # | kameswaridd@gmail.com | Password123 | ADIDAS ORIGINAL |


  Scenario Outline: Logging in with invalid credentials should display an error message

  Given I am on the login page of the practice application
    When I enter invalid credentials "<username>" and "<password>"
    Then an error message should be displayed

    Examples:
      | username              | password |
      | hello@gmail.com       | Password123 |
      | kameswaridd@gmail.com | Password123 |