import { Account, Client, Databases } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID!;
export const HABITS_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_HABITS_COLLECTION_ID!;
export const HABITS_COMPLETIONS_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_COMPLETIONS_COLLECTION_ID!;
