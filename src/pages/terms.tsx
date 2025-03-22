import Layout from "../components/Layout";
import Image from "next/image";

export default function Terms() {
  return (
    <Layout>
      {/* Background Image - Positioned behind content */}
      <div className="hidden md:block fixed top-0 right-1/2 translate-x-1/2 w-[80%] max-w-[700px] h-auto opacity-60 z-10 pointer-events-none">
        <Image
          src="/images/3.png"
          alt="Decoration"
          width={500}
          height={572}
          priority
          className="w-full h-auto"
        />
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-white px-6 sm:px-10 py-10 text-lg sm:text-[22px]" style={{ fontFamily: "Times New Roman" }}>
        <main className="max-w-4xl mx-auto mt-20 sm:mt-28">
          <p>
            Introducing <strong>‘Alter’</strong>, a simple and convenient way to ensure your Margene trousers always fit just right. Launching Spring 2025, this service connects you with trusted local dry cleaners and tailors for professional alterations, making adjustments effortless and stress-free.
          </p>
          <p className="mt-6">
            Simply access the <strong>Alter Platform</strong> via our website, choose your preferred location, and request basic or waist adjustments to suit your needs. The alteration costs are already covered in the price of your trousers, giving you the freedom to customize your fit as often as you like.
          </p>
          <p className="mt-6">
            From the day you decide to buy a pair for yourself to the day you decide to pass them down to your daughter, <strong>Margene</strong> will be there.
          </p>
        </main>
      </div>
    </Layout>
  );
}
