/**
 * Validates whether the input contains only letters.
 * @param {string} value - The input value to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export const isOnlyLetters = (value) => /^[a-zA-Z]*$/.test(value);

/**
 * Formats the input by capitalizing the first letter and converting the rest to lowercase.
 * @param {string} value - The input value to format.
 * @returns {string} - The formatted value.
 */
export const capitalizeFirstLetter = (value) => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

/**
 * Formats a phone number in the format: (555) 555-5555
 * @param {string} value - The input value to format.
 * @returns {string} - The formatted phone number.
 */
export const formatPhoneNumber = (value) => {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, "");

  // Limit to 10 digits
  const limited = cleaned.slice(0, 10);

  // Match the phone number structure
  const match = limited.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!match) return limited;

  const [, areaCode, prefix, lineNumber] = match;

  if (lineNumber) {
    return `(${areaCode}) ${prefix}-${lineNumber}`;
  } else if (prefix) {
    return `(${areaCode}) ${prefix}`;
  } else if (areaCode) {
    return `(${areaCode}`;
  }

  return limited; // Fallback to raw limited digits
};

/**
 * Validates whether an input value is a valid email address.
 * @param {string} value - The email address to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export const isValidEmail = (value) => {
  // Matches standard email patterns like user@domain.com
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(value);
};
