import React from "react";
import Image from "next/image";

const RecommendationCard = ({ item }: { item: RandomFive }) => {
  return (
    <div className="flex gap-3">
      <Image
        alt="Martial Peak Cover"
        src={`https://f005.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=${item.CoverImage}`}
        width={40}
        height={45}
        className="object-cover w-10 h-auto"
      />
      <div className="flex flex-col flex-1 justify-between">
        <h6 className="text-sm">{item.name}</h6>
        <p className="text-xs w-24 xl:w-40 whitespace-nowrap overflow-hidden text-ellipsis">
          {JSON.parse(item.Genres).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default RecommendationCard;
