# 2FA Sign-In with Email 
1. Sanity test to load Autogate sucessfully and check 200 status code
2. Validate sign in, singup and welcome to Autogate , elements are present on load
3. Successful Sign-In using username and a 2FA code

----------------------------------------

## User Stories
Feature: legacy Sign-In with 2FA send to email

  As a user
  I want to sign in using in legacy sign-in on Autogate and a 2FA code sent to my email
  So that I can securely access my account 

Scenario: 1. Sanity test to load Autogate sucessfully and check 200 status code
When I enter autogate url in browser
Then I should get response code as 200 

Scenario: 2. Validate sign in, singup and welcome to Autogate , elements are present on load
When I enter autogate url in browser
Then check elements sign in, singup and welcome to Autogate are present on the page

Scenario: 3. Successful Sign-In using username and a 2FA code
When I enter autogate url in browser
And I enter email address and corresponding password on the page
And I click on "Sign In" button
Then I should see pop up with "Two-Factor Authentication"
And I enter the 2FA code from mailosaur account
And I click on the "Verify" button
Then I should see a Autogate Dashboard
