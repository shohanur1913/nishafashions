"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChoiceChips, ChoiceChip } from "@/components/ui/choice-chips";

export const openQuoteModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-quote-modal"));
  }
};

export function QuoteModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-quote-modal", handleOpen);
    return () => window.removeEventListener("open-quote-modal", handleOpen);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex justify-center items-end sm:items-center p-0 sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              className="w-full max-w-4xl bg-background border border-border shadow-2xl rounded-t-2xl sm:rounded-2xl pointer-events-auto relative flex flex-col h-[90vh] sm:h-auto sm:max-h-[85vh]"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors z-20"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              <div className="flex-1 overflow-y-auto flex flex-col sm:grid sm:grid-cols-1 lg:grid-cols-12 rounded-t-2xl sm:rounded-2xl">
                
                {/* Left Side: Info */}
                <div className="hidden lg:flex flex-col lg:col-span-4 bg-muted/30 p-8 border-r border-border/40">
                  <h3 className="font-serif text-2xl font-light mb-6">Request for quotation.</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
                    The more detail you are able to provide, the more accurate our initial costing will be. Only fields marked with an asterisk are required.
                  </p>

                  <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">What happens next</h4>
                  <ul className="space-y-4 text-xs text-muted-foreground font-light leading-relaxed">
                    <li className="flex gap-3"><span className="text-foreground">1.</span> A merchandiser picks up your enquiry and confirms receipt.</li>
                    <li className="flex gap-3"><span className="text-foreground">2.</span> We come back with questions if anything is unclear.</li>
                    <li className="flex gap-3"><span className="text-foreground">3.</span> You receive an indicative FOB costing and a development calendar.</li>
                    <li className="flex gap-3"><span className="text-foreground">4.</span> If terms are acceptable, we proceed to sampling. No charge if not.</li>
                  </ul>

                  <div className="mt-12 pt-8 border-t border-border/40">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">Contact Directly</h4>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      You may send tech packs directly to: <br/>
                      <a href="mailto:info@nishafashions.com" className="text-foreground font-medium hover:underline">info@nishafashions.com</a><br/>
                      <a href="mailto:nazib@nishafashions.com" className="text-foreground font-medium hover:underline">nazib@nishafashions.com</a>
                    </p>
                  </div>
                </div>

                {/* Right Side: Form */}
                <div className="col-span-1 lg:col-span-8 p-6 sm:p-8 lg:p-10 pt-12 sm:pt-10">
                  <h3 className="font-serif text-2xl font-light mb-8 lg:hidden">Request for quotation.</h3>
                  
                  <form onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }} className="space-y-8">
                    
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Your Name *</label>
                        <Input required placeholder="Jane Doe" clearable />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Company *</label>
                        <Input required placeholder="Acme Corp" clearable />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Email *</label>
                        <Input type="email" required placeholder="jane@acme.com" clearable />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Phone / WhatsApp</label>
                        <Input type="tel" placeholder="+44 7700 900000" clearable />
                      </div>
                    </div>

                    {/* Logistics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Destination Country *</label>
                        <Input required placeholder="e.g. United Kingdom" clearable />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Preferred Incoterm</label>
                        <select className="w-full px-0 py-2 h-8 bg-transparent border-b border-line-2 focus:border-foreground focus:outline-none transition-colors rounded-none font-light text-foreground text-[13px]">
                          <option>Not sure yet</option>
                          <option>FOB (Free on Board)</option>
                          <option>CIF (Cost, Insurance & Freight)</option>
                          <option>DDP (Delivered Duty Paid)</option>
                        </select>
                      </div>
                    </div>

                    {/* Categories Checkboxes */}
                    <div className="space-y-4">
                      <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Product Categories</label>
                      <ChoiceChips multiple={true} clearable={false}>
                        {['Knitwear', 'Woven', 'Sweater', 'Denim', 'Uniforms', 'Kidswear'].map(cat => (
                          <ChoiceChip key={cat} value={cat}>{cat}</ChoiceChip>
                        ))}
                      </ChoiceChips>
                    </div>

                    {/* Program Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Estimated Quantity *</label>
                        <select required className="w-full px-0 py-2 h-8 bg-transparent border-b border-line-2 focus:border-foreground focus:outline-none transition-colors rounded-none font-light text-foreground text-[13px]">
                          <option value="">Select a range</option>
                          <option>500 - 1,000 pcs</option>
                          <option>1,000 - 5,000 pcs</option>
                          <option>5,000 - 10,000 pcs</option>
                          <option>10,000+ pcs</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Number of Styles</label>
                        <Input type="number" placeholder="e.g. 6" clearable />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Target FOB Price (Optional)</label>
                        <Input placeholder="e.g. USD 4.20" clearable />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Required Delivery Date</label>
                        <Input type="date" clearable />
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Fabric / material spec</label>
                        <Input placeholder="e.g. 180 GSM single jersey, 100% combed cotton" clearable />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Tell us about the product *</label>
                        <textarea required rows={4} placeholder="Describe the styles, sizes, colours, print or embroidery, packing needs, certifications required..." className="w-full px-3 py-2 bg-transparent border border-line-2 focus:border-foreground focus:outline-none transition-colors rounded-md font-light resize-none text-[13px]" />
                      </div>
                    </div>

                    {/* Extra options */}
                    <div className="space-y-4">
                      <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Anything Else?</label>
                      <ChoiceChips multiple={true} clearable={false}>
                        {['Need NDA first', 'Compliance certificates', 'Organic / recycled', 'Factory visit'].map(opt => (
                          <ChoiceChip key={opt} value={opt}>{opt}</ChoiceChip>
                        ))}
                      </ChoiceChips>
                    </div>

                    <div className="pt-4 border-t border-border/40 pb-8">
                      <button type="submit" className="w-full sm:w-auto px-8 py-4 bg-foreground text-background font-semibold text-xs uppercase tracking-widest hover:bg-foreground/90 transition-colors">
                        Send Enquiry
                      </button>
                      <p className="text-[10px] text-muted-foreground mt-4 leading-relaxed max-w-md">
                        By sending this enquiry you agree that we may contact you about it. We do not sell or share your details, and your designs stay confidential.
                      </p>
                    </div>

                  </form>
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
