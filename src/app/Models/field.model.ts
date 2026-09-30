export interface DynamicField {

  id: string;

  label: string;

  type:
    | 'text'
    | 'email'
    | 'number'
    | 'textarea'
    | 'checkbox'
    | 'radio'
    | 'dropdown'
    | 'date';

  required: boolean;

  placeholder?: string;

  defaultValue?: any;

  minLength?: number;

  maxLength?: number;

  min?: number;

  max?: number;

  options?: string[];

}