import React, { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import AuthLayout from "./AuthLayout";
import Field from "./Field";
import { brand } from "../../brand";

// Login page.
// handleLogin(email, password) comes from App.jsx and returns
//   { ok: true }  or  { ok: false, message: "..." }
// so this page can show the error inline instead of using alert().
// onSwitch -> go to the Sign Up page,  onBack -> go to the homepage
const Login = ({ handleLogin, onSwitch, onBack }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault(); // stop the page from refreshing
    setError("");
    setLoading(true);

    // A short delay so the spinner is visible, like a real server call.
    setTimeout(() => {
      const result = handleLogin(email.trim(), password);
      if (!result.ok) {
        setError(result.message);
        setLoading(false);
      }
      // if login worked, App.jsx switches to the dashboard on its own
    }, 600);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue to your workspace."
      onBack={onBack}
    >
      <form onSubmit={submitHandler} className="flex flex-col gap-5">
        {error && (
          <div className="flex items-start gap-2.5 bg-status-failed/10 border border-status-failed/25 text-status-failed rounded-md px-3.5 py-3 text-sm">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        <Field
          id="login-email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          autoComplete="email"
          required
        />

        <Field
          id="login-password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        <button
          disabled={loading}
          className="mt-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-md transition-colors"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Logging in...
            </>
          ) : (
            "Log in"
          )}
        </button>
      </form>

      <p className="text-sm text-muted text-center mt-8">
        New to {brand.name}?{" "}
        <button onClick={onSwitch} className="font-semibold text-accent hover:underline">
          Create an account
        </button>
      </p>
    </AuthLayout>
  );
};

export default Login;
