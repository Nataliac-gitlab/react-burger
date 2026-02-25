type TResponse = {
  success: boolean;
  message: string;
};

export type TAuthResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
};

export type GetOrderResponse = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export type GetOrderPayload = {
  ingredients: string[];
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ForgotPasswordResponse = TResponse;

export type ResetPasswordPayload = {
  password: string;
  token: string;
};

export type ResetPasswordResponse = TResponse;

export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
};

export type RegisterResponse = TAuthResponse;

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = TAuthResponse;

export type GetTokenPayload = {
  token: string;
};

export type GetTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type LogoutPayload = {
  token: string;
};

export type LogoutResponse = TResponse;

export type UserResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};

export type UpdateUserPayload = {
  email: string;
  password: string;
  name: string;
};
