import React from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaHome } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";

const NavButtons = ({
  top,
  chapter,
  allChapters,
  comicPartName,
}: {
  top: boolean;
  chapter: pageResponse;
  allChapters: chaptersResponse;
  comicPartName: string;
}) => {
  const currentIndex = allChapters.chapters.findIndex(
    (x) => x.chapterID == chapter.chapterID
  );

  const ReturnPrevNavLink = () => {
    if (currentIndex === allChapters.chapters.length - 1) {
      return `/comics/${comicPartName}`;
    }

    const prevChapterId = allChapters.chapters[currentIndex + 1].chapterID;
    const prevChapterNumber =
      allChapters.chapters[currentIndex + 1].ChapterNumber;

    const link = `/comics/${comicPartName}/${prevChapterId}-chapter-${prevChapterNumber}`; // Next chapter's link

    return link;
  };

  const ReturnNextNavLink = () => {
    if (currentIndex === 0) {
      return `/comics/${comicPartName}`;
    }

    const prevChapterId = allChapters.chapters[currentIndex - 1].chapterID;
    const prevChapterNumber =
      allChapters.chapters[currentIndex - 1].ChapterNumber;

    const link = `/comics/${comicPartName}/${prevChapterId}-chapter-${prevChapterNumber}`; // Next chapter's link

    return link;
  };

  const prevLink = ReturnPrevNavLink();
  const nextLink = ReturnNextNavLink();

  return (
    <div className="container my-2">
      <section className="w-full flex items-center justify-between">
        {/* Prev Button */}

        <Link
          href={prevLink}
          className={`border-2 p-2 dark:border-neutral-500 border-neutral-700 rounded-md pr-3 flex items-center justify-center space-x-2 dark:hover:bg-neutral-800 hover:bg-neutral-200`}
          aria-description="previous-button"
        >
          <FaChevronLeft size={20} />
          {!top && <span>Prev</span>}
        </Link>

        {/* Mid Section */}
        {top && (
          <div className="flex space-x-4">
            <Link
              href={comicPartName}
              aria-description="chapter-archive"
              className="dark:hover:text-yellow-500 hover:text-orange-500"
            >
              <FaBarsStaggered size={20} />
            </Link>
            <Link
              href={"/"}
              aria-description="home"
              className="dark:hover:text-yellow-500 hover:text-orange-500"
            >
              <FaHome size={20} />
            </Link>
          </div>
        )}

        {/* Right Button */}

        <Link
          href={nextLink}
          className={`border-2 p-2 dark:border-neutral-500 border-neutral-700 rounded-md pl-3 flex items-center justify-center space-x-2 dark:hover:bg-neutral-800 hover:bg-neutral-200`}
          aria-description="next-button"
        >
          {!top && <span>Next</span>}
          <FaChevronRight size={20} />
        </Link>
      </section>
    </div>
  );
};

export default NavButtons;
