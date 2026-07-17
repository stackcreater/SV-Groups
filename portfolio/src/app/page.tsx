"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Code, Smartphone, ShoppingCart, Layout, PenTool, Zap, ArrowRight, Camera, TrendingUp, Users, Award, ShieldCheck } from "lucide-react";
import TextFlip from "@/components/animata/text/text-flip";
import TypewriterHeading from "@/components/animata/text/typewriter-heading";
import ParticlesBackground from "@/components/ParticlesBackground";
import { ParticleCard, BentoSection, useMobileDetection } from "@/components/MagicBento";
import { HaloButton, HaloChip, HaloStatTile } from "@/components/halo";

export default function Home() {
  const isMobile = useMobileDetection();

  const services = [
    { icon: <ShoppingCart className="w-8 h-8 mb-4 text-cyan-600 dark:text-cyan-neon" />, title: "E-Commerce Stores", desc: "High-converting online stores that grow your business." },
    { icon: <PenTool className="w-8 h-8 mb-4 text-purple-600 dark:text-purple-neon" />, title: "Blog Websites", desc: "SEO-friendly blog websites to share your ideas." },
    { icon: <Layout className="w-8 h-8 mb-4 text-cyan-600 dark:text-cyan-neon" />, title: "Portfolio Websites", desc: "Showcase your work with stunning portfolio websites." },
    { icon: <Smartphone className="w-8 h-8 mb-4 text-purple-600 dark:text-purple-neon" />, title: "Responsive Design", desc: "Perfect on every device for the best user experience." },
    { icon: <Zap className="w-8 h-8 mb-4 text-cyan-600 dark:text-cyan-neon" />, title: "Fast & Optimized", desc: "Lightning fast websites optimized for speed and performance." },
    { icon: <Code className="w-8 h-8 mb-4 text-purple-600 dark:text-purple-neon" />, title: "Clean Code", desc: "Secure, scalable, and maintainable custom solutions." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 flex items-center justify-center min-h-[90vh] overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0 opacity-40 dark:opacity-100 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-neon/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-neon/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
        </div>
        <ParticlesBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 inline-flex justify-center">
              <span className="halo-eyebrow">v1.0 · ARCHITECTURAL DESIGN</span>
            </div>
            
            <TextFlip />
            <TypewriterHeading />
            <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              Modern Websites | Clean Code | Powerful Solutions. Full-Stack Web & App Developer building fast, user-friendly solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/start-project">
                <HaloButton variant="primary" size="lg" className="px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg">
                  Let's Build Together <ArrowRight className="ml-2 w-5 h-5" />
                </HaloButton>
              </Link>
              
              <Link href="https://instagram.com/STACK_CREATER" target="_blank" rel="noreferrer">
                <HaloButton variant="secondary" size="lg" className="px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg">
                  <Camera className="w-5 h-5 mr-2" /> Follow on Instagram
                </HaloButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">What You Get</h2>
            <p className="text-slate-600 dark:text-gray-400">Everything you need to turn your ideas into websites that work.</p>
          </div>
          
          <BentoSection
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            enableSpotlight={true}
            spotlightRadius={570}
            glowColor="132, 0, 255"
            disableAnimations={isMobile}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.08 }}
              >
                <ParticleCard
                  className="halo-card p-8 rounded-2xl bg-white dark:bg-halo-surface border border-slate-200 dark:border-halo-border hover:border-cyan-600/50 dark:hover:border-halo-border-strong hover:bg-slate-50/50 dark:hover:bg-halo-elevated shadow-sm dark:shadow-none transition-all group"
                  disableAnimations={isMobile}
                  particleCount={12}
                  glowColor="132, 0, 255"
                  enableTilt={false}
                  clickEffect={true}
                  enableMagnetism={false}
                >
                  <div className="transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{service.title}</h3>
                  <p className="text-slate-600 dark:text-gray-400">{service.desc}</p>
                </ParticleCard>
              </motion.div>
            ))}
          </BentoSection>
        </div>
      </section>

      {/* Showcase Metrics Section */}
      <section className="py-24 bg-background transition-colors duration-300 border-t border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="halo-eyebrow mb-4">PERFORMANCE & RESULTS</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mt-4">By The Numbers</h2>
            <p className="text-slate-600 dark:text-gray-400 mt-2">Delivering clean engineering and positive business metrics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HaloStatTile
              eyebrow="Active Users Engaged"
              value="48.2K"
              tone="success"
              trendChip={<HaloChip tone="success">↑ 12.4%</HaloChip>}
              sparkData={[24, 30, 28, 35, 40, 38, 48]}
              footNote="vs last month"
              headerIcon={<Users className="w-4 h-4 text-slate-500" />}
            />
            <HaloStatTile
              eyebrow="Project Delivery Rate"
              value="100%"
              tone="info"
              trendChip={<HaloChip tone="info">Perfect</HaloChip>}
              sparkData={[100, 100, 100, 100, 100, 100, 100]}
              footNote="On time, on budget"
              headerIcon={<Award className="w-4 h-4 text-slate-500" />}
            />
            <HaloStatTile
              eyebrow="Conversion Uplift"
              value="+34.8%"
              tone="warning"
              trendChip={<HaloChip tone="warning">Optimal</HaloChip>}
              sparkData={[12, 18, 15, 22, 28, 25, 34]}
              footNote="Post-optimization"
              headerIcon={<TrendingUp className="w-4 h-4 text-slate-500" />}
            />
          </div>
        </div>
      </section>

      {/* Tech Stack Footer-ish Banner */}
      <section className="py-12 border-t border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-black/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-mono text-slate-500 mb-6 tracking-widest uppercase">Technologies I Work With</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-75 text-slate-700 dark:text-slate-300">
            <span className="text-xl font-bold font-mono">React</span>
            <span className="text-xl font-bold font-mono">Next.js</span>
            <span className="text-xl font-bold font-mono">Node.js</span>
            <span className="text-xl font-bold font-mono">Express</span>
            <span className="text-xl font-bold font-mono">MongoDB/Firebase</span>
            <span className="text-xl font-bold font-mono">Flutter</span>
          </div>
        </div>
      </section>
    </div>
  );
}

