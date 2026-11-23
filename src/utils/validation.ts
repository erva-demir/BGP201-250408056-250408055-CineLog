/**
 * CineLog – Form Doğrulama Fonksiyonları
 * LoginScreen ve RegisterScreen bu fonksiyonları kullanır.
 * Her fonksiyon { isValid, error } döndürür; geçerliyse error boş string olur.
 */

export interface ValidationResult {
  isValid: boolean;
  error: string;
}

export const MIN_PASSWORD_LENGTH = 6;
export const MIN_NAME_LENGTH = 2;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const valid = (): ValidationResult => ({ isValid: true, error: '' });
const invalid = (error: string): ValidationResult => ({ isValid: false, error });

/** Boş alan kontrolü */
export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (value.trim().length === 0) {
    return invalid(`${fieldName} alanı boş bırakılamaz.`);
  }
  return valid();
};

/** Ad Soyad kontrolü (boş olmamalı, en az 2 karakter) */
export const validateDisplayName = (name: string): ValidationResult => {
  const required = validateRequired(name, 'Ad Soyad');
  if (!required.isValid) return required;

  if (name.trim().length < MIN_NAME_LENGTH) {
    return invalid(`Ad Soyad en az ${MIN_NAME_LENGTH} karakter olmalıdır.`);
  }
  return valid();
};

/** E-posta formatı kontrolü */
export const validateEmail = (email: string): ValidationResult => {
  const required = validateRequired(email, 'E-posta');
  if (!required.isValid) return required;

  if (!EMAIL_REGEX.test(email.trim())) {
    return invalid('Geçerli bir e-posta adresi giriniz. (ör. ad@mail.com)');
  }
  return valid();
};

/** Şifre uzunluğu kontrolü (en az 6 karakter) */
export const validatePassword = (password: string): ValidationResult => {
  const required = validateRequired(password, 'Şifre');
  if (!required.isValid) return required;

  if (password.length < MIN_PASSWORD_LENGTH) {
    return invalid(`Şifre en az ${MIN_PASSWORD_LENGTH} karakter olmalıdır.`);
  }
  return valid();
};

/** Şifre tekrarı kontrolü (iki şifre aynı olmalı) */
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
): ValidationResult => {
  const required = validateRequired(confirmPassword, 'Şifre tekrarı');
  if (!required.isValid) return required;

  if (password !== confirmPassword) {
    return invalid('Şifreler birbiriyle eşleşmiyor.');
  }
  return valid();
};