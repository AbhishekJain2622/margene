import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";

interface CartItem {
  id: string; // ✅ Ensuring id is a string
  name: string;
  image?: string;
  price: number;
  quantity: number;
}

export default function CartPage(): React.ReactElement {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  // Ensure cartItems id is treated as a string
  const formattedCartItems: CartItem[] = cartItems.map((item) => ({
    ...item,
    id: String(item.id), // ✅ Convert id to string if needed
  }));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bag ({formattedCartItems.length})</h1>

      {formattedCartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="border p-4 rounded-lg shadow-md">
          {formattedCartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-2">
              <Image
                src={item.image ?? "/default-product.jpg"} // ✅ Fallback for missing images
                alt={item.name}
                width={64}
                height={64}
                className="object-cover rounded-md"
              />
              <div className="flex-1 px-4">
                <p className="font-semibold">{item.name}</p>
                <p>${Number(item.price).toFixed(2)}</p>  {/* ✅ Fixed price issue */}
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-2 border rounded"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-2 border rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 ml-2"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-4">
            <p className="text-right text-lg font-bold">
              Subtotal: ${Number(getTotalPrice() || 0).toFixed(2)}
            </p>  {/* ✅ Fixed subtotal calculation */}
          </div>

          <Link href="/checkout">
            <button className="w-full bg-black text-white py-2 mt-4">Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
}
