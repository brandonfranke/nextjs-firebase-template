import {
  addDoc,
  deleteDoc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  FirestoreError,
  getDoc,
  getDocs,
  Query,
  QuerySnapshot,
  runTransaction,
  Transaction,
  WithFieldValue,
  WriteBatch,
  QueryDocumentSnapshot,
  SnapshotOptions,
  serverTimestamp,
  setDoc,
  SetOptions,
  CollectionReference,
} from "firebase/firestore";
import {
  skipToken,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

type FirestoreOperation = "create" | "update";

type DocumentMetadata = {
  createdOn: Date;
  modifiedOn: Date;
  _id: string;
};

//Here you can include any fields you want to automatically add to your documents
//You can also automatically convert firestore data to usable js objects (such as converting firestore timestamps to js dates)
const createTypeConverter = <T>(operation?: FirestoreOperation) => {
  return {
    toFirestore: (value: T) => {
      const timestamp = serverTimestamp();
      return {
        ...value,
        ...(operation === "create" && { createdOn: timestamp }),
        modifiedOn: timestamp,
      } as any;
    },
    fromFirestore: (
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions,
    ) => {
      const data = snapshot.data(options);
      return {
        ...data,
        _id: snapshot.id,
        createdOn: data.createdOn.toDate(),
        modifiedOn: data.modifiedOn.toDate(),
      } as any;
    },
  };
};

export function useFirestoreDocument<T = DocumentData>(
  useQueryOptions: Omit<
    UseQueryOptions<DocumentSnapshot<T & DocumentMetadata>, FirestoreError>,
    "queryFn"
  >,
  ref?: DocumentReference,
) {
  return useQuery<DocumentSnapshot<T & DocumentMetadata>, FirestoreError>({
    ...useQueryOptions,
    queryFn: ref
      ? () => getDoc(ref.withConverter(createTypeConverter<T>()))
      : skipToken,
  });
}

export function useFirestoreDocumentData<T = DocumentData>(
  useQueryOptions: Omit<
    UseQueryOptions<T & DocumentMetadata, FirestoreError>,
    "queryFn"
  >,
  ref?: DocumentReference,
) {
  return useQuery<T & DocumentMetadata, FirestoreError>({
    ...useQueryOptions,
    queryFn: ref
      ? async () =>
          (await getDoc(ref.withConverter(createTypeConverter<T>()))).data()
      : skipToken,
  });
}

export function useFirestoreQuery<T = DocumentData>(
  useQueryOptions: Omit<
    UseQueryOptions<QuerySnapshot<T & DocumentMetadata>, FirestoreError>,
    "queryFn"
  >,
  ref?: Query,
) {
  return useQuery<QuerySnapshot<T & DocumentMetadata>, FirestoreError>({
    ...useQueryOptions,
    queryFn: ref
      ? () => getDocs(ref.withConverter(createTypeConverter<T>()))
      : skipToken,
  });
}

export function useFirestoreQueryData<T = DocumentData>(
  useQueryOptions: Omit<
    UseQueryOptions<(T & DocumentMetadata)[] | undefined, FirestoreError>,
    "queryFn"
  >,
  ref?: Query,
) {
  return useQuery<(T & DocumentMetadata)[] | undefined, FirestoreError>({
    ...useQueryOptions,
    queryFn: ref
      ? async () =>
          (await getDocs(ref.withConverter(createTypeConverter<T>()))).docs.map(
            (doc) => doc.data(),
          )
      : skipToken,
  });
}

export function useFirestoreCollectionMutation<T = DocumentData>(
  useMutationOptions?: Omit<
    UseMutationOptions<
      void | DocumentReference,
      FirestoreError,
      {
        /** Pass a Document Reference if you'd like to create a document with a specific id. */
        reference: DocumentReference | CollectionReference;
        data: WithFieldValue<T>;
      }
    >,
    "mutationFn"
  >,
) {
  return useMutation({
    ...useMutationOptions,
    mutationFn: ({ reference, data }) =>
      reference instanceof DocumentReference
        ? setDoc(
            reference.withConverter(createTypeConverter<T>("create")),
            data,
          )
        : addDoc(
            reference.withConverter(createTypeConverter<T>("create")),
            data,
          ),
  });
}

export function useFirestoreDocumentMutation<T = DocumentData>(
  useMutationOptions?: Omit<
    UseMutationOptions<
      void,
      FirestoreError,
      {
        documentReference: DocumentReference;
        data: WithFieldValue<T>;
        setOptions?: SetOptions;
      }
    >,
    "mutationFn"
  >,
) {
  return useMutation({
    ...useMutationOptions,
    mutationFn: ({ documentReference, data, setOptions = { merge: true } }) =>
      setOptions
        ? setDoc(
            documentReference.withConverter(createTypeConverter<T>("update")),
            data,
            setOptions,
          )
        : setDoc(
            documentReference.withConverter(createTypeConverter<T>("update")),
            data,
          ),
  });
}

export function useFirestoreDocumentDeletion(
  useMutationOptions?: Omit<
    UseMutationOptions<void, FirestoreError, DocumentReference>,
    "mutationFn"
  >,
) {
  return useMutation<void, FirestoreError, DocumentReference>({
    ...useMutationOptions,
    mutationFn: (documentReference) => deleteDoc(documentReference),
  });
}

export function useFirestoreTransaction<T = void>(
  firestore: Firestore,
  updateFunction: (tsx: Transaction) => Promise<T>,
  useMutationOptions?: Omit<
    UseMutationOptions<T, FirestoreError, void>,
    "mutationFn"
  >,
) {
  return useMutation<T, FirestoreError, void>({
    ...useMutationOptions,
    mutationFn: () => runTransaction<T>(firestore, updateFunction),
  });
}

export function useFirestoreWriteBatch(
  batch: WriteBatch,
  useMutationOptions?: Omit<
    UseMutationOptions<void, FirestoreError, void>,
    "mutationFn"
  >,
) {
  return useMutation<void, FirestoreError, void>({
    ...useMutationOptions,
    mutationFn: () => batch.commit(),
  });
}
