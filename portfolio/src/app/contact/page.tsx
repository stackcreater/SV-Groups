"use client";

import { useState } from "react";
import { Camera, Mail, Send, Phone } from "lucide-react";
import Link from "next/link";
import { ParticleCard, BentoSection, useMobileDetection } from "@/components/MagicBento";
import { HaloInput, HaloTextarea, HaloButton } from "@/components/halo";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const isMobile = useMobileDetection();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("Error sending message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen py-24 bg-background transition-colors duration-300 overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-80 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-neon/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-neon/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Get In Touch</h1>
          <p className="text-xl text-slate-600 dark:text-gray-400">Have a project in mind or want to collaborate? Let's connect.</p>
        </div>

        <BentoSection
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          enableSpotlight={true}
          spotlightRadius={570}
          glowColor="132, 0, 255"
          disableAnimations={false}
        >
          
          {/* Contact Info */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow rounded-2xl p-8 bg-white/50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10"
            disableAnimations={isMobile}
            particleCount={8}
            glowColor="132, 0, 255"
            enableTilt={false}
            clickEffect={true}
            enableMagnetism={false}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Get in Touch</h2>
            <p className="text-slate-600 dark:text-gray-400 mb-8 leading-relaxed">
              Whether you have a question about my services, want to discuss a potential project, or just want to connect, feel free to reach out. I'm always open to new opportunities and collaborations.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:stackcreater.dev@gmail.com" className="flex items-center text-slate-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-neon transition-colors group">
                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mr-4 group-hover:border-cyan-600/50 dark:group-hover:border-cyan-neon/50">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-gray-500 font-medium">Email Me</div>
                  <div className="text-lg">stackcreater.dev@gmail.com</div>
                </div>
              </a>

              <a href="tel:+918270222541" className="flex items-center text-slate-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-neon transition-colors group">
                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mr-4 group-hover:border-cyan-600/50 dark:group-hover:border-cyan-neon/50">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-gray-500 font-medium">Call / WhatsApp</div>
                  <div className="text-lg">+91 82702 22541</div>
                </div>
              </a>
              
              <Link href="https://instagram.com/STACK_CREATER" target="_blank" rel="noreferrer" className="flex items-center text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-neon transition-colors group">
                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mr-4 group-hover:border-purple-600/50 dark:group-hover:border-purple-neon/50">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-gray-500 font-medium">Follow on Instagram</div>
                  <div className="text-lg">@STACK_CREATER</div>
                </div>
              </Link>
            </div>
          </ParticleCard>

          {/* Contact Form */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow bg-card text-card-foreground border border-border rounded-2xl p-8 shadow-sm dark:shadow-none"
            disableAnimations={isMobile}
            particleCount={8}
            glowColor="132, 0, 255"
            enableTilt={false}
            clickEffect={true}
            enableMagnetism={false}
          >
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 border border-green-500/50">
                  <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-slate-600 dark:text-gray-400">Thanks for reaching out. I'll get back to you shortly.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-cyan-600 dark:text-cyan-neon hover:underline text-sm cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <HaloInput 
                  required 
                  type="text" 
                  label="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Your Name" 
                />
                <HaloInput 
                  required 
                  type="email" 
                  label="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="you@example.com" 
                />
                <HaloTextarea 
                  required 
                  label="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="How can I help you?" 
                />
                <HaloButton 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Send Message"} <Send className="w-4 h-4 ml-2" />
                </HaloButton>
              </form>
            )}
          </ParticleCard>

        </BentoSection>
      </div>
    </div>
  );
}
