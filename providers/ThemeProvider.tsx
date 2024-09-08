"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // React.useEffect(() => {
  //   const handleKeyDown = (event: {
  //     ctrlKey: any;
  //     shiftKey: any;
  //     key: string;
  //     preventDefault: () => void;
  //   }) => {
  //     // Check if Ctrl+Shift+I or Ctrl+Shift+J or F12 is pressed
  //     if (
  //       (event.ctrlKey && event.shiftKey && event.key === "I") ||
  //       (event.ctrlKey && event.shiftKey && event.key === "J") ||
  //       event.key === "F12"
  //     ) {
  //       // Prevent the default behavior
  //       event.preventDefault();
  //       // Optionally, you can perform other actions here, such as showing a warning message
  //       console.log("Access to DevTools is restricted.");
  //     }
  //   };

  //   // Add event listener when component mounts
  //   document.addEventListener("keydown", handleKeyDown);

  //   // Cleanup: remove event listener when component unmounts
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  // onContextMenu={(e) => e.preventDefault()}

  return (
    <div>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </div>
  );
}
