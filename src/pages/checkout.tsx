import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "../components/Layout";
import AccountBag from "../components/AccountBag";

export default function Checkout() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    if (router.query.cartData) {
      try {
        const parsedCart = JSON.parse(router.query.cartData as string);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  }, [router.query.cartData]);

  // Function to handle quantity increase
  const handleIncreaseQuantity = (id: number) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  // Function to handle quantity decrease
  const handleDecreaseQuantity = (id: number) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + (item.price * (item.quantity || 1)), 0)
      .toFixed(2);
  };

  // Handle Checkout (pass updated cart data)
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    const cartDataString = encodeURIComponent(JSON.stringify(cartItems));
    router.push(`/final-checkout?cartData=${cartDataString}`);
  };

  // Handle Continue Shopping (redirect to shop page)
  const handleContinueShopping = () => {
    router.push("/shop"); // Change "/shop" to your actual shopping page route
  };

  return (
    <Layout>
      <AccountBag />
      <div className="container mx-auto p-6" style={{ fontFamily: "Times New Roman, serif" }}>
        <h1 className="text-2xl font-bold text-center mb-6">Cart</h1>

        <div className="border p-4 rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Product</th>
                <th className="text-center p-2">Quantity</th>
                <th className="text-right p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center p-4 text-gray-500">Your cart is empty.</td>
                </tr>
              ) : (
                cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    {/* Product Image & Details */}
                    <td className="flex items-center p-4">
                      <Image src={item.image || "/image21.png"} alt={item.name} width={70} height={70} className="rounded-md" />
                      <div className="ml-4">
                        <p className="text-lg">{item.name}</p>
                        <p className="text-gray-500 text-sm">Red / 5</p>
                      </div>
                    </td>

                    {/* Quantity with Increment & Decrement Buttons */}
                    <td className="text-center p-4">
                      <div className="flex items-center justify-center space-x-3">
                        <button 
                          onClick={() => handleDecreaseQuantity(item.id)}
                          className="px-3 py-1 bg-gray-300 rounded-md"
                        >
                          -
                        </button>
                        <span className="text-lg">{item.quantity || 1}</span>
                        <button 
                          onClick={() => handleIncreaseQuantity(item.id)}
                          className="px-3 py-1 bg-gray-300 rounded-md"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Total Price (price * quantity) */}
                    <td className="text-right p-4">${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Subtotal Section */}
          <div className="flex justify-between items-center border-t pt-4 mt-4">
            <p className="text-xl font-bold">Subtotal</p>
            <p className="text-xl">${getTotalPrice()}</p>
          </div>

          <div className="mt-6">
  {/* Checkout Button */}
  <button
    className={`w-full py-3 rounded-md text-white ${
      cartItems.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-black"
    }`}
    onClick={handleCheckout}
    disabled={cartItems.length === 0}
  >
    Checkout
  </button>

  {/* Continue Shopping Button (below checkout) */}
  <button
    className="w-full mt-3 py-3 bg-gray-200 text-black rounded-md"
    onClick={handleContinueShopping}
  >
    Continue Shopping
  </button>
</div>

        </div>
      </div>
    </Layout>
  );
}
