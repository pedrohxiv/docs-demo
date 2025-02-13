import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { redirect } from "next/navigation";

import { api } from "@/lib/api";

import { Document } from "./_components/document";

interface Props {
  params: Promise<{ documentId: string }>;
}

const DocumentPage = async ({ params }: Props) => {
  const { documentId } = await params;

  const { getToken } = await auth();

  const token = (await getToken({ template: "convex" })) ?? undefined;

  if (!token) {
    return redirect("/");
  }

  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    { id: documentId },
    { token }
  );

  return <Document preloadedDocument={preloadedDocument} />;
};

export default DocumentPage;
