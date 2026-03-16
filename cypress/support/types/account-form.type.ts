export type ValidationError = {
  field:
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phoneNumber'
  | 'password'
  | 'confirmPassword'
  | 'province'
  | 'passwordWeak'
  | 'passwordRule'
  | 'passwordDoNotMatch'
  | 'invalidEmail'
  | 'accountAlreadyExists'
  | 'genericError'; 
  message: string;
};

export type SignupFormData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
  province?: string;
  provinceCode?: string;
  success: boolean;
  fieldErrors?: ValidationError[];
};