import React, { useState, useEffect, useRef } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import "./assets/App.css";
import {
  isOnlyLetters,
  capitalizeFirstLetter,
  formatPhoneNumber,
  isValidEmail,
} from "./utils/inputValidation";

function App() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    password: false,
    email: false,
    phone: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const toggleVisibility = () => setShowPassword(!showPassword);

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

    setForm((prev) => {
      // For phone numbers, apply formatting
      if (name === "phone") {
        const formattedPhone = formatPhoneNumber(value); // Format the phone number
        const digitsOnly = formattedPhone.replace(/\D/g, ""); // Extract digits
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "", // Clear error while typing
        }));
        return { ...prev, phone: formattedPhone };
      }

      // Validate email on input
      if (name === "email") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "", // Clear error while typing
        }));
        return { ...prev, email: value };
      }

      // Validate names (First Name, Last Name)
      if (name === "firstName" || name === "lastName") {
        if (!isOnlyLetters(value)) {
          const fieldName = name === "firstName" ? "First name" : "Last name";
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: `${fieldName} can only contain letters`,
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear errors
        }
        return { ...prev, [name]: value }; // Update form state
      }

      // Default update for other fields
      return { ...prev, [name]: value };
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    const formattedValue = capitalizeFirstLetter(value);
    setForm((prev) => ({ ...prev, [name]: formattedValue }));

    // Phone number validation
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, ""); // Extract digits
      setErrors((prev) => ({
        ...prev,
        phone: digitsOnly.length === 10 ? "" : "Phone number must be valid", // Show error only if invalid
      }));
    }

    // Email validation
    if (name === "email") {
      const isValid = isValidEmail(value); // Validate the email format
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: isValid ? "" : "Enter a valid email address", // Show error if invalid
      }));
    }
  };

  const passwordCriteria = {
    isMinLength: form.password.length >= 8,
    hasUppercase: /[A-Z]/.test(form.password),
    hasLowercase: /[a-z]/.test(form.password),
    hasNumber: /[0-9]/.test(form.password),
  };

  const isPasswordValid =
    passwordCriteria.isMinLength &&
    passwordCriteria.hasUppercase &&
    passwordCriteria.hasLowercase &&
    passwordCriteria.hasNumber;

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
            name="phone"
            type="tel"
            className={`input-field ${errors.phone ? "error" : ""}`}
            placeholder="(123) 555-5555"
            value={form.phone}
            ref={phoneRef}
            onKeyDown={(e) => handleKeyDown(e, emailRef)}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>

        {/* Row for Email */}
        <div className="input-group full-width">
          <label className="input-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`input-field ${errors.email ? "error" : ""}`}
            placeholder="john.smith@email.com"
            value={form.email}
            ref={emailRef}
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        {/* Row for Password */}
        <div className="input-group full-width">
          <label className="input-label" htmlFor="password">
            Password
          </label>
          <div className="password-input-wrapper">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className={`input-field ${
                touched.password && !isPasswordValid ? "error" : ""
              }`}
              placeholder="Enter a strong password"
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              onFocus={() =>
                setTouched((prev) => ({ ...prev, password: true }))
              }
              onBlur={(e) => {
                if (!e.target.value) {
                  setTouched((prev) => ({ ...prev, password: false }));
                }
              }}
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

          {/* Validation Feedback */}
          <div className="validation-container">
            <div className="validation-column">
              <p
                className={`validation-item ${
                  passwordCriteria.isMinLength ? "valid" : ""
                }`}
              >
                <FaCheckCircle />8 characters
              </p>
              <p
                className={`validation-item ${
                  passwordCriteria.hasUppercase ? "valid" : ""
                }`}
              >
                <FaCheckCircle />
                Uppercase letter
              </p>
            </div>
            <div className="validation-column">
              <p
                className={`validation-item ${
                  passwordCriteria.hasLowercase ? "valid" : ""
                }`}
              >
                <FaCheckCircle />
                Lowercase letter
              </p>
              <p
                className={`validation-item ${
                  passwordCriteria.hasNumber ? "valid" : ""
                }`}
              >
                <FaCheckCircle />
                Number
              </p>
            </div>
          </div>
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
