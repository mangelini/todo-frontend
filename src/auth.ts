interface AuthProvider {
  isAuthenticated: boolean;
  username: null | string;
  signin(username: string): Promise<void>;
  signup(username: string): Promise<boolean>;
  signout(): Promise<void>;
}

export const authProvider: AuthProvider = {
  isAuthenticated: false,
  username: null,
  async signin(username: string) {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    authProvider.isAuthenticated = true;
    authProvider.username = username;
  },
  async signup(username: string) {
    return true;
  },
  async signout() {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    authProvider.isAuthenticated = false;
    authProvider.username = "";
  },
};
