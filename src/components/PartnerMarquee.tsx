import React from 'react';
import { motion } from 'framer-motion';

export default function PartnerMarquee() {
  const partners = [
    { name: 'BANDAI NAMCO', logo: '/partners/bandai-namco-logo-web-desktop.svg', tagline: 'Entertainment' },
    { name: 'GOOD SMILE', logo: '/partners/goodsmile.svg', tagline: 'Creative Studio' },
    { name: 'LEZHIN', logo: '/partners/lezhin.svg', tagline: 'Digital Publishing' },
    { name: 'WLS', logo: '/partners/wls-lg.svg', tagline: 'Industry Partner' },
  ];

  return (
    <section className="relative overflow-hidden bg-surface/50 backdrop-blur-sm border-b border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-xs uppercase tracking-widest text-porcelain/50">Official Partners & Contributors</h2>
      </div>

      <div className="flex">
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-8 min-w-max px-4"
        >
          {[...partners, ...partners, ...partners].map((partner, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, scale: 1.02 }}
              className="flex flex-col items-center justify-center gap-3 px-8 py-6 rounded-xl card-glass hover:border-razzmatazz/30 transition-all whitespace-nowrap min-w-max"
            >
              <img src={partner.logo} alt={partner.name} className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
              <div className="flex flex-col items-center gap-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-porcelain">{partner.name}</div>
                <div className="text-[8px] text-porcelain/40 uppercase tracking-tighter">{partner.tagline}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
