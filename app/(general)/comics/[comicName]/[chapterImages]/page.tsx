import React from "react";
import { notFound } from "next/navigation";

import NavButtons from "@/components/chapterReading/NavButtons";
import { Axios } from "@/utils/AxiosConfig";
import Image from "next/image";

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

        <section className="container flex items-center justify-center my-3">
          Comment Section
        </section>
      </div>
    </>
  );
};

export default ChapterImages;
