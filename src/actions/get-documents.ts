"use server";

import { ConvexHttpClient } from "convex/browser";

import { api } from "@/lib/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const getDocuments = async (ids: string[]) => {
  const documents = await convex.query(api.documents.getByIds, { ids });

  return documents;
};
