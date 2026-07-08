"use client";

import React, { useId, useState } from "react";
import { CaralIcon, Icons } from "iconcaral2";

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  helperText?: string;
  requiredMessage?: string;
  iconName?: Icons;
  iconPosition?: "left" | "right";
  multiline?: boolean;
  rows?: number;
  variant?: "default" | "info" | "success" | "warning" | "danger" | "light";
  className?: string;
  showPasswordStrength?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const variantStyles = {
  default: "border-neutral-300 focus:border-seidor-main focus:ring-seidor-main/20",
  info: "border-info-main focus:border-info-main focus:ring-info-main/20 shadow-[0_0_0_7px_rgba(var(--color-info-light-rgb),0.12)]",
  success: "border-success-main focus:border-success-main focus:ring-success-main/20 shadow-[0_0_0_7px_rgba(var(--color-success-light-rgb),0.12)]",
  warning: "border-warning-main focus:border-warning-main focus:ring-warning-main/20 shadow-[0_0_0_7px_rgba(var(--color-warning-light-rgb),0.12)]",
  danger: "border-danger-main focus:border-danger-main focus:ring-danger-main/20 shadow-[0_0_0_7px_rgba(var(--color-danger-light-rgb),0.30)]",
  light: "border-neutral-300 focus:border-seidor-main focus:ring-seidor-main/20",
};

const getPasswordStrength = (pass: string) => {
  if (!pass) {
    return {
      score: 0,
      label: "Weak",
      colorClass: "text-neutral-400 dark:text-neutral-500",
      segments: [
        "bg-neutral-300",
        "bg-neutral-300",
        "bg-neutral-300",
        "bg-neutral-300"
      ]
    };
  }

  const hasNumber = /[0-9]/.test(pass);
  const hasUppercase = /[A-Z]/.test(pass);
  const hasLowercase = /[a-z]/.test(pass);
  const hasSpecial = /[^A-Za-z0-9]/.test(pass);

  let score = 1;

  if (pass.length >= 6) {
    if (hasNumber || hasUppercase) {
      score = 2;
    }
    if (hasNumber && hasUppercase && pass.length >= 8) {
      score = 3;
      if (pass.length >= 10 && (hasLowercase || hasSpecial)) {
        score = 4;
      }
    }
  }

  let label = "Weak";
  let colorClass = "text-danger-main";
  let segments = ["bg-neutral-300", "bg-neutral-300", "bg-neutral-300", "bg-neutral-300"];

  if (score === 1) {
    label = "Weak";
    colorClass = "text-danger-main";
    segments = [
      "bg-danger-main",
      "bg-neutral-300",
      "bg-neutral-300",
      "bg-neutral-300"
    ];
  } else if (score === 2) {
    label = "Medium";
    colorClass = "text-warning-main";
    segments = [
      "bg-warning-main",
      "bg-warning-main",
      "bg-neutral-300",
      "bg-neutral-300"
    ];
  } else if (score === 3) {
    label = "Strong";
    colorClass = "text-info-main";
    segments = [
      "bg-info-main",
      "bg-info-main",
      "bg-info-main",
      "bg-neutral-300"
    ];
  } else if (score === 4) {
    label = "Very Strong";
    colorClass = "text-success-main";
    segments = [
      "bg-success-main",
      "bg-success-main",
      "bg-success-main",
      "bg-success-main"
    ];
  }

  return { score, label, colorClass, segments };
};

export const TextInput = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, TextInputProps>(
  (
    {
      label,
      helperText,
      requiredMessage,
      iconName,
      iconPosition = "left",
      multiline = false,
      rows = 4,
      variant = "default",
      className = "",
      id,
      placeholder,
      value,
      onChange,
      type = "text",
      required,
      showPasswordStrength = false,
      ...props
    },
    ref
  ) => {
    const fallbackId = useId();
    const inputId = id || fallbackId;
    const hasIcon = !!iconName;
    const isPasswordType = type === "password";
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const resolvedType = isPasswordType ? (isPasswordVisible ? "text" : "password") : type;

    const resolvedVariant = requiredMessage ? "danger" : variant;

    const baseClasses = [
      "block w-full rounded-lg bg-white dark:bg-neutral-800 border px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 transition-all duration-200 outline-none",
      variantStyles[resolvedVariant] || variantStyles.default,
      hasIcon && iconPosition === "left" ? "pl-10" : "",
      (hasIcon && iconPosition === "right") || isPasswordType ? "pr-10" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const passwordValue = typeof value === "string" ? value : String(value || "");
    const strength = getPasswordStrength(passwordValue);

    return (
      <div className={`w-full ${className}`.trim()}>
        {(label || requiredMessage) && (
          <div className="mb-2 flex flex-wrap items-baseline gap-2">
            {label && (
              <label htmlFor={inputId} className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {label}
                {required && <span className="text-danger-main ml-1">*</span>}
              </label>
            )}
            {requiredMessage && (
              <span className="text-xs font-semibold text-danger-main">
                {requiredMessage}
              </span>
            )}
          </div>
        )}

        <div className="relative">
          {hasIcon && iconPosition === "left" && (
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-500 dark:text-neutral-400">
              <CaralIcon name={iconName} size="s" />
            </span>
          )}

          {multiline ? (
            <textarea
              id={inputId}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className={baseClasses}
              rows={rows}
              placeholder={placeholder}
              value={value}
              onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
              required={required}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              id={inputId}
              type={resolvedType}
              ref={ref as React.Ref<HTMLInputElement>}
              className={baseClasses}
              placeholder={placeholder}
              value={value}
              onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
              required={required}
              {...props}
            />
          )}

          {isPasswordType ? (
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute inset-y-0 right-3 flex items-center text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-250 cursor-pointer focus:outline-none"
            >
              <CaralIcon name={isPasswordVisible ? "eyeSlash" : "eye"} size="s" />
            </button>
          ) : (
            hasIcon && iconPosition === "right" && (
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-500 dark:text-neutral-400">
                <CaralIcon name={iconName} size="s" />
              </span>
            )
          )}
        </div>

        {helperText && (
          <p className="mt-2 text-sm text-neutral-800 dark:text-neutral-400">
            {helperText}
          </p>
        )}

        {showPasswordStrength && passwordValue.length > 0 && (
          <div className="mt-3 flex items-center justify-between gap-4">
            <div className="flex-1 grid grid-cols-4 gap-2">
              {strength.segments.map((bgClass, idx) => (
                <div
                  key={idx}
                  className={`h-[4px] rounded-full transition-all duration-300 ${bgClass}`}
                />
              ))}
            </div>
            <span className={`text-xs font-bold transition-colors duration-300 leading-none ${strength.colorClass}`}>
              {strength.label}
            </span>
          </div>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
