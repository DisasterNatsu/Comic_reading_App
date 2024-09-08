import Image from "next/image";
import Link from "next/link";
import React from "react";

const LatestCard = ({ item }: { item: LatestData }) => {
  // link to comic

  const comicLink =
    "/comics/" +
    item.comicID +
    "-" +
    item.ComicTitle.split(" ").join("-").toLowerCase();

  const chapterLink1 =
    comicLink +
    "/" +
    item.chapters[0].chapterID +
    "-chapter-" +
    item.chapters[0].ChapterNumber;
  const chapterLink2 =
    comicLink +
    "/" +
    item.chapters[1].chapterID +
    "-chapter-" +
    item.chapters[1].ChapterNumber;

  return (
    <div>
      <div className="grid grid-cols-2 dark:bg-slate-800 bg-slate-200 rounded-lg">
        <Link href={comicLink}>
          <Image
            src={`https://f005.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=${item.CoverImage}`}
            width={120}
            height={50}
            className="aspect-[72/97] object-cover object-center w-80 h-auto rounded-sm hover:scale-105 duration-150"
            alt="cover"
          />
        </Link>
        <div className="w-full h-full flex flex-col items-center justify-center space-y-3 px-3 relative">
          {/* Link to the comic */}

          <Link
            href={comicLink}
            className="px-3 text-center text-sm absolute top-8 dark:hover:text-yellow-500 hover:text-orange-500"
          >
            {item.ComicTitle}
          </Link>
          <Link
            href={chapterLink1}
            className="px-3 md:text-[0.55em] lg:text-sm lg:px-5 py-1 border rounded-full dark:border-slate-400 border-slate-900 font-semibold dark:hover:bg-slate-600 hover:bg-slate-400 cursor-pointer w-full text-center"
          >
            Chapter {item.chapters[0].ChapterNumber}
          </Link>
          <Link
            href={chapterLink2}
            className="px-3 md:text-[0.55em] lg:text-sm lg:px-5 py-1 border rounded-full dark:border-slate-400 border-slate-900 font-semibold dark:hover:bg-slate-600 hover:bg-slate-400 cursor-pointer w-full text-center"
          >
            Chapter {item.chapters[1].ChapterNumber}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestCard;
