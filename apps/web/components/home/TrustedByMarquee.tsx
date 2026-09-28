'use client';

import { motion } from 'framer-motion';
import { Container } from '../ui/Container';

import { SiGroupon, SiSamsung, SiSky, SiTui, SiUnderarmour, SiVodafone, SiAdidas, SiAliexpress, SiBookingdotcom, } from 'react-icons/si';
import {FaBuilding} from 'react-icons/fa';

const BRANDS = [{ name: 'Groupon', icon: SiGroupon }, { name: 'MCGEE & Co', icon: FaBuilding }, { name: 'Samsung', icon: SiSamsung }, { name: 'Sky', icon: SiSky }, { name: 'TUI', icon: SiTui }, { name: 'Under Armour', icon: SiUnderarmour }, { name: 'Vodafone', icon: SiVodafone }, { name: 'Adidas', icon: SiAdidas }, { name: 'AliExpress', icon: SiAliexpress }, { name: 'Booking.com', icon: SiBookingdotcom },];

export function TrustedByMarquee() {
  const loop = [...BRANDS, ...BRANDS];

  return (
    <section>
      <Container>
        <p className="text-center text-[18px] font-semibold text-neutral-500">
          Trusted by 1,200+ advertisers and 40,000+ publishers worldwide
        </p>

        <div
          className="relative py-8 overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <motion.div
            className="flex w-max items-center md:gap-26 gap-20 h-fit"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              x: {
                duration: 35,
                ease: 'linear',
                repeat: Infinity,
              },
            }}
          >
            {loop.map((brand, i) => {
              const Icon = brand.icon;

              return (
                <div
                  key={`${brand.name}-${i}`}
                  className="group flex shrink-0 items-center justify-center"
                  title={brand.name}
                >
                  <Icon
                    className="text-[45px] text-purple-dark cursor-pointer transition-all duration-300 group-hover:scale-110 group-hover:text-[#7129b0]"
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}