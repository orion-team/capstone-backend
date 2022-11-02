declare namespace Express {
  interface Request {
    customerId?: {
      customerId: string;
      iat: number;
      exp: number;
    };
  }
}
