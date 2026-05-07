import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nexus | Connect & Share",
  description: "A premium social platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-[#d4cdc4] hover:scrollbar-thumb-maroon scrollbar-track-beige h-full"
    >
      <body
        className={`${inter.className} w-screen antialiased`}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
