export interface RegisterData {
  email: string;
  username: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: UserInfo;
  accessToken: string;
  refreshToken: string;
}

export interface UserInfo {
  id: number;
  email: string;
  username: string;
}

