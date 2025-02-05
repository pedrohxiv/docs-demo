"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const templates = [
  { id: "blank", label: "Blank Document", imageUrl: "/blank-document.svg" },
  { id: "resume", label: "Resume", imageUrl: "/resume.svg" },
  { id: "letter", label: "Letter", imageUrl: "/letter.svg" },
  { id: "cover-letter", label: "Cover Letter", imageUrl: "/cover-letter.svg" },
  {
    id: "business-letter",
    label: "Business Letter",
    imageUrl: "/business-letter.svg",
  },
  {
    id: "project-proposal",
    label: "Project Proposal",
    imageUrl: "/project-proposal.svg",
  },
  {
    id: "software-proposal",
    label: "Software Development Proposal",
    imageUrl: "/software-proposal.svg",
  },
];

export const TemplatesGallery = () => {
  const isCreating = false;

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
                    onClick={() => {}}
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
