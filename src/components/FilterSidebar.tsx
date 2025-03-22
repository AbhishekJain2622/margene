"use client"; // ✅ Ensures this component runs only on the client side

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Define Props Interface ✅
interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // ✅ Prevents hydration issues

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 right-0 w-full sm:w-[350px] h-full bg-white shadow-lg p-6 overflow-y-auto z-50"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Filter & Refine</h2>
        <button onClick={onClose} className="text-gray-600 text-xl">✖</button>
      </div>

      {/* Sort By */}
      <div className="mt-4">
        <h3 className="text-md font-semibold">SORT BY</h3>
        {["A to Z", "Z to A", "Best Selling", "Price Low to High", "Price High to Low"].map((sort, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <input type="checkbox" className="w-4 h-4" id={`sort-${index}`} />
            <label htmlFor={`sort-${index}`} className="text-gray-700">{sort}</label>
          </div>
        ))}
      </div>

      {/* Colors */}
      <div className="mt-4">
        <h3 className="text-md font-semibold">COLOUR:</h3>
        {[
          { name: "Black", color: "bg-black" },
          { name: "Beige", color: "bg-yellow-200" },
          { name: "Brown", color: "bg-yellow-700" },
          { name: "Burgundy", color: "bg-red-700" },
          { name: "Green", color: "bg-green-500" },
          { name: "Grey", color: "bg-gray-400" },
        ].map((item, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <div className={`w-4 h-4 ${item.color} border border-gray-400`}></div>
            <span className="text-gray-700">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Sizes */}
      <div className="mt-4">
        <h3 className="text-md font-semibold">SIZES:</h3>
        {[6, 8, 10, 12, 14, 16, 18, 20, 22, 24].map((size) => (
          <div key={size} className="flex items-center space-x-2 mt-2">
            <input type="checkbox" className="w-4 h-4" id={`size-${size}`} />
            <label htmlFor={`size-${size}`} className="text-gray-700">{size}</label>
          </div>
        ))}
      </div>

      {/* Apply Button */}
      <button className="w-full mt-6 py-3 bg-black text-white rounded-md text-lg">
        APPLY
      </button>
    </motion.div>
  );
}



// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";

// interface FilterSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
//   const [selectedFilters, setSelectedFilters] = useState({
//     sortBy: "",
//     color: "",
//     size: "",
//   });

//   const handleFilterChange = (category: string, value: string) => {
//     setSelectedFilters((prev) => ({
//       ...prev,
//       [category]: value,
//     }));
//   };

//   return (
//     <motion.div
//       initial={{ x: "100%" }}
//       animate={{ x: isOpen ? "0%" : "100%" }}
//       transition={{ type: "spring", stiffness: 100 }}
//       className={`fixed top-7 bottom-5 right-4 h-[90vh] w-full sm:w-[350px] bg-white shadow-lg p-6 overflow-y-auto transition-all ${
//         isOpen ? "border border-gray-300" : "hidden"
//       }`}
//     >
//       {/* Close Button */}
//       <button
//         onClick={onClose}
//         className="text-[24px] font-bold absolute top-4 right-4"
//       >
//         ✖
//       </button>

//       <h2 className="text-xl font-bold mb-6">Filter & Refine</h2>

//       {/* SORT BY */}
//       <div className="mb-4">
//         <h3 className="text-md font-semibold mb-2">SORT BY</h3>
//         {["A to Z", "Z to A", "Best Selling", "Price Low to High", "Price High to Low"].map((option) => (
//           <label key={option} className="flex items-center space-x-2 text-gray-700">
//             <input
//               type="radio"
//               name="sortBy"
//               value={option}
//               checked={selectedFilters.sortBy === option}
//               onChange={() => handleFilterChange("sortBy", option)}
//               className="w-4 h-4"
//             />
//             <span>{option}</span>
//           </label>
//         ))}
//       </div>

//       {/* COLORS */}
//       <div className="mb-4">
//         <h3 className="text-md font-semibold mb-2">COLOUR</h3>
//         {[
//           { name: "Black", color: "bg-black" },
//           { name: "Beige", color: "bg-yellow-200" },
//           { name: "Brown", color: "bg-yellow-700" },
//           { name: "Burgundy", color: "bg-red-700" },
//           { name: "Green", color: "bg-green-500" },
//           { name: "Grey", color: "bg-gray-400" },
//         ].map((item) => (
//           <label key={item.name} className="flex items-center space-x-2 text-gray-700">
//             <input
//               type="radio"
//               name="color"
//               value={item.name}
//               checked={selectedFilters.color === item.name}
//               onChange={() => handleFilterChange("color", item.name)}
//               className="w-4 h-4"
//             />
//             <div className={`w-4 h-4 ${item.color} border border-gray-400`}></div>
//             <span>{item.name}</span>
//           </label>
//         ))}
//       </div>

//       {/* SIZES */}
//       <div className="mb-6">
//         <h3 className="text-md font-semibold mb-2">SIZES</h3>
//         {[6, 8, 10, 12, 14, 16, 18, 20, 22, 24].map((size) => (
//           <label key={size} className="flex items-center space-x-2 text-gray-700">
//             <input
//               type="radio"
//               name="size"
//               value={size}
//               checked={selectedFilters.size === String(size)}
//               onChange={() => handleFilterChange("size", String(size))}
//               className="w-4 h-4"
//             />
//             <span>{size}</span>
//           </label>
//         ))}
//       </div>

//       {/* Apply Button */}
//       <button className="w-full bg-black text-white py-3 rounded-md text-lg hover:bg-gray-800">
//         APPLY
//       </button>
//     </motion.div>
//   );
// }
