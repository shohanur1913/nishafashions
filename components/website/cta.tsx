"use client";

import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

export function CTA() {
  return (
    <section className="w-full py-10 sm:py-32 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-foreground leading-tight">
            Ready to scale your production with uncompromising quality?
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            From design inception to global delivery, our team is ready to engineer your supply chain. Let's discuss your next program.
          </p>
          
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <div className="w-full relative">
              <Input 
                prefix={<Mail />} 
                placeholder="Enter your email address"
                clearable
                className="h-14 sm:h-14 rounded-full border-line-2 shadow-sm"
                inputClassName="text-base"
              />
            </div>
            <button className="h-14 px-8 rounded-full text-sm font-semibold uppercase tracking-widest text-background bg-foreground hover:bg-zinc-800 transition-colors w-full sm:w-auto shrink-0 flex items-center justify-center shadow-md">
              Start Conversation
              <ArrowRight className="ml-3 w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
