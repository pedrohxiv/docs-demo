import { useStatus } from "@liveblocks/react";
import { useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import { useRef, useState } from "react";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";

import { useDebounce } from "@/hooks/use-debounce";
import { api } from "@/lib/api";

interface Props {
  title: string;
  id: string;
}

export const DocumentInput = ({ title, id }: Props) => {
  const [value, setValue] = useState<string>(title);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const status = useStatus();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const rename = useMutation(api.documents.updateById);

  const debounceRename = useDebounce((newValue: string) => {
    if (newValue === value) {
      return;
    }

    setIsPending(true);

    rename({ id, title: newValue }).finally(() => setIsPending(false));
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setValue(newValue);

    debounceRename(newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);

    rename({ id, title: value })
      .then(() => setIsEditing(false))
      .finally(() => setIsPending(false));
  };

  const showLoader =
    isPending || status === "connecting" || status === "reconnecting";
  const showError = status === "disconnected";

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || " "}
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onBlur={() => setIsEditing(false)}
            className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          className="text-lg px-1.5 cursor-text truncate border border-transparent hover:border-neutral-500 rounded-md"
        >
          {title}
        </span>
      )}
      {showError && <BsCloudSlash className="size-4" />}
      {!showError && !showLoader && <BsCloudCheck className="size-4" />}
      {showLoader && <Loader2Icon className="size-4 animate-spin" />}
    </div>
  );
};
