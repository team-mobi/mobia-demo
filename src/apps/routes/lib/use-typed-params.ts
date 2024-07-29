import { useParams } from "react-router-dom";

type PathWithPattern<T> = T extends `${string}/:${string}` ? T : never;

const useTypedParams = <
  T extends Record<string, { params?: object; segments?: object }>
>(
  path: PathWithPattern<keyof T>
) => {
  const params = useParams();
  type ParamsType = T[typeof path]["segments"];
  return params as ParamsType;
};
export default useTypedParams;
