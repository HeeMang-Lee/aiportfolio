"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer className="py-16 px-6 border-t border-gray-200 dark:border-dark-border">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto text-center"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
          Built with Next.js &middot; Designed &amp; Developed by{" "}
          <span className="text-toss-blue font-medium">이희망</span>
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          &copy; 2026 이희망. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
