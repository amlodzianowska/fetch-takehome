import type { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  error?: string;
  registration: UseFormRegisterReturn;
  placeholder?: string;
  autoComplete?: string;
}

export function FormField({
  id,
  label,
  type = "text",
  error,
  registration,
  placeholder,
  autoComplete,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete || id}
        className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
          error ? "border-red-300" : "border-gray-300"
        } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
        {...registration}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
