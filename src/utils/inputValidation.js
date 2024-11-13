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
