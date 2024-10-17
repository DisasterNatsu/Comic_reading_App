import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
