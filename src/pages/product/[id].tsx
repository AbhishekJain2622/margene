import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "../../components/Layout";
import { useCart } from "../../context/CartContext";
import AccountBag from "../../components/AccountBag";

interface Product {
  id: string;
  name: string;
  price: number;
  images?: string[];
}

export default function ProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSecondImageVisible, setIsSecondImageVisible] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    try {
      const storedProduct = localStorage.getItem("selectedProduct");
      if (storedProduct) {
        const parsedProduct: Product = JSON.parse(storedProduct);
        parsedProduct.price = Number(parsedProduct.price);
        setProduct(parsedProduct);
        setSelectedImage(parsedProduct.images?.[0] || "/default-product.jpg");
      }
    } catch (error) {
      console.error("Error parsing product data:", error);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSecondImageVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!product) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <Layout>
      <AccountBag />

      {/* Background Decorations */}
      <div className="hidden md:block fixed top-0 right-[55%] translate-x-1/2 w-[40vw] max-w-[500px] h-auto opacity-60">
        <Image src="/images/3.png" alt="Background decoration" width={500} height={200} priority />
      </div>

      <div className="hidden md:block fixed bottom-0 left-2 w-[15vw] max-w-[200px] h-auto opacity-100">
        <Image src="/images/4.png" alt="Background decoration" width={200} height={200} priority />
      </div>

      {/* Product Section */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row p-4 sm:p-8">
        {/* Image Section */}
        <div className="flex flex-col sm:flex-row lg:w-1/2">
          {/* Thumbnails */}
          <div className="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2">
            {product.images?.map((img, index) => (
              <button key={index} onClick={() => setSelectedImage(img)} className="focus:outline-none">
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="border hover:border-black"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative w-full sm:w-[350px] md:w-[500px] lg:w-[700px] h-[400px] sm:h-[500px] md:h-[600px] bg-gray-200 ml-4 overflow-hidden">
            {selectedImage && !isSecondImageVisible && (
              <Image src={selectedImage} alt={product.name} fill className="object-cover" />
            )}
            {isSecondImageVisible && product.images?.[1] && (
              <Image src={product.images[1]} alt={product.name} fill className="object-cover" />
            )}
            {!selectedImage && <p className="text-gray-500 flex items-center justify-center h-full">No Image</p>}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 px-4 sm:px-8 mt-6 lg:mt-0">
          <h2 className="text-2xl sm:text-3xl font-bold">{product.name}</h2>
          <p className="text-lg sm:text-xl text-gray-700 mt-2">${product.price.toFixed(2)}</p>

          {/* Color & Size Selection */}
          <div className="mt-6">
            <p className="text-lg font-semibold">Select Color</p>
            <div className="flex space-x-2 mt-2">
              <button className="w-8 sm:w-10 h-8 sm:h-10 bg-black rounded-full border"></button>
              <button className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-400 rounded-full border"></button>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-lg font-semibold">Select Size</p>
            <div className="flex space-x-2 mt-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button key={size} className="border px-3 sm:px-4 py-1 sm:py-2 text-sm hover:bg-black hover:text-white">
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Bag Button */}
          <button
            className="mt-6 w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-all duration-300"
            onClick={() => addToCart({ ...product, quantity: 1 })}
          >
            ADD TO BAG
          </button>
        </div>
      </div>

      {/* Footer */}
      {isSecondImageVisible && (
        <footer className="w-full bg-black text-white text-center py-4 mt-6">
          <p>Footer Content Here</p>
        </footer>
      )}
    </Layout>
  );
}
