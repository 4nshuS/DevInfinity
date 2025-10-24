'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProductModal({ product, isOpen, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  if (!product) return null;

  const allImages = [product.starImage, ...(product.productImages || [])].filter(Boolean);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentImageIndex]);

  const handleBuyClick = () => {
    const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;
    
    if (stripePaymentLink) {
      window.open(stripePaymentLink, '_blank', 'noopener,noreferrer');
    } else {
      console.error('Stripe payment link not configured');
      alert('Payment link is not configured. Please contact support.');
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />
            
            <motion.div
              className="relative w-full max-w-5xl bg-black/30 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.3, bounce: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-5 right-5 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all duration-200 border border-white/10"
              >
                <X size={18} className="text-white/80" />
              </button>

              <div className="flex flex-col md:flex-row max-h-[85vh]">
                <div className="w-full md:w-1/2 bg-black/20 p-6 md:p-8 flex items-center justify-center">
                  <div className="w-full max-w-md">
                    <div 
                      className="relative aspect-square rounded-2xl overflow-hidden bg-black/40 mb-4 cursor-pointer group border border-white/5"
                      onClick={() => setSelectedImage(allImages[currentImageIndex])}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      {allImages[currentImageIndex] && (
                        <Image
                          src={allImages[currentImageIndex]}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                      
                      {allImages.length > 1 && (
                        <>
                          <motion.button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 border border-white/10"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ChevronLeft size={20} className="text-white/90" />
                          </motion.button>
                          <motion.button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 border border-white/10"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ChevronRight size={20} className="text-white/90" />
                          </motion.button>
                        </>
                      )}

                      {allImages.length > 1 && (
                        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white/90 text-xs font-medium border border-white/10">
                          {currentImageIndex + 1} / {allImages.length}
                        </div>
                      )}
                    </div>

                    {allImages.length > 1 && (
                      <div className="flex items-center justify-center gap-2">
                        {allImages.map((_, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`transition-all duration-300 rounded-full ${
                              currentImageIndex === idx
                                ? 'w-8 h-2 bg-cyan-400'
                                : 'w-2 h-2 bg-gray-500 hover:bg-gray-400'
                            }`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto custom-scrollbar">
                  <div className="space-y-6">
                    <div>
                      <motion.h2 
                        className="text-2xl md:text-3xl font-bold text-white/95 mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {product.name}
                      </motion.h2>
                      <motion.div 
                        className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: 64 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      />
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-xs uppercase tracking-wider text-cyan-400/80 font-semibold mb-2">
                        Description
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {product.description}
                      </p>
                    </motion.div>

                    {product.documentation && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-xs uppercase tracking-wider text-cyan-400/80 font-semibold mb-2">
                          Documentation
                        </h3>
                        <a
                          href={product.documentation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors group"
                        >
                          <span>View Documentation</span>
                          <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      </motion.div>
                    )}

                    {product.credits && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="text-xs uppercase tracking-wider text-cyan-400/80 font-semibold mb-2">
                          Credits
                        </h3>
                        <p className="text-gray-400 text-sm">{product.credits}</p>
                      </motion.div>
                    )}

                    {/* Buy Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="pt-4"
                    >
                      <motion.button
                        onClick={handleBuyClick}
                        className="w-full px-6 py-3 rounded-full text-sm font-medium bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/20 hover:border-cyan-400/50 backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ShoppingCart size={16} className="group-hover:rotate-12 transition-transform duration-200" />
                        <span>Purchase Now</span>
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            
            <motion.div
              className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage}
                  alt="Full size"
                  fill
                  className="object-contain"
                />
              </div>

              {allImages.length > 1 && (
                <>
                  <motion.button
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      prevImage(); 
                      setSelectedImage(allImages[(currentImageIndex - 1 + allImages.length) % allImages.length]); 
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all duration-200 border border-white/10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft size={24} className="text-white/90" />
                  </motion.button>
                  <motion.button
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      nextImage(); 
                      setSelectedImage(allImages[(currentImageIndex + 1) % allImages.length]); 
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all duration-200 border border-white/10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight size={24} className="text-white/90" />
                  </motion.button>
                </>
              )}
              <motion.button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all duration-200 border border-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={24} className="text-white/90" />
              </motion.button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm text-white/90 text-sm font-medium border border-white/10">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(6, 182, 212, 0.3) rgba(255, 255, 255, 0.05);
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.3);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.5);
        }
      `}</style>
    </>
  );
}