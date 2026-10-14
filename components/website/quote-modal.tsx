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
              data-theme="light"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              className="w-full max-w-4xl bg-white text-zinc-900 border border-zinc-200 shadow-2xl rounded-t-2xl sm:rounded-2xl pointer-events-auto relative flex flex-col h-[90vh] sm:h-auto sm:max-h-[85vh] overflow-hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors z-20 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-zinc-700" />
              </button>

              <div className="flex-1 overflow-y-auto flex flex-col sm:grid sm:grid-cols-1 lg:grid-cols-12">
                
                {/* Left Side: Info */}
                <div className="hidden lg:flex flex-col lg:col-span-4 bg-zinc-50 p-8 border-r border-zinc-200/80">
                  <h3 className="font-serif text-2xl font-light mb-6 text-zinc-900">Request for quotation.</h3>
                  <p className="text-sm text-zinc-600 font-light leading-relaxed mb-8">
                    The more detail you are able to provide, the more accurate our initial costing will be. Only fields marked with an asterisk are required.
                  </p>

                  <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-900 mb-4">What happens next</h4>
                  <ul className="space-y-4 text-xs text-zinc-600 font-light leading-relaxed">
                    <li className="flex gap-3"><span className="text-zinc-900 font-medium">1.</span> A merchandiser picks up your enquiry and confirms receipt.</li>
                    <li className="flex gap-3"><span className="text-zinc-900 font-medium">2.</span> We come back with questions if anything is unclear.</li>
                    <li className="flex gap-3"><span className="text-zinc-900 font-medium">3.</span> You receive an indicative FOB costing and a development calendar.</li>
                    <li className="flex gap-3"><span className="text-zinc-900 font-medium">4.</span> If terms are acceptable, we proceed to sampling. No charge if not.</li>
                  </ul>

                  <div className="mt-12 pt-8 border-t border-zinc-200/80">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-900 mb-4">Contact Directly</h4>
                    <p className="text-xs text-zinc-600 font-light leading-relaxed">
                      You may send tech packs directly to: <br/>
                      <a href="mailto:info@nishafashions.com" className="text-zinc-900 font-medium hover:underline">info@nishafashions.com</a><br/>
                      <a href="mailto:nazib@nishafashions.com" className="text-zinc-900 font-medium hover:underline">nazib@nishafashions.com</a>
                    </p>
                  </div>
                </div>

                {/* Right Side: Form */}
                <div className="col-span-1 lg:col-span-8 p-6 sm:p-8 lg:p-10 pt-12 sm:pt-10 bg-white">
                  <h3 className="font-serif text-2xl font-light mb-8 lg:hidden text-zinc-900">Request for quotation.</h3>
                  
                  <form onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }} className="space-y-8">
                    
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-foreground">Your Name *</label>
                        <Input required placeholder="Jane Doe" clearable />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-foreground">Company *</label>
                        <Input required placeholder="Acme Corp" clearable />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-foreground">Email *</label>
                        <Input type="email" required placeholder="jane@acme.com" clearable />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-foreground">Phone / WhatsApp</label>
                        <Input type="tel" placeholder="+44 7700 900000" clearable />
                      </div>
                    </div>

                    {/* Logistics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-foreground">Destination Country *</label>
                        <Input required placeholder="e.g. United Kingdom" clearable />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-foreground">Preferred Incoterm</label>
                        <select className="w-full px-3 py-2 h-9 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:outline-none transition-colors rounded-lg font-normal text-zinc-900 text-[13px]">
                          <option className="bg-white text-zinc-900">Not sure yet</option>
                          <option className="bg-white text-zinc-900">FOB (Free on Board)</option>
                          <option className="bg-white text-zinc-900">CIF (Cost, Insurance & Freight)</option>
                          <option className="bg-white text-zinc-900">DDP (Delivered Duty Paid)</option>
                        </select>
                      </div>
                    </div>

                    {/* Categories Checkboxes */}
                    <div className="space-y-4">
                      <label className="text-xs font-semibold uppercase tracking-widest text-foreground">Product Categories</label>
                      <ChoiceChips multiple={true} clearable={false}>
                        {['Knitwear', 'Woven', 'Sweater', 'Denim', 'Uniforms', 'Kidswear'].map(cat => (
                          <ChoiceChip key={cat} value={cat}>{cat}</ChoiceChip>
                        ))}
                      </ChoiceChips>
                    </div>

                    {/* Program Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-foreground">Estimated Quantity *</label>
                        <select required className="w-full px-3 py-2 h-9 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:outline-none transition-colors rounded-lg font-normal text-zinc-900 text-[13px]">
                          <option value="" className="bg-white text-zinc-900">Select a range</option>
                          <option className="bg-white text-zinc-900">500 - 1,000 pcs</option>
                          <option className="bg-white text-zinc-900">1,000 - 5,000 pcs</option>
                          <option className="bg-white text-zinc-900">5,000 - 10,000 pcs</option>
                          <option className="bg-white text-zinc-900">10,000+ pcs</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-foreground">Number of Styles</label>
                        <Input type="number" placeholder="e.g. 6" clearable />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-foreground">Target FOB Price (Optional)</label>
                        <Input placeholder="e.g. USD 4.20" clearable />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-foreground">Required Delivery Date</label>
                        <Input type="date" clearable />
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-foreground">Fabric / material spec</label>
                        <Input placeholder="e.g. 180 GSM single jersey, 100% combed cotton" clearable />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-foreground">Tell us about the product *</label>
                        <textarea required rows={4} placeholder="Describe the styles, sizes, colours, print or embroidery, packing needs, certifications required..." className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:outline-none transition-colors rounded-lg font-normal text-zinc-900 resize-none text-[13px] placeholder:text-zinc-400" />
                      </div>
                    </div>

                    {/* Extra options */}
                    <div className="space-y-4">
                      <label className="text-xs font-semibold uppercase tracking-widest text-foreground">Anything Else?</label>
                      <ChoiceChips multiple={true} clearable={false}>
                        {['Need NDA first', 'Compliance certificates', 'Organic / recycled', 'Factory visit'].map(opt => (
                          <ChoiceChip key={opt} value={opt}>{opt}</ChoiceChip>
                        ))}
                      </ChoiceChips>
                    </div>

                    <div className="pt-4 border-t border-zinc-200/80 pb-8">
                      <button type="submit" className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 text-white font-semibold text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors rounded-full shadow-sm cursor-pointer">
                        Send Enquiry
                      </button>
                      <p className="text-xs text-zinc-500 mt-4 leading-relaxed max-w-md">
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
