export const formValidators = {
  required: (value: string) => (value.length === 0 ? { error: 'This field is required.' } : null),
  email: (value: string) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : { error: 'Invalid email address.' }),
};
