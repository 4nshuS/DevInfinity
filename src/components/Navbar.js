'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, staggerChildren: 0.03 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.15 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'blur(10px) saturate(180%)',
        }}
        className="fixed top-3 left-0 right-0 z-50 px-4"
      >
        <div className="bg-black/25 border border-white/10 rounded-full flex justify-between items-center max-w-6xl mx-auto px-6 py-1.5 shadow-lg shadow-black/20">
          
          <Link href="/">
            <motion.span 
              className="text-white/80 text-xs font-medium hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Development Infinity
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <motion.div
                  className={clsx(
                    'px-4 py-1.5 rounded-full text-xs font-medium relative transition-colors duration-200',
                    pathname === item.path
                      ? 'text-cyan-400'
                      : 'text-white/60 hover:text-white/90'
                  )}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="relative z-10">{item.name}</span>
                  {pathname === item.path && (
                    <motion.div
                      layoutId="navbar-pill"
                      className="absolute inset-0 bg-cyan-500/15 rounded-full border border-cyan-400/20"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          <Link href="/contact" className="hidden md:block">
            <motion.div
              className="px-4 py-1.5 rounded-full text-xs font-medium text-cyan-400/90 border border-cyan-400/30 bg-transparent hover:bg-cyan-500/5 hover:border-cyan-400/40 transition-all duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact
            </motion.div>
          </Link>

          <motion.button
            className="md:hidden p-1.5"
            onClick={() => setOpen(!open)}
            whileTap={{ scale: 0.9 }}
          >
            {open ? <X size={20} className="text-white/80" /> : <Menu size={20} className="text-white/80" />}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
            <motion.div
              className="absolute top-16 right-4 w-48 p-4 rounded-2xl bg-gray-900/90 border border-white/10 shadow-xl flex flex-col gap-2"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {navItems.map((item) => (
                <motion.div key={item.path} variants={linkVariants}>
                  <Link
                    href={item.path}
                    onClick={closeMenu}
                    className={clsx(
                      'block px-4 py-2 rounded-xl text-center text-sm font-medium transition-all duration-200',
                      pathname === item.path
                        ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-400/20'
                        : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div variants={linkVariants}>
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="block px-4 py-2 rounded-xl text-center text-sm font-medium text-cyan-400/90 border border-cyan-400/30 bg-transparent hover:bg-cyan-500/10 transition-all duration-200"
                >
                  Contact
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}