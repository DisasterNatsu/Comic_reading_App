import { CircleAlert, Copyright, Home, LibraryBig, Lock } from "lucide-react";

export const NavData: NavDataType[] = [
  {
    title: "Comics",
    path: "/comics",
    icon: <LibraryBig />,
  },
  {
    title: "About",
    path: "/about",
    icon: <CircleAlert />,
  },
  {
    title: "Privacy",
    path: "/privacy",
    icon: <Lock />,
  },
  {
    title: "DMCA",
    path: "/dmca",
    icon: <Copyright />,
  },
];
