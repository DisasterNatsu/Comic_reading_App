import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";

import NavButtons from "@/components/chapterReading/NavButtons";
import { Axios } from "@/utils/AxiosConfig";
import DisqusComments from "@/components/shared/DisqusComments";

const getData = async (comicName: string, chapterImages: string) => {
  try {
    const chapterImg = await Axios.get(
      `/get-chapters/pages/${comicName}/${chapterImages}`
    );
    const req = await Axios.get(`/get-chapters/all/${comicName}`);
    const allChapters = req.data as chaptersResponse;

    const pages = (await chapterImg.data) as pageResponse;

    if (!pages) {
      return null;
    }

    return { pages, allChapters };
  } catch (error) {
    return null;
  }
};

const ChapterImages = async ({
  params,
}: {
  params: { comicName: string; chapterImages: string };
}) => {
  const response = await getData(params.comicName, params.chapterImages);

  if (!response) {
    notFound(); // Trigger the 404 page if there's an error
  }

  const { pages, allChapters } = response;

  const images = JSON.parse(pages.pages);

  const stringId = params.chapterImages.split("-");
  const intId = stringId[0];
  const name = stringId.slice(1, stringId.length - 1).join(" ");
  const configUrl = `http://localhost:3000/${params.comicName}/${params.chapterImages}`;

  return (
    <>
      <title>{`${pages.ComicTitle} - Chapter ${pages.ChapterNumber} - Disaster Scans`}</title>

      <div>
        <NavButtons
          top={true}
          chapter={pages}
          allChapters={allChapters}
          comicPartName={params.comicName}
        />

        <section className="container">
          {images.map((item: string, index: number) => {
            return (
              <div key={index} className="flex items-center justify-center">
                <Image
                  alt={`Page No. ${index + 1}`}
                  src={`https://f005.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=${item}`}
                  width={1200}
                  height={800}
                  className="w-full max-w-[1000px] object-contain"
                  loading="lazy"
                />
              </div>
            );
          })}
        </section>

        <NavButtons
          top={false}
          chapter={pages}
          allChapters={allChapters}
          comicPartName={params.comicName}
        />

        <div className="container mt-5 overflow-hidden flex flex-row gap-2 items-center justify-center">
          {/* Heading with divider */}

          <div
            role="none"
            aria-orientation="horizontal"
            className="shrink-0 bg-border h-[1px] w-full"
          />
          <span className="text-[8px] lg:text-[12px] text-neutral-400">
            COMMENTS
          </span>
          <div
            role="none"
            aria-orientation="horizontal"
            className="shrink-0 bg-border h-[1px] w-full"
          />
        </div>

        <section className="container mb-4">
          <DisqusComments id={intId} title={name} query={configUrl} />
        </section>
      </div>
    </>
  );
};

export default ChapterImages;
