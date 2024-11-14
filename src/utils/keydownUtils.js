// src/utils/keydownUtils.js

/**
 * Handles Enter keydown to move focus to the next input field.
 * @param {KeyboardEvent} e - The keydown event.
 * @param {React.RefObject} nextFieldRef - The ref of the next input field.
 */
export const handleKeyDown = (e, nextFieldRef) => {
  if (e.key === "Enter" && nextFieldRef?.current) {
    nextFieldRef.current.focus();
  }
};
