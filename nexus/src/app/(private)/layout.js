"use client";

import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

import Sidebar from "../../components/Layout/Sidebar";

const HomeLayout = (props) => {
  const cookie = new Cookies();
  const router = useRouter();

  const token = cookie.get("token");
  if (!token || token === "") {
    router.push("login");
  }

  useEffect(() => {
    if (!token || token === "") return;
    
    const socket = io();
    socket.emit("join", { username: cookie.get("username") });

    socket.on("newNotification", (data) => {
      toast.info(data.message, { theme: "dark" });
    });

    socket.on("receiveMessage", (data) => {
      // Don't show toast if we are actively in this chat
      if (window.location.pathname !== `/chats/${data.chatId}` && data.sender !== cookie.get("username")) {
        toast.info(`New message from ${data.sender}`, { theme: "dark" });
      }
    });

    return () => socket.disconnect();
  }, [token]);

  return (
    <div className="w-full flex text-gray-200">
      <Sidebar />

      <div className="ml-auto w-full lg:w-[80%] min-h-screen">
        {props.children}
      </div>
    </div>
  );
};

export default HomeLayout;
