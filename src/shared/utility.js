export const checkValidity = (value, rules) => {
  let isValid = false;

  if (!rules) {
    return true;
  }

  value = value.trim();

  if (rules.isRequired) {
    isValid = value !== '';
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  return isValid;
};