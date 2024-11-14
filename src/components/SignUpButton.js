// SignUpButton.js
import React from "react";
import "./styles/SignUpButton.css";

const SignUpButton = ({ disabled }) => (
  <button
    className={`cta-button ${!disabled ? "enabled" : ""}`}
    disabled={disabled}
    type="submit"
  >
    Sign Up
  </button>
);

export default SignUpButton;
