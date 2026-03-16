import { SignupFormData } from "../types/account-form.type";

import { getAccountAlreadyExistsValidation, getAgreeCheckBox, getConfirmPassword, getCreateAccountButton, getEmail, getEmailValidation, getFirstName, getGenericErrorValidation, getLastName, getpassword, getPasswordDoNotMatchValidation, getPasswordWeakValidation, getPhoneNumber, getProvincedrpDown, getToggleLanguage, getValidationError, selectProvince } from "../locators/sign-up.locators"

/**
 * A mapping of form field names to functions that return Cypress chainables for their corresponding validation error elements.
 * 
 * Each key represents a specific form field or validation type, and the associated function returns a Cypress.Chainable
 * that resolves to the JQuery<HTMLElement> representing the validation error for that field.
 * 
 * @remarks
 * - Standard fields (e.g., `firstName`, `lastName`, `email`, etc.) use `getValidationError()`.
 * - Special validation cases (e.g., `passwordWeak`, `passwordDoNotMatch`, `invalidEmail`) use their respective selector functions.
 * 
 * @example
 * ```typescript
 * fieldErrorSelectors.firstName().should('contain', 'First name is required');
 * ```
 */
const fieldErrorSelectors: Record<string, () => Cypress.Chainable<JQuery<HTMLElement>>> = {
  firstName: () => getValidationError(),
  lastName: () => getValidationError(),
  email: () => getValidationError(),
  phoneNumber: () => getValidationError(),
  password: () => getValidationError(),
  confirmPassword: () => getValidationError(),
  province: () => getValidationError(),
  passwordWeak: () => getPasswordWeakValidation(),
  passwordDoNotMatch: () => getPasswordDoNotMatchValidation(),
  invalidEmail: () => getEmailValidation(),
  accountAlreadyExists: () => getAccountAlreadyExistsValidation(),
  genericError: () => getGenericErrorValidation()
};

/**
 * Custom Cypress command to verify account creation by filling out the account creation form,
 * clicking the submit button, and validating the outcome based on `expectSuccess` or `expectedErrors`.
 *
 * @function verify_account_creation
 * @param {AccountFormData} data - An object containing form field values and validation expectations.
 * 
 * @param {string} [data.firstName] - First name to enter and verify.
 * @param {string} [data.lastName] - Last name to enter and verify.
 * @param {string} [data.email] - Email address to enter and verify.
 * @param {string|number} [data.phoneNumber] - Phone number to enter (as string or number).
 * @param {string} [data.password] - Password to enter (typed silently).
 * @param {string} [data.confirmPassword] - Confirm password (typed silently).
 * @param {string} [data.province] - Province to select from dropdown.
 * @param {string} [data.provinceCode] - Code of the selected province (used for API validation).
 * @param {boolean} [data.expectSuccess] - If true, validates successful API response after form submission.
 * @param {{field: string, message: string}[]} [data.expectedErrors] - Array of expected field-level errors to validate.
 *
 * @example
 * cy.verify_account_creation({
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   email: 'john.doe@example.com',
 *   phoneNumber: '1234567890',
 *   password: 'Test@123',
 *   confirmPassword: 'Test@123',
 *   province: 'Quebec',
 *   provinceCode: 'QC',
 *   expectSuccess: true
 * });
 *
 * @example
 * cy.verify_account_creation({
 *   email: '',
 *   password: '',
 *   expectedErrors: [
 *     { field: 'email', message: 'Email is required' },
 *     { field: 'password', message: 'Password is required' }
 *   ]
 * });
 */

Cypress.Commands.add('verifyAccountCreation', (data: SignupFormData) => {
  if (data.firstName) {
    getFirstName().type(data.firstName).should('have.value', data.firstName);
  }

  if (data.lastName) {
    getLastName().type(data.lastName).should('have.value', data.lastName);
  }

  if (data.email) {
    getEmail().type(data.email).should('have.value', data.email);
  }

  if (data.phoneNumber !== undefined) {
    getPhoneNumber().type(data.phoneNumber.toString());
  }

  if (data.password) {
    getpassword().type(data.password, { log: false });
  }

  if (data.confirmPassword) {
    getConfirmPassword().type(data.confirmPassword, { log: false });
  }

  if (data.province) {
    getProvincedrpDown().select(data.province).should('contain.text', data.province);
    selectProvince(data.province).select(data.province).should('contain.text', data.province);
    getProvincedrpDown().should('contain.text', data.province);
  }

  getAgreeCheckBox().click();

  cy.waitForIntercept('/api/accounts', 'createAccount', 'POST');
  getCreateAccountButton().click();
  
if (data.success) {
  cy.wait('@createAccount').then((interception) => {
    expect(interception.response.statusCode).to.eq(201);
    expect(interception.response.body.account).to.have.property('firstName', data.firstName);
    expect(interception.response.body.account).to.have.property('lastName', data.lastName);
    expect(interception.response.body.account).to.have.property('email', data.email);
    expect(interception.response.body.account).to.have.property('phone', data.phoneNumber);
    expect(interception.response.body.account).to.have.property('region', data.provinceCode);
  });
} else if (data.fieldErrors) {
  data.fieldErrors.forEach((error) => {
    cy.contains(error.message).should('be.visible');
  });
}
  
});

/**
 * Custom Cypress command to verify that a form field and its corresponding label are visible and correctly labeled.
 *
 * @function verifyFieldAndLabel
 * @param {() => Cypress.Chainable} getField - A function returning the Cypress chainable for the input field.
 * @param {() => Cypress.Chainable} getLabel - A function returning the Cypress chainable for the label element.
 * @param {string} expectedLabel - The expected text content of the label.
 *
 * @example
 * cy.verifyFieldAndLabel(getEmailField, getEmailLabel, 'Email Address');
 */

Cypress.Commands.add('verifyFieldAndLabel', (getField: () => Cypress.Chainable, getLabel: () => Cypress.Chainable, expectedLabel: string) => {
  getField().should('exist').and('be.visible');
  getLabel().should('exist').and('contain.text', expectedLabel);
});


/**
 * Custom Cypress command to select a language based on the provided string.
 * If the language is 'fr', it clicks the toggle language button to switch to French.
 * Otherwise, it logs that the default language is English.
 *
 * @function selectLanguage
 * @param {string} language - The language to select ('fr' for French).
 *
 * @example
 * cy.selectLanguage('fr');
 */
Cypress.Commands.add('selectLanguage', (language: string) => {
  if (language === 'fr') {
    getToggleLanguage().click();
  } else {
    cy.log('Default language is English');
  }
})
