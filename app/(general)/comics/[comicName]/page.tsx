import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import Chapters from "@/components/chapterArchive/Chapters";
import { Axios } from "@/utils/AxiosConfig";
import { formatComicName } from "@/components/helpers/TitleCasing";
import DisqusComments from "@/components/shared/DisqusComments";

const getData = async (param: string): Promise<DataResponse | null> => {
  try {
    const req = await Axios.get(`/get-chapters/all/${param}`);
    const allChapters = req.data as chaptersResponse;

    return { allChapters };
  } catch (error) {
    return null;
  }
};

const ComicChapters = async ({ params }: { params: { comicName: string } }) => {
  const response = await getData(params.comicName);

  if (!response) {
    notFound(); // Trigger the 404 page if there's an error
  }

  const { allChapters } = response;
  const genres = JSON.parse(allChapters.comicDetails.Genres);
  const nameTitle = formatComicName(params.comicName);

  console.log(allChapters.comicDetails.ComicTitle);

  // Id Data for Disqus

  const stringId = params.comicName.split("-");
  const intId = stringId[0];
  const name = stringId.splice(1, stringId.length - 1).join(" ");
  const configUrl = `http://localhost:3000/${params.comicName}`;

  return (
    <>
      <title>{`${allChapters.comicDetails.ComicTitle} - Disaster Scans`}</title>
      <div className="relative">
        {/* Background Image  */}
        <div className="w-full h-full absolute overflow-hidden z-10">
          <div className="will-change-transform sm:-translate-y-[28rem] -translate-y-[15rem] scale-100">
            <Image
              loading="lazy"
              src={`https://f005.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=${allChapters.comicDetails.CoverImage}`}
              alt="Cover"
              className="w-full h-auto blur"
              width={300}
              height={300}
            />
          </div>
        </div>

        {/* Background height div */}
        <div className="h-[280px] z-10 absolute lg:relative bg-custom-gradient" />

        {/* Section for Desc and Comic */}
        <section className="bg-background lg:z-10 relative shadow-md">
          <div className="grid grid-cols-12 pt-3 gap-y-3 gap-x-3 container px-5 text-foreground">
            {/* Large Left Col */}
            <div className="col-span-12 h-full self-end bg-background lg:col-span-9 rounded p-4 order-2 lg:order-1 z-10 flex flex-col gap-3">
              <div className="flex flex-col gap-2 items-center lg:items-start">
                {/* Comic Title */}
                <div className="flex flex-row gap-3 items-center flex-wrap">
                  <h1 className="text-xl md:text-3xl text-foreground font-bold text-center lg:text-left inline">
                    {allChapters.comicDetails.ComicTitle}
                  </h1>
                </div>

                {/* Span (Origin Language Name) */}
                <span className="text-muted-foreground text-base">
                  (武炼巅峰)
                </span>
              </div>

              {/* Status and Genre (Need to make it dynamic) */}
              <div className="flex flex-row flex-wrap gap-2">
                {/* Status */}

                {allChapters.comicDetails.Status === "Ongoing" && (
                  <span className="bg-[#E1F0DA] dark:bg-[#212d1c] text-[#99BC85] text-[10px] font-bold text-foreground-100 px-2 py-1 rounded uppercase">
                    Ongoing
                  </span>
                )}

                {/* Genres */}

                {genres.length > 0 &&
                  genres.map((genre: string, index: number) => (
                    <span
                      key={index}
                      className="bg-[#FFC5C5] dark:bg-[#5b2e30] text-[#ff8080] text-[10px] font-bold text-foreground-100 px-2 py-1 rounded uppercase"
                    >
                      {genre}
                    </span>
                  ))}
              </div>

              {/* Description */}
              <div className="text-muted-foreground">
                {allChapters.comicDetails.Description}
              </div>

              <div
                aria-orientation="horizontal"
                role="none"
                className="shrink-0 bg-border h-[1px] w-full"
              />

              <Chapters
                chapters={allChapters.chapters}
                param={params.comicName}
              />
            </div>

            {/* Right Side Image */}
            <div className="col-span-12 lg:col-span-3 relative flex justify-center w-full order-1 lg:order-2 lg:min-h-[750px]">
              <div className="z-10 lg:absolute flex flex-col items-center justify-center gap-y-2 w-full lg:-translate-y-[130px]">
                <div className="p-1 bg-background rounded overflow-hidden">
                  <Image
                    loading="lazy"
                    src={`https://f005.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=${allChapters.comicDetails.CoverImage}`}
                    alt="Cover"
                    width={316}
                    height={230}
                    decoding="async"
                    className="aspect-[72/97] w-auto object-fill rounded-lg"
                  />
                </div>

                {/* Details */}

                <div className="space-y-2 rounded p-5 bg-muted/10 w-full">
                  <div className="flex justify-between w-full">
                    <span className="text-muted-foreground">Origin</span>
                    <span className="text-muted-foreground">
                      {allChapters.comicDetails.Origin}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Author</span>
                    <span className="text-muted-foreground line-clamp-1">
                      {allChapters.comicDetails.Author}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Artist</span>
                    <span className="text-muted-foreground line-clamp-1">
                      {allChapters.comicDetails.Artist}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Total Chapters
                    </span>
                    <span className="text-muted-foreground line-clamp-1">
                      {allChapters.chapters.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container h-1 border-t dark:border-t-neutral-400 my-8" />

          <div className="container mb-4">
            <DisqusComments id={intId} title={name} query={configUrl} />
          </div>
        </section>
      </div>
    </>
  );
};

export const revalidate = 50000;

export default ComicChapters;
