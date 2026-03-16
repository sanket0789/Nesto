const messages = {
  en: {
    required: 'The field is required',
    weakPassword: 'Minimum of 12 letters required',
    passwordRule: 'Password must contain at least one uppercase letter, one lowercase letter and one number',
    passwordNoMatch: 'Passwords do not match',
    invalidEmail: 'Invalid email',
    accountAlreadyExists: 'Something went wrong! Please try again and if you continue to have trouble feel free to contact your advisor',
    genericError: 'The field is required',
    success: 'Account created successfully',
    labels: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      phone: 'Phone number',
      password: 'Password',
      confirmPassword: 'Confirm password',
      province: 'Province'
    }, 
    provinces: {
        Ontario: 'Ontario',
        Quebec: 'Quebec',
        BritishColumbia: 'British-Columbia',
        Alberta: 'Alberta',
        Manitoba: 'Manitoba',
        NovaScotia: 'Nova Scotia',
        NewBrunswick: 'New Brunswick',
        NewfoundlandAndLabrador: 'Newfoundland and Labrador',
        PrinceEdwardIsland: 'Prince Edward Island',
        Saskatchewan: 'Saskatchewan'
    }
  },
  fr: {
    required: 'Ce champ est obligatoire.',
    weakPassword: 'Minimum de 12 lettres requises',
    passwordRule: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre',
    passwordNoMatch: 'Les mots de passe ne correspondent pas',
    invalidEmail: 'Courriel invalide',
    accountAlreadyExists: "Quelque chose n'a pas fonctionné! Veuillez réessayer et si vous avez toujours des problèmes, n'hésitez pas à contacter votre conseiller",
    genericError: 'Ce champ est obligatoire.',
    success: 'Compte créé avec succès',
    labels: {
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Courriel',
      phone: 'Téléphone',
      password: 'Mot de passe',
      confirmPassword: 'Confirmation du mot de passe',
      province: 'Province'
    },
    provinces: {
        Ontario: 'Ontario',
        Quebec: 'Québec',
        BritishColumbia: 'Colombie-Britannique',
        Alberta: 'Alberta', 
        Manitoba: 'Manitoba',
        NovaScotia: 'Nouvelle-Écosse',
        NewBrunswick: 'Nouveau-Brunswick',
        NewfoundlandAndLabrador: 'Terre-Neuve-et-Labrador',
        PrinceEdwardIsland: 'Île-du-Prince-Édouard',
        Saskatchewan: 'Saskatchewan'
  }
}
};

/**
 * 
 * @param key - The key for the message to retrieve.
 * @description Retrieves a message based on the current language set in Cypress environment variables.
 * If no language is set, defaults to English ('en').
 * @example
 * getMessage('required'); // Returns 'Required' if language is 'en', or 'Requis' if language is 'fr'.
 * 
 * @returns 
 */
export function getMessage(key: keyof typeof messages['en']): string {
  const lang = Cypress.env('language') || 'en';
  return messages[lang][key];
}

/**
 * Retrieves a label based on the current language set in Cypress environment variables.
 * If no language is set, defaults to English ('en').
 * 
 * @param key - The key for the label to retrieve.
 * @returns The label string for the specified key in the current language.
 * @example
 * getLabel('firstName'); // Returns 'First name' if language is 'en', or 'Prénom' if language is 'fr'.
 */
export function getLabel(key: keyof typeof messages['en']['labels']): string {
  const lang = Cypress.env('language') || 'en';
  return messages[lang].labels[key];
}

/**
 * Retrieves the province name based on the current language set in Cypress environment variables.
 * If no language is set, defaults to English ('en').
 * 
 * @param name - The key for the province to retrieve.
 * @returns The province name string for the specified key in the current language.
 * @example
 * getProvince('Ontario'); // Returns 'Ontario' if language is 'en', or 'Ontario' if language is 'fr'.
 */
export function getProvince(name: keyof typeof messages['en']['provinces']): string {
  const lang = Cypress.env('language') || 'en';
  return messages[lang].provinces[name];
}
