import React, { useState, useEffect, useRef } from "react";

import "./assets/App.css";
import { isOnlyLetters, capitalizeFirstLetter } from "./utils/inputValidation";

function App() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e, nextFieldRef) => {
    if (e.key === "Enter" && nextFieldRef && nextFieldRef.current) {
      nextFieldRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Field-specific error messages
    if (!isOnlyLetters(value)) {
      const fieldName = name === "firstName" ? "First name" : "Last name";
      setErrors((prev) => ({
        ...prev,
        [name]: `${fieldName} can only contain letters`, // Field-specific message
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error if valid
    }

    // Update form state with the raw input
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    const formattedValue = capitalizeFirstLetter(value);
    setForm((prev) => ({ ...prev, [name]: formattedValue }));
  };

  return (
    <div className="app">
      <div className="form-container">
        <h1 className="form-header">Welcome! Let’s get you set up.</h1>
        <p className="form-subtitle">
          Just a few details to create your account.
        </p>

        {/* Row for First Name and Last Name */}
        <div className="input-row">
          <div className="input-group half-width">
            <label className="input-label" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className={`input-field ${errors.firstName ? "error" : ""}`}
              placeholder="John"
              value={form.firstName}
              ref={firstNameRef}
              onKeyDown={(e) => handleKeyDown(e, lastNameRef)}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.firstName && (
              <p className="error-message">{errors.firstName}</p>
            )}
          </div>
          <div className="input-group half-width">
            <label className="input-label" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className={`input-field ${errors.lastName ? "error" : ""}`}
              placeholder="Smith"
              value={form.lastName}
              ref={lastNameRef}
              onKeyDown={(e) => handleKeyDown(e, phoneRef)}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.lastName && (
              <p className="error-message">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Row for Phone Number */}
        <div className="input-group full-width">
          <label className="input-label" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            className="input-field"
            placeholder="(123) 555-6789"
            ref={phoneRef}
            onKeyDown={(e) => handleKeyDown(e, emailRef)}
          />
        </div>

        {/* Row for Email */}
        <div className="input-group full-width">
          <label className="input-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input-field"
            placeholder="john.smith@email.com"
            ref={emailRef}
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
          />
        </div>

        {/* Row for Password */}
        <div className="input-group full-width">
          <label className="input-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input-field"
            placeholder="••••••••"
            ref={passwordRef}
          />
        </div>

        {/* Sign Up Button */}
        <button className="cta-button" disabled>
          Sign Up
        </button>

        {/* Fine Print Text */}
        <p className="fine-print">
          We respect your privacy. By <strong>signing up</strong>, you agree to
          our <strong>Terms</strong> and <strong>Privacy Policy</strong>.
        </p>
      </div>
    </div>
  );
}

export default App;
