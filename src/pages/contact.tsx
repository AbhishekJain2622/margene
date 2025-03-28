import Layout from "../components/Layout";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Image from "next/image";
import AccountBag from "../components/AccountBag";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
<Layout>
      {/* Background Decoration Image */}
      <Image 
        src="/images/3.png" 
        alt="Decoration" 
        width={500} 
        height={572} 
        priority 
        className="hidden md:block fixed top-0 right-1/2 translate-x-1/2 w-[300px] sm:w-[400px] md:w-[800px] opacity-60 z-5 pointer-events-none"
      />
 <div className="absolute bottom-0 right-0 w-[250px] md:w-[250px] opacity-80">
        <Image
          src="/images/1.png"
          alt="Background Image"
          width={300}
          height={300}
          className="w-full h-auto"
        />
      </div>
      {/* Gray Box Section */}
      <div className="min-h-screen flex flex-col justify-center items-center p-4">
        
        {/* Gray Box */}
        <div className="bg-[#D9D9D9] w-[280px] h-[280px] md:w-96 md:h-96 mb-8 flex items-center justify-center">
          {/* Empty box - Add content here if needed */}
        </div>

        {/* Logo & Email */}
        <div className="text-center space-y-4">
          <Image
            src="/logo.png"
            alt="Margine Logo"
            width={160}
            height={50}
            className="h-auto"
            unoptimized={true} // Optional if using local images without a loader
          />

          <p className="text-gray-600 text-[20px] md:text-xl">
            info@margine.co.uk
          </p>
        </div>
      </div>
    </Layout>
  );
}
