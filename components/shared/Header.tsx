"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { Menu, Search, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

import { ModeToggle } from "./ThemeToggle";
import { buttonVariants } from "../ui/button";
import { NavData } from "@/constants/NavData";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import MobileHeader from "./MobileHeader";
import { Axios } from "@/utils/AxiosConfig";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>("");

  // get pathname

  const path = usePathname();

  const Authenticated = async () => {
    // get auth token from cookies

    const authToken = Cookies.get("ds-user-token");

    if (!authToken) {
      setLoading(false);
      return setIsAuth(false);
    } // if no auth token

    try {
      const response = await Axios.get("/user/token", {
        headers: {
          "disaster-scans-token": authToken,
        },
      });

      const data: UserAuthResponse = await response.data;

      if (response.status === 200) {
        setLoading(false);
        setName(data.userName.split("").splice(0, 2).join("").toUpperCase());

        return setIsAuth(data.verified);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Logout = () => {
    Cookies.remove("ds-user-token");

    setName("");
    return setIsAuth(false);
  };

  useEffect(() => {
    Authenticated();
  }, [path]);

  return (
    <>
      <header className="w-full h-full py-4 flex justify-between bg-background">
        {/* Desktop Navbar */}

        <nav className="container flex-1 justify-between flex">
          {/* left side */}

          <div className="flex-1 justify-between md:flex hidden">
            <div className="flex space-x-4">
              <Link href={"/home"}>
                <Image
                  src={"/logo.png"}
                  alt="Logo"
                  width={50}
                  height={30}
                  className="w-20 h-auto object-contain"
                  priority
                />
              </Link>

              {/* links */}

              <ul className="flex h-full items-center space-x-2">
                {NavData.map((nav: NavDataType) => (
                  <li key={nav.path}>
                    <Link
                      href={nav.path}
                      className="px-2 py-3 text-sm rounded-md dark:hover:bg-slate-600 hover:bg-slate-200"
                    >
                      {nav.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex max-w-[500px] flex-1 mx-1 dark:bg-slate-800 bg-slate-300 items-center px-3 rounded-sm h-9">
              <input
                type="text"
                className="w-full bg-transparent outline-none px-2"
                placeholder="Search..."
              />
              <Search size={18} className="cursor-pointer" />
            </div>
            {/* Auth Buttons with mode toggle */}
            <div className="flex items-center space-x-2">
              {/* Only show in tablet */}

              <div className="lg:hidden">
                {loading ? (
                  <Skeleton className="w-[40px] h-[38px] lg:hidden rounded-full ml-2" />
                ) : isAuth ? (
                  <Menubar className="border-0 lg:hidden -mr-4">
                    <MenubarMenu>
                      <MenubarTrigger className="data-[state=open]:bg-background focus:bg-background cursor-pointer">
                        <Avatar>
                          <AvatarFallback>{name}</AvatarFallback>
                        </Avatar>
                      </MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem className="cursor-pointer">
                          Account Settings
                        </MenubarItem>
                        <MenubarItem className="cursor-pointer">
                          Donate
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem className="cursor-pointer">
                          Request a new series
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem
                          className="cursor-pointer text-red-500 font-medium"
                          onClick={Logout}
                        >
                          Log Out
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center">
                      <User />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link href={"/log-in"}>Log In</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={"/register"}>Register</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              {loading ? (
                <Skeleton className="w-[150px] h-[40px] rounded-md hidden lg:flex" />
              ) : isAuth ? (
                <Menubar className="border-0 hidden lg:flex">
                  <MenubarMenu>
                    <MenubarTrigger className="data-[state=open]:bg-background focus:bg-background cursor-pointer">
                      <Avatar>
                        <AvatarFallback>{name}</AvatarFallback>
                      </Avatar>
                    </MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem className="cursor-pointer">
                        Account Settings
                      </MenubarItem>
                      <MenubarItem className="cursor-pointer">
                        Donate
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem className="cursor-pointer">
                        Request a new series
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem
                        className="cursor-pointer text-red-500 font-medium"
                        onClick={Logout}
                      >
                        Log Out
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              ) : (
                <>
                  <Link
                    href={"/log-in"}
                    className={cn(
                      buttonVariants({
                        className: "font-semibold hidden lg:flex",
                      })
                    )}
                  >
                    Log In
                  </Link>
                  <Link
                    href={"/register"}
                    className={cn(
                      buttonVariants({
                        variant: "secondary",
                        className: "font-semibold hidden lg:flex",
                      })
                    )}
                  >
                    Register
                  </Link>
                </>
              )}
              <ModeToggle />
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button onClick={() => setMobileMenuOpen(true)}>
              <Menu aria-hidden="true" className="h-6 w-6" />
              <span className="sr-only">Open main menu</span>
            </button>
            <Link href={"/"}>
              <Image
                src="/logo.png"
                alt="logo"
                width={70}
                height={50}
                className="h-auto"
              />
            </Link>
          </div>

          <div className="md:hidden">
            <ModeToggle />
          </div>
          <MobileHeader
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            isAuth={isAuth}
            setIsAuth={setIsAuth}
          />
        </nav>
      </header>
    </>
  );
};

export default Header;
