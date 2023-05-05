const SNACKBAR_MESSAGE: Readonly<Record<string, [string, 'success' | 'warning' | 'error', string | undefined]>> = {
  LOGIN_SUCCESS: ['Login successfully!', 'success', undefined],
  LOGOUT_SUCCESS: ['Logout successfully!', 'success', undefined],
  REGISTER_SUCCESS: ['Register successfully!', 'success', undefined],
};

export { SNACKBAR_MESSAGE };
