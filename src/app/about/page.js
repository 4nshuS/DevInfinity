'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

export default function About() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0a0a0a] px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-semibold mb-3">
              About <span className="text-cyan-400">Us</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-black/20 backdrop-blur-sm border border-white/5 rounded-2xl p-8"
          >
            <div className="space-y-6 text-gray-400 text-sm md:text-base leading-relaxed">
              <p>
                Development Infinity is a dynamic creative studio that goes beyond traditional game development. Founded by Ianfinity and co-founded by Anshu, the company is built on a vision of blending innovation, technology, and artistry to create experiences that inspire and entertain.
              </p>
              
              <p>
                While games remain at the core of its mission, Development Infinity also explores a wide range of digital products.. from interactive tools and apps to immersive experiences that push the boundaries of design and storytelling. The studio prides itself on its forward-thinking culture, where creativity meets technical mastery to craft products that resonate with players and users alike.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">What We Do</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Crafting immersive games, including a spine-chilling horror experience currently in production.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Pushing the limits of game engines through powerful and efficient technical solutions.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Building innovative digital products that merge creativity, technology, and design.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Collaborating with creators worldwide to inspire new ideas and redefine interactive media.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}