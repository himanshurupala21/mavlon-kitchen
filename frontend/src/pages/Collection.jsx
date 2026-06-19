import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ruler, Weight, Layers, ArrowUpRight, ShieldCheck } from "lucide-react";
import Reveal from "../components/Reveal";
import { LIFESTYLE } from "../lib/brand";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function ProductCard({ product, onOpen, index }) {
  return (
    <Reveal delay={index * 0.05} className="product-card relative group bg-[#141414] border border-white/5 overflow-hidden cursor-pointer"
    >
      <div onClick={() => onOpen(product)} data-testid={`product-card-${product.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0F0F0F]">
          <img src={product.image} alt={product.name} className="product-card-image w-full h-full object-cover" />
          <div className="product-card-shine" />
          <div className="absolute top-4 left-4 text-[9px] tracking-[0.3em] text-[#C9A961] uppercase bg-[#0A0A0A]/60 backdrop-blur-md border border-white/5 px-3 py-1">
            {product.series}
          </div>
        </div>
        <div className="p-6 flex items-start justify-between gap-4">
          <div>
            <div className="font-display text-2xl text-[#F5F5F5]">{product.name}</div>
            <div className="text-xs text-[#A1A1AA] mt-1">{product.tagline}</div>
            <div className="flex items-center gap-3 mt-4">
              {product.colors.slice(0,4).map((c) => {
                const map = {
                  "Matte Black": "#1A1A1A",
                  "Graphite Grey": "#5E5E5E",
                  "Espresso Brown": "#5C3A1E",
                  "Marble White": "#F4F1EA",
                };
                return (
                  <span key={c} title={c} className="h-3 w-3 rounded-full border border-white/20" style={{ background: map[c] || "#888" }} />
                );
              })}
            </div>
          </div>
          <div className="h-10 w-10 border border-white/15 flex items-center justify-center group-hover:border-[#C9A961] group-hover:bg-[#C9A961] group-hover:text-[#0A0A0A] transition-all">
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function ProductModal({ product, onClose }) {
  if (!product) return null;
  return (
    <AnimatePresence>
      <motion.div
        data-testid="product-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#0A0A0A]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-[#141414] border border-white/5 w-full max-w-6xl max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2"
        >
          <button data-testid="product-modal-close" onClick={onClose} className="absolute top-4 right-4 z-10 h-10 w-10 bg-[#0A0A0A]/70 border border-white/10 flex items-center justify-center text-white hover:text-[#C9A961]">
            <X size={16} />
          </button>
          <div className="relative aspect-square md:aspect-auto bg-[#0F0F0F]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:p-12">
            <div className="text-[10px] tracking-[0.3em] text-[#C9A961] uppercase mb-4">{product.series}</div>
            <h3 className="font-display text-4xl md:text-5xl text-[#F5F5F5] font-light leading-tight">{product.name}</h3>
            <p className="text-[#A1A1AA] mt-4">{product.tagline}</p>

            <div className="grid grid-cols-3 gap-px bg-white/5 mt-8">
              <div className="bg-[#141414] p-4">
                <Ruler size={16} className="text-[#C9A961] mb-2" strokeWidth={1.2} />
                <div className="text-[10px] tracking-[0.2em] text-[#A1A1AA] uppercase">Size</div>
                <div className="text-sm text-[#F5F5F5] mt-1">{product.size}</div>
              </div>
              <div className="bg-[#141414] p-4">
                <Weight size={16} className="text-[#C9A961] mb-2" strokeWidth={1.2} />
                <div className="text-[10px] tracking-[0.2em] text-[#A1A1AA] uppercase">Weight</div>
                <div className="text-sm text-[#F5F5F5] mt-1">{product.weight}</div>
              </div>
              <div className="bg-[#141414] p-4">
                <Layers size={16} className="text-[#C9A961] mb-2" strokeWidth={1.2} />
                <div className="text-[10px] tracking-[0.2em] text-[#A1A1AA] uppercase">Thickness</div>
                <div className="text-sm text-[#F5F5F5] mt-1">{product.thickness}</div>
              </div>
            </div>

            <div className="mt-8">
              <div className="text-[10px] tracking-[0.3em] text-[#C9A961] uppercase mb-3">Finishes</div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <span key={c} className="text-xs text-[#F5F5F5] border border-white/15 px-3 py-1.5 tracking-wider">{c}</span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="text-[10px] tracking-[0.3em] text-[#C9A961] uppercase mb-3">Engineered for</div>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((t) => (
                  <span key={t} className="text-xs text-[#A1A1AA] inline-flex items-center gap-2">
                    <ShieldCheck size={12} className="text-[#C9A961]" /> {t}
                  </span>
                ))}
              </div>
            </div>

            <a href="/contact" data-testid="product-modal-cta" className="btn-gold inline-block mt-10">
              Request a Quote
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Collection() {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios.get(`${API}/products`).then((r) => setProducts(r.data.products || [])).catch(() => setProducts([]));
  }, []);

  const series = ["All", ...Array.from(new Set(products.map(p => p.series)))];
  const filtered = filter === "All" ? products : products.filter(p => p.series === filter);

  return (
    <div data-testid="page-collection" className="page-fade-in bg-[#0A0A0A]">
      {/* Page Hero */}
      <section className="relative pt-[140px] pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={LIFESTYLE.kitchen3} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal>
            <div className="text-[10px] tracking-[0.5em] text-[#C9A961] uppercase mb-6">The Collection</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-6xl md:text-8xl text-[#F5F5F5] font-light leading-[0.98]">
              Objects of <em className="text-gold-gradient not-italic">precision.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-[#A1A1AA] text-lg max-w-2xl">
              Browse our signature quartz compositions. Each is engineered with the same obsessive
              care for material, weight and silhouette.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <section className="border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex flex-wrap gap-3 items-center">
          <div className="text-[10px] tracking-[0.3em] text-[#A1A1AA] uppercase mr-4">Filter by series</div>
          {series.map((s) => (
            <button
              key={s}
              data-testid={`filter-${s.toLowerCase().replace(/\s+/g,'-')}`}
              onClick={() => setFilter(s)}
              className={`text-[11px] tracking-[0.2em] uppercase px-4 py-2 border transition-colors ${
                filter === s
                  ? "border-[#C9A961] text-[#C9A961]"
                  : "border-white/10 text-[#F5F5F5] hover:border-[#C9A961]/40"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* Products grid */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {filtered.length === 0 ? (
            <div className="text-center text-[#A1A1AA] py-20">Loading collection…</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} onOpen={setActive} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ProductModal product={active} onClose={() => setActive(null)} />
    </div>
  );
}
