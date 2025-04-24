import React from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const AccordionFilter = ({ title, isOpen, toggle, children, count = 0 }) => (
  <div className="rounded-lg overflow-hidden shadow-lg bg-gray-800">
    <button
      onClick={toggle}
      className="w-full flex items-center justify-between bg-gray-700 hover:bg-gray-600 text-left py-3 px-4 text-white font-medium transition-all duration-300"
    >
      <div className="flex items-center space-x-3">
        <span
          className={`text-lg ${isOpen ? "text-amber-400" : "text-gray-400"}`}
        >
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
        <span className="flex-grow">{title}</span>
      </div>

      <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded-full">
        {count}
      </span>
    </button>

    <motion.div
      initial={false}
      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="p-4 space-y-2 text-sm text-gray-300">{children}</div>
    </motion.div>
  </div>
);

export default AccordionFilter;
