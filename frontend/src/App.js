import React, { useEffect } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Quartz from "./pages/Quartz";
import Contact from "./pages/Contact";
import "./App.css";

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      data-testid="scroll-progress"
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#C9A961] z-[60]"
    />
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.085, smoothWheel: true }}>
      <div className="App grain-overlay">
        <ScrollToTop />
        <ScrollProgressBar />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/quartz" element={<Quartz />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}
