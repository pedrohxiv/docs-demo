import { CloudIcon, FolderInputIcon, StarIcon } from "lucide-react";

export const DocumentInput = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg px-1.5 cursor-text truncate border border-transparent hover:border-neutral-500 rounded-md">
        Untitled Document
      </span>
      <div className="flex">
        <StarIcon className="size-4 mx-2 cursor-pointer" />
        <FolderInputIcon className="size-4 mx-2 cursor-pointer" />
        <CloudIcon className="size-4 mx-2 cursor-pointer" />
      </div>
    </div>
  );
};
