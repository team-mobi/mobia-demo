import { useSearchParams } from "react-router-dom";

type PathWithoutPattern<T> = T extends `${string}/:${string}` ? never : T;
type ExtractParams<T> = {
  [K in keyof T]: T[K] extends { params: infer P } ? P : never;
};

const useTypedSearchParams = <
  T extends Record<string, { params?: object; segments?: object }>
>(
  path: PathWithoutPattern<keyof T>
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  type ParamsType = ExtractParams<T>[typeof path];

  const getParams = (): ParamsType => {
    const params: {
      [k: string]: string | undefined;
    } = {};
    for (const key of searchParams.keys()) {
      params[key] = searchParams.get(key) || undefined;
    }
    return params as ParamsType;
  };

  const typedSetSearchParams = (newParams: Partial<ParamsType>) => {
    const updatedParams = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(newParams)) {
      if (!value) {
        updatedParams.delete(key);
      } else {
        updatedParams.set(key, value as string);
      }
    }

    setSearchParams(updatedParams);
  };

  return [getParams(), typedSetSearchParams] satisfies [
    ParamsType,
    typeof typedSetSearchParams
  ];
};

export default useTypedSearchParams;
