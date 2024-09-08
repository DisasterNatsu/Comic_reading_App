"use client";

import React, { useState } from "react";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import Link from "next/link";

// Register the locale inside this file
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Chapters = ({
  chapters,
  param,
}: {
  chapters: ChaptersResponse[];
  param: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const chaptersPerPage = 15;
  const totalNoOfPage = Math.ceil(chapters.length / 15);
  const indexOfLastChapter = currentPage * chaptersPerPage;
  const indexOfFirstChapter = indexOfLastChapter - chaptersPerPage;
  const currentChapters = chapters.slice(
    indexOfFirstChapter,
    indexOfLastChapter
  );

  return (
    <div className="w-full">
      <Tabs defaultValue="chapter" className="w-full mx-auto">
        <TabsList className="mx-auto -ml-[2px] md:ml-0">
          <TabsTrigger value="chapter">Chapter List</TabsTrigger>
          <TabsTrigger value="announcement">Announcement</TabsTrigger>
        </TabsList>
        <TabsContent value="chapter">
          <div className="flex flex-col space-y-3 py-3">
            {currentChapters.map((item: ChaptersResponse, index: number) => {
              // Link

              const link =
                "/comics/" +
                param +
                "/" +
                item.chapterID +
                "-chapter-" +
                item.ChapterNumber;

              return (
                <Link
                  href={link}
                  key={index}
                  className="py-3 dark:bg-neutral-900 bg-neutral-200 rounded-md px-3 flex justify-between hover:text-yellow-500 dark:visited:text-[rgba(255,252,52,0.81)] visited:text-[rgb(255,74,42)] "
                >
                  <span className="block w-32 md:w-fit overflow-hidden text-ellipsis whitespace-nowrap text-sm sm:text-base">
                    Chapter {item.ChapterNumber}{" "}
                    {item.ChapterName ? `- ${item.ChapterName}` : ""}
                  </span>
                  <span className="dark:text-neutral-400 text-neutral-800 text-sm sm:text-base">
                    <ReactTimeAgo
                      date={Date.parse(item.chapterDate)}
                      locale="en-US"
                    />
                  </span>
                </Link>
              );
            })}
          </div>

          <div>
            {/* Pagination */}

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => {
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className="cursor-pointer"
                  />
                </PaginationItem>

                {currentPage >= 4 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setCurrentPage(1)}
                      className="cursor-pointer"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                )}

                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {Array(totalNoOfPage)
                  .fill(null)
                  .map((_, index: number) => (
                    <PaginationItem
                      key={index}
                      className={`hidden cursor-pointer ${
                        index === currentPage - 1 && "flex"
                      } ${
                        currentPage > 1 && index === currentPage - 2 && "flex"
                      } ${
                        currentPage === 3 && index === currentPage - 3 && "flex"
                      } ${index === currentPage && "flex"}`}
                    >
                      <PaginationLink
                        onClick={() => setCurrentPage(index + 1)}
                        isActive={index === currentPage - 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                {currentPage < totalNoOfPage - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {currentPage <= totalNoOfPage - 4 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setCurrentPage(totalNoOfPage)}
                      className="cursor-pointer"
                    >
                      {totalNoOfPage}
                    </PaginationLink>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => {
                      console.log("pressed");

                      if (currentPage < totalNoOfPage) {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                    className="cursor-pointer"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Chapters;
