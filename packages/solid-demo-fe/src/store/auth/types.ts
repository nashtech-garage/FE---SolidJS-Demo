import { IUser, Phase } from '../../types';

export enum AuthAction {
  OpenModal,
}

export enum ModalType {
  Login = 'LOGIN',
  Register = 'REGISTER',
}

export interface IModalState {
  type: ModalType | null;
  status: Phase | null;
  alert?: string | null;
}

export interface AuthState {
  state: IModalState;
  user: IUser | null;
  isLoading: boolean;
}

export interface ILogginPayload {
  email: string;
  password: string;
  persist: boolean;
  onLoginSuccess: () => void;
}

export interface ILogoutPayload {
  onLogoutSuccess: () => void;
}

export interface IRegisterPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  onRegisterSuccess: () => void;
}
