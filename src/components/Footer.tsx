import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full px-4 sm:px-8 md:px-16 py-6 border-t">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        {/* Left Side - Newsletter */}
        <div className="text-left">
          <p className="font-semibold text-lg sm:text-xl">Keep in touch !</p>
          <p className="italic text-sm sm:text-base text-gray-600">
            Stay in the loop and be the first to know about what&apos;s coming next
          </p>
        </div>

        {/* Right Side - Links */}
        <div className="flex space-x-4 sm:space-x-6 mt-4 sm:mt-0">
          <Link href="/terms-of-use">
            <span className="text-sm sm:text-base font-medium hover:underline cursor-pointer">
              Terms of use
            </span>
          </Link>
          <Link href="/shipping-returns">
            <span className="text-sm sm:text-base font-medium hover:underline cursor-pointer">
              Shipping & Returns
            </span>
          </Link>
          <Link href="/faq">
            <span className="text-sm sm:text-base font-medium hover:underline cursor-pointer">
              FAQ
            </span>
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <span className="text-sm sm:text-base font-medium hover:underline cursor-pointer">
              Instagram
            </span>
          </Link>
          <Link href="/contact">
            <span className="text-sm sm:text-base font-medium hover:underline cursor-pointer">
              Contact
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
