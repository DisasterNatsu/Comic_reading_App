import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { Dialog } from "@headlessui/react";
import { LogIn, LogOut, NotebookPen, X, SearchIcon } from "lucide-react";

import { NavData } from "@/constants/NavData";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const MobileHeader = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  isAuth,
  setIsAuth,
}: MobileMenuProps) => {
  const handleLogout = () => {
    if (isAuth) {
      Cookies.remove("ds-user-token");
      return setIsAuth(false);
    }
  };

  return (
    <Dialog
      as="div"
      className="lg:hidden"
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
    >
      <div className="fixed inset-0 z-10">
        <Dialog.Panel className="fixed flex flex-col inset-y-0 left-0 z-10 w-full overflow-y-auto dark:bg-slate-900 bg-slate-300 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href={"/"}>
                <Image src="/logo.png" alt="logo" width={60} height={60} />
              </Link>
              <Link href={"/"}>
                <p className="md:text-2xl font-semibold">
                  Disaster{" "}
                  <span className="dark:text-yellow-400 text-red-600">
                    Scans
                  </span>
                </p>
              </Link>
            </div>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Clone menu</span>
              <X
                className="w-6 h-6 dark:text-white text-black"
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Show if user is logged in */}

          {isAuth && (
            <>
              <div className="mt-5 px-2 flex justify-between items-center">
                <p>Hi, Welcome Back</p>
                <button>
                  <Avatar>
                    <AvatarFallback>FF</AvatarFallback>
                  </Avatar>
                </button>
              </div>
              <hr className="mt-4" />
            </>
          )}

          <div className="mt-6 flow-root flex-grow">
            <div className="divide-y h-full">
              <div className="flex flex-col h-full justify-between">
                {/* Links */}

                <div className="relative">
                  <Input
                    className="focus:outline-none"
                    placeholder="Search..."
                  />
                  <SearchIcon className="absolute top-2 right-2 z-10" />
                </div>

                <div className="py-6 flex-grow flex flex-col space-y-10">
                  {NavData.map((navItem) => (
                    <Link
                      href={navItem.path}
                      key={navItem.path}
                      className="nav-link-mobile flex gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {navItem.icon}
                      {navItem.title}
                    </Link>
                  ))}
                </div>
                <hr className="mb-5" />
                {isAuth ? (
                  <div className="flex flex-col gap-5">
                    <Button
                      variant={"secondary"}
                      className="flex gap-4 nav-link-mobile"
                      onClick={handleLogout}
                    >
                      <LogOut /> Log Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5">
                    <Link
                      href={"/log-in"}
                      className="flex gap-4 nav-link-mobile"
                    >
                      <LogIn /> Log In
                    </Link>
                    <Link
                      href={"/register"}
                      className="flex gap-4 nav-link-mobile"
                    >
                      <NotebookPen /> Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default MobileHeader;
