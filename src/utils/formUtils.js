// src/utils/formUtils.js

/**
 * Initializes form state with default values.
 * @param {Object} fields - Key-value pairs of form fields and their default values.
 * @returns {Object} - Initial state object.
 */
export const initializeFormState = (fields) => {
  const state = {};
  Object.keys(fields).forEach((key) => {
    state[key] = fields[key];
  });
  return state;
};

/**
 * Initializes error state for form fields.
 * @param {Object} fields - Form field names as keys.
 * @returns {Object} - Initial error state object.
 */
export const initializeErrorState = (fields) => {
  const state = {};
  Object.keys(fields).forEach((key) => {
    state[key] = "";
  });
  return state;
};

/**
 * Initializes touched state for form fields.
 * @param {Object} fields - Form field names as keys.
 * @returns {Object} - Initial touched state object.
 */
export const initializeTouchedState = (fields) => {
  const state = {};
  Object.keys(fields).forEach((key) => {
    state[key] = false;
  });
  return state;
};

/**
 * Resets the entire form state (values, errors, and touched).
 * @param {Object} setForm - State setter for form values.
 * @param {Object} setErrors - State setter for form errors.
 * @param {Object} setTouched - State setter for form touched state.
 * @param {Object} initialValues - Initial values for the form fields.
 */
export const resetFormState = (
  setForm,
  setErrors,
  setTouched,
  initialValues
) => {
  setForm(initializeFormState(initialValues));
  setErrors(initializeErrorState(initialValues));
  setTouched(initializeTouchedState(initialValues));
};
