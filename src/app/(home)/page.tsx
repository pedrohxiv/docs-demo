"use client";

import { usePaginatedQuery } from "convex/react";

import { useSearchParam } from "@/hooks/use-search-param";
import { api } from "@/lib/api";

import { DocumentsList } from "./_components/documents-list";
import { Navbar } from "./_components/navbar";
import { TemplatesGallery } from "./_components/templates-gallery";

const RootPage = () => {
  const [search] = useSearchParam();

  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    { search },
    { initialNumItems: 8 }
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        <DocumentsList
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
};

export default RootPage;
