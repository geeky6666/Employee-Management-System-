import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import AuthLayout from "./AuthLayout";
import Field from "./Field";

// Works out how strong a password is, from 0 (empty) to 4 (strong).
// One point each for: 8+ characters, an uppercase letter, a number, a symbol.
const getPasswordStrength = (password) => {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.max(score, 1); // anything typed counts as at least "Weak"
};

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColors = [
  "",
  "bg-status-failed",
  "bg-status-active",
  "bg-status-new",
  "bg-status-completed",
];

// Sign Up page.
// signUp(details) comes from App.jsx and returns { ok, message }.
// On success App.jsx logs the new employee in automatically.
// onSwitch -> go to the Login page,  onBack -> go to the homepage
const SignUp = ({ signUp, onSwitch, onBack }) => {
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    designation: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Updates one field and clears that field's error while the user fixes it.
  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "", form: "" }));
  };

  // Checks every field and returns an object of error messages.
  const validate = () => {
    const found = {};
    if (form.firstName.trim().length < 2) found.firstName = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) found.email = "Enter a valid email address.";
    if (form.designation.trim().length < 2) found.designation = "Enter your job title.";
    if (form.password.length < 8) found.password = "Use at least 8 characters.";
    if (form.confirm !== form.password) found.confirm = "Passwords do not match.";
    return found;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const found = validate();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = signUp({
        firstName: form.firstName.trim(),
        email: form.email.trim(),
        designation: form.designation.trim(),
        password: form.password,
      });

      if (!result.ok) {
        setErrors({ email: result.message }); // e.g. "email already registered"
        setLoading(false);
      }
    }, 700);
  };

  const strength = getPasswordStrength(form.password);

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Set up your workspace profile in under a minute."
      onBack={onBack}
    >
      <form onSubmit={submitHandler} className="flex flex-col gap-4" noValidate>
        <Field
          id="su-name"
          label="Full name"
          value={form.firstName}
          onChange={update("firstName")}
          error={errors.firstName}
          placeholder="Meera Shah"
          autoComplete="name"
        />

        <Field
          id="su-email"
          label="Work email"
          type="email"
          value={form.email}
          onChange={update("email")}
          error={errors.email}
          placeholder="you@company.com"
          autoComplete="email"
        />

        <Field
          id="su-role"
          label="Job title"
          value={form.designation}
          onChange={update("designation")}
          error={errors.designation}
          placeholder="UI Designer"
        />

        <div>
          <Field
            id="su-password"
            label="Password"
            type="password"
            value={form.password}
            onChange={update("password")}
            error={errors.password}
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />

          {/* strength meter: 4 small bars that fill in as the password gets stronger */}
          {form.password && (
            <div className="mt-2.5">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      level <= strength ? strengthColors[strength] : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted mt-1.5">
                Password strength: <span className="font-medium text-ink">{strengthLabels[strength]}</span>
              </p>
            </div>
          )}
        </div>

        <Field
          id="su-confirm"
          label="Confirm password"
          type="password"
          value={form.confirm}
          onChange={update("confirm")}
          error={errors.confirm}
          placeholder="Re-enter your password"
          autoComplete="new-password"
        />

        <button
          disabled={loading}
          className="mt-2 flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-md transition-colors"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Creating account...
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>

      <p className="text-sm text-muted text-center mt-8">
        Already have an account?{" "}
        <button onClick={onSwitch} className="font-semibold text-accent hover:underline">
          Log in
        </button>
      </p>
    </AuthLayout>
  );
};

export default SignUp;
