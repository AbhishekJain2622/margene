import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [router.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row bg-white font-[Times_New_Roman] text-[22px]">
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          className="absolute top-5 left-5 z-50 p-3 bg-white text-gray-800 shadow-md rounded-md border border-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      )}

      {/* Sidebar (Mobile & Desktop) */}
      <AnimatePresence>
        {menuOpen || !isMobile ? (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed lg:static top-0 left-0 w-64 bg-white p-7 m-5 h-full  z-40`}
          >
            {/* Logo + Close Button */}
            <div className="mb-8 flex justify-between items-center">
              <Link href="/">
                <Image src="/logo.png" alt="Logo" width={321} height={68} priority />
              </Link>

              {/* Close Button (Mobile) */}
              {isMobile && (
                <button
                  className="text-gray-600 text-2xl"
                  onClick={() => setMenuOpen(false)}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="relative text-[22px] font-[Times New Roman] font-[solid] space-y-9 m-3">
              <Link href="/collections" className="block hover:italic">
                Collections
              </Link>

              {/* Shop Dropdown */}
              <div>
                <button className="w-full text-left hover:italic" onClick={() => setStoreOpen(!storeOpen)}>
                  Shop
                </button>
                {storeOpen && (
                  <div className="pl-6 space-y-2 mt-4">
                    <Link href="/store" className="block hover:italic">Trousers</Link>
                    <Link href="/store/accessories" className="block hover:italic">Accessories</Link>
                    <Link href="/store/custom" className="block hover:italic">Custom</Link>
                  </div>
                )}
              </div>

              <Link href="/alter" className="block hover:italic">Alter</Link>
              <Link href="/stories" className="block hover:italic">Stories</Link>
              <Link href="/about" className="block hover:italic">About</Link>
            </nav>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 px-6 md:px-12 py-6 m-5">{children}</main>
    </div>
  );
}
