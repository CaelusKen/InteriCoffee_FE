"use client";

import HeaderBar from "@/components/header-bar/header-bar";
import "../styles/globals.css";
import FooterBar from "@/components/footer-bar/footer-bar";
import Slug from "@/utils/slug";
import { usePathname } from "next/navigation";

export default function App({ Component, pageProps }) {
  const pathname = usePathname();
  const screenName = "Home";

  return (
    <div className="flex flex-col bg-black mx-auto">
      {/* Conditionally render HeaderBar and Slug only if pathname is not '/login' */}
      {pathname !== '/login' && (
        <>
          <HeaderBar />
          <Slug screenName={screenName} />
        </>
      )}
      <main className="min-h-screen">
        <Component {...pageProps} />
      </main>
      {pathname !== '/login' && <FooterBar />}
    </div>
  );
}
