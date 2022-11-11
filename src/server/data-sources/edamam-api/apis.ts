import { API_URL } from "./constants";
import { fetchEdamam } from "./fetchEdamam";

export const search = async (q: string) => {
  const params = new URLSearchParams({ q });
  return fetchEdamam(API_URL, params);
};
