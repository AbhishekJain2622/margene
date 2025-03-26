import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { useRouter } from "next/router";
import Login from "../pages/Login";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

export default function AccountBag() {
  const [bagOpen, setBagOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { cartItems, removeFromCart, getTotalPrice } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    router.push({
      pathname: "/checkout",
      query: { cartData: JSON.stringify(cartItems) },
    });
  };

  return (
    <div>
      {/* 🔹 Account & Bag Buttons */}
      <div className="fixed top-6 right-4 md:right-[144px] flex items-center gap-4 md:gap-6  z-50">
        <button
          onClick={() => setIsLoginOpen(true)}
          className="text-lg md:text-[22px] font-[Times_New_Roman] tracking-wide"
        >
          Account
        </button>
        <button
          onClick={() => setBagOpen(true)}
          className="text-lg md:text-[22px] font-[Times_New_Roman] flex items-center gap-2"
        >
          <span>Bag</span>
          <span className="text-base md:text-[20px]">({cartItems?.length || 0})</span>
        </button>
      </div>

      {/* 🔹 Login Modal */}
      {isLoginOpen && <Login closeModal={() => setIsLoginOpen(false)} />}

      {/* 🔹 Bag Sidebar - Fully Responsive */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: bagOpen ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed top-0 bottom-0 right-0 h-screen w-full max-w-[90vw] md:max-w-[350px] bg-white shadow-lg p-6 overflow-y-auto transition-all z-[100] border border-gray-300`}
      >
        {/* Close Button */}
        <button
          onClick={() => setBagOpen(false)}
          className="text-2xl font-bold absolute top-4 right-4"
        >
          ✖
        </button>

        <h2 className="text-xl md:text-2xl font-bold mb-6">Bag ({cartItems?.length || 0})</h2>

        {/* 🔹 Cart Content */}
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item: CartItem) => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                {/* ✅ Responsive Image */}
                <Image
                  src={item.image || "/image21.png"}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                  unoptimized
                />

                {/* ✅ Text & Details */}
                <div className="flex-1">
                  <p className="text-[20px] md:text-xl font-[Times_New_Roman] ">{item.name}</p>
                  <p className="text-gray-500 text-sm">Red / 5</p>
                  <p className="text-black font-medium text-md md:text-lg">${item.price.toFixed(2)}</p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm md:text-md"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Subtotal */}
            <p className="text-right text-lg font-bold mt-4">
              Subtotal: ${getTotalPrice()?.toFixed(2) || "0.00"}
            </p>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 text-lg"
            >
              Checkout
            </button>

            {/* Go to Cart Button */}
            <button
              onClick={() => router.push("/cart")}
              className="w-full mt-2 border border-gray-700 text-black py-3 rounded-md text-lg"
            >
              Go to cart
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
