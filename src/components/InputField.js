import React, { forwardRef } from "react";
import "./styles/InputField.css";
import { handleKeyDown } from "../utils/keydownUtils";

const InputField = forwardRef(
  (
    { id, name, type, placeholder, value, onKeyDown, onChange, onBlur, error },
    ref
  ) => (
    <div className="input-group">
      <label htmlFor={id} className="input-label">
        {name}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className={`input-field ${error ? "error" : ""}`}
        placeholder={placeholder}
        value={value}
        ref={ref}
        onKeyDown={(e) => (onKeyDown ? onKeyDown(e) : handleKeyDown(e, null))}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  )
);

export default InputField;
