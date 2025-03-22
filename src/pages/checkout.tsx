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

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0), 0).toFixed(2);
  };

  const handleCheckout = () => {
    const cartDataString = encodeURIComponent(JSON.stringify(cartItems));
    router.push(`/final-checkout?cartData=${cartDataString}`);
  };

  return (
    <Layout>
      <AccountBag />
      <div className="container mx-auto p-6" style={{ fontFamily: "Times New Roman, serif" }}>
        <h1 className="text-2xl font-bold mb-6">Cart</h1>
        <div className="border p-4 rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left border-b p-2">Product</th>
                <th className="text-left border-b p-2">Quantity</th>
                <th className="text-left border-b p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center p-4">
                    Your cart is empty.
                  </td>
                </tr>
              ) : (
                cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="flex items-center p-2">
                      <Image src={item.image || "/image21.png"} alt={item.name} width={70} height={70} className="rounded-md" />
                      <div className="ml-4">
                        <p className="text-lg">{item.name}</p>
                        <p className="text-gray-500">Red / 5</p>
                      </div>
                    </td>
                    <td className="p-2">1</td>
                    <td className="p-2">${(item.price || 0).toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <p className="text-right text-xl font-bold mt-4">Subtotal: ${getTotalPrice()}</p>

          {/* Checkout Button with Redirect */}
          <button 
            className="w-full bg-black text-white py-3 rounded-md mt-4"
            onClick={handleCheckout} // Redirect on click
          >
            Checkout
          </button>
        </div>
      </div>
    </Layout>
  );
}
