import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo (1).svg";

import { useState } from "react";
import { registerUser } from "../../utils/api";

export default function Register() {
  const { values, errors, isValid, handleChange } = useFormWithValidation();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  function getNavLinkClass({ isActive }: { isActive: boolean }) {
    return isActive ? "form__nav-link form__nav-link_active" : "form__nav-link";
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await registerUser(values.name, values.email, values.password);

      navigate("/login");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Registration failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="form-page">
      <img src={logo} alt="MeshAI Logo" className="form-page__logo" />
      <form className="form" noValidate onSubmit={handleSubmit}>
        <nav className="form__nav">
          <NavLink to="/login" className={getNavLinkClass}>
            Login
          </NavLink>
          <NavLink to="/register" className={getNavLinkClass}>
            Register
          </NavLink>
        </nav>
        <h1 className="form__title">Register</h1>
        <div className="form__input-container">
          <label className="form__label">
            Name
            <input
              className="form__input"
              name="name"
              type="text"
              required
              minLength={2}
              maxLength={40}
              value={values.name ?? ""}
              onChange={handleChange}
            />
          </label>
          {errors.name && <p className="form__error">{errors.name}</p>}
        </div>
        <div className="form__input-container">
          <label className="form__label">
            Email
            <input
              className="form__input"
              name="email"
              type="email"
              required
              value={values.email ?? ""}
              onChange={handleChange}
            />
          </label>
          {errors.email && <p className="form__error">{errors.email}</p>}
        </div>
        <div className="form__input-container">
          <label className="form__label">
            Password
            <input
              className="form__input"
              name="password"
              type="password"
              required
              minLength={8}
              value={values.password ?? ""}
              onChange={handleChange}
            />
          </label>
          {errors.password && <p className="form__error">{errors.password}</p>}
        </div>
        <p className="form__status" role="status">
          {submitError}
        </p>
        <button
          className="form__submit"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
