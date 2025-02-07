import { PaginationStatus } from "convex/react";
import { format } from "date-fns";
import { Grid3X3Icon, ListIcon, MoreVerticalIcon } from "lucide-react";
import { useState } from "react";
import { SiGoogledocs } from "react-icons/si";

import { Button } from "@/components/ui/button";
import { Document } from "@/lib/types";
import { useRouter } from "next/navigation";

interface Props {
  documents: Document[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export const DocumentsTable = ({ documents, loadMore, status }: Props) => {
  const [listType, setListType] = useState<"grid" | "list">("grid");

  const router = useRouter();

  return (
    <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between">
        <h3 className="font-medium">Recent Documents</h3>
        {listType === "list" && (
          <h3 className="hidden md:block font-medium">Belong</h3>
        )}
        {listType === "list" && (
          <h3 className="hidden md:block font-medium">Created</h3>
        )}
        {listType === "grid" ? (
          <ListIcon
            onClick={() => setListType("list")}
            className="size-6 text-neutral-600 cursor-pointer"
          />
        ) : (
          <Grid3X3Icon
            onClick={() => setListType("grid")}
            className="size-6 text-neutral-600 cursor-pointer"
          />
        )}
      </div>
      {listType === "grid" ? (
        <div className="grid grid-cols-4 gap-6">
          {documents?.map((document) => (
            <div
              key={document._id}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
            >
              <div
                onClick={() => router.push(`/documents/${document._id}`)}
                className="bg-[#fafbfd] relative aspect-[3/4] flex flex-col gap-y-2.5 border hover:border-blue-500 rounded-sm cursor-pointer"
              >
                <div className="absolute bg-white border-t bottom-0 left-0 right-0 h-24 p-4 flex flex-col gap-2">
                  <p className="text-base font-medium truncate">
                    {document.title}
                  </p>
                  <div className="flex flex-row w-full items-center justify-center">
                    <SiGoogledocs className="size-6 fill-blue-500 mr-2" />
                    <p className="text-neutral-600">
                      Created&nbsp;
                      {format(new Date(document._creationTime), "MMM dd, yyyy")}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full ml-auto"
                    >
                      <MoreVerticalIcon className="size-6" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {documents?.map((document) => (
            <div
              key={document._id}
              onClick={() => router.push(`/documents/${document._id}`)}
              className="flex flex-row items-center justify-between bg-white border rounded-md p-4 cursor-pointer hover:bg-blue-200/40 transition"
            >
              <div className="flex flex-row items-center gap-6">
                <SiGoogledocs className="size-6 fill-blue-500" />
                <p className="text-base font-medium truncate">
                  {document.title}
                </p>
              </div>
              <p className="hidden md:block text-neutral-600 text-sm">
                Personal
              </p>
              <p className="hidden md:block text-neutral-600 text-sm">
                Created&nbsp;
                {format(new Date(document._creationTime), "MMM dd, yyyy")}
              </p>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVerticalIcon className="size-6" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
