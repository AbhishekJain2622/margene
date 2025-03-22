import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import AccountBag from "../components/AccountBag";

const collections = [
  { id: 1, src: "/images/image1.png", title: "Edition 1" },
  { id: 2, src: "/images/image2.png", title: "Edition 2" },
  { id: 3, src: "/images/image3.png", title: "Edition 3" },
  { id: 4, src: "/images/image4.png", title: "Edition 4" },
];

export default function Collection() {
  const router = useRouter();

  return (
    <Layout>
      {/* Sidebar (Left Navigation) */}
      <Image
        src="/images/4.png"
        alt="Decoration"
        width={275}
        height={200}
        className="absolute bottom-5 left-5 hidden md:block"
      />

    <AccountBag/>

      {/* Collection Grid (Full Width & Height) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute top-0 left-[10%] md:left-[20%] w-[90%] md:w-[80%] h-screen 
                  grid grid-cols-1 sm:grid-cols-2 gap-0"
      >
        {collections.map((collection, index) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative w-full h-full cursor-pointer overflow-hidden"
            onClick={() => router.push(`/collection/${collection.id}`)}
          >
            <Image
              src={collection.src}
              alt={collection.title}
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
            {/* Overlay & Text */}
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <p className="absolute bottom-4 left-4 text-black text-lg font-semibold">
              {collection.title}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Layout>
  );
}
