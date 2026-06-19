import React, { useState } from "react";
import axios from "axios";
import { Mail, Phone, MapPin, Instagram, Check } from "lucide-react";
import Reveal from "../components/Reveal";
import { BRAND, LIFESTYLE } from "../lib/brand";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", city: "", interest: "Product enquiry", message: "",
  });
  const [state, setState] = useState({ loading: false, sent: false, error: "" });

  const change = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setState({ loading: true, sent: false, error: "" });
    try {
      await axios.post(`${API}/inquiries`, form);
      setState({ loading: false, sent: true, error: "" });
      setForm({ name: "", email: "", phone: "", city: "", interest: "Product enquiry", message: "" });
    } catch (err) {
      setState({ loading: false, sent: false, error: err?.response?.data?.detail || "Could not send. Please try again." });
    }
  };

  return (
    <div data-testid="page-contact" className="page-fade-in bg-[#0A0A0A]">
      {/* Hero */}
      <section className="relative pt-[140px] pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={LIFESTYLE.kitchen2} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal>
            <div className="text-[10px] tracking-[0.5em] text-[#C9A961] uppercase mb-6">Begin a conversation</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-6xl md:text-8xl text-[#F5F5F5] font-light leading-[0.98]">
              Speak to our<br /><em className="text-gold-gradient not-italic">design team.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-[#A1A1AA] text-lg max-w-2xl">
              Every Mavlon engagement starts with a kitchen, an architect, and a brief. Tell us about
              yours — we'll respond within one business day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Form */}
          <Reveal className="md:col-span-7">
            <div className="bg-[#141414] border border-white/5 p-8 md:p-12">
              {state.sent ? (
                <div data-testid="contact-success" className="py-16 text-center">
                  <div className="h-16 w-16 rounded-full border border-[#C9A961] flex items-center justify-center mx-auto mb-6">
                    <Check size={26} className="text-[#C9A961]" />
                  </div>
                  <h3 className="font-display text-3xl text-[#F5F5F5]">Thank you.</h3>
                  <p className="text-[#A1A1AA] mt-3 max-w-md mx-auto">
                    Your enquiry has been received. A senior member of our team will be in touch shortly.
                  </p>
                  <button
                    onClick={() => setState({ loading: false, sent: false, error: "" })}
                    data-testid="contact-send-another"
                    className="btn-ghost mt-8"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} data-testid="contact-form" className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[10px] tracking-[0.3em] text-[#A1A1AA] uppercase">Name *</label>
                      <input data-testid="contact-input-name" required value={form.name} onChange={change("name")}
                        className="w-full bg-transparent border-b border-white/15 text-[#F5F5F5] py-3 mt-2 focus:outline-none focus:border-[#C9A961] transition-colors" />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.3em] text-[#A1A1AA] uppercase">Email *</label>
                      <input data-testid="contact-input-email" type="email" required value={form.email} onChange={change("email")}
                        className="w-full bg-transparent border-b border-white/15 text-[#F5F5F5] py-3 mt-2 focus:outline-none focus:border-[#C9A961] transition-colors" />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.3em] text-[#A1A1AA] uppercase">Phone</label>
                      <input data-testid="contact-input-phone" value={form.phone} onChange={change("phone")}
                        className="w-full bg-transparent border-b border-white/15 text-[#F5F5F5] py-3 mt-2 focus:outline-none focus:border-[#C9A961] transition-colors" />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.3em] text-[#A1A1AA] uppercase">City</label>
                      <input data-testid="contact-input-city" value={form.city} onChange={change("city")}
                        className="w-full bg-transparent border-b border-white/15 text-[#F5F5F5] py-3 mt-2 focus:outline-none focus:border-[#C9A961] transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] tracking-[0.3em] text-[#A1A1AA] uppercase">I'm interested in</label>
                    <select data-testid="contact-select-interest" value={form.interest} onChange={change("interest")}
                      className="w-full bg-transparent border-b border-white/15 text-[#F5F5F5] py-3 mt-2 focus:outline-none focus:border-[#C9A961] appearance-none">
                      {["Product enquiry","Dealer / Distributor partnership","Architect / Interior designer","Press / Media","Other"].map(o => (
                        <option key={o} value={o} className="bg-[#141414]">{o}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] tracking-[0.3em] text-[#A1A1AA] uppercase">Tell us about your project *</label>
                    <textarea data-testid="contact-input-message" required rows={5} value={form.message} onChange={change("message")}
                      className="w-full bg-transparent border-b border-white/15 text-[#F5F5F5] py-3 mt-2 focus:outline-none focus:border-[#C9A961] transition-colors resize-none" />
                  </div>

                  {state.error && (
                    <div data-testid="contact-error" className="text-red-400 text-sm">{state.error}</div>
                  )}

                  <button
                    type="submit"
                    disabled={state.loading}
                    data-testid="contact-submit-button"
                    className="btn-gold disabled:opacity-50"
                  >
                    {state.loading ? "Sending..." : "Send Enquiry"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Info */}
          <Reveal delay={0.15} className="md:col-span-5">
            <div className="space-y-10">
              <div>
                <div className="text-[10px] tracking-[0.3em] text-[#C9A961] uppercase mb-4">Direct lines</div>
                {BRAND.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s+/g,'')}`} data-testid={`contact-phone-${p.replace(/\s+/g,'')}`}
                     className="flex items-center gap-3 text-[#F5F5F5] hover:text-[#C9A961] py-2">
                    <Phone size={16} className="text-[#C9A961]" /> <span className="text-lg">{p}</span>
                  </a>
                ))}
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] text-[#C9A961] uppercase mb-4">Email</div>
                <a href={`mailto:${BRAND.email}`} data-testid="contact-email" className="flex items-center gap-3 text-[#F5F5F5] hover:text-[#C9A961]">
                  <Mail size={16} className="text-[#C9A961]" /> <span className="text-lg">{BRAND.email}</span>
                </a>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] text-[#C9A961] uppercase mb-4">Studio</div>
                <div className="flex items-start gap-3 text-[#F5F5F5]">
                  <MapPin size={16} className="text-[#C9A961] mt-1" />
                  <div className="text-lg leading-relaxed">
                    MAVLON Kitchen Sink<br />
                    Crafted in India · Delivered globally
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] text-[#C9A961] uppercase mb-4">Follow</div>
                <a href={BRAND.instagram} target="_blank" rel="noreferrer" data-testid="contact-instagram"
                   className="inline-flex items-center gap-3 text-[#F5F5F5] hover:text-[#C9A961]">
                  <Instagram size={16} className="text-[#C9A961]" /> @mavlonkitchensink
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
