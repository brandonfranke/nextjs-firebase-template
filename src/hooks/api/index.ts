import { useQuery } from "@tanstack/react-query";

export const useGetRandomPeople = <T = any>() => {
  return useQuery<T, Error>({
    queryKey: ["randomPeople"],
    queryFn: () => {
      return fetch("https://fakerapi.it/api/v1/persons").then((response) =>
        response.json(),
      );
    },
  });
};
