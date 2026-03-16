export const getFirstName = () => cy.get('[data-testid="first-name-input"]');

export const getLastName = () => cy.get('[data-testid="last-name-input"]');

export const getEmail = () => cy.get('[data-testid="email-input"]');

export const getPhoneNumber = () => cy.get('[data-testid="phoneInput"]');

export const getpassword = () => cy.get('[data-testid="password-input"]');

export const getConfirmPassword = () => cy.get('[data-testid="passwordConfirmation-input"]');

export const getProvincedrpDown = () => cy.get('[data-testid="region-select"]');

export const selectProvince = (province: string) => cy.get('[data-testid="region-select"]').select(province);

export const getValidationError = () => cy.get('[data-testid="typography"]');

export const getAgreeCheckBox = () => cy.get('[data-testid="agreement-checkbox"]');

export const getCreateAccountButton = () => cy.get('[data-testid="submit-button"]');

export const getPasswordWeakValidation = () => cy.get('[data-testid="typography"]');

export const getPasswordDoNotMatchValidation = () => cy.get('[data-testid="typography"]');

export const getEmailValidation = () => cy.get('[data-testid="typography"]');

export const getAccountAlreadyExistsValidation = () => cy.get('[data-testid="typography"]');

export const getGenericErrorValidation = () => cy.get('[data-testid="typography"]');

export const getFirstNameLabel = () => cy.get('[data-testid="first-name-input-placeholder"]');

export const getLastNameLabel = () => cy.get('[data-testid="last-name-input-placeholder"]');

export const getEmailLabel = () => cy.get('[data-testid="email-input-placeholder"]');

export const getPhoneNumberLabel = () => cy.get('[data-testid="phoneInput"]').parent().find('label[data-testid="input-placeholder"]');

export const getPasswordLabel = () => cy.get('[data-testid="password-input-placeholder"]');

export const getConfirmPasswordLabel = () => cy.get('[data-testid="passwordConfirmation-input-placeholder"]');

export const getProvinceLabel = () => cy.get('[data-testid="select-placeholder"]');

export const getToggleLanguage = () => cy.get('[data-testid="toggle-language"]');