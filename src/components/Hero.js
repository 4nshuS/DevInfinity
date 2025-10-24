'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 leading-tight"
        >
          Development <span className="text-cyan-400">Infinity</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm sm:text-base md:text-lg text-gray-500 mb-8"
        >
          A Game Development & Production Studio founded by Ian and Anshu.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/about">
            <motion.button
              whileHover={{ scale: 1.02, borderColor: 'rgba(6, 182, 212, 0.6)' }}
              whileTap={{ scale: 0.98 }}
              className="px-6 sm:px-8 py-2 text-sm sm:text-base font-medium rounded-full text-cyan-400/90 border border-cyan-400/30 bg-transparent hover:bg-cyan-500/5 transition-all duration-300"
            >
              About Us
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}