import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { loginUser } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/Logo (1).svg";

export default function Login() {
  const { values, errors, isValid, handleChange } = useFormWithValidation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
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
      const res = await loginUser(values.email, values.password);

      if (res.data) {
        login(res.data.token, res.data.user);
        navigate(location.state?.from ?? "/knowledge", { replace: true });
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Login failed");
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
        <h1 className="form__title">Login</h1>
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
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
