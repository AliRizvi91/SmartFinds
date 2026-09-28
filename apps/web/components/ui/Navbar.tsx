'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from './Container';
import { Button } from './Button';
import Image from 'next/image';
import { UserMenu } from './UserMenu';
import { useMeQuery } from '@/features/auth/authApi';

const links = [
  { href: '/advertisers', label: 'For advertisers' },
  { href: '/publishers', label: 'For publishers' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/resources', label: 'Resources' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
    const { data: user, isLoading, error } = useMeQuery();
  

  return (
    <header className="absolute inset-0 w-full h-full">
    <div className="sticky md:top-5 top-0 z-50 border-b border-neutral-200/30 bg-black backdrop-blur w-full md:w-fit mx-auto md:rounded-full">
      <Container className="flex h-16 items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl text-paper flex justify-center items-center gap-2"
        >
          <Image
            src="https://res.cloudinary.com/dkbz23qyt/image/upload/v1789395841/Logo_e4qjnz.png"
            alt="SmartFinds"
            width={32}
            height={32}
            className="w-8 h-auto"
          />
          SmartFinds
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-5 md:flex mx-20"
          aria-label="Primary"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] transition-colors hover:text-purpleBright text-paper-raised"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Button */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Desktop User Menu */}
          <div className="hidden items-center md:flex">
            <UserMenu />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.05 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 15,
          }}
          className="md:hidden bg-[#ffffffd7] p-1 rounded-sm"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={open ? 'close' : 'menu'}
              initial={{
                opacity: 0,
                rotate: open ? -90 : 90,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                rotate: open ? 90 : -90,
                scale: 0.5,
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 20,
              }}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </Container>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{
              opacity: 0,
              height: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -10,
            }}
            transition={{
              height: {
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.2,
              },
              y: {
                type: 'spring',
                stiffness: 350,
                damping: 25,
              },
            }}
            className="border-t border-neutral-200/70 bg-[#0F1C1A] px-6 py-4 overflow-hidden md:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-4">
              {links.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.08 + index * 0.06,
                    type: 'spring',
                    stiffness: 350,
                    damping: 20,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-[15px] text-paper transition-colors hover:text-purpleBright"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}

              <motion.li
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.3,
                  type: 'spring',
                  stiffness: 300,
                  damping: 18,
                }}
                className="flex gap-3 pt-2"
              >
                <div className="pt-2">
                  <UserMenu />
                </div>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
    </header>
  );
}
