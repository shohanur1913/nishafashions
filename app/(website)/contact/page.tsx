"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, ArrowRight, Copy, Check } from "lucide-react";
import { ContactMap } from "@/components/website/contact-map";
import { PageHero } from "@/components/website/page-hero";

export default function ContactPage() {
  const [selectedCategory, setSelectedCategory] = useState("Knitwear");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "1,500 – 5,000 pcs",
    message: "",
  });

  const categories = ["Knitwear", "Woven", "Denim", "Sweaters", "Kidswear", "Various Items"];
  const quantityRanges = ["< 1,500 pcs", "1,500 – 5,000 pcs", "5,000 – 20,000 pcs", "20,000+ pcs"];

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Reusable Editorial Hero */}
      <PageHero
        badge="Direct Sourcing Desk"
        title={
          <>
            Start your next <br className="hidden sm:block" />
            production run with confidence.
          </>
        }
        description="Direct communication with senior garment merchandisers in Dhaka. Indicative FOB costings and sampling schedules returned within 48 hours."
      >
        <a
          href="https://wa.me/8801715645766?text=Hello%20Nisha%20Fashions%20Wear,%20I%20would%20like%20to%20discuss%20a%20new%20apparel%20production%20requirement."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-700 text-white text-xs font-medium hover:bg-zinc-800 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>WhatsApp Desk</span>
        </a>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-zinc-300 font-normal pl-1">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>48h FOB Costing</span>
          </span>
          <span className="opacity-40">•</span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>NDA Protected</span>
          </span>
          <span className="opacity-40 hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-1.5 hidden sm:inline-flex">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Free Tech Pack Review</span>
          </span>
        </div>
      </PageHero>

      {/* Main Grid: Direct Channels (Left) & Request Form (Right) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl mt-8 sm:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground mb-2">
                Fast Response Desk
              </h2>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-foreground tracking-tight">
                Connect directly with our team.
              </h3>
            </div>

            {/* WhatsApp Direct Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 space-y-3 transition-all hover:border-[#25D366]/50 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  Instant WhatsApp Chat
                </span>
                <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">Online 09:00 - 21:00 BST</span>
              </div>

              <div>
                <p className="font-serif text-lg font-normal text-foreground">
                  Senior Merchandiser Direct
                </p>
                <p className="text-xs text-zinc-800 dark:text-zinc-200 font-normal leading-relaxed mt-0.5">
                  Fastest way to get sample development updates, fabric swatches, or urgent FOB queries.
                </p>
              </div>

              <a
                href="https://wa.me/8801715645766?text=Hello%20Nisha%20Fashions%20Wear,%20I%20would%20like%20to%20discuss%20a%20new%20apparel%20production%20requirement."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold tracking-wide transition-all shadow-xs hover:shadow-md cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.201.3-.778.978-.954 1.179-.176.2-.351.226-.653.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.786-1.676-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.151-.176.201-.301.301-.502.101-.201.05-.377-.025-.527-.075-.15-.678-1.634-.929-2.237-.245-.588-.494-.508-.678-.518-.176-.009-.377-.01-.578-.01-.201 0-.527.075-.803.377s-1.054 1.029-1.054 2.51c0 1.481 1.079 2.91 1.23 3.111.151.201 2.124 3.243 5.145 4.549.718.311 1.279.497 1.716.636.722.23 1.378.197 1.897.12.578-.087 1.78-.728 2.031-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.004 21.996h-.002c-1.733 0-3.431-.462-4.921-1.336l-.353-.209-3.66.96.977-3.567-.23-.366a9.92 9.92 0 0 1-1.523-5.275c0-5.498 4.475-9.973 9.978-9.973 2.664 0 5.168 1.038 7.049 2.92a9.917 9.917 0 0 1 2.917 7.054c-.001 5.499-4.476 9.987-9.232 9.787z" /></svg>
                <span>Chat on WhatsApp (+880 1715 645766)</span>
              </a>
            </div>

            {/* Direct Email Inboxes */}
            <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/70 space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Direct Merchandising Inboxes
                </h4>
              </div>

              <div className="space-y-2.5">
                {[
                  { label: "General & RFQ Inquiries", email: "info@nishafashions.com" },
                  { label: "Senior Merchandiser Desk", email: "nazib@nishafashions.com" },
                  { label: "Alternative Desk", email: "nisha.fashions@gmail.com" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-muted/40 border border-border/40 flex items-center justify-between hover:bg-muted/70 transition-colors"
                  >
                    <div>
                      <p className="text-[11px] text-zinc-700 dark:text-zinc-300 font-medium">{item.label}</p>
                      <a href={`mailto:${item.email}`} className="text-xs font-semibold text-foreground hover:underline">
                        {item.email}
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(item.email)}
                      className="p-1.5 rounded-lg hover:bg-background text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      title="Copy email address"
                    >
                      {copiedEmail === item.email ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 opacity-60" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Office & Studio Information */}
            <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/70 space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Registered Office & Studio
                </h4>
              </div>

              <p className="text-xs text-foreground font-semibold leading-relaxed">
                92, Moneswar Road, Zigatola, Dhaka-1209, Bangladesh.
              </p>
              <p className="text-xs text-zinc-800 dark:text-zinc-200 font-normal leading-relaxed">
                Our sampling studio, pattern block library, and merchandising headquarters are located here. International buyer visits arranged upon request.
              </p>
            </div>
          </div>

          {/* Right Column: High-End Interactive RFQ Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border/70 shadow-sm space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif text-2xl font-light text-foreground tracking-tight">
                    Request a Detailed Quotation
                  </h3>
                  <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">FOB / CIF Available</span>
                </div>
                <p className="text-xs text-zinc-800 dark:text-zinc-200 font-normal">
                  Please select your product category and provide programme details.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-xl font-normal text-foreground">
                      Inquiry Received Successfully!
                    </h4>
                    <p className="text-xs text-zinc-800 dark:text-zinc-200 font-normal max-w-md mx-auto">
                      Thank you, {formData.name || "valued buyer"}. Our merchandising desk is reviewing your requirements and will reach out via email ({formData.email}) within 48 hours.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="px-5 py-2 rounded-full border border-border text-xs font-medium hover:bg-muted transition-colors cursor-pointer"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Category Selection Chips */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block">
                      Target Product Category *
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                            selectedCategory === cat
                              ? "bg-foreground text-background border-foreground shadow-2xs font-semibold"
                              : "bg-muted/50 text-zinc-700 dark:text-zinc-300 border-border/60 hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground block">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs font-normal text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all placeholder:text-muted-foreground/60"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground block">Brand / Company *</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Nordic Apparel Co."
                        className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs font-normal text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all placeholder:text-muted-foreground/60"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground block">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs font-normal text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all placeholder:text-muted-foreground/60"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground block">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs font-normal text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all placeholder:text-muted-foreground/60"
                      />
                    </div>
                  </div>

                  {/* Quantity Range */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block">
                      Estimated Production Quantity
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {quantityRanges.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => setFormData({ ...formData, quantity: q })}
                          className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer border text-center ${
                            formData.quantity === q
                              ? "bg-foreground text-background border-foreground font-semibold shadow-2xs"
                              : "bg-muted/40 text-zinc-700 dark:text-zinc-300 border-border/60 hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message & Tech Pack details */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground block">
                      Programme Details / Fabric Specifications *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please mention your required garments, fabric composition (e.g., 100% Cotton 180 GSM), destination country, target FOB price, and delivery window..."
                      className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs font-normal text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all placeholder:text-muted-foreground/60 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-foreground hover:bg-foreground/90 text-background text-xs font-semibold uppercase tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Submit Sourcing Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Google Map Section with Skeleton Loader */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl mt-14 sm:mt-20">
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Location & Accessibility
              </h2>
              <h3 className="font-serif text-2xl font-light text-foreground tracking-tight">
                Our Headquarters & Studio Map
              </h3>
            </div>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Zigatola, Dhaka • 15 min from Dhanmondi
            </span>
          </div>
        </div>

        <ContactMap />
      </section>
    </div>
  );
}
