import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BRAND, NAV_LINKS } from "../lib/brand";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-[78px]">
        <Link to="/" data-testid="navbar-logo" className="flex items-center group">
          <img src={BRAND.logo} alt="MAVLON" className="h-[50px] w-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.path;
            return (
              <Link
                key={l.path}
                to={l.path}
                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g,'-')}`}
                className={`luxe-link text-[11px] uppercase tracking-[0.3em] transition-colors ${
                  active ? "text-[#C9A961]" : "text-[#F5F5F5] hover:text-[#C9A961]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/contact"
          data-testid="navbar-cta"
          className="hidden lg:inline-block btn-gold !py-3 !px-6 !text-[10px]"
        >
          Request Quote
        </Link>

        <button
          data-testid="navbar-menu-toggle"
          onClick={() => setOpen(!open)}
          className="lg:hidden text-[#F5F5F5] p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/5 px-6 py-8"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  data-testid={`mobile-nav-link-${l.label.toLowerCase().replace(/\s+/g,'-')}`}
                  className="text-[#F5F5F5] text-sm uppercase tracking-[0.3em] hover:text-[#C9A961]"
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/contact" data-testid="mobile-navbar-cta" className="btn-gold inline-block w-fit">
                Request Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
