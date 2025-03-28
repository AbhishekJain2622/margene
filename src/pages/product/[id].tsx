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

const AccordionItem = ({ title, content }: { title: string; content: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-gray-300">
      <button
        className="w-full flex justify-between items-center py-3 text-gray-700 text-lg font-semibold hover:text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <p className="text-gray-600 text-sm p-2">{content}</p>}
    </div>
  );
};

export default function ProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    try {
      const storedProduct = localStorage.getItem("selectedProduct");
      if (storedProduct) {
        const parsedProduct: Product = JSON.parse(storedProduct);
        parsedProduct.price = Number(parsedProduct.price);

        const imagesWithDummy = [
          ...(parsedProduct.images || []),
          "/image21.png",
          "/image21.png",
          "/image21.png",
        ].slice(0, 3);

        setProduct({ ...parsedProduct, images: imagesWithDummy });
        setSelectedImage(imagesWithDummy[2]); 
      }
    } catch (error) {
      console.error("Error parsing product data:", error);
    }
  }, []);

  if (!product) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <Layout>
      <AccountBag />

      {/* Background Decoration Images */}
      <Image 
        src="/images/3.png" 
        alt="Decoration" 
        width={500} 
        height={572} 
        priority 
        className="hidden md:block fixed top-0 left-[50%] translate-x-[-50%] w-[250px] sm:w-[400px] md:w-[600px] opacity-60 z-5 pointer-events-none"
      />
      <Image 
        src="/images/4.png" 
        alt="Decoration" 
        width={250} 
        height={300} 
        priority 
        className="hidden md:block fixed bottom-0 left-0 h-[320px] w-[120px] sm:w-[150px] md:w-[200px] z-5 pointer-events-none"
      />

      {/* Product Section */}
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-4 sm:p-8">
        {/* Left Side - Small Thumbnails */}
        <div className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4">
          {product.images?.map((img, index) => (
            <button key={index} onClick={() => setSelectedImage(img)} className="focus:outline-none">
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                width={155}
                height={203}
                className="border border-gray-300 hover:border-black rounded-md"
                style={{ width: "155px", height: "203px" }}
              />
            </button>
          ))}
        </div>

        {/* Large Center Image */}
        <div className="relative w-full md:w-[600px] h-[600px] md:h-[800px] bg-gray-200 mx-6 mt-4 md:mt-0">
          {selectedImage && (
            <Image src={selectedImage} alt={product.name} fill className="object-cover rounded-lg" />
          )}
        </div>

        {/* Product Details on the Right */}
        <div className="w-full md:w-1/3 mt-8 md:mt-0">
          <h2 className="text-xl mt-5 sm:text-2xl ">{product.name}</h2>
          <p className="text-lg sm:text-xl text-gray-700 mt-2">${product.price.toFixed(2)}</p>

          {/* Color Selection */}
          <div className="mt-6">
            <p className="text-lg font-semibold">Select Color</p>
            <div className="flex space-x-2 mt-2">
              <button className="w-8 h-8 bg-black rounded-full border"></button>
              <button className="w-8 h-8 bg-gray-400 rounded-full border"></button>
            </div>
          </div>

          {/* Size Selection */}
          <div className="mt-4">
            <p className="text-lg font-semibold">Select Size</p>
            <div className="grid grid-cols-4 md:grid-cols-5 gap-2 mt-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button key={size} className="border px-4 py-2 text-sm hover:bg-black hover:text-white">
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

          {/* Accordion Section */}
          <div className="mt-6">
            <AccordionItem title="DETAILS & CARE" content="This product is made of high-quality fabric. Hand wash or machine wash as per care instructions." />
            <AccordionItem title="INFORMATION" content="Material: 100% Cotton. Designed for comfort and durability." />
            <AccordionItem title="DELIVERY & RETURNS" content="Free shipping on orders above $50. 30-day return policy applicable." />
          </div>
        </div>
      </div>
    </Layout>
  );
}
