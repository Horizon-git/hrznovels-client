import { client } from "@/fetchClient";
import { LoginData, LoginResponse, RegisterData } from "@/types/AuthData";

export const register = ({ username, email, password }: RegisterData) => {
  return client.post("/auth/register", {
    email,
    username,
    password,
  });
};

export const login = ({ email, password }: LoginData) => {
  return client.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
};

export const refreshTokens = (token: string) => {
  return client.post<LoginResponse>(
    "/auth/refresh",
    { refreshToken: token }
  );
};
