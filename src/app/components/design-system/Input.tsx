import { forwardRef, useState } from "react";
import { motion } from "motion/react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = "", ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full h-10 px-3 ${icon ? "pl-10" : ""}
              bg-input-background
              border rounded-md
              text-sm text-foreground placeholder:text-muted-foreground
              focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary
              transition-all duration-200
              ${error ? "border-destructive" : "border-border"}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-destructive mt-1"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
