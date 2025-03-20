import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const isStorePage: boolean = true;

interface CollectionItem {
  id: number;
  src: string;
  title: string;
}

const collections: CollectionItem[] = [
  { id: 1, src: "/images/image1.png", title: "Collection 1" },
  { id: 2, src: "/images/image2.png", title: "Collection 2" },
  { id: 3, src: "/images/image3.png", title: "Collection 3" },
  { id: 4, src: "/images/image4.png", title: "Collection 4" },
];

export default function Collection() {
  const router = useRouter();

  return (
    <Layout>
      {isStorePage && (
        <Image
          src="/images/2.png"
          alt="Background decoration"
          width={250}
          height={250}
          priority
          className="hidden md:block fixed bottom-0 left-2 w-[250px] h-auto opacity-100"
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-screen overflow-hidden bg-white"
      >
        {/* Grid Layout for 4 Collections */}
        <div className="grid grid-cols-2 gap-0 w-full h-screen">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden w-full h-full"
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
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300"></div>
              <p className="absolute bottom-4 left-4 text-white text-lg font-bold">
                {collection.title}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Layout>
  );
}