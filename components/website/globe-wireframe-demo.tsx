'use client';

import GlobeWireframe from '@/components/ui/globe-wireframe';
import { motion } from 'framer-motion';

export default function GlobeWireframeDemo() {
  return (
    <div className='relative w-full h-[520px] sm:h-[850px] overflow-hidden bg-background border-t border-border/40'>
      <div className='relative z-10 flex flex-col items-center pt-10 sm:pt-32 text-center px-4'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='font-serif font-light tracking-tight leading-tight text-foreground text-4xl sm:text-6xl md:text-7xl max-w-3xl'
        >
          <span className='block mb-2'>Connecting the World</span>
          <span className='block text-muted-foreground'>Through Innovation</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-4 sm:mt-8 text-base sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
        >
          We offer comprehensive worldwide delivery and end-to-end logistics solutions. From our manufacturing facilities directly to your global distribution centers, we ensure your apparel arrives on time, fully compliant, and in pristine condition.
        </motion.p>
      </div>

      <div 
        className='absolute bottom-[-55%] sm:bottom-[-40%] md:bottom-[-45%] lg:bottom-[-50%] left-1/2 w-[150%] sm:w-[110%] md:w-[90%] lg:w-[70%] -translate-x-1/2 aspect-square'
        style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent 10%, black 40%)', maskImage: 'linear-gradient(to bottom, transparent 10%, black 40%)' }}
      >
        <GlobeWireframe className='w-full aspect-square opacity-80' variant='solid' scale={0.9} />
      </div>
    </div>
  );
}
