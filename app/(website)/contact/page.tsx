"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";
import { ContactMap } from "@/components/website/contact-map";

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
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
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
              <div className="w-full">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Call Us
                </h3>
                <ul className="text-lg font-light leading-relaxed space-y-2 mb-4">
                  <li>
                    <a href="tel:+8801715645766" className="hover:text-accent transition-colors block py-1 border-b border-border/40 hover:border-accent/50">
                      +880 1715 645766
                    </a>
                  </li>
                  <li>
                    <a href="tel:+8801819225841" className="hover:text-accent transition-colors block py-1 border-b border-border/40 hover:border-accent/50">
                      +880 1819 225841
                    </a>
                  </li>
                </ul>
                <a 
                  href="https://wa.me/8801715645766" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-[#25D366] hover:bg-[#1ebd5b] text-white text-sm font-medium rounded-md transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="mt-1 p-3 bg-muted rounded-full">
                <Mail className="w-5 h-5 text-foreground" />
              </div>
              <div className="w-full">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Email Us
                </h3>
                <ul className="text-lg font-light leading-relaxed space-y-2">
                  <li>
                    <a href="mailto:info@nishafashions.com" className="hover:text-accent transition-colors block py-1 border-b border-border/40 hover:border-accent/50">
                      info@nishafashions.com
                    </a>
                  </li>
                  <li>
                    <a href="mailto:nazib@nishafashions.com" className="hover:text-accent transition-colors block py-1 border-b border-border/40 hover:border-accent/50">
                      nazib@nishafashions.com
                    </a>
                  </li>
                  <li>
                    <a href="mailto:nisha.fashions@gmail.com" className="hover:text-accent transition-colors block py-1 border-b border-border/40 hover:border-accent/50">
                      nisha.fashions@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-muted/10 p-6 sm:p-10 rounded-2xl border border-border/50"
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
                  className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all font-light"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Your Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  placeholder="Enter your Email Address"
                  className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all font-light"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject *</label>
                <input 
                  type="text" 
                  id="subject" 
                  required
                  placeholder="Enter your Subject"
                  className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all font-light"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Your Message *</label>
                <textarea 
                  id="message" 
                  required
                  rows={5}
                  placeholder="Enter your Message"
                  className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all font-light resize-none"
                ></textarea>
              </div>

              <Button type="submit" className="w-full h-12 rounded-full font-semibold tracking-wide uppercase text-xs">
                Send Message
              </Button>
            </form>
          </motion.div>

        </div>
      </section>

      {/* Map Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl mt-16 sm:mt-24"
      >
        <ContactMap />
      </motion.section>
    </div>
  );
}
