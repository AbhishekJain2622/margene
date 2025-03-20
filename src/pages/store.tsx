import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "../components/Layout";

interface Product {
  id: number;
  name: string;
  price: string;
  images: string[];
}

const products: Product[] = [
  { 
    id: 1, 
    name: "Classic Tailored Trouser", 
    price: "$300",
    images: ["/images/products/product-1-random1.png", "/images/products/product-2-random2.png"]
  },
  { 
    id: 2, 
    name: "Classy Tailored Jacket", 
    price: "$300",
    images: ["/images/products/product-2-random1.png", "/images/products/product-1-random1.png"]
  },
  { 
    id: 3, 
    name: "Elegant Evening Gown", 
    price: "$300",
    images: ["/images/products/product-3-random1.png", "/images/products/product-2-random1.png"]
  }
];

export default function Store() {
  const router = useRouter();
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);

  const handleProductClick = (product: Product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    router.push(`/product/${product.id}`);
  };

  return (
    <Layout>
      {/* Background Images */}
      <>
        <Image
          src="/images/3.png"
          alt="Background decoration"
          width={666}
          height={571}
          priority
          className="hidden md:block fixed top-0 right-[55%] translate-x-1/2 w-[400px] h-[200px] opacity-100"
        />
        <Image
          src="/images/2.png"
          alt="Background decoration"
          width={250}
          height={250}
          priority
          className="hidden md:block fixed bottom-0 left-2 w-[250px] h-auto opacity-100"
        />
        <Image
          src="/images/1.png"
          alt="Background decoration"
          width={300}
          height={300}
          priority
          className="hidden md:block fixed bottom-0 right-[0px] top-[500px] w-[250px] h-auto opacity-100"
        />
      </>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: product.id * 0.1 }}
            className="cursor-pointer space-y-3 group"
            onClick={() => handleProductClick(product)}
            onHoverStart={() => setHoveredProductId(product.id)}
            onHoverEnd={() => setHoveredProductId(null)}
          >
            <motion.div 
              className="w-full h-[500px] relative overflow-hidden transition-all duration-500 group-hover:rounded-full group-hover:scale-105"
            >
              <Image
                src={hoveredProductId === product.id ? product.images[1] : product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-500"
              />
            </motion.div>
            
            <div className="flex justify-between text-sm">
              <p className="font-medium">{product.name}</p>
              <p className="font-semibold">{product.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Layout>
  );
}