import { useRouter } from "next/router";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import AccountBag from "../../components/AccountBag";

const allImages: string[] = [
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png",
  "/images/image4.png",
  "/images/image5.png",
  "/images/image6.png",
  "/images/image7.png",
  "/images/image8.png",
  "/images/image9.png",
  "/images/image10.png",
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png",
  "/images/image4.png",
  "/images/image5.png",
  "/images/image6.png",
  "/images/image7.png",
  "/images/image8.png",
  "/images/image9.png",
  "/images/image10.png",
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png",
  "/images/image4.png",
  "/images/image5.png",
  "/images/image6.png",
  "/images/image7.png",
  "/images/image8.png",
  "/images/image9.png",
  "/images/image10.png",
];

export default function CollectionGallery() {
  const router = useRouter();
  const { id } = router.query;
  const { scrollYProgress } = useScroll();
  
  // Parallax effect configuration
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -200]);

  if (!id) return <p>Loading...</p>;

  return (
    <div className="relative bg-white min-h-screen w-full overflow-hidden">
      <div className="absolute top-5 right-5 z-50">
        <AccountBag />
      </div>

      {/* Masonry Grid Container */}
      <motion.div 
        style={{ y: yPos }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
      >
        {allImages.map((src: string, index: number) => {
          // Generate random height between 300-600px
          const randomHeight = 300 + Math.random() * 300;
          const aspectRatio = 0.66 + Math.random() * 0.5; // 0.66 to 1.16 ratio

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="relative overflow-hidden rounded-lg shadow-xl"
              style={{
                height: `${randomHeight}px`,
                aspectRatio: aspectRatio.toString(),
              }}
            >
              <Image
                src={src}
                alt={`Gallery Image ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
