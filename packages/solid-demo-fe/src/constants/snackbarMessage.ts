const SNACKBAR_MESSAGE: Readonly<Record<string, [string, 'success' | 'warning' | 'error', string | undefined]>> = {
  LOGIN_SUCCESS: ['Login successfully!', 'success', undefined],
  LOGOUT_SUCCESS: ['Logout successfully!', 'success', undefined],
  REGISTER_SUCCESS: ['Register successfully!', 'success', undefined],
  PLACE_ORDER_SUCCESS: ['Place order successfully!', 'success', undefined],
  PLACE_ORDER_FAIL: ['Place order failure!', 'error', undefined],
};

export { SNACKBAR_MESSAGE };
