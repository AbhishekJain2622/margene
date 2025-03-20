import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCart } from "../context/CartContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { cartItems, removeFromCart, getTotalPrice } = useCart();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setBagOpen(false);
  }, [router.pathname]);

  const handleCheckout = () => {
    router.push({
      pathname: "/checkout",
      query: { cartData: JSON.stringify(cartItems) },
    });
  };

  return (
    <div className="relative min-h-screen flex flex-row bg-white">
      {!isMobile && (
        <aside className="w-64 bg-white p-7">
          <div className="mb-8">
            <Image src="/logo.png" alt="Logo" width={150} height={50} priority />
          </div>
          <nav className="space-y-4 text-lg">
            <Link href="/collections" className="block hover:italic">Collections</Link>
            <div className="relative">
              <button className="w-full text-left hover:italic" onClick={() => setStoreOpen(!storeOpen)}>
                Store {storeOpen ? "▲" : "▼"}
              </button>
              <AnimatePresence>
                {storeOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-4 overflow-hidden"
                  >
                    <div className="space-y-2 text-sm py-2">
                      <Link href="/store" className="block hover:italic">Trouser</Link>
                      <Link href="/store/accessories" className="block hover:italic">Accessories</Link>
                      <Link href="/store/custom" className="block hover:italic">Custom</Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/alter" className="block hover:italic">Alter</Link>
            <Link href="/stories" className="block hover:italic">Stories</Link>
            <Link href="/about" className="block hover:italic">About</Link>
          </nav>
        </aside>
      )}

      <main className="flex-1 px-6 md:px-12 py-6">
        <div className="flex justify-end items-center pb-4 space-x-4">
          <Link href="/account" className="text-lg font-semibold">Account</Link>
          <button onClick={() => setBagOpen(true)} className="text-lg font-semibold">
            Bag ({cartItems.length})
          </button>
        </div>
        {children}
      </main>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: bagOpen ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed top-0 right-0 h-full w-full sm:w-80 max-w-sm bg-white shadow-lg p-4 overflow-y-auto"
      >
        <button onClick={() => setBagOpen(false)} className="text-red-500 font-bold mb-4">
          Close ✖
        </button>
        <h2 className="text-xl font-bold">Your Bag ({cartItems.length})</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-2 space-x-3">
                <Image
                  src={item.image ? item.image : "/default-product.jpg"}
                  alt={item.name || "Product Image"}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                  unoptimized
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p>${item.price}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</button>
              </div>
            ))}
            <p className="text-right text-lg font-bold mt-4">Subtotal: ${getTotalPrice().toFixed(2)}</p>
            <button onClick={handleCheckout} className="w-full bg-black text-white py-2 mt-4 rounded hover:bg-gray-800">
              Checkout
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}