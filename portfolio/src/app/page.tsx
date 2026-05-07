"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code, Smartphone, ShoppingCart, Layout, PenTool, Zap, ArrowRight, Camera } from "lucide-react";

export default function Home() {
  const services = [
    { icon: <ShoppingCart className="w-8 h-8 mb-4 text-cyan-neon" />, title: "E-Commerce Stores", desc: "High-converting online stores that grow your business." },
    { icon: <PenTool className="w-8 h-8 mb-4 text-purple-neon" />, title: "Blog Websites", desc: "SEO-friendly blog websites to share your ideas." },
    { icon: <Layout className="w-8 h-8 mb-4 text-cyan-neon" />, title: "Portfolio Websites", desc: "Showcase your work with stunning portfolio websites." },
    { icon: <Smartphone className="w-8 h-8 mb-4 text-purple-neon" />, title: "Responsive Design", desc: "Perfect on every device for the best user experience." },
    { icon: <Zap className="w-8 h-8 mb-4 text-cyan-neon" />, title: "Fast & Optimized", desc: "Lightning fast websites optimized for speed and performance." },
    { icon: <Code className="w-8 h-8 mb-4 text-purple-neon" />, title: "Clean Code", desc: "Secure, scalable, and maintainable custom solutions." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 flex items-center justify-center min-h-[90vh] overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-neon/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-neon/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-cyan-neon font-mono mb-4 tracking-widest uppercase">We Code. You Grow. We Scale.</h2>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
              WE BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-neon to-purple-neon">
                DIGITAL EXPERIENCES
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Modern Websites | Clean Code | Powerful Solutions. Full-Stack Web & App Developer building fast, user-friendly solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/start-project" className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105">
                <span className="relative z-10 flex items-center">
                  Let's Build Together <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-cyan-neon to-purple-neon opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </Link>
              
              <Link href="https://instagram.com/STACK_CREATER" target="_blank" rel="noreferrer" className="flex items-center px-8 py-4 rounded-full border border-white/20 hover:border-white/60 hover:bg-white/5 transition-all">
                <Camera className="w-5 h-5 mr-2" />
                Follow on Instagram
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">What You Get</h2>
            <p className="text-gray-400">Everything you need to turn your ideas into websites that work.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-neon/50 hover:bg-white/[0.04] transition-all group"
              >
                <div className="transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Footer-ish Banner */}
      <section className="py-12 border-t border-white/10 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-mono text-gray-500 mb-6 tracking-widest uppercase">Technologies I Work With</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
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
