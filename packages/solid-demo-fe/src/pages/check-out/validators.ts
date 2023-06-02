export const FormValidators = {
  required: (value: string) => (value.length === 0 ? { error: 'This field is required.' } : null),
  email: (value: string) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : { error: 'Invalid email address.' }),
  phone: (value: string) => (/^[0-9]+$/.test(value) ? null : { error: 'Invalid phone number.' }),
};
