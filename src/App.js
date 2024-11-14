/* COMPONENTS IMPORTS */
import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import InputField from "./components/InputField";
import PasswordField from "./components/PasswordField";
import SignUpButton from "./components/SignUpButton";
import FinePrint from "./components/FinePrint";
import ConfirmationModal from "./components/ConfirmationModal";
import Row from "./components/Row";

/* STYLES IMPORTS */
import "./styles/App.css";
import "./styles/FormContainer.css";

/* UTILS IMPORTS */
import {
  isOnlyLetters,
  capitalizeFirstLetter,
  formatPhoneNumber,
  isValidEmail,
} from "./utils/inputValidation";

import {
  initializeFormState,
  initializeErrorState,
  initializeTouchedState,
  resetFormState,
} from "./utils/formUtils";

import { handleKeyDown } from "./utils/keydownUtils";

/* INITIAL FORM STATE */
const initialFormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
};

/* APP COMPONENT */
function App() {
  /* REFS */
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  /* STATE */
  const [form, setForm] = useState(initializeFormState(initialFormState));
  const [errors, setErrors] = useState(initializeErrorState(initialFormState));
  const [touched, setTouched] = useState(
    initializeTouchedState(initialFormState)
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  /* HANDLERS */
  const toggleVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      if (name === "phone") {
        const formattedPhone = formatPhoneNumber(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "",
        }));
        return { ...prev, phone: formattedPhone };
      }

      if (name === "email") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
        return { ...prev, email: value };
      }

      if (name === "firstName" || name === "lastName") {
        const trimmedValue = value.replace(/\s/g, "");
        if (!isOnlyLetters(trimmedValue)) {
          const fieldName = name === "firstName" ? "First name" : "Last name";
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: `${fieldName} can only contain letters`,
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        }
        return { ...prev, [name]: trimmedValue };
      }

      return { ...prev, [name]: value };
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone:
          value && digitsOnly.length !== 10 ? "Phone number must be valid" : "",
      }));
    }

    if (name === "email") {
      const isValid = isValidEmail(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: value && !isValid ? "Enter a valid email address" : "",
      }));
    }

    if (name === "firstName" || name === "lastName") {
      const formattedValue = capitalizeFirstLetter(value);
      setForm((prev) => ({ ...prev, [name]: formattedValue }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (allFieldsValid) {
      setModalOpen(true);
      resetFormState(setForm, setErrors, setTouched, initialFormState);
    }
  };

  const closeModal = () => setModalOpen(false);

  /* COMPUTED VALUES */
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

  const allFieldsValid =
    form.firstName &&
    form.lastName &&
    isValidEmail(form.email) &&
    form.phone.replace(/\D/g, "").length === 10 &&
    isPasswordValid &&
    !Object.values(errors).some((error) => error);

  /* EFFECTS */
  useEffect(() => {
    if (firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, []);

  /* RENDER */
  return (
    <div className="app">
      <form className="form-container" onSubmit={handleSubmit}>
        <Header />
        <Row isSplit>
          <InputField
            id="firstName"
            name="First Name"
            type="text"
            placeholder="John"
            value={form.firstName}
            ref={firstNameRef}
            onKeyDown={(e) => handleKeyDown(e, lastNameRef)}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.firstName}
          />

          <InputField
            id="lastName"
            name="Last Name"
            type="text"
            placeholder="Smith"
            value={form.lastName}
            ref={lastNameRef}
            onKeyDown={(e) => handleKeyDown(e, phoneRef)}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.lastName}
          />
        </Row>

        <Row>
          <InputField
            id="phone"
            name="Phone Number"
            type="tel"
            placeholder="(123) 555-5555"
            value={form.phone}
            ref={phoneRef}
            onKeyDown={(e) => handleKeyDown(e, emailRef)}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.phone}
          />
        </Row>
        <Row>
          <InputField
            id="email"
            name="Email"
            type="email"
            placeholder="john.smith@email.com"
            value={form.email}
            ref={emailRef}
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.email}
          />
        </Row>
        <Row>
          <PasswordField
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            onFocus={() => setTouched((prev) => ({ ...prev, password: true }))}
            onBlur={(e) => {
              if (!e.target.value) {
                setTouched((prev) => ({ ...prev, password: false }));
              }
            }}
            showPassword={showPassword}
            toggleVisibility={toggleVisibility}
            passwordCriteria={passwordCriteria}
            touched={touched.password}
          />
        </Row>

        <Row>
          <SignUpButton disabled={!allFieldsValid} />
        </Row>
        <FinePrint />
      </form>
      <ConfirmationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;
