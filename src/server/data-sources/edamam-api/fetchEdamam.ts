import fetch, { RequestInit } from "node-fetch";

const { EDAMAM_APP_ID: app_id, EDAMAM_APP_KEY: app_key } = process.env;

export const fetchEdamam = (
  urlNoQueryParams: string,
  queryParams?: URLSearchParams,
  options?: RequestInit
) => {
  const query = queryParams ?? new URLSearchParams();
  query.set("type", "public");
  query.set("app_id", app_id);
  query.set("app_key", app_key);

  const url = `${urlNoQueryParams}?${queryParams.toString()}`;
  return fetch(url, options);
};
