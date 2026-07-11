"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code, Smartphone, ShoppingCart, Layout, PenTool, Zap, ArrowRight, Camera } from "lucide-react";
import TextFlip from "@/components/animata/text/text-flip";
import TypewriterHeading from "@/components/animata/text/typewriter-heading";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function Home() {
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
            <TextFlip />
            <TypewriterHeading />
            <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              Modern Websites | Clean Code | Powerful Solutions. Full-Stack Web & App Developer building fast, user-friendly solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/start-project" className="group relative px-8 py-4 bg-slate-900 text-white dark:bg-slate-950 dark:text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 shadow-lg border border-slate-900 dark:border-cyan-neon/30 hover:border-slate-800 dark:hover:border-cyan-neon/60">
                <span className="relative z-10 flex items-center">
                  Let's Build Together <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-neon dark:to-purple-neon opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </Link>
              
              <Link href="https://instagram.com/STACK_CREATER" target="_blank" rel="noreferrer" className="flex items-center px-8 py-4 rounded-full border border-slate-300 dark:border-white/20 hover:border-slate-500 dark:hover:border-white/60 hover:bg-slate-100/50 dark:hover:bg-white/5 text-slate-800 dark:text-white transition-all hover:scale-105 hover:shadow-md dark:hover:shadow-none">
                <Camera className="w-5 h-5 mr-2" />
                Follow on Instagram
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.08 }}
                className="p-8 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 hover:border-cyan-600/50 dark:hover:border-cyan-neon/50 hover:bg-slate-50/50 dark:hover:bg-white/[0.04] shadow-sm dark:shadow-none transition-all group"
              >
                <div className="transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-slate-600 dark:text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Footer-ish Banner */}
      <section className="py-12 border-t border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-black/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-mono text-slate-500 mb-6 tracking-widest uppercase">Technologies I Work With</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-75 text-slate-700 dark:text-slate-300">
            {/* Simple text representation for icons, ideally use SVGs */}
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
