import React, { useState } from "react";
import { z } from "zod";

// Field configuration types
export interface BaseFieldConfig {
  name: string;
  label: string;
  defaultValue?: any;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface TextFieldConfig extends BaseFieldConfig {
  type: "text" | "email" | "password" | "tel" | "url";
  minLength?: number;
  maxLength?: number;
}

export interface NumberFieldConfig extends BaseFieldConfig {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: "select";
  options: { value: string; label: string }[];
  multiple?: boolean;
}

export interface TextareaFieldConfig extends BaseFieldConfig {
  type: "textarea";
  rows?: number;
  minLength?: number;
  maxLength?: number;
}

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: "checkbox";
}

export interface RadioFieldConfig extends BaseFieldConfig {
  type: "radio";
  options: { value: string; label: string }[];
}

export type FieldConfig =
  | TextFieldConfig
  | NumberFieldConfig
  | SelectFieldConfig
  | TextareaFieldConfig
  | CheckboxFieldConfig
  | RadioFieldConfig;

// Form component props
export interface DynamicFormProps<T extends z.ZodSchema> {
  fields: FieldConfig[];
  schema: T;
  onSubmit: (data: z.infer<T>) => void;
  submitLabel?: string;
  resetLabel?: string;
  className?: string;
  fieldClassName?: string;
  submitClassName?: string;
  resetClassName?: string;
  showReset?: boolean;
  loading?: boolean;
}

// Field component props
interface FieldProps {
  config: FieldConfig;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  className?: string;
}

// Individual field component
const Field: React.FC<FieldProps> = ({
  config,
  value,
  onChange,
  error,
  className,
}) => {
  const baseInputClasses = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
    error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
  } ${config.disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`;

  const labelClasses = `block text-sm font-medium text-gray-700 mb-1 ${
    config.required ? "after:content-['*'] after:text-red-500 after:ml-1" : ""
  }`;

  switch (config.type) {
    case "text":
    case "email":
    case "password":
    case "tel":
    case "url":
    case "number":
      return (
        <div className={className}>
          <label htmlFor={config.name} className={labelClasses}>
            {config.label}
          </label>
          <input
            id={config.name}
            name={config.name}
            type={config.type}
            value={value || config?.defaultValue || ""}
            onChange={(e) =>
              onChange(
                config.type === "number"
                  ? Number(e.target.value)
                  : e.target.value
              )
            }
            placeholder={config.placeholder}
            disabled={config.disabled}
            className={`${baseInputClasses} ${config.className || ""}`}
            {...(config.type === "text" ||
            config.type === "email" ||
            config.type === "password" ||
            config.type === "tel" ||
            config.type === "url"
              ? {
                  minLength: (config as TextFieldConfig).minLength,
                  maxLength: (config as TextFieldConfig).maxLength,
                }
              : {})}
            {...(config.type === "number"
              ? {
                  min: (config as NumberFieldConfig).min,
                  max: (config as NumberFieldConfig).max,
                  step: (config as NumberFieldConfig).step,
                }
              : {})}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      );

    case "select": {
      const selectConfig = config as SelectFieldConfig;
      return (
        <div className={className}>
          <label htmlFor={config.name} className={labelClasses}>
            {config.label}
          </label>
          <select
            id={config.name}
            name={config.name}
            value={value || (selectConfig.multiple ? [] : "")}
            onChange={(e) => {
              if (selectConfig.multiple) {
                const selectedValues = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                onChange(selectedValues);
              } else {
                onChange(e.target.value);
              }
            }}
            multiple={selectConfig.multiple}
            disabled={config.disabled}
            className={`${baseInputClasses} ${config.className || ""}`}
          >
            {!selectConfig.multiple && (
              <option value="">Select an option</option>
            )}
            {selectConfig.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      );
    }

    case "textarea": {
      const textareaConfig = config as TextareaFieldConfig;
      return (
        <div className={className}>
          <label htmlFor={config.name} className={labelClasses}>
            {config.label}
          </label>
          <textarea
            id={config.name}
            name={config.name}
            value={value || config?.defaultValue || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={config.placeholder}
            disabled={config.disabled}
            rows={textareaConfig.rows || 3}
            minLength={textareaConfig.minLength}
            maxLength={textareaConfig.maxLength}
            className={`${baseInputClasses} resize-vertical ${
              config.className || ""
            }`}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      );
    }

    case "checkbox": {
      return (
        <div className={className}>
          <div className="flex items-center">
            <input
              id={config.name}
              name={config.name}
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
              disabled={config.disabled}
              className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                config.disabled ? "cursor-not-allowed" : "cursor-pointer"
              } ${config.className || ""}`}
            />
            <label
              htmlFor={config.name}
              className={`ml-2 ${labelClasses
                .replace("block", "inline")
                .replace("mb-1", "")}`}
            >
              {config.label}
            </label>
          </div>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      );
    }

    case "radio": {
      const radioConfig = config as RadioFieldConfig;
      return (
        <div className={className}>
          <fieldset>
            <legend className={labelClasses}>{config.label}</legend>
            <div className="space-y-2">
              {radioConfig.options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={`${config.name}-${option.value}`}
                    name={config.name}
                    type="radio"
                    value={option.value}
                    checked={value === option.value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={config.disabled}
                    className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 ${
                      config.disabled ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  />
                  <label
                    htmlFor={`${config.name}-${option.value}`}
                    className={`ml-2 text-sm text-gray-700 ${
                      config.disabled
                        ? "cursor-not-allowed text-gray-400"
                        : "cursor-pointer"
                    }`}
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      );
    }

    default:
      return null;
  }
};

// Main form component
export const DynamicForm = <T extends z.ZodSchema>({
  fields,
  schema,
  onSubmit,
  submitLabel = "Submit",
  resetLabel = "Reset",
  className = "",
  fieldClassName = "mb-4",
  submitClassName = "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  resetClassName = "bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ml-2",
  showReset = true,
  loading = false,
}: DynamicFormProps<T>) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = schema.parse(formData);
      setErrors({});
      onSubmit(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  const handleReset = () => {
    setFormData({});
    setErrors({});
  };

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      {fields.map((field) => (
        <Field
          key={field.name}
          config={field}
          value={formData[field.name]}
          onChange={(value) => handleFieldChange(field.name, value)}
          error={errors[field.name]}
          className={fieldClassName}
        />
      ))}

      <div className="flex justify-end">
        <button type="submit" disabled={loading} className={submitClassName} onClick={handleSubmit}>
          {loading ? "Submitting..." : submitLabel}
        </button>
        {showReset && (
          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className={resetClassName}
          >
            {resetLabel}
          </button>
        )}
      </div>
    </div>
  );
};

