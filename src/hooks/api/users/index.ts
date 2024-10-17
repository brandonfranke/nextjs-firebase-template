import { db } from "@/lib/firebase/client-app";
import { UserData } from "@/types/types";
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentData,
  useFirestoreDocumentMutation,
} from "@/hooks/firebase/firestore";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { doc } from "firebase/firestore";
import { DeepPartial } from "react-hook-form";

export const useGetUserData = (user: User | undefined | null) => {
  return useFirestoreDocumentData<UserData>(
    {
      queryKey: ["userData", user?.uid],
      enabled: !!user,
      staleTime: 1000 * 60 * 5,
    },
    user ? doc(db, "users", user.uid) : undefined,
  );
};

export const useUpdateUserData = () => {
  const queryClient = useQueryClient();
  const mutation = useFirestoreDocumentMutation<DeepPartial<UserData>>({
    mutationKey: ["updateUserData"],
    onSuccess: (_, variables) =>
      queryClient.setQueryData(
        ["userData", variables.documentReference.id],
        (prev: UserData) => ({
          ...prev,
          ...variables.data,
        }),
      ),
  });
  return {
    ...mutation,
    mutateAsync: (UserId: string, data: DeepPartial<UserData>) =>
      mutation.mutateAsync({
        documentReference: doc(db, "users", UserId),
        data,
      }),
    mutate: (UserId: string, data: DeepPartial<UserData>) =>
      mutation.mutate({ documentReference: doc(db, "users", UserId), data }),
  };
};

export const useCreateUserData = () => {
  const queryClient = useQueryClient();
  const mutation = useFirestoreCollectionMutation<DeepPartial<UserData>>({
    mutationKey: ["updateUserData"],
    onSuccess: (_, variables) =>
      queryClient.setQueryData(
        ["userData", variables.reference.id],
        (prev: UserData) => ({
          ...prev,
          ...variables.data,
        }),
      ),
  });
  return {
    ...mutation,
    mutateAsync: (UserId: string, data: DeepPartial<UserData>) =>
      mutation.mutateAsync({
        reference: doc(db, "users", UserId),
        data,
      }),
    mutate: (UserId: string, data: DeepPartial<UserData>) =>
      mutation.mutate({ reference: doc(db, "users", UserId), data }),
  };
};
