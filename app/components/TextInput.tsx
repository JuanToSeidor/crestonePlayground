"use client";

import React, { useId } from "react";
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
      ...props
    },
    ref
  ) => {
    const fallbackId = useId();
    const inputId = id || fallbackId;
    const hasIcon = !!iconName;

    const baseClasses = [
      "block w-full rounded-lg bg-white dark:bg-neutral-800 border px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 transition-all duration-200 outline-none",
      variantStyles[variant] || variantStyles.default,
      hasIcon && iconPosition === "left" ? "pl-10" : "",
      hasIcon && iconPosition === "right" ? "pr-10" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`w-full ${className}`.trim()}>
        {(label || requiredMessage) && (
          <div className="mb-2 flex flex-wrap items-baseline gap-2">
            {label && (
              <label htmlFor={inputId} className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {label}
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
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              id={inputId}
              type={type}
              ref={ref as React.Ref<HTMLInputElement>}
              className={baseClasses}
              placeholder={placeholder}
              value={value}
              onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
              {...props}
            />
          )}

          {hasIcon && iconPosition === "right" && (
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-500 dark:text-neutral-400">
              <CaralIcon name={iconName} size="s" />
            </span>
          )}
        </div>

        {helperText && (
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
