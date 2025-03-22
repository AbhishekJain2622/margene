import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";
import AccountBag from "../components/AccountBag";

export default function Alter() {
  return (
    <Layout>
      <AccountBag />
      {/* Top Navigation */}
      <div className="flex justify-between mt-10 text-sm mb-6">
        <div></div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 mt-10">
        {/* Placeholder for Image */}
        <div className="w-full md:w-[400px] h-[350px] md:h-[450px] bg-gray-300"></div>

        {/* Text Content */}
        <div className="max-w-full w-full text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Alter : Launching Spring 2025
          </h2>
          <p className="mt-8 text-[18px] leading-6">
            Introducing ‘Alter’, a simple and convenient way to ensure your Margene
            trousers always fit just right. Launching Spring 2025, this service
            connects you with trusted local dry cleaners and tailors for professional
            alterations, making adjustments effortless and stress-free.
          </p>
          <p className="mt-8  text-[18px] leading-6">
            Simply access the Alter Platform via our website, choose your preferred
            location, and request hem or waist adjustments to suit your needs. The
            alteration costs are already covered in the price of your trousers, giving
            you the freedom to customize your fit as often as you like.
          </p>
          <p className="mt-8  text-[18px] leading-6">
            From the day you decide to buy a pair for yourself to the day you decide to
            pass them down to your daughter, Margene will be there.
          </p>
        </div>
      </div>

      {/* Footer Subscription */}
      <div className="text-center  text-[18px] mt-10  text-gray-500">
        <p>Subscribe to the seasonal newsletter for the insider.</p>
        <p>At home or afar, a tailor at the surface.</p>
        <p className="mt-2 underline cursor-pointer hover:text-black">Subscribe</p>
      </div>

      {/* Fixed Background Image */}
      <div className="absolute bottom-0 right-0 w-[250px] md:w-[250px] opacity-80">
        <Image
          src="/images/1.png"
          alt="Background Image"
          width={300}
          height={300}
          className="w-full h-auto"
        />
      </div>
    </Layout>
  );
}