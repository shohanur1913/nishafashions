"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-12 overflow-hidden border-b border-border/40 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Contact Us With Ease
            </h2>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6">
              Get in touch.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
              Whether you are looking to start a new production run or have questions about our capabilities, our team is ready to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div className="flex items-start space-x-6">
              <div className="mt-1 p-3 bg-muted rounded-full">
                <MapPin className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Registered Address
                </h3>
                <p className="text-lg font-light leading-relaxed">
                  92, MONESWAR ROAD, <br />
                  ZIGATOLA, DHAKA-1209, <br />
                  BANGLADESH.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="mt-1 p-3 bg-muted rounded-full">
                <Phone className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Call Us
                </h3>
                <div className="text-lg font-light leading-relaxed space-y-1 flex flex-col">
                  <a href="tel:+8801715645766" className="hover:text-primary transition-colors">+88-01715645766</a>
                  <a href="tel:+8801819225841" className="hover:text-primary transition-colors">+88-01819225841</a>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="mt-1 p-3 bg-muted rounded-full">
                <Mail className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Email Us
                </h3>
                <div className="text-lg font-light leading-relaxed space-y-1 flex flex-col">
                  <a href="mailto:info@nishafashions.com" className="hover:text-primary transition-colors">info@nishafashions.com</a>
                  <a href="mailto:nazib@nishafashions.com" className="hover:text-primary transition-colors">nazib@nishafashions.com</a>
                  <a href="mailto:nisha.fashions@gmail.com" className="hover:text-primary transition-colors">nisha.fashions@gmail.com</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-muted/10 p-8 sm:p-10 rounded-2xl border border-border/50"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <p className="text-xs text-muted-foreground mb-6">Required fields are marked *</p>
              
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Your Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  placeholder="Enter your Name"
                  className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all font-light"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Your Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  placeholder="Enter your Email Address"
                  className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all font-light"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject *</label>
                <input 
                  type="text" 
                  id="subject" 
                  required
                  placeholder="Enter your Subject"
                  className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all font-light"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Your Message *</label>
                <textarea 
                  id="message" 
                  required
                  rows={5}
                  placeholder="Enter your Message"
                  className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all font-light resize-none"
                ></textarea>
              </div>

              <Button type="submit" className="w-full h-12 rounded-md font-semibold tracking-wide uppercase text-xs">
                Send Message
              </Button>
            </form>
          </motion.div>

        </div>
      </section>

      {/* Map Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mt-32"
      >
        <div className="w-full h-[500px] bg-muted relative">
          <iframe 
            src="https://maps.google.com/maps?q=92,+MONESWAR+ROAD,+ZIGATOLA,+DHAKA-1209,+BANGLADESH&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 grayscale contrast-125 opacity-80 mix-blend-multiply dark:mix-blend-screen dark:opacity-60"
            title="Nisha Fashions Wear Location"
          ></iframe>
        </div>
      </motion.section>
    </div>
  );
}
