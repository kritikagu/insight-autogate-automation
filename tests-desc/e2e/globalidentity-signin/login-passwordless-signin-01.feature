# Passwordless Sign-In with Email
1. Successful Sign-In using email and a one-time code
2. Attempt to sign in with an invalid email format
3. Attempt to sign in with an empty email field
4. Attempt to verify with an incorrect code
5. Attempt to verify with an expired code
6. Cancelling the sign-in process after requesting a code

----------------------------------------

## User Stories
Feature: Passwordless Sign-In with Email and code

  As a user
  I want to sign in using my email and a one-time code sent to my email
  So that I can securely access my account without a password

  Background:
    Given I am on the Autogate page

  Scenario: 1. Successful Sign-In using email and a one-time code
    When I click on the "Sign In" button
    And on next page enter my email in the field
    Then I click in "Next" button
    And I should see a message "Login without a password"
    When I enter the correct code sent to my email in the field
    And I click on the "Confirm" button
    Then I should see a confirmation message "Sign-In successful"
    And I should be redirected to the "Home" page

  Scenario: 2. Attempt to sign in with an invalid email format
    When I enter an invalid email address (e.g., "user@com") in the "Email" field
    And I click on the "Next" button
    Then I should see an error message "Please enter a valid email address"
    And I should remain on the "Sign-In" page

  Scenario: 3. Attempt to sign in with an empty email field
    When I leave the "Email" field empty
    And I click on the "Next" button
    Then I should see an error message "Email address is required"
    And I should remain on the "Sign-In" page

  Scenario: 4. Attempt to verify with an incorrect code
    Given I have received a one-time code via email
    And I am on the "Verify Code" page
    When I enter an incorrect code in the "Verification Code" field
    And I click on the "Verify" button
    Then I should see an error message "Invalid code. Please try again."

  Scenario: 5. Attempt to verify with an expired code
    Given I have received a one-time code via email
    When I enter the expired code in the "Verification Code" field
    And I click on the "Verify" button
    Then I should see an error message "This code has expired. Please request a new code."
    And I should see an option to resend the code

  Scenario: 6. Cancelling the sign-in process after requesting a code
    Given I am on the "Verify Code" page
    When I click on the "Cancel" button
    Then I should see a message "Sign