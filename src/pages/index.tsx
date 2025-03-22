import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AccountBag from "../components/AccountBag";
import Login from "./Login"; // Import Login Component

const Home: FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);

  const closeDropdowns = () => {
    setStoreOpen(false);
    setCollectionOpen(false);
  };

  return (
    <div className="relative h-screen w-full" onClick={closeDropdowns}>
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Background1.png"
          alt="Margene Hero Image"
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* 🔹 Top Right Navigation (Account Button opens Login Modal) */}
      <nav className="absolute top-6 right-4 md:right-10 text-black text-xs md:text-sm z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLoginOpen(true);
          }}
          className="hover:italic transition-all"
        >
     
        </button>
        <AccountBag />
      </nav>

      {/* 🔹 Centered Navigation with Logo */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        <div className="flex flex-col md:flex-row items-center space-y-12 md:space-y-0 md:space-x-12 text-[26px]">
          {/* 🔹 SHOP DROPDOWN */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setStoreOpen(!storeOpen);
                setCollectionOpen(false);
              }}
              className="hover:italic transition-all"
            >
              Shop
            </button>
            {storeOpen && (
              <div className="absolute top-full left-3 text-black text-[20px] mt-4 p-4 space-y-3 min-w-[160px]">
                <Link href="/store" className="py-2 px-4 hover:italic">
                  Trousers
                </Link>
                <Link href="/store/accessories" className="block py-2 px-4 hover:italic">
                  Accessories
                </Link>
                <Link href="/store/custom" className="block py-2 px-4 hover:italic">
                  Custom
                </Link>
              </div>
            )}
          </div>

          <Link href="/alter" className="hover:italic transition-all">
            Alter
          </Link>

          {/* 🔹 LOGO IMAGE */}
          <Image
            src="/LOGO.png"
            alt="Margene Logo"
            width={453}
            height={96}
            className="object-contain"
          />

          {/* 🔹 COLLECTION DROPDOWN */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCollectionOpen(!collectionOpen);
                setStoreOpen(false);
              }}
              className="hover:italic transition-all"
            >
              Collection
            </button>
            {collectionOpen && (
              <div className="absolute top-full left-7 rounded-md text-black text-[20px] mt-4 p-4 space-y-3 min-w-[160px]">
                <Link href="/collections/spring" className="block py-2 px-4 hover:italic">
                  Edition 1
                </Link>
                <Link href="/collections/summer" className="block py-2 px-4 hover:italic">
                  Edition 2
                </Link>
                <Link href="/collections/fall" className="block py-2 px-4 rounded-md hover:italic">
                  Edition 3
                </Link>
              </div>
            )}
          </div>

          <Link href="/about" className="hover:italic transition-all">
            About
          </Link>
          <Link href="/stories" className="hover:italic transition-all">
            Stories
          </Link>
        </div>
      </div>

      {/* 🔹 Footer Navigation */}
      <footer className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-[15px] flex flex-wrap justify-center space-x-4 md:space-x-8 text-white text-xs uppercase z-10">
        <Link href="/terms" className="hover:italic transition-all">
          Terms of Use
        </Link>
        <Link href="/faq" className="hover:italic transition-all">
          FAQ
        </Link>
        <Link href="/contact" className="hover:italic transition-all">
          Contact
        </Link>
      </footer>

      {/* 🔹 Login Modal */}
      {isLoginOpen && <Login closeModal={() => setIsLoginOpen(false)} />}
    </div>
  );
};

export default Home;
