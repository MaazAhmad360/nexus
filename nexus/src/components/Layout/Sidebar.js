import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { Home, Search, Bell, PlusSquare, MessageCircle, LogOut, User } from "lucide-react";

import Logo from "../../assets/logo.svg";
import SidebarLink from "./SidebarLink";
import useLogout from "../hooks/Auth/useLogout";

const SideLinks = [
  { link: "/", text: "Dashboard", icon: Home },
  { link: "/search", text: "Search", icon: Search },
  {
    link: "/notifications",
    text: "Notifications",
    icon: Bell,
  },
  { link: "/add-new", text: "Create", icon: PlusSquare },
  { link: "/chats", text: "Messages", icon: MessageCircle },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const cookie = new Cookies();

  const { logoutHandler } = useLogout();

  const profileIcon = User;

  return (
    <div className="flex h-fit lg:h-screen w-full glass-panel lg:w-[20%] flex-col justify-between items-center fixed left-0 bottom-0 lg:top-0 z-50">
      <div className="w-full flex lg:flex-col items-center text-center lg:py-10">
        <div className="w-full">
          <div className="px-2">
            <Image
              src={Logo}
              className="w-[50%] h-[10%] p-2 hidden lg:block"
              alt="nexus"
            />
            <ul className="space-y-1 flex justify-center lg:flex-col">
              {SideLinks.map((item) => {
                return (
                  <SidebarLink
                    key={item.link}
                    link={item.link}
                    text={item.text}
                    icon={item.icon}
                  />
                );
              })}
              <SidebarLink
                link={`/profile/${cookie.get("username")}`}
                text={"Profile"}
                icon={profileIcon}
              />
            </ul>
          </div>
        </div>
      </div>

      <div
        className="p-2 w-full hidden lg:inline-block"
        onClick={logoutHandler}
      >
        <SidebarLink link="/" text="Logout" icon={LogOut} />
      </div>
    </div>
  );
};

export default Sidebar;
