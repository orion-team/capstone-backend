const protectedRoutes = ["/api/auth/user", "/api/favorite"];

export const routes = {
  protected: new Set(protectedRoutes),
};
