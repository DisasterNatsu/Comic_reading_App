import { ThemeProvider } from "@/providers/ThemeProvider";
import { Roboto } from "next/font/google";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json"; // Make sure this is correctly imported
import "./globals.css";

// Register the `en` locale with TimeAgo
TimeAgo.addDefaultLocale(en);

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="robots"
          content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:standard"
        />
        <link rel="icon" href="/icon.ico" sizes="32x32" />
      </head>
      <body className={`${roboto.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableColorScheme={false}
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
