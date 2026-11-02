import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// One labelled input used by both the Login and Sign Up forms.
// - If type="password", a show/hide eye button is added automatically.
// - If `error` is given, the border turns red and the message shows below.
// - Any other props (value, onChange, placeholder, id...) go to the <input>.
const Field = ({ label, error, type = "text", rightLabel, id, ...inputProps }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label htmlFor={id} className="text-xs font-medium text-ink">
          {label}
        </label>
        {rightLabel}
      </div>

      <div className="relative">
        <input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          className={`w-full bg-surface border rounded-md px-3.5 py-2.5 text-sm outline-none placeholder:text-muted/70 transition-colors ${
            error
              ? "border-status-failed focus:border-status-failed"
              : "border-border focus:border-accent focus:ring-2 focus:ring-accent/15"
          } ${isPassword ? "pr-10" : ""}`}
          {...inputProps}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </div>

      {error && <p className="text-xs text-status-failed mt-1.5">{error}</p>}
    </div>
  );
};

export default Field;
