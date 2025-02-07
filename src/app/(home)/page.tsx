"use client";

import { usePaginatedQuery } from "convex/react";

import { api } from "@/lib/api";

import { DocumentsTable } from "./_components/documents-table";
import { Navbar } from "./_components/navbar";
import { TemplatesGallery } from "./_components/templates-gallery";

const RootPage = () => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    {},
    { initialNumItems: 5 }
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
};

export default RootPage;
