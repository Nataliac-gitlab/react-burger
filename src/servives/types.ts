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

export type ForgotPasswordResponse = {
  success: boolean;
  message: string;
};

export type ResetPasswordPayload = {
  password: string;
  token: string;
};

export type ResetPasswordResponse = {
  success: boolean;
  message: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
};

export type RegisterResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
//Register
export type LoginResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
};

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

export type LogoutResponse = {
  success: boolean;
  message: string;
};

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
