import { getFirstName, getFirstNameLabel, getLastName, getLastNameLabel, getEmail, getEmailLabel, getpassword, getPasswordLabel, getConfirmPassword, getConfirmPasswordLabel, getPhoneNumber, getPhoneNumberLabel, getProvincedrpDown, getProvinceLabel } from "../support/locators/sign-up.locators";
import { createTestUser } from "../support/utils/user-factory";
import { getMessage, getLabel, getProvince } from "../support/utils/localization";
import { ProvinceCode } from "../support/utils/province-enum";
import { baseUserData } from '../support/utils/test-data.constants';
import { testPhoneNumber, testPassword, testWeakPassword, invalidRulePassword, testInvalidEmail, testProvince, testProvinceQuebec, testConfirmPassword } from "../support/utils/test-data.constants";


describe('sign up page', () => {
  beforeEach('navigate to signup page and select the desired language', () => {
    cy.visit('/signup');
    cy.selectLanguage(Cypress.env("language") || "en");
    cy.get('[data-testid="notice"]').should('exist');
    cy.get('#didomi-notice-agree-button').click({ force: true });
  })

  it('should create a new account successfully', () => {
    const user = createTestUser();
    cy.verifyAccountCreation({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: testPhoneNumber,
      password: testPassword,
      confirmPassword: testConfirmPassword,
      province: getProvince(testProvince),
      provinceCode: ProvinceCode.Ontario,
      success: true
    });
  });

  it('should display errors for required fields', () => {
    const required = getMessage('required');

    cy.verifyAccountCreation({
      success: false,
      fieldErrors: [
        { field: 'firstName', message: required },
        { field: 'email', message: required },
        { field: 'phoneNumber', message: required },
        { field: 'password', message: required },
        { field: 'confirmPassword', message: required },
        { field: 'province', message: required }
      ]
    });
  });

  it('should display error for password less than 12 characters', () => {
    cy.verifyAccountCreation({
      ...baseUserData,
      password: testWeakPassword,
      confirmPassword: testWeakPassword,
      province: getProvince(testProvinceQuebec),
      success: false,
      fieldErrors: [
        {
          field: 'passwordWeak',
          message: getMessage('weakPassword')
        }
      ]
    });
  })

  it('should display error for password not matching with password rules', () => {
    cy.verifyAccountCreation({
      ...baseUserData,
      password: invalidRulePassword,
      confirmPassword: invalidRulePassword,
      province: getProvince(testProvinceQuebec),
      success: false,
      fieldErrors: [
        {
          field: 'passwordWeak',
          message: getMessage('passwordRule')
        }
      ]
    });
  })

  it('should display error when passwords do not match', () => {
    cy.verifyAccountCreation({
      ...baseUserData,
      password: testWeakPassword,
      confirmPassword: '12',
      province: getProvince(testProvinceQuebec),
      success: false,
      fieldErrors: [
        {
          field: 'passwordDoNotMatch',
          message: getMessage('passwordNoMatch')
        }
      ]
    });
  })

  it('should display error for invalid email', () => {
    cy.verifyAccountCreation({
      ...baseUserData,
      email: testInvalidEmail,
      confirmPassword: '12',
      province: getProvince(testProvinceQuebec),
      success: false,
      fieldErrors: [
        {
          field: 'invalidEmail',
          message: getMessage('invalidEmail')
        }
      ]
    });
  })

  it('should display error for existing account', () => {
    cy.verifyAccountCreation({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johne@example.com',
      phoneNumber: testPhoneNumber,
      password: 'randomPassword123!',
      confirmPassword: 'randomPassword123!',
      province: getProvince(testProvince),
      success: false,
      fieldErrors: [
        {
          field: 'accountAlreadyExists',
          message: getMessage('accountAlreadyEXists')
        }
      ]
    });
  })

  it('should display error for whitespace only input', () => {
    const user = createTestUser();
    cy.verifyAccountCreation({
      ...baseUserData,
      firstName: " ",
      province: getProvince('Ontario'),
      provinceCode: ProvinceCode.Ontario,
      success: false,
      fieldErrors: [
        {
          field: 'genericError',
          message: getMessage('genericError')
        }
      ]
    });
  });

  it('should validate all fields and labels', () => {
    const fieldsToCheck = [
      { field: getFirstName, label: getFirstNameLabel, expectedText: getLabel('firstName') },
      { field: getLastName, label: getLastNameLabel, expectedText: getLabel('lastName') },
      { field: getEmail, label: getEmailLabel, expectedText: getLabel('email') },
      { field: getPhoneNumber, label: getPhoneNumberLabel, expectedText: getLabel('phone') },
      { field: getpassword, label: getPasswordLabel, expectedText: getLabel('password') },
      { field: getConfirmPassword, label: getConfirmPasswordLabel, expectedText: getLabel('confirmPassword') },
      { field: getProvincedrpDown, label: getProvinceLabel, expectedText: getLabel('province') }
    ];

    fieldsToCheck.forEach(({ field, label, expectedText }) => {
      cy.verifyFieldAndLabel(field, label, expectedText);
    });
  });
})
