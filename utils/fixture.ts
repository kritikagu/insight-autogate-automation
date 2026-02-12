import { test as base } from "@playwright/test";
import { Common } from "./common.helper";
//import { TokenAPI } from "./tokenApi.helper";
//import { IdServer } from "./idserverApi.helper";
//import { AWSSecretsManager } from "./awsSecretsManager.helper";
import { Mailosaur } from "./mailosaur.helper";
//import { MessageBird } from "./messageBird.helper";
//import { EncodeForm } from "./encodeForm.helper";

// Declare the types of your fixtures.
type MyFixtures = {
 // awsSecretsManagerFixture: AWSSecretsManager;
  commonFixture: Common;
 // tokenApiFixture: TokenAPI;
  //idserverApiFixture: IdServer;
  mailosaurFixture: Mailosaur;
  //messageBirdFixture: MessageBird;
  //encodeFormFixture: EncodeForm;
};

// https://playwright.dev/docs/test-fixtures
// Extend base test by providing all the fixtures that have been created. Example: "member" and "token".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  commonFixture: async ({ page }, use) => {
    // Set up the fixture.
    await use(new Common(page));
  },

 /* tokenApiFixture: async ({ request }, use) => {
    // Set up the fixture.
    await use(new TokenAPI(request));
  }, */
/*
  awsSecretsManagerFixture: async ({ request }, use) => {
    // Set up the fixture.
    await use(new AWSSecretsManager(request));
  },
*/
/*
  idserverApiFixture: async ({ request, encodeFormFixture }, use) => {
    // Set up the fixture.
    await use(new IdServer(request, encodeFormFixture));
  },
*/
  mailosaurFixture: async ({ request }, use) => {
    // Set up the fixture.
    await use(new Mailosaur(request));
  },
/*
  messageBirdFixture: async ({ request }, use) => {
    // Set up the fixture.
    await use(new MessageBird(request));
  },
*/
/*
  encodeFormFixture: async ({ }, use) => {
    // Set up the fixture.
    await use(new EncodeForm());
  }*/
});

export { expect } from "@playwright/test";