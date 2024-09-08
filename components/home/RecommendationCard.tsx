import React from "react";
import Image from "next/image";

const RecommendationCard = () => {
  return (
    <div className="flex gap-3">
      <Image
        alt="Martial Peak Cover"
        src="/martialPeak.jpg"
        width={40}
        height={45}
        className="object-cover w-10 h-auto"
      />
      <div className="flex flex-col flex-1 justify-between">
        <h6 className="text-sm">Martial Peak</h6>
        <p className="text-xs w-24 xl:w-40 whitespace-nowrap overflow-hidden text-ellipsis">
          Action, Adventure, Harem, Shounen
        </p>
      </div>
    </div>
  );
};

export default RecommendationCard;
