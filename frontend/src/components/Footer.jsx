import React from "react";
import { Link } from "react-router-dom";
import { BRAND, NAV_LINKS } from "../lib/brand";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer data-testid="footer" className="relative bg-[#0A0A0A] border-t border-white/5 pt-24 pb-10">
      <div className="hairline absolute top-0 left-0 right-0" />
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <img src={BRAND.logo} alt="MAVLON" className="h-12 w-12" />
            <div>
              <div className="font-display text-2xl tracking-[0.25em] text-[#F5F5F5]">MAVLON</div>
              <div className="text-[10px] tracking-[0.4em] text-[#A1A1AA]">KITCHEN SINK</div>
            </div>
          </div>
          <p className="text-[#A1A1AA] text-sm leading-relaxed max-w-md">
            Crafted for the modern kitchen. Premium quartz sinks engineered with uncompromising
            standards of scratch, stain and heat resistance — built to outlive trends.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#C9A961] mb-5">Navigate</div>
          <ul className="space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.path}>
                <Link
                  to={l.path}
                  data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g,'-')}`}
                  className="text-[#F5F5F5] text-sm hover:text-[#C9A961] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#C9A961] mb-5">Get in touch</div>
          <div className="space-y-3 text-sm text-[#F5F5F5]">
            <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 hover:text-[#C9A961]">
              <Mail size={14} className="text-[#C9A961]" /> {BRAND.email}
            </a>
            {BRAND.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s+/g,'')}`} className="flex items-center gap-3 hover:text-[#C9A961]">
                <Phone size={14} className="text-[#C9A961]" /> {p}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-6">
            <a href={BRAND.instagram} target="_blank" rel="noreferrer" data-testid="footer-instagram"
               className="h-10 w-10 border border-white/15 flex items-center justify-center text-[#F5F5F5] hover:border-[#C9A961] hover:text-[#C9A961] transition-colors">
              <Instagram size={16} />
            </a>
            <a href="#" data-testid="footer-facebook"
               className="h-10 w-10 border border-white/15 flex items-center justify-center text-[#F5F5F5] hover:border-[#C9A961] hover:text-[#C9A961] transition-colors">
              <Facebook size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-[11px] tracking-[0.2em] text-[#A1A1AA] uppercase">
          © {new Date().getFullYear()} Mavlon™ — All rights reserved
        </div>
        <div className="text-[11px] tracking-[0.2em] text-[#A1A1AA] uppercase">
          Designed for the modern kitchen
        </div>
      </div>
    </footer>
  );
}
