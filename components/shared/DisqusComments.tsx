"use client";

import React, { useEffect, useState } from "react";
import { DiscussionEmbed } from "disqus-react";
import { useTheme } from "next-themes"; // Import useTheme from next-themes

const DynamicDisqusComments: React.FC<DisqusProps> = ({ id, query, title }) => {
  const { theme } = useTheme(); // Access the theme
  const [disqusKey, setDisqusKey] = useState(0); // State to force re-render

  useEffect(() => {
    // Update the key whenever the theme changes
    setDisqusKey((prevKey) => prevKey + 1);
  }, [theme]);

  return (
    <div id="disqus_thread" key={disqusKey}>
      <DiscussionEmbed
        shortname="disasterscansnew"
        config={{
          url: `http://localhost:3000/${query}`,
          identifier: id,
          title: title,
        }}
      />
    </div>
  );
};

export default DynamicDisqusComments;
