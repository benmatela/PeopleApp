/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Reusable form field
 */
export interface IFormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  validation?: Record<string, any>;
}

export interface ICreatePersonFormData {
  firstName: string;
  lastName: string;
}
