"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "../components/Layout";
import AccountBag from "../components/AccountBag";
import FilterSidebar from "../components/FilterSidebar";
import { FooterStore } from "../components/footerstore";

interface Product {
  id: number;
  name: string;
  price: string;
  images: string[];
}

const products: Product[] = [
  { id: 1, name: "Classic Tailored Trouser", price: "300", images: ["/images/products/product-1-random1.png", "/images/products/product-2-random2.png"] },
  { id: 2, name: "Classy Tailored Jacket", price: "300", images: ["/images/products/product-2-random1.png", "/images/products/product-1-random1.png"] },
  { id: 3, name: "Elegant Evening Gown", price: "300", images: ["/images/products/product-3-random1.png", "/images/products/product-2-random1.png"] },
  { id: 4, name: "Classic Tailored Trouser", price: "300", images: ["/images/products/product-1-random1.png", "/images/products/product-2-random2.png"] },
  { id: 5, name: "Classy Tailored Jacket", price: "300", images: ["/images/products/product-2-random1.png", "/images/products/product-1-random1.png"] },
  { id: 6, name: "Elegant Evening Gown", price: "300", images: ["/images/products/product-3-random1.png", "/images/products/product-2-random1.png"] }
];

export default function Store() {
  const router = useRouter();
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    router.push(`/product/${product.id}`);
  };

  return (
    <>
    <Layout>
      {/* 🔹 Top Bar - Account & Filter Button */}
      <div className="flex  items-center px-2 sm:px-6 md:px-12 mt-8 sm:mt-12">     
           <AccountBag />
        <p 
          className="cursor-pointer hover:underline ml-[94%] font-[Times_New_Roman] text-[16px] sm:text-[18px] md:text-[20px]"
          onClick={() => setIsFilterOpen(true)}
        >
          Filter
        </p>
      </div>

      {/* 🔹 Filter Sidebar */}
      {isFilterOpen && <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />}

      {/* 🔹 Background Decorations */}
      <Image 
        src="/images/3.png" 
        alt="Decoration" 
        width={500} 
        height={572} 
        priority 
        className="hidden md:block fixed top-0 right-1/2 translate-x-1/2 w-[250px] sm:w-[400px] md:w-[600px] opacity-60 z-5 pointer-events-none"
      />
      <Image 
        src="/images/4.png" 
        alt="Decoration" 
        width={250} 
        height={300} 
        priority 
        className="hidden md:block fixed bottom-0 left-0 h-[420px] w-[150px] sm:w-[150px] md:w-[200px] z-5 pointer-events-none"
      />
{/* 🔹 Product Grid (Shifted Right) */}
<div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-20 px-4 sm:px-8 md:px-16 mt-6 md:ml-0 lg:ml-15 xl:ml-20">
  {products.map((product) => (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: product.id * 0.1 }}
      className="cursor-pointer space-y-3 group relative z-20"
      onClick={() => handleProductClick(product)}
      onMouseEnter={() => setHoveredProductId(product.id)}
      onMouseLeave={() => setHoveredProductId(null)}
    >
      {/* Product Image */}
      <div className="relative h-[523px] sm:h-[523px] md:h-[523px] w-[400px] overflow-hidden transition-all duration-500 group-hover:rounded-[200px] sm:group-hover:rounded-[200px] group-hover:scale-105 z-30">
        <Image
          src={hoveredProductId === product.id ? product.images[1] : product.images[0]}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-500"
        />
      </div>

      {/* Product Name & Price */}
      <div className="w-full flex items-center gap-[35%] text-[16px] sm:text-[18px] md:text-[20px] font-[Times_New_Roman]">
        <p className="font-medium">{product.name}</p>
        <p className="font-medium">{product.price}</p>
      </div>
    </motion.div>
  ))}
</div>

    </Layout>
          <FooterStore />
          </>
  );
}
