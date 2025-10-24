'use client';

import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0a0a0a] px-4 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-semibold mb-3">
              Our <span className="text-cyan-400">Products</span>
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
              Discover our innovative solutions designed to power your next big idea
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center text-gray-400">Loading Products (Anshu hates himself)...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}