// Example usage component
// const ExampleForm = () => {
//   // Define Zod schema
//   const userSchema = z.object({
//     name: z
//       .string()
//       .min(1, "Name is required")
//       .min(2, "Name must be at least 2 characters"),
//     email: z.email("Invalid email address"),
//     age: z
//       .number()
//       .min(18, "Must be at least 18 years old")
//       .max(120, "Age must be realistic"),
//     country: z.string().min(1, "Please select a country"),
//     bio: z.string().min(10, "Bio must be at least 10 characters").optional(),
//     newsletter: z.boolean(),
//     experience: z.string().min(1, "Please select your experience level"),
//   });

//   // Define form fields
//   const fields: FieldConfig[] = [
//     {
//       type: "text",
//       name: "name",
//       label: "Full Name",
//       placeholder: "Enter your full name",
//       required: true,
//     },
//     {
//       type: "email",
//       name: "email",
//       label: "Email Address",
//       placeholder: "Enter your email",
//       required: true,
//     },
//     {
//       type: "number",
//       name: "age",
//       label: "Age",
//       placeholder: "Enter your age",
//       required: true,
//       min: 18,
//       max: 120,
//     },
//     {
//       type: "select",
//       name: "country",
//       label: "Country",
//       required: true,
//       options: [
//         { value: "us", label: "United States" },
//         { value: "ca", label: "Canada" },
//         { value: "uk", label: "United Kingdom" },
//         { value: "de", label: "Germany" },
//         { value: "fr", label: "France" },
//       ],
//     },
//     {
//       type: "textarea",
//       name: "bio",
//       label: "Bio",
//       placeholder: "Tell us about yourself",
//       rows: 4,
//     },
//     {
//       type: "checkbox",
//       name: "newsletter",
//       label: "Subscribe to newsletter",
//     },
//     {
//       type: "radio",
//       name: "experience",
//       label: "Experience Level",
//       required: true,
//       options: [
//         { value: "beginner", label: "Beginner" },
//         { value: "intermediate", label: "Intermediate" },
//         { value: "advanced", label: "Advanced" },
//       ],
//     },
//   ];

//   const handleSubmit = (data: z.infer<typeof userSchema>) => {
//     console.log("Form submitted:", data);
//     alert("Form submitted successfully! Check console for data.");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-2xl mx-auto px-4">
//         <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
//           Dynamic Form Example
//         </h1>
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <DynamicForm
//             fields={fields}
//             schema={userSchema}
//             onSubmit={handleSubmit}
//             submitLabel="Create Account"
//             className="w-full max-w-none"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

export default DynamicForm;
