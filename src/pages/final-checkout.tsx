import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function FinalCheckout() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardHolder: "",
    useShippingAsBilling: true,
    saveInfo: false,
  });

  const handlePlaceOrder = () => {
    alert("Order Placed Successfully!");
    router.push("/order-confirmation");
  };

  return (
    <>
      {/* Logo Section */}
      <div className="flex justify-start mb-6 mt-5 ml-5">
        <Image src="/logo.png" alt="MARGENE Logo" width={150} height={50} />
      </div>
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section */}
          <div>
            {/* Email Section */}
            <div className="border p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">1. Email</h2>
                <button className="text-sm underline">Log In</button>
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 mt-2"
              />
              <p className="text-sm text-gray-600 mt-2">
                If you already have an account, you&apos;ll be able to log in; otherwise, you can checkout as a guest.
              </p>
              <button className="w-full bg-black text-white p-2 mt-4">
                Continue As Guest
              </button>
              <p className="text-center text-sm my-2">OR</p>
              <button className="w-full border p-2">Sign Up</button>
            </div>
            {/* Shipping Section */}
            <div className="border p-6 mt-6">
              <h2 className="text-lg font-semibold">2. Shipping</h2>
              <input type="text" placeholder="Country/Region" className="w-full border p-2 mt-2" />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <input type="text" placeholder="First name" className="border p-2" />
                <input type="text" placeholder="Last name" className="border p-2" />
              </div>
              <input type="text" placeholder="Address" className="w-full border p-2 mt-4" />
              <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full border p-2 mt-4" />
              <div className="grid grid-cols-3 gap-4 mt-4">
                <input type="text" placeholder="City" className="border p-2" />
                <input type="text" placeholder="State" className="border p-2" />
                <input type="text" placeholder="PIN Code" className="border p-2" />
              </div>
              <input type="text" placeholder="Phone" className="w-full border p-2 mt-4" />
            </div>
            {/* Payment Section */}
            <div className="border p-6 mt-6">
              <h2 className="text-lg font-semibold">3. Payment</h2>
              <input type="text" placeholder="Card number" className="w-full border p-2 mt-4" />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <input type="text" placeholder="Expiration date (MM / YY)" className="border p-2" />
                <input type="text" placeholder="Security code" className="border p-2" />
              </div>
              <input type="text" placeholder="Name on card" className="w-full border p-2 mt-4" />
              <button className="w-full bg-black text-white p-2 mt-4">Pay Now</button>
              <p className="text-sm text-gray-600 mt-2">
                If you already have an account, you&apos;ll be able to log in; otherwise, you can checkout as a guest.
              </p>
            </div>
          </div>
          {/* Order Summary Section */}
          <div className="p-6 bg-white w-full max-w-md mx-auto">
            <div className="flex items-start gap-4 border-b pb-4">
              <div className="relative w-16 h-16 border">
                <Image src="/image21.png" alt="Layered Trouser" width={64} height={64} />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 rounded-full">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">Layered Trouser - Pre Order</h3>
              </div>
              <p className="text-sm font-medium">₹413,300.00</p>
            </div>
            <div className="mt-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹413,300.00</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total</span>
                <span>INR ₹413,300.00</span>
              </div>
            </div>
            <button className="mt-4 w-full bg-black text-white py-2 text-center text-sm font-medium">Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}