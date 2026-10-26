'use client';

import GlobeWireframe from '@/components/ui/globe-wireframe';
import { motion } from 'framer-motion';

export default function GlobeWireframeDemo() {
  return (
    <div className='relative w-full h-[480px] sm:h-[680px] overflow-hidden bg-background border-t border-border/40'>
      <div className='relative z-10 flex flex-col items-center pt-6 sm:pt-10 text-center px-4'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='font-serif font-light tracking-tight leading-tight text-foreground text-3xl sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl'
        >
          <span className='block mb-1 sm:mb-2'>Connecting the World</span>
          <span className='block text-muted-foreground'>Through Innovation</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-3 sm:mt-8 text-sm sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
        >
          We offer comprehensive worldwide delivery and end-to-end logistics solutions. From our manufacturing facilities directly to your global distribution centers, we ensure your apparel arrives on time, fully compliant, and in pristine condition.
        </motion.p>
      </div>

      <div 
        className='absolute bottom-[-45%] sm:bottom-[-40%] md:bottom-[-45%] lg:bottom-[-50%] left-1/2 w-[130%] sm:w-[105%] md:w-[85%] lg:w-[68%] -translate-x-1/2 aspect-square pointer-events-auto overflow-hidden'
      >
        <GlobeWireframe className='w-full aspect-square opacity-85' variant='solid' scale={0.9} />
        {/* High performance hardware-accelerated fade overlay */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" 
        />
      </div>
    </div>
  );
}
