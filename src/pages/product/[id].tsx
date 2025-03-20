import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "../../components/Layout";
import { useCart } from "../../context/CartContext";

interface Product {
  id: string;
  name: string;
  price: string;
  images?: string[];
}

export default function ProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProduct");
    if (storedProduct) {
      const parsedProduct: Product = JSON.parse(storedProduct);
      setProduct(parsedProduct);
      setSelectedImage(parsedProduct.images?.[0] || ""); // ✅ Check if images exist
    }
  }, []);

  if (!product) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <Layout>
      <div className="min-h-screen p-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0">
        {/* Product Image Section */}
        <div className="md:w-1/2 w-full flex flex-col items-center">
          {/* Main Image */}
          <div className="relative w-[600px] h-[500px] bg-gray-200 overflow-hidden rounded-lg">
            {selectedImage ? (
              <Image src={selectedImage} alt={product.name} fill className="object-cover" />
            ) : (
              <p className="text-gray-500 flex items-center justify-center h-full">No Image</p>
            )}
          </div>

          {/* Thumbnail Images */}
          <div className="flex space-x-4 mt-4">
            {product.images?.length ? (
              product.images.map((img, index) => (
                <button key={index} onClick={() => setSelectedImage(img)} className="focus:outline-none">
                  <div className="relative w-16 h-16 rounded overflow-hidden border-2 border-transparent hover:border-black transition-all">
                    <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                  </div>
                </button>
              ))
            ) : (
              <p className="text-gray-500">No Images Available</p>
            )}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="md:w-1/2 w-full md:pl-10 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-lg text-gray-700 mt-2">{product.price}</p>

          {/* Add to Cart Button */}
          <button
            className="mt-6 bg-black text-white py-3 px-8 rounded-full hover:bg-gray-800 transition-all duration-300"
            onClick={() => addToCart(product)}
          >
            ADD TO BAG
          </button>
        </div>
      </div>
    </Layout>
  );
}
