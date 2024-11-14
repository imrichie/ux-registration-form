import React from "react";
import "./styles/PasswordField.css";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const PasswordField = ({
  value,
  onChange,
  onFocus,
  onBlur,
  showPassword,
  toggleVisibility,
  passwordCriteria,
  touched,
}) => (
  <div className="input-group full-width">
    <label htmlFor="password" className="input-label">
      Password
    </label>
    <div className="password-input-wrapper">
      <input
        id="password"
        type={showPassword ? "text" : "password"}
        className={`input-field ${
          touched && !passwordCriteria.isMinLength ? "error" : ""
        }`}
        placeholder="Enter a strong password"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <button
        type="button"
        className="visibility-toggle"
        onClick={toggleVisibility}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <MdOutlineVisibilityOff size={16} />
        ) : (
          <MdOutlineVisibility size={16} />
        )}
      </button>
    </div>
    <div className="validation-container">
      <div className="validation-column">
        <p
          className={`validation-item ${
            passwordCriteria.isMinLength ? "valid" : ""
          }`}
        >
          <FaCheckCircle /> 8 characters
        </p>
        <p
          className={`validation-item ${
            passwordCriteria.hasUppercase ? "valid" : ""
          }`}
        >
          <FaCheckCircle /> Uppercase letter
        </p>
      </div>
      <div className="validation-column">
        <p
          className={`validation-item ${
            passwordCriteria.hasLowercase ? "valid" : ""
          }`}
        >
          <FaCheckCircle /> Lowercase letter
        </p>
        <p
          className={`validation-item ${
            passwordCriteria.hasNumber ? "valid" : ""
          }`}
        >
          <FaCheckCircle /> Number
        </p>
      </div>
    </div>
  </div>
);

export default PasswordField;
