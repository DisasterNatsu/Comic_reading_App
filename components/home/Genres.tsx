import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComicCard from "../shared/ComicCard";

const Genres = () => {
  return (
    <div className="gap-2 my-11">
      <div className="flex flex-col items-center md:items-start gap-3">
        <h5 className="self-start text-sm">Favourite Genres</h5>
        <Tabs defaultValue="action" className="w-full mx-auto">
          <TabsList className="mx-auto -ml-3 md:ml-0">
            <TabsTrigger value="action">Action</TabsTrigger>
            <TabsTrigger value="fantacy">Fantacy</TabsTrigger>
            <TabsTrigger value="martial-arts">Martial Arts</TabsTrigger>
            <TabsTrigger value="adventure">Adventure</TabsTrigger>
          </TabsList>
          <TabsContent
            value="action"
            className="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-2 gap-4 mt-3"
          >
            {/* {Array(6)
              .fill(null)
              .map((_, index) => (
                <ComicCard key={index} />
              ))} */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Genres;
