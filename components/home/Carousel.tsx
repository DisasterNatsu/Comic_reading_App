"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Play } from "lucide-react";

const CarouselContainer = () => (
  <Carousel
    opts={{
      loop: true,
    }}
    plugins={[
      Autoplay({
        delay: 5000,
      }),
    ]}
    className="rounded-md overflow-hidden mt-5"
  >
    <CarouselContent className="hidden md:flex">
      {/* First Carouusel Item */}

      <CarouselItem className="bg-[url('/martialPeak.jpg')] bg-no-repeat bg-cover bg-center">
        <div className="w-full flex max-h-[25rem] items-center justify-center px-16 backdrop-blur-lg">
          <div className="flex space-y-2 flex-1 flex-col justify-start items-start h-full py-7">
            <Link href="/comics/11422-martial-peak">
              <h3 className="text-3xl font-semibold text-black">
                Martial Peak
              </h3>
            </Link>
            <p className="leading-5 line-clamp-2 text-black pr-5">
              The journey to the martial peak is a lonely, solitary and long
              one. In the face of adversity, you must survive and remain
              unyielding. Only then can you break through and continue on your
              journey to become the strongest. High Heaven Pavilion tests its
              disciples in the harshest ways to prepare them for this journey.
              One day, the lowly sweeper Yang Kai managed to obtain a black
              book, setting him on the road to the peak of the martial world.
            </p>

            {/* Button To redirect to new chapter */}
            <Link
              href="/comics/11422-martial-peak"
              className="flex items-center gap-2 bg-red-500 hover:bg-red-400 font-semibold text-lg mt-5 px-3 py-2 rounded-md text-black"
            >
              <Play /> Start Reading
            </Link>
          </div>
          <Link
            href={"/comics/11422-martial-peak"}
            className="flex items-center h-full p-5"
          >
            <Image
              src={"/martialPeak.jpg"}
              alt="Martial Peak Cover"
              width={172.5}
              height={237}
              className="h-auto w-72 object-cover rounded-md rotate-12 scale-125 hover:scale-100 hover:rotate-0 duration-200 cursor-pointer mr-3"
              priority
            />
          </Link>
        </div>
      </CarouselItem>

      {/* Second Carousel Item */}

      <CarouselItem className="bg-[url('/yuan-zun.jpg')] bg-no-repeat bg-cover bg-center">
        <div className="w-full flex max-h-[25rem] items-center justify-center px-16 backdrop-blur-lg">
          <div className="flex space-y-2 flex-1 flex-col justify-start items-start h-full py-7">
            <Link href="/comics/17993-yuan-zun">
              <h3 className="text-3xl font-semibold text-black">Yuan Zun</h3>
            </Link>
            <p className="leading-5 line-clamp-2 text-black pr-5">
              A teenager holds a pen, while a dragon dances; Chaos surrounds the
              world, lighting the sky. In this world, will the python swallow
              the dragon, or will the saint dragon rise?!
            </p>

            {/* Button To redirect to new chapter */}
            <Link
              href="/comics/17993-yuan-zun"
              className="flex items-center gap-2 bg-red-500 hover:bg-red-400 font-semibold text-lg mt-5 px-3 py-2 rounded-md text-black"
            >
              <Play /> Start Reading
            </Link>
          </div>
          <Link
            href={"/comics/17993-yuan-zun"}
            className="flex items-center h-full p-5"
          >
            <Image
              src={"/yuan-zun.jpg"}
              alt="Martial Peak Cover"
              width={290}
              height={350}
              className="h-auto w-72 object-cover rounded-md rotate-12 scale-125 hover:scale-100 hover:rotate-0 duration-200 cursor-pointer mr-3"
              priority
            />
          </Link>
        </div>
      </CarouselItem>
      <CarouselItem className="bg-[url('/martial-arts-reigns.png')] bg-no-repeat bg-cover bg-center">
        <div className="w-full flex max-h-[25rem] items-center justify-center px-16 backdrop-blur-lg">
          <div className="flex space-y-2 flex-1 flex-col justify-start items-start h-full py-7">
            <Link href="/comics/65955-martial-arts-reigns">
              <h3 className="text-3xl font-semibold text-black">
                Martial Arts Reigns
              </h3>
            </Link>
            <p className="leading-5 line-clamp-2 text-black pr-5">
              Ye Ming, the rising star of Family Ye is regarded as a genius
              among his peer cultivators. But he was schemed by his jealous
              cousin and the latter cut his meridians, crippled his abilities
              and hamstrung him ruthlessly. But Ye Ming never gives up because
              he’d sacrifice everything for take revenge for his deceased
              parents who were murdered by Family Huang. But he doesn&apos;t
              know that he is considered a pain in the neck to Family Ye and a
              big conspiracy is looming out of the darkness…
            </p>

            {/* Button To redirect to new chapter */}
            <Link
              href="/comics/65955-martial-arts-reigns"
              className="flex items-center gap-2 bg-red-500 hover:bg-red-400 font-semibold text-lg mt-5 px-3 py-2 rounded-md text-black"
            >
              <Play /> Start Reading
            </Link>
          </div>
          <Link
            href={"/comics/65955-martial-arts-reigns"}
            className="flex items-center h-full p-5"
          >
            <Image
              src={"/martial-arts-reigns.png"}
              alt="Martial Peak Cover"
              width={290}
              height={350}
              className="h-auto w-80 object-cover rounded-md rotate-12 scale-125 hover:scale-100 hover:rotate-0 duration-200 cursor-pointer mr-3"
              priority
            />
          </Link>
        </div>
      </CarouselItem>
    </CarouselContent>
  </Carousel>
);

export default CarouselContainer;
