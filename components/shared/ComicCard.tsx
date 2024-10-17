import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ComicCard = ({
  ComicTitle,
  CoverImage,
  comicId,
}: {
  ComicTitle: string;
  CoverImage: string;
  comicId: string;
}) => {
  const redirectLink =
    "/comics/" +
    comicId +
    "-" +
    ComicTitle.split(" ").join("-").toLocaleLowerCase();

  return (
    <Link href={redirectLink} className="relative hover:scale-105 duration-200">
      <AspectRatio ratio={72 / 97}>
        <Image
          src={`https://f005.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=${CoverImage}`}
          width={172.5}
          height={237}
          className="w-full h-full object-fit rounded-lg"
          alt="cover"
        />
      </AspectRatio>

      <div className="flex flex-col items-center my-2">
        <h5 className="text-foreground font-semibold text-xxs lg:text-sm m-0 p-0 line-clamp-1 text-center">
          {ComicTitle}
        </h5>
      </div>
      {/* <p className="text-center mt-3 md:text-base text-xs font-semibold mx-auto">
        
      </p> */}
    </Link>
  );
};

export default ComicCard;
