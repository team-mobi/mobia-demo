import { NavigateOptions, useNavigate } from "react-router-dom";

export const useTypedNavigate = <
  T extends Record<string, { params?: object; segments?: object }>
>() => {
  const navigate = useNavigate();

  const toQueryString = (params: object): string => {
    return Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`
      )
      .join("&");
  };

  const typedNavigate = <K extends keyof T>(
    to: K,
    args?: {
      params?: T[K]["params"];
      segments?: T[K]["segments"];
    },
    options?: NavigateOptions
  ) => {
    let url = to as string;

    if (args && args.segments) {
      Object.entries(args.segments).forEach(([key, value]) => {
        url = url.replace(`:${key}`, encodeURIComponent(value));
      });
    }

    if (args && args.params) {
      const queryString = toQueryString(args.params);
      url = `${url}?${queryString}`;
    }

    navigate(url, options);
  };

  return typedNavigate;
};
