import Link from "next/link";
import Image from "next/image";

import CarouselContainer from "@/components/home/Carousel";
import LatestCard from "@/components/home/LatestCard";
import ComicCard from "@/components/shared/ComicCard";
import {
  FaDiscord,
  FaPatreon,
  FaPaypal,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa6";

import RecommendationCard from "@/components/home/RecommendationCard";
import Genres from "@/components/home/Genres";
import { Axios } from "@/utils/AxiosConfig";
import { Key } from "react";

const getData = async () => {
  const popularReq = await Axios.get("/get-comics/top-eight");
  const latestEight = await Axios.get("/get-comics/comic-with-chapter");

  const popular = await popularReq.data;
  const eightWithChapter = await latestEight.data;

  return { popular, eightWithChapter };
};

const Home = async () => {
  const { popular, eightWithChapter } = await getData();

  return (
    <>
      <title>Disaster Scans - Manhwas</title>
      <div className="container">
        {/* Carousel Section */}
        <section aria-roledescription="carousel">
          <CarouselContainer />
        </section>

        {/* Divider for announcent */}

        <div className="container mt-5 overflow-hidden flex flex-row gap-2 items-center justify-center">
          {/* Heading with divider */}

          <div
            role="none"
            aria-orientation="horizontal"
            className="shrink-0 bg-border h-[1px] w-full"
          />
          <span className="text-[8px] lg:text-[12px] text-neutral-400">
            ANNOUNCEMENT
          </span>
          <div
            role="none"
            aria-orientation="horizontal"
            className="shrink-0 bg-border h-[1px] w-full"
          />

          {/* Announcement */}
        </div>

        {/* Announcement */}

        <div className="container mt-3">
          <div
            className="relative"
            role="region"
            aria-roledescription="carousel"
          >
            <div className="overflow-hidden">
              <div
                className="flex -ml-4"
                style={{ transform: "translate3d(0px, 0px, 0px)" }}
              >
                <div
                  role="group"
                  aria-roledescription="slide"
                  className="min-w-0 shrink-0 grow-0 pl-4 basis-full border-white"
                >
                  <Link href={"#"}>
                    <div
                      role="alert"
                      className="relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground bg-background text-foreground border-foreground"
                    >
                      <h5 className="mb-1 leading-none tracking-tight dark:text-white text-black text-center font-bold line-clamp-1">
                        New Site and UX Improvent
                      </h5>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Left Button */}

            <button className="md:inline-flex hidden items-center  justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground absolute h-8 w-8 rounded-full -left-12 top-1/2 -translate-y-1/2">
              <FaArrowLeft />
              <span className="sr-only">Previous Slide</span>
            </button>

            {/* Right Button */}

            <button className="md:inline-flex hidden items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground absolute h-8 w-8 rounded-full -right-12 top-1/2 -translate-y-1/2">
              <FaArrowRight />
              <span className="sr-only">Next Slide</span>
            </button>
          </div>
        </div>

        {/* Divider for latest releases */}

        <div className="container mt-5 overflow-hidden flex flex-row gap-2 items-center justify-center">
          {/* Heading with divider */}

          <div
            role="none"
            aria-orientation="horizontal"
            className="shrink-0 bg-border h-[1px] w-full"
          />
          <span className="text-[8px] lg:text-[12px] text-neutral-400">
            LATEST
          </span>
          <div
            role="none"
            aria-orientation="horizontal"
            className="shrink-0 bg-border h-[1px] w-full"
          />
        </div>

        {/* Latest */}

        <section className="mt-5">
          <div className="grid md:grid-cols-4 gap-4 mt-3">
            {eightWithChapter.map((item: LatestData, index: number) => (
              <LatestCard key={index} item={item} />
            ))}
          </div>
        </section>

        {/* Divider for Pupular */}

        <div className="container hidden mt-5 overflow-hidden md:flex flex-row gap-2 items-center justify-center">
          {/* Heading with divider */}

          <div
            role="none"
            aria-orientation="horizontal"
            className="shrink-0 bg-border h-[1px] w-full"
          />
          <span className="text-[8px] lg:text-[12px] text-neutral-400">
            POPULAR
          </span>
          <div
            role="none"
            aria-orientation="horizontal"
            className="shrink-0 bg-border h-[1px] w-full"
          />
        </div>

        {/* Divider for latest Social only for mobile */}

        <div className="container md:hidden mt-5 overflow-hidden flex flex-row gap-2 items-center justify-center">
          {/* Heading with divider */}

          <div
            role="none"
            aria-orientation="horizontal"
            className="shrink-0 bg-border h-[1px] w-full"
          />
          <span className="text-[8px] lg:text-[12px] text-neutral-400">
            SOCIAL
          </span>
          <div
            role="none"
            aria-orientation="horizontal"
            className="shrink-0 bg-border h-[1px] w-full"
          />
        </div>

        {/* Social Links */}
        <section className="md:hidden my-5">
          <h3 className="text-3xl font-semibold text-center md:text-left">
            Join us
          </h3>
          <div className="flex justify-around my-2">
            <Link
              href="https://discord.com/invite/disaster-scans"
              target="_blank"
            >
              <FaDiscord className="text-[#7289da] w-20 h-20" />
            </Link>
            <Link href="https://www.patreon.com/martialscans" target="_blank">
              <FaPatreon className="text-white bg-black dark:bg-slate-800 p-3 rounded-lg w-20 h-20" />
            </Link>
            <Link href="https://www.paypal.me/DisasterScans" target="_blank">
              <FaPaypal className="text-[#0079C1] rounded-lg w-20 h-20" />
            </Link>
          </div>
        </section>

        {/* Divider for Popular only for mobile */}

        <div className="container md:hidden mt-5 overflow-hidden flex flex-row gap-2 items-center justify-center">
          {/* Heading with divider */}

          <div
            role="none"
            aria-orientation="horizontal"
            className="shrink-0 bg-border h-[1px] w-full"
          />
          <span className="text-[8px] lg:text-[12px] text-neutral-400">
            POPULAR
          </span>
          <div
            role="none"
            aria-orientation="horizontal"
            className="shrink-0 bg-border h-[1px] w-full"
          />
        </div>

        {/* Popular Releases */}
        <section className="mt-5">
          <div className="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-1 gap-4 mt-3">
            <div className="grid gap-4 lg:col-span-5 md:col-span-4 col-span-2 lg:grid-cols-5 md:grid-cols-4 grid-cols-2">
              {popular.length > 0 &&
                popular.map((item: PopularResults, index: number) => (
                  <ComicCard
                    key={index}
                    ComicTitle={item.ComicTitle}
                    CoverImage={item.CoverImage}
                    comicId={item.id}
                  />
                ))}
            </div>

            <div className="hidden md:block">
              <p className="mb-3 text-center">Join or help us!</p>

              <div className="flex w-full justify-around items-center">
                <Link
                  href="https://discord.com/invite/disaster-scans"
                  target="_blank"
                >
                  <FaDiscord className="text-[#7289da] w-14 h-14" />
                </Link>
                <Link
                  href="https://www.patreon.com/martialscans"
                  target="_blank"
                >
                  <FaPatreon className="text-white bg-black dark:bg-slate-800 p-3 rounded-lg w-12 h-12" />
                </Link>
                <Link
                  href="https://www.paypal.me/DisasterScans"
                  target="_blank"
                >
                  <FaPaypal className="text-[#0079C1] rounded-lg w-12 h-12" />
                </Link>
              </div>

              {/* Recommendations */}
              <div className="my-3 px-1">
                <h2 className="text-center mb-3">Recommendations</h2>

                {/* Recommendation Cards */}

                <div className="flex flex-col gap-4">
                  <RecommendationCard />
                  <RecommendationCard />
                  <RecommendationCard />
                  <RecommendationCard />
                  <RecommendationCard />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>{/* <Genres /> */}</section>
      </div>
    </>
  );
};

export const revalidate = 7200;

export default Home;
