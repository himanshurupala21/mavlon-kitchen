import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ShieldCheck, Flame, Droplets, Sparkles, Award, Hammer } from "lucide-react";
import Reveal from "../components/Reveal";
import Particles from "../components/Particles";
import { PRODUCT_IMAGES, LIFESTYLE } from "../lib/brand";

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 6]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

  return (
    <section ref={ref} data-testid="hero" className="relative h-[110vh] w-full overflow-hidden hero-vignette bg-[#0A0A0A]">
      <motion.div className="layer" style={{ scale: bgScale }}>
        <img
          src={LIFESTYLE.kitchen1}
          alt="Luxury kitchen"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="layer bg-gradient-to-b from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]" />
      </motion.div>

      <Particles count={22} />

      {/* Side vertical labels */}
      <div className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 vertical-text text-[10px] text-[#A1A1AA] z-10">
        EST. PREMIUM • QUARTZ ENGINEERED
      </div>
      <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 vertical-text text-[10px] text-[#C9A961] z-10">
        SCROLL TO EXPLORE ↓
      </div>

      {/* Title */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 h-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-center"
      >
        <Reveal delay={0.1}>
          <div className="text-[10px] tracking-[0.5em] text-[#C9A961] uppercase mb-6">
            <span className="inline-block w-10 h-px bg-[#C9A961] align-middle mr-3" />
            Mavlon — Premium Quartz
          </div>
        </Reveal>
        <Reveal delay={0.25}>
          <h1 className="font-display text-[clamp(2.8rem,9vw,7.5rem)] leading-[0.95] text-[#F5F5F5] font-light max-w-5xl">
            The pinnacle of <em className="text-gold-gradient not-italic">culinary</em><br />
            architecture.
          </h1>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="mt-8 text-[#A1A1AA] text-base md:text-lg max-w-xl leading-relaxed">
            Hand-engineered quartz sinks composed for kitchens that refuse to compromise. Where
            craftsmanship, geometry and stone become one monolithic object.
          </p>
        </Reveal>
        <Reveal delay={0.55}>
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <Link to="/collection" data-testid="hero-cta-collection" className="btn-gold inline-flex items-center gap-3">
              Explore Collection <ArrowRight size={14} />
            </Link>
            <Link to="/quartz" data-testid="hero-cta-quartz" className="btn-ghost inline-flex items-center gap-3">
              Quartz Technology <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>
      </motion.div>

      {/* Floating sink hero image */}
      <motion.div
        style={{ y, scale, rotate }}
        className="absolute right-[-6%] md:right-[2%] bottom-[6%] md:bottom-[10%] w-[78%] md:w-[46%] z-10 pointer-events-none"
      >
        <div className="relative float-anim">
          <div className="absolute -inset-20 bg-[#C9A961]/10 blur-[100px] rounded-full" />
          <img
            src={PRODUCT_IMAGES.hero}
            alt="Mavlon hero sink"
            className="relative w-full drop-shadow-[0_60px_60px_rgba(0,0,0,0.7)]"
          />
        </div>
      </motion.div>

      {/* Bottom stats strip */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/5 bg-[#0A0A0A]/40 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
          {[
            { k: "12 mm", l: "Quartz thickness" },
            { k: "15+ kg", l: "Monolithic weight" },
            { k: "4", l: "Signature finishes" },
            { k: "10 yr", l: "Craft warranty" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col">
              <div className="font-display text-2xl md:text-3xl text-[#F5F5F5]">{s.k}</div>
              <div className="text-[10px] tracking-[0.3em] text-[#A1A1AA] uppercase mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Scratch Resistant", "Heat Resistant", "Stain Resistant", "Quartz Engineered", "Acoustic Damped", "Architect Crafted"];
  const all = [...items, ...items, ...items];
  return (
    <section data-testid="marquee" className="relative py-10 border-y border-white/5 bg-[#0A0A0A] overflow-hidden">
      <div className="flex marquee-track whitespace-nowrap gap-16">
        {all.map((t, i) => (
          <div key={i} className="flex items-center gap-16 shrink-0">
            <span className="font-display text-3xl md:text-5xl text-[#F5F5F5]/80">{t}</span>
            <span className="text-[#C9A961] text-2xl">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ArtOfQuartz() {
  const features = [
    { icon: ShieldCheck, t: "Scratch Resistant", d: "12 mm dense quartz composite refuses the marks of daily use." },
    { icon: Flame, t: "Heat Resistant", d: "Withstands sudden temperature shocks without compromise." },
    { icon: Droplets, t: "Stain Resistant", d: "Non-porous surface — wine, turmeric, coffee, nothing settles." },
    { icon: Sparkles, t: "Premium Finish", d: "Pigment-fused mineral composition with a soft luminous matte." },
  ];
  return (
    <section data-testid="art-of-quartz" className="relative py-32 md:py-40 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08]">
        <img src={LIFESTYLE.water} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end mb-20">
          <div className="md:col-span-7">
            <Reveal>
              <div className="text-[10px] tracking-[0.4em] text-[#C9A961] uppercase mb-6">
                <span className="inline-block w-10 h-px bg-[#C9A961] align-middle mr-3" />
                The Art of Quartz
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-5xl md:text-7xl leading-[1.02] text-[#F5F5F5] font-light">
                Stone, refined into<br />a <em className="text-gold-gradient not-italic">precision</em> object.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.2}>
              <p className="text-[#A1A1AA] text-lg leading-relaxed">
                Each Mavlon sink is the result of a fused mineral composite — engineered for the
                cadence of an Indian kitchen yet sculpted with the discipline of a European studio.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.t} delay={i * 0.08}>
                <div className="bg-[#0A0A0A] p-10 h-full group hover:bg-[#141414] transition-colors duration-500">
                  <Icon size={26} className="text-[#C9A961] mb-8" strokeWidth={1.2} />
                  <div className="font-display text-2xl text-[#F5F5F5] mb-3">{f.t}</div>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{f.d}</p>
                  <div className="mt-8 h-px w-8 bg-[#C9A961] group-hover:w-16 transition-all duration-500" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const items = [
    { id: "obsidian-double-bowl", title: "Obsidian Double Bowl", series: "Noir Quartz", img: PRODUCT_IMAGES.doubleBowl, span: "md:col-span-7" },
    { id: "metallic-drainboard-36", title: "Metallic Drain Board", series: "Metallic Series", img: PRODUCT_IMAGES.drainBoard, span: "md:col-span-5" },
    { id: "studio-top-mount", title: "Studio Top Mount", series: "Architect", img: PRODUCT_IMAGES.topAngle, span: "md:col-span-5" },
    { id: "quartz-workstation-pro", title: "Quartz Workstation Pro", series: "Architect", img: PRODUCT_IMAGES.hero, span: "md:col-span-7" },
  ];

  return (
    <section data-testid="featured-products" className="relative py-32 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <Reveal>
              <div className="text-[10px] tracking-[0.4em] text-[#C9A961] uppercase mb-6">
                <span className="inline-block w-10 h-px bg-[#C9A961] align-middle mr-3" />
                The Collection
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-5xl md:text-7xl text-[#F5F5F5] font-light leading-[1.02]">
                Four signatures.<br />One philosophy.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link to="/collection" data-testid="featured-view-all" className="luxe-link text-[#C9A961] text-[11px] tracking-[0.3em] uppercase inline-flex items-center gap-2">
              View Full Collection <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {items.map((it, i) => (
            <Reveal key={it.id} delay={i * 0.08} className={`product-card relative group overflow-hidden bg-[#141414] border border-white/5 ${it.span}`}>
              <Link to={`/collection`} data-testid={`featured-product-${it.id}`} className="block">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <img src={it.img} alt={it.title} className="product-card-image w-full h-full object-cover" />
                  <div className="product-card-shine" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] tracking-[0.3em] text-[#C9A961] uppercase mb-2">{it.series}</div>
                    <div className="font-display text-3xl md:text-4xl text-[#F5F5F5]">{it.title}</div>
                  </div>
                  <div className="h-12 w-12 border border-white/15 flex items-center justify-center group-hover:border-[#C9A961] group-hover:bg-[#C9A961] group-hover:text-[#0A0A0A] transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Craftsmanship() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section ref={ref} data-testid="craftsmanship" className="relative py-32 md:py-44 bg-[#141414] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-6 relative">
          <motion.div style={{ y: y1 }} className="relative aspect-[4/5] overflow-hidden">
            <img src={LIFESTYLE.kitchen2} alt="Luxury kitchen detail" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0A0A0A]/60 via-transparent to-transparent" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute -right-6 md:-right-16 -bottom-10 w-[70%] aspect-[4/3] overflow-hidden border-8 border-[#0A0A0A]">
            <img src={PRODUCT_IMAGES.topAngle} alt="Detail" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        <div className="md:col-span-6 md:pl-12">
          <Reveal>
            <div className="text-[10px] tracking-[0.4em] text-[#C9A961] uppercase mb-6">
              <span className="inline-block w-10 h-px bg-[#C9A961] align-middle mr-3" />
              Craftsmanship
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-6xl text-[#F5F5F5] font-light leading-[1.05]">
              Every edge is a <em className="text-gold-gradient not-italic">decision</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-[#A1A1AA] text-lg leading-relaxed max-w-xl">
              Twelve millimetres of dense quartz, ground to a sub-millimetre tolerance. Acoustic
              dampening underbody. Hand-finished radii. Mavlon sinks are objects of intent — not
              accessories.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="grid grid-cols-2 gap-px bg-white/5 mt-10 max-w-md">
              {[
                { icon: Hammer, t: "Hand-finished" },
                { icon: Award, t: "10-yr warranty" },
                { icon: ShieldCheck, t: "ISO-tested" },
                { icon: Sparkles, t: "Pigment-fused" },
              ].map((b) => {
                const I = b.icon;
                return (
                  <div key={b.t} className="bg-[#141414] p-6 flex items-center gap-3">
                    <I size={18} className="text-[#C9A961]" strokeWidth={1.2} />
                    <div className="text-sm text-[#F5F5F5]">{b.t}</div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section data-testid="closing-cta" className="relative py-32 md:py-44 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img src={LIFESTYLE.kitchen3} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]" />
      </div>
      <div className="relative max-w-[1100px] mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <div className="text-[10px] tracking-[0.5em] text-[#C9A961] uppercase mb-8">A Mavlon kitchen</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl md:text-8xl text-[#F5F5F5] font-light leading-[1]">
            Built for the<br /><em className="text-gold-gradient not-italic">ones who notice.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 text-[#A1A1AA] max-w-xl mx-auto text-lg leading-relaxed">
            Speak to our design team. Every consultation begins with a kitchen — and ends with a
            sink composed precisely for it.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
            <Link to="/contact" data-testid="closing-cta-button" className="btn-gold inline-flex items-center gap-3">
              Begin a Conversation <ArrowRight size={14} />
            </Link>
            <Link to="/collection" data-testid="closing-cta-collection" className="btn-ghost inline-flex items-center gap-3">
              Browse Collection
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div data-testid="page-home" className="page-fade-in">
      <Hero />
      <Marquee />
      <ArtOfQuartz />
      <FeaturedProducts />
      <Craftsmanship />
      <ClosingCTA />
    </div>
  );
}
