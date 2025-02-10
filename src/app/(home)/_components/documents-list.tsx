import { PaginationStatus } from "convex/react";
import { format } from "date-fns";
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  FilePenIcon,
  Grid3X3Icon,
  ListIcon,
  MoreVerticalIcon,
  TrashIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SiGoogledocs } from "react-icons/si";

import { RemoveDialog } from "@/components/dialog/remove-dialog";
import { RenameDialog } from "@/components/dialog/rename-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Document } from "@/lib/types";

interface Props {
  documents: Document[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export const DocumentsList = ({ documents, loadMore, status }: Props) => {
  const [listType, setListType] = useState<"grid" | "list">("grid");

  const router = useRouter();

  const handleNewTabClick = (id: string) => {
    window.open(`/documents/${id}`, "_blank");
  };

  if (!documents || !documents.length) {
    return (
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
        <div className="flex flex-row items-center justify-between">
          <h3 className="font-medium">Recent Documents</h3>
          {listType === "list" && (
            <h3 className="hidden md:block font-medium ml-auto mr-20">
              Created
            </h3>
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
        <div className="flex items-center justify-center py-10">
          <p className="text-neutral-500">No documents found!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between">
        <h3 className="font-medium">Recent Documents</h3>
        {listType === "list" && (
          <h3 className="hidden md:block font-medium ml-auto mr-20">Created</h3>
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
          {documents.map((document) => (
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full ml-auto"
                        >
                          <MoreVerticalIcon className="size-6" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleNewTabClick(document._id)}
                        >
                          <ExternalLinkIcon className="size-4 mr-1" />
                          Open in a new tab
                        </DropdownMenuItem>
                        <RenameDialog
                          documentId={document._id}
                          initialTitle={document.title}
                        >
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onSelect={(e) => e.preventDefault()}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FilePenIcon className="size-4 mr-1" />
                            Rename
                          </DropdownMenuItem>
                        </RenameDialog>
                        <RemoveDialog documentId={document._id}>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onSelect={(e) => e.preventDefault()}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <TrashIcon className="size-4 mr-1" />
                            Remove
                          </DropdownMenuItem>
                        </RemoveDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {documents.map((document) => (
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
              <p className="hidden md:block text-neutral-600 text-sm ml-auto mr-2">
                Created&nbsp;
                {format(new Date(document._creationTime), "MMM dd, yyyy")}
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVerticalIcon className="size-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => handleNewTabClick(document._id)}
                  >
                    <ExternalLinkIcon className="size-4 mr-1" />
                    Open in a new tab
                  </DropdownMenuItem>
                  <RenameDialog
                    documentId={document._id}
                    initialTitle={document.title}
                  >
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={(e) => e.preventDefault()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FilePenIcon className="size-4 mr-1" />
                      Rename
                    </DropdownMenuItem>
                  </RenameDialog>
                  <RemoveDialog documentId={document._id}>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={(e) => e.preventDefault()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <TrashIcon className="size-4 mr-1" />
                      Remove
                    </DropdownMenuItem>
                  </RemoveDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      )}
      {status === "CanLoadMore" && (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => loadMore(8)}
          >
            <ChevronDownIcon className="size-6" />
          </Button>
        </div>
      )}
    </div>
  );
};
