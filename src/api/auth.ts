import { api, setAuthToken } from "./client";

export type User = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string; 
};

export type TokenResponse = {
  access_token: string;
  token_type: string; 
};

const TOKEN_KEY = "auth_token";

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  setAuthToken(token);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  setAuthToken(undefined);
};

export const initializeAuth = () => {
  const t = getToken();
  if (t) setAuthToken(t);
};

type RegisterBody = {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export async function register(data: RegisterBody): Promise<User> {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
}

type LoginBody = { username: string; password: string };

export async function login(creds: LoginBody): Promise<TokenResponse> {
  const form = new URLSearchParams();
  form.append("username", creds.username);
  form.append("password", creds.password);
  form.append("grant_type", "password");
  form.append("scope", "");
  form.append("client_id", "");
  form.append("client_secret", "");

  const res = await api.post<TokenResponse>("/auth/login", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  saveToken(res.data.access_token);
  return res.data;
}

export async function me(): Promise<User> {
  const res = await api.get<User>("/auth/me");
  return res.data;
}

export function logout() {
  clearToken();
}
