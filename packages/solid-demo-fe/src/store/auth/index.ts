import { createStore } from 'solid-js/store';

import { delay, medusaClient } from '../../utils';
import { AuthState, IModalState, ILogginPayload, ILogoutPayload, IRegisterPayload, ModalType } from './types';
import { Phase } from '../../types';
import { LocalStorageService } from '../../services';
import { AUTH_ALERT } from '../../constants';

const initialState: AuthState = {
  state: {
    type: null,
    status: null,
  },
  user: null,
  isLoading: false,
};

const [authState, setAuthState] = createStore(initialState);

const actions = {
  setModalState: (state: IModalState) => setAuthState('state', state),
  loggin: async (payload: ILogginPayload) => {
    const { persist, onLoginSuccess, ...rest } = payload;
    setAuthState('state', { ...authState.state, status: Phase.Loading });
    await delay(1000);
    try {
      const res = await medusaClient.auth.authenticate(rest);
      if (res.response.status === 200) {
        setAuthState('state', { ...authState.state, status: Phase.Success });
        setAuthState('user', res.customer);
        LocalStorageService.setPersist(payload.persist);
        onLoginSuccess();
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        setAuthState('state', { ...authState.state, status: Phase.Error, alert: AUTH_ALERT.INCORRECT_LOGIN_FORM });
        return;
      }

      throw new Error(error?.response?.data);
    }
  },
  refreshSection: async () => {
    try {
      setAuthState('isLoading', true);
      await delay(1000);
      const res = await medusaClient.auth.getSession();
      if (res.response.status === 200) {
        setAuthState('user', res.customer);
        setAuthState('isLoading', false);
      }
    } catch (error: any) {
      setAuthState('isLoading', false);
      throw new Error(error?.response?.data);
    }
  },
  logout: async (payload: ILogoutPayload) => {
    const { onLogoutSuccess } = payload;
    try {
      await delay(1000);
      const res = await medusaClient.auth.deleteSession();
      if (res.response.status === 200) {
        setAuthState('user', null);
        LocalStorageService.setPersist(false);
        onLogoutSuccess();
      }
    } catch (error: any) {
      throw new Error(error?.response?.data);
    }
  },
  register: async (payload: IRegisterPayload) => {
    const { onRegisterSuccess, ...rest } = payload;
    setAuthState('state', { ...authState.state, status: Phase.Loading });
    await delay(1000);
    try {
      const res = await medusaClient.customers.create(rest);
      if (res.response.status === 200) {
        setAuthState('state', { type: ModalType.Login, status: null });
        onRegisterSuccess();
      }
    } catch (error: any) {
      setAuthState('state', { ...authState.state, status: Phase.Error, alert: error?.response.data.message });
      throw new Error(error?.response?.data);
    }
  },
};

export const authStore = { authState, actions };
