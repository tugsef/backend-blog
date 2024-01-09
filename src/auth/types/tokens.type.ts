export type Tokens = {
  user: {
    id: number;
    email: string;
    name: string;
  };
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
};
