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