import "./assets/App.css";
import React, { useEffect, useRef } from "react";

function App() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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
              type="text"
              className="input-field"
              placeholder="John"
              ref={firstNameRef}
              onKeyDown={(e) => handleKeyDown(e, lastNameRef)}
            />
          </div>
          <div className="input-group half-width">
            <label className="input-label" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              className="input-field"
              placeholder="Smith"
              ref={lastNameRef}
              onKeyDown={(e) => handleKeyDown(e, phoneRef)}
            />
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
