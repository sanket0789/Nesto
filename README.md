

<table>
  <tr>
    <td><img src="assets/Logo.png" alt="Nesto Logo" width="60"/></td>
    <td><h1>Nesto Test</h1></td>
  </tr>
</table>


This repository contains end-to-end (E2E) tests for the nesto application using Cypress.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/sanket0789/Nesto
   cd Nesto
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

## Running Cypress Tests

### Open Cypress Test Runner (Interactive Mode)

```sh
npx cypress open
```
### Open Cypress Test Runner (Interactive Mode) for running in language French

```sh
npx cypress open --env language=fr
```

NOTE: By default, the test triggered will take the english language as default. Handling of multiple languages is done in the headless mode by using the Cypress.env variable. 

This will launch the Cypress Test Runner UI, where you can select and run tests interactively.

### Run Cypress Tests in Headless Mode for the language English

```sh
npx cypress run --env language=en   
```

### Run Cypress Tests in Headless Mode for the language French

```sh
npx cypress run --env language=fr
```


This will execute all tests in the terminal without the UI.


## Folder Structure Explanation

```
cypress.config.ts
package.json
README.md
tsconfig.json
cypress/
   e2e/                # End-to-end test files (e.g., sign-up.cy.ts)
      fixtures/         # Test data files (e.g., example.json)
      support/
         commands.ts     # Custom Cypress commands
         e2e.ts          # Global Cypress support file
         locators/
            sign-up.locators.ts  # Selector functions for sign-up page
         pages/
            sign-up.page.ts      # Page object for sign-up actions
         types/
            account-form.type.ts # Type definitions for account form
         utils/
            dynamic-language.ts  # Language utility
            province-code.ts     # Province code utility
            test-data.ts         # Test data constants and helpers
```


**Key folders/files:**
- `cypress/e2e/`: Main test files for Cypress E2E testing.
- `cypress/support/`: Custom commands, page objects, locators, types, and utilities.
- `cypress/fixtures/`: Static test data for mocking responses.
- `cypress.config.ts`: Cypress configuration.
- `package.json`: Project dependencies and scripts.
- `tsconfig.json`: TypeScript configuration.

This structure helps organize tests, utilities, and configuration for maintainable Cypress automation.

## Bug Reports

For details on known issues and bug tracking, see the [BUGS.md](BUGS.md) file.

## Additional Notes

- For more information, see the [Cypress documentation](https://docs.cypress.io/).