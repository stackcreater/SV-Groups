"use client";

import { useState } from "react";
import { Camera, Mail, Send } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const inputClasses = "w-full bg-black/50 border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-neon focus:ring-1 focus:ring-cyan-neon transition-colors";

  return (
    <div className="min-h-screen py-24 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Me</h1>
          <p className="text-xl text-gray-400">Have a question or just want to say hi? Let's talk.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Whether you have a question about my services, want to discuss a potential project, or just want to connect, feel free to reach out. I'm always open to new opportunities and collaborations.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:stackcreater.dev@gmail.com" className="flex items-center text-gray-300 hover:text-cyan-neon transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-4 group-hover:border-cyan-neon/50">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">Email Me</div>
                  <div className="text-lg">stackcreater.dev@gmail.com</div>
                </div>
              </a>
              
              <Link href="https://instagram.com/STACK_CREATER" target="_blank" rel="noreferrer" className="flex items-center text-gray-300 hover:text-purple-neon transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-4 group-hover:border-purple-neon/50">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">Follow on Instagram</div>
                  <div className="text-lg">@STACK_CREATER</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 border border-green-500/50">
                  <Send className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400">Thanks for reaching out. I'll get back to you shortly.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-cyan-neon hover:underline text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={inputClasses} 
                    placeholder="Your Name" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={inputClasses} 
                    placeholder="you@example.com" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <textarea 
                    required 
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={inputClasses} 
                    placeholder="How can I help you?" 
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center py-3 px-4 rounded-md shadow-sm text-sm font-bold text-white bg-gradient-to-r from-cyan-neon to-purple-neon hover:opacity-90 focus:outline-none transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"} <Send className="w-4 h-4 ml-2" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
