'use client';

import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import Navbar from '@/components/Navbar';

export default function Contact() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0a0a0a] px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-semibold mb-3">
              Get In <span className="text-cyan-400">Touch</span>
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Have a question or want to work together? We'd love to hear from you.
            </p>
          </motion.div>

          <ContactForm />
        </div>
      </div>
    </>
  );
}