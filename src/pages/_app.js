"use client";

import HeaderBar from "@/components/header-bar/header-bar";
import "../styles/globals.css";
import FooterBar from "@/components/footer-bar/footer-bar";
import Slug from "@/utils/slug";
import { useRouter } from "next/navigation";

export default function App({ Component, pageProps }) {
  const screenName = "Home";
  return (
    <div className="flex flex-col bg-black mx-auto">
      {/* <HeaderBar />
      <Slug screenName={screenName} /> */}
      <main className="min-h-screen">
        <Component {...pageProps} />
      </main>
      {/* <FooterBar /> */}
    </div>
  );
}
