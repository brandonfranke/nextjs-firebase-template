import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  Functions,
  httpsCallable,
  HttpsCallableOptions,
} from "firebase/functions";

export function useFunctionsQuery<
  RequestData = any,
  ResponseData = any,
  ModifiedData = ResponseData,
>(
  key: QueryKey,
  functions: Functions,
  trigger: string,
  data?: RequestData | null,
  options?: HttpsCallableOptions,
  useQueryOptions?: Omit<
    UseQueryOptions<ResponseData, Error, ModifiedData>,
    "queryFn"
  >,
): UseQueryResult<ModifiedData, Error> {
  return useQuery<ResponseData, Error, ModifiedData>({
    ...useQueryOptions,
    queryKey: useQueryOptions?.queryKey ?? key,
    queryFn: async () => {
      const response = await httpsCallable<RequestData, ResponseData>(
        functions,
        trigger,
        options,
      )(data);

      return response.data;
    },
  });
}

export function useFunctionsCall<RequestData = any, ResponseData = any>(
  functions: Functions,
  trigger: string,
  options?: HttpsCallableOptions,
  useMutationOptions?: UseMutationOptions<ResponseData, Error, RequestData>,
): UseMutationResult<ResponseData, Error, RequestData> {
  return useMutation<ResponseData, Error, RequestData>({
    mutationFn: async (data) => {
      const response = await httpsCallable<RequestData, ResponseData>(
        functions,
        trigger,
        options,
      )(data);

      return response.data;
    },
    ...useMutationOptions,
  });
}
