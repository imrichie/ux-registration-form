import "./assets/App.css";

function App() {
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
