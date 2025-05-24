export const VALIDATION_RULES = {
  name: {
    required: "Name is required",
    minLength: {
      value: 2,
      message: "Name must have at least 2 characters",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  },
} as const;
