import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // For mobile menu toggle button

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
    <div className="flex min-h-screen">
      {/* 🔹 Sidebar */}
      <aside className={`fixed top-5 left-10 bg-white p-10 z-40 flex flex-col transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:w-72`}>
      {/* 🔹 Logo (Bigger) */}
  <div className="mb-12 flex justify-between items-center">
    <Link href="/">
      <Image src="/LOGO.png" alt="Logo" width={500} height={100} priority />
    </Link>
    {/* Close Button (Mobile) */}
    <button className="lg:hidden" onClick={() => setMenuOpen(false)}>
      <X size={32} />
    </button>
  </div>

  {/* 🔹 Navigation Links (More Gap) */}
  <nav className="text-[24px] font-[utile display]  space-y-14 ml-2">
    <Link href="/collections" className="block hover:italic" onClick={() => setMenuOpen(false)}>Collections</Link>

    {/* 🔹 Shop Dropdown */}
    <div>
      <button className="w-full text-left hover:italic" onClick={() => setStoreOpen(!storeOpen)}>
        Shop
      </button>
      <AnimatePresence>
        {storeOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="pl-6 space-y-4 mt-5">
            <Link href="/store" className="block hover:italic" onClick={() => setMenuOpen(false)}>Trousers</Link>
            <Link href="/store/accessories" className="block hover:italic" onClick={() => setMenuOpen(false)}>Accessories</Link>
            <Link href="/store/custom" className="block hover:italic" onClick={() => setMenuOpen(false)}>Custom</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    <Link href="/alter" className="block hover:italic" onClick={() => setMenuOpen(false)}>Alter</Link>
    <Link href="/stories" className="block hover:italic" onClick={() => setMenuOpen(false)}>Stories</Link>
    <Link href="/about" className="block hover:italic" onClick={() => setMenuOpen(false)}>About</Link>
  </nav>
</aside>


      {/* 🔹 Mobile Menu Button */}
      <button className="fixed top-5 left-5 z-50 lg:hidden  p-2  rounded-md" onClick={() => setMenuOpen(true)}>
        <Menu size={28} />
      </button>

      {/* 🔹 Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${menuOpen ? "blur-sm" : ""} lg:ml-64`}>
        <main className="flex-1 px-6 md:px-12 py-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
