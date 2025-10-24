'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import ProductModal from './ProductModal';

export default function ProductCard({ product, index }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ y: -5 }}
        onClick={() => setShowModal(true)}
        className="cursor-pointer"
      >
        <div className="bg-black/20 backdrop-blur-sm border border-white/5 rounded-2xl p-6 h-full hover:border-cyan-400/20 transition-all duration-300 group">
          <div className="flex flex-col h-full">
            <div className="w-16 h-16 mb-4 relative rounded-xl overflow-hidden bg-gray-800/50">
              {product.starImage ? (
                <Image
                  src={product.starImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-cyan-400/50">
                  <span className="text-2xl">?</span>
                </div>
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
              {product.name}
            </h3>
            
            <p className="text-gray-500 text-sm mb-4 flex-grow line-clamp-2">
              {product.description}
            </p>
            
            <motion.div 
              className="flex items-center text-cyan-400/80 group-hover:text-cyan-400 transition-colors text-xs"
              whileHover={{ x: 3 }}
            >
              <span className="font-medium">View Details</span>
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <ProductModal 
        product={product} 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
}