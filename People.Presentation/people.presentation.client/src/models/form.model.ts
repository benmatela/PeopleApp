/**
 * Reusable form field
 */
export interface IFormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  // Some fields don't need validation eg the age which is read only field
  validation?: Record<string, any>;
  defaultValue: any;
  disabled: boolean;
}