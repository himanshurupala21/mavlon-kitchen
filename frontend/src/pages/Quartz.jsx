import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Flame, Droplets, Volume2, Layers, Sparkles, ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import Particles from "../components/Particles";
import { LIFESTYLE, PRODUCT_IMAGES } from "../lib/brand";

function QuartzHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  return (
    <section ref={ref} className="relative h-[100vh] overflow-hidden bg-[#0A0A0A] hero-vignette pt-[100px]">
      <div className="absolute inset-0 opacity-25">
        <img src={LIFESTYLE.water} alt="" className="w-full h-full object-cover" />
      </div>
      <Particles count={18} />
      <motion.div
        style={{ rotate, y }}
        className="absolute -right-[20%] top-[10%] w-[80%] aspect-square pointer-events-none"
      >
        <div className="absolute inset-0 border border-[#C9A961]/15 rounded-full" />
        <div className="absolute inset-10 border border-[#C9A961]/10 rounded-full" />
        <div className="absolute inset-20 border border-[#C9A961]/8 rounded-full" />
      </motion.div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 h-full flex items-center">
        <div className="max-w-3xl">
          <Reveal>
            <div className="text-[10px] tracking-[0.5em] text-[#C9A961] uppercase mb-6">
              <span className="inline-block w-10 h-px bg-[#C9A961] align-middle mr-3" />
              Quartz Technology
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.98] text-[#F5F5F5] font-light">
              Engineered<br/> down to the <em className="text-gold-gradient not-italic">molecule.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 text-[#A1A1AA] text-lg leading-relaxed max-w-xl">
              Mavlon's proprietary quartz composite fuses natural mineral granules with high-strength
              resin under controlled vibro-compaction — yielding a surface harder than granite, denser
              than stone, and quieter than steel.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MaterialAnatomy() {
  const layers = [
    { t: "Acoustic underbody", d: "Dampens water impact to a hush." },
    { t: "Structural quartz core", d: "12 mm of vibro-compacted mineral mass." },
    { t: "Pigment-fused matrix", d: "Colour locked into the body — never a coating." },
    { t: "Hydrophobic surface", d: "A non-porous skin that releases stains on contact." },
  ];
  return (
    <section className="relative py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <Reveal>
            <div className="text-[10px] tracking-[0.4em] text-[#C9A961] uppercase mb-6">
              <span className="inline-block w-10 h-px bg-[#C9A961] align-middle mr-3" />
              The Anatomy
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-6xl text-[#F5F5F5] font-light leading-[1.05]">
              Four layers.<br /> One <em className="text-gold-gradient not-italic">monolith.</em>
            </h2>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          {layers.map((l, i) => (
            <Reveal key={l.t} delay={i * 0.08}>
              <div className="grid grid-cols-12 gap-6 py-8 border-b border-white/5 items-start">
                <div className="col-span-2 font-display text-3xl text-[#C9A961]">0{i+1}</div>
                <div className="col-span-10">
                  <div className="font-display text-2xl text-[#F5F5F5] mb-2">{l.t}</div>
                  <div className="text-[#A1A1AA] text-sm">{l.d}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Performance() {
  const stats = [
    { v: "Mohs 7", l: "Surface hardness" },
    { v: "280°C", l: "Heat resistance" },
    { v: "0%", l: "Porosity" },
    { v: "−24 dB", l: "Acoustic dampening" },
  ];
  const features = [
    { i: ShieldCheck, t: "Scratch Resistant", d: "Knife slips, abrasive scrubs, ceramic cookware — your sink keeps its skin." },
    { i: Flame, t: "Heat Resistant", d: "Pots straight off the burner. No shock cracks. No discolouration." },
    { i: Droplets, t: "Stain Resistant", d: "Turmeric, beetroot, espresso, red wine — zero migration into the surface." },
    { i: Volume2, t: "Acoustic Damped", d: "Dual-density underbody muffles water and clatter to a refined hush." },
    { i: Layers, t: "Through-body Colour", d: "Colour pigmented through the entire mass — chips never reveal a different tone." },
    { i: Sparkles, t: "Hygiene-grade", d: "Non-porous, non-leaching, food-safe certified." },
  ];

  return (
    <section className="relative py-32 bg-[#141414]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 mb-20">
          {stats.map((s) => (
            <Reveal key={s.l} className="bg-[#141414] p-10">
              <div className="number-display text-gold-gradient">{s.v}</div>
              <div className="text-[10px] tracking-[0.3em] text-[#A1A1AA] uppercase mt-3">{s.l}</div>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {features.map((f, i) => {
            const I = f.i;
            return (
              <Reveal key={f.t} delay={i * 0.05} className="bg-[#141414] p-10 group">
                <I size={24} className="text-[#C9A961] mb-6" strokeWidth={1.2} />
                <div className="font-display text-2xl text-[#F5F5F5] mb-3">{f.t}</div>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{f.d}</p>
                <div className="mt-6 h-px w-8 bg-[#C9A961] group-hover:w-16 transition-all duration-500" />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img src={PRODUCT_IMAGES.hero} alt="" className="w-full h-full object-cover blur-2xl scale-125" />
        <div className="absolute inset-0 bg-[#0A0A0A]/80" />
      </div>
      <div className="relative max-w-[1100px] mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl text-[#F5F5F5] font-light leading-[1.02]">
            Material is the<br /><em className="text-gold-gradient not-italic">first detail.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <Link to="/collection" data-testid="quartz-cta" className="btn-gold inline-flex items-center gap-3 mt-10">
            See the Collection <ArrowRight size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function Quartz() {
  return (
    <div data-testid="page-quartz" className="page-fade-in">
      <QuartzHero />
      <MaterialAnatomy />
      <Performance />
      <CTASection />
    </div>
  );
}
