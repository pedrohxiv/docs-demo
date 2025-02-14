import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { api } from "@/lib/api";
import { templates } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const TemplatesGallery = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const create = useMutation(api.documents.create);

  const router = useRouter();

  const handleTemplateClick = (title: string, initialContent: string) => {
    setIsCreating(true);

    create({ title, initialContent })
      .then((documentId) => router.push(`/documents/${documentId}`))
      .finally(() => setIsCreating(false));
  };

  return (
    <div className="bg-[#f1f3f4]">
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
        <h3 className="font-medium">Start a new Document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
              >
                <div
                  className={cn("aspect-[3/4] flex flex-col gap-y-2.5", {
                    "pointer-events-none opacity-50": isCreating,
                  })}
                >
                  <button
                    disabled={isCreating}
                    onClick={() =>
                      handleTemplateClick(
                        template.label,
                        template.initialContent
                      )
                    }
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                  />
                  <p className="text-sm font-medium truncate">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
