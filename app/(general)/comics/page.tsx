import React from "react";
import { Axios } from "@/utils/AxiosConfig";
import Link from "next/link";
import Image from "next/image";

const getData = async () => {
  const allComicsReq = await Axios.get("/get-comics/all");

  const allComics = (await allComicsReq.data) as AllComicResType[];

  return { allComics };
};

const Comics = async () => {
  const { allComics } = await getData();

  return (
    <>
      <title>Comics - Disaster Scans</title>
      <div className="container px-5 pt-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-base">All Comics</h1>
          {/* Search Box */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {allComics.map((comic: AllComicResType, index: number) => {
              const genres = JSON.parse(comic.Genres);

              const link =
                "/comics/" +
                comic.id +
                "-" +
                comic.ComicTitle.toLocaleLowerCase().split(" ").join("-");

              return (
                <Link href={link} key={index}>
                  <div className="bg-background p-4 rounded flex flex-row gap-3">
                    <div className="rounded flex-none overflow-hidden h-full min-h-[146px] lg:min-h-[180px] w-[100px] lg:w-[120px] relative">
                      <div className="block h-full w-full">
                        <div className="absolute inset-0">
                          <Image
                            src={`https://f005.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=${comic.CoverImage}`}
                            alt={`Cover Image ${comic.ComicTitle}`}
                            width={158}
                            height={115}
                            loading="lazy"
                            className="aspect-[72/97] w-full h-full object-fit rounded-lg"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h1 className="text-foreground font-bold text-lg line-clamp-1">
                        {comic.ComicTitle}
                      </h1>
                      <span className="text-muted-foreground text-sm line-clamp-1">
                        {genres.join(", ")}
                      </span>

                      <div className="flex flex-row gap-2 items-center">
                        {comic.Status === "Ongoing" ? (
                          <span className="bg-[#E1F0DA] dark:bg-[#212d1c] text-[#99BC85] text-[10px] font-bold text-foreground-100 px-2 py-1 rounded uppercase">
                            {comic.Status}
                          </span>
                        ) : (
                          <span className="bg-[#FFC5C5] dark:bg-[#5b2e30] text-[#ff8080] text-[10px] font-bold text-foreground-100 px-2 py-1 rounded uppercase">
                            {comic.Status}
                          </span>
                        )}
                      </div>

                      <div className="line-clamp-3 text-secondary-foreground text-sm">
                        <p>{comic.Description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comics;
