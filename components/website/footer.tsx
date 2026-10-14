import Link from "next/link";
import { site, mainNav } from "@/lib/content/site";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import DotField from "@/components/ui/dot-field";
import ParticleText from "@/components/ui/particle-text";

export function Footer() {
  return (
    <footer className="relative w-full bg-zinc-900 text-zinc-300 pt-6 pb-4 sm:pt-10 sm:pb-6 overflow-hidden border-t border-zinc-800">
      
      {/* DotField Background (matches Compliance section) */}
      <div className="absolute inset-0 z-0 opacity-40">
        <DotField
          dotRadius={1.5}
          dotSpacing={16}
          bulgeStrength={60}
          glowRadius={200}
          sparkle={true}
          waveAmplitude={0}
          cursorRadius={400}
          cursorForce={0.1}
          bulgeOnly={true}
          gradientFrom="#e4e4e7"
          gradientTo="#a1a1aa"
          glowColor="#18181b"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 lg:gap-8 mb-5 sm:mb-10">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-10">
            <div>
              <img 
                src="https://www.nishafashions.com/wp-content/uploads/2022/11/nfw_logo3.jpg" 
                alt="Nisha Fashions Wear" 
                className="h-10 sm:h-12 w-auto object-contain mb-3 sm:mb-6 bg-white/10 p-1.5 sm:p-2 rounded"
              />
              <p className="text-zinc-400 text-base sm:text-lg max-w-md leading-relaxed">
                {site.tagline}. A trusted Bangladesh apparel supplier offering comprehensive garment sourcing Bangladesh solutions globally for over 20 years.
              </p>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-100">Subscribe to updates</h4>
              <div className="flex items-center border-b border-zinc-700 hover:border-zinc-500 transition-colors max-w-md pb-1.5 sm:pb-2">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="bg-transparent w-full text-xs sm:text-sm outline-none placeholder:text-zinc-600 text-zinc-200"
                />
                <button aria-label="Subscribe" className="text-zinc-500 hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 sm:gap-8 pt-5 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
            
            {/* Navigation */}
            <div className="space-y-3 sm:space-y-6">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-100">
                Company
              </h4>
              <ul className="space-y-2 sm:space-y-4">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-xs sm:text-base hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-3 sm:space-y-6">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-100">
                Products
              </h4>
              <ul className="space-y-2 sm:space-y-4 text-xs sm:text-base">
                <li><Link href="/categories/knit" className="hover:text-white transition-colors">Knitwear</Link></li>
                <li><Link href="/categories/woven" className="hover:text-white transition-colors">Woven</Link></li>
                <li><Link href="/categories/denim" className="hover:text-white transition-colors">Denim & Bottoms</Link></li>
                <li><Link href="/categories/sweater" className="hover:text-white transition-colors">Sweaters</Link></li>
                <li><Link href="/categories/various-items" className="hover:text-white transition-colors">Various Items & Workwear</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-3 sm:space-y-6 col-span-2 md:col-span-1">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-100">
                Contact Us
              </h4>
              <ul className="space-y-2 sm:space-y-4 text-xs sm:text-base">
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 mt-0.5 sm:mt-1 shrink-0" />
                  <span>{site.address.street}<br/>{site.address.locality}, {site.address.postalCode}</span>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 shrink-0" />
                  <a href={`mailto:${site.email}`} className="hover:text-white transition-colors">
                    {site.email}
                  </a>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 shrink-0" />
                  <a href={`tel:${site.phone.e164}`} className="hover:text-white transition-colors">
                    {site.phone.display}
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Particle Text — phone: denser + brighter so it stays legible at small sizes */}
        <div className="flex sm:hidden w-full items-center justify-center border-t border-zinc-800 py-4 h-[80px]">
          <ParticleText
            text="NISHA FASHIONS"
            particleSize={2.4}
            density={3}
            color="#d4d4d8"
            highlightColor="#ffffff"
            scatter={120}
            gatherDuration={1400}
            stagger={360}
            pointerRepel={24}
            repelRadius={60}
            idleDrift={0.4}
            trigger="mount"
            fontSize="clamp(1.75rem, 10vw, 3rem)"
            fontWeight={800}
            fontFamily="inherit"
            glow={false}
            style={{ minHeight: 0 }}
          />
        </div>

        {/* Particle Text — desktop / tablet */}
        <div className="hidden sm:flex w-full items-center justify-center border-t border-zinc-800 py-6 lg:py-8 h-[130px] lg:h-[180px]">
          <ParticleText
            text="NISHA FASHIONS"
            particleSize={2.2}
            density={5}
            color="#3f3f46"
            highlightColor="#e4e4e7"
            scatter={220}
            gatherDuration={1600}
            stagger={420}
            pointerRepel={42}
            repelRadius={120}
            idleDrift={0.8}
            trigger="mount"
            fontSize="clamp(2.5rem, 8.5vw, 6.5rem)"
            fontWeight={800}
            fontFamily="inherit"
            glow={true}
            style={{ minHeight: 0 }}
          />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-6 text-center text-xs text-zinc-500 border-t border-zinc-800 pt-4 sm:pt-6">
          <p>
            &copy; {new Date().getFullYear()} Nisha Fashions Wear. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-zinc-300 transition-colors">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
