"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Send } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  problemStatement: string;
  targetAudience: string;
  referenceUrl: string;
  techStack: string[];
  database: string;
  dbUsage: string;
  needAuth: string;
  needPayment: string;
  needAdmin: string;
  timeline: string;
  budget: string;
  features: string;
  foundVia: string;
};

export default function StartProjectPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    defaultValues: {
      techStack: [],
    }
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 6));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error submitting form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formSectionClasses = "space-y-6";
  const labelClasses = "block text-sm font-medium text-gray-300 mb-1";
  const inputClasses = "w-full bg-black/50 border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-neon focus:ring-1 focus:ring-cyan-neon transition-colors";

  return (
    <div className="min-h-screen py-24 bg-black">
      <div className="max-w-3xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Start a Project</h1>
          <p className="text-gray-400">Tell me about your idea. I'll review it and get back to you within 24 hours.</p>
        </div>

        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-900/20 border border-green-500/50 rounded-xl p-12 text-center"
          >
            <h2 className="text-2xl font-bold text-green-400 mb-4">Message Received! 🎉</h2>
            <p className="text-gray-300">
              Thanks for reaching out. I'll review your project details and get back to you within 24 hours.
            </p>
          </motion.div>
        ) : (
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-neon to-purple-neon"
                initial={{ width: `${(step - 1) * 20}%` }}
                animate={{ width: `${(step / 6) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                
                {/* Step 1: About You */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={formSectionClasses}>
                    <h2 className="text-2xl font-semibold text-white mb-6">1. About You</h2>
                    
                    <div>
                      <label className={labelClasses}>Full Name *</label>
                      <input {...register("name", { required: true })} className={inputClasses} placeholder="John Doe" />
                      {errors.name && <span className="text-red-400 text-sm">Name is required</span>}
                    </div>
                    
                    <div>
                      <label className={labelClasses}>Email Address *</label>
                      <input type="email" {...register("email", { required: true })} className={inputClasses} placeholder="john@example.com" />
                      {errors.email && <span className="text-red-400 text-sm">Email is required</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClasses}>Phone / WhatsApp (optional)</label>
                        <input {...register("phone")} className={inputClasses} placeholder="+1 234 567 8900" />
                      </div>
                      <div>
                        <label className={labelClasses}>Company (optional)</label>
                        <input {...register("company")} className={inputClasses} placeholder="Acme Inc." />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Project Type */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={formSectionClasses}>
                    <h2 className="text-2xl font-semibold text-white mb-6">2. Project Type</h2>
                    
                    <div>
                      <label className={labelClasses}>What do you want to build?</label>
                      <select {...register("projectType")} className={inputClasses}>
                        <option value="Web Application">Web Application</option>
                        <option value="Mobile App">Mobile App (Android/iOS)</option>
                        <option value="E-commerce Store">E-commerce Store</option>
                        <option value="Portfolio Website">Portfolio/Personal Website</option>
                        <option value="SaaS Product">SaaS Product</option>
                        <option value="Landing Page">Landing Page</option>
                        <option value="Other">Other (specify in problem statement)</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Problem Statement */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={formSectionClasses}>
                    <h2 className="text-2xl font-semibold text-white mb-6">3. Problem Statement</h2>
                    
                    <div>
                      <label className={labelClasses}>Describe the problem your project solves *</label>
                      <textarea {...register("problemStatement", { required: true })} rows={4} className={inputClasses} placeholder="What is the core purpose of this project?" />
                    </div>
                    
                    <div>
                      <label className={labelClasses}>Who is your target audience?</label>
                      <textarea {...register("targetAudience")} rows={2} className={inputClasses} placeholder="Who will use this product?" />
                    </div>

                    <div>
                      <label className={labelClasses}>Do you have a reference website or app?</label>
                      <input {...register("referenceUrl")} className={inputClasses} placeholder="https://example.com" />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Tech Preferences */}
                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={formSectionClasses}>
                    <h2 className="text-2xl font-semibold text-white mb-6">4. Tech Preferences</h2>
                    
                    <div>
                      <label className={labelClasses}>Preferred Tech Stack</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {["React / Next.js", "Vue.js", "Node.js / Express", "Python", "Flutter", "No preference"].map(tech => (
                          <label key={tech} className="flex items-center space-x-2 text-gray-300">
                            <input type="checkbox" value={tech} {...register("techStack")} className="rounded bg-black border-white/20 text-cyan-neon focus:ring-cyan-neon" />
                            <span>{tech}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className={labelClasses}>Preferred Database</label>
                        <select {...register("database")} className={inputClasses}>
                          <option value="MongoDB">MongoDB</option>
                          <option value="PostgreSQL">PostgreSQL</option>
                          <option value="MySQL">MySQL</option>
                          <option value="Firebase">Firebase</option>
                          <option value="No preference">No preference</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>Database Usage Level</label>
                        <select {...register("dbUsage")} className={inputClasses}>
                          <option value="Simple">Simple (basic CRUD)</option>
                          <option value="Moderate">Moderate (user auth, relations)</option>
                          <option value="Complex">Complex (large scale, real-time)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div>
                        <label className={labelClasses}>Need Auth?</label>
                        <select {...register("needAuth")} className={inputClasses}><option>Yes</option><option>No</option><option>Not Sure</option></select>
                      </div>
                      <div>
                        <label className={labelClasses}>Need Payments?</label>
                        <select {...register("needPayment")} className={inputClasses}><option>Yes</option><option>No</option><option>Maybe later</option></select>
                      </div>
                      <div>
                        <label className={labelClasses}>Need Admin Dashboard?</label>
                        <select {...register("needAdmin")} className={inputClasses}><option>Yes</option><option>No</option></select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Timeline & Budget */}
                {step === 5 && (
                  <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={formSectionClasses}>
                    <h2 className="text-2xl font-semibold text-white mb-6">5. Timeline & Budget</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClasses}>Expected Timeline</label>
                        <select {...register("timeline")} className={inputClasses}>
                          <option value="Less than 2 weeks">Less than 2 weeks</option>
                          <option value="2–4 weeks">2–4 weeks</option>
                          <option value="1–2 months">1–2 months</option>
                          <option value="3+ months">3+ months</option>
                          <option value="Flexible">Flexible</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>Approximate Budget (₹)</label>
                        <select {...register("budget")} className={inputClasses}>
                          <option value="Under ₹5,000">Under ₹5,000</option>
                          <option value="₹5,000 – ₹15,000">₹5,000 – ₹15,000</option>
                          <option value="₹15,000 – ₹50,000">₹15,000 – ₹50,000</option>
                          <option value="₹50,000+">₹50,000+</option>
                          <option value="Let's discuss">Let's discuss</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 6: Additional Info */}
                {step === 6 && (
                  <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={formSectionClasses}>
                    <h2 className="text-2xl font-semibold text-white mb-6">6. Additional Info</h2>
                    
                    <div>
                      <label className={labelClasses}>Any specific features or integrations needed?</label>
                      <textarea {...register("features")} rows={3} className={inputClasses} placeholder="E.g., Stripe, SendGrid, OpenAI API..." />
                    </div>
                    
                    <div>
                      <label className={labelClasses}>How did you find me?</label>
                      <select {...register("foundVia")} className={inputClasses}>
                        <option value="Instagram">Instagram</option>
                        <option value="Google">Google</option>
                        <option value="Referral">Referral</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    step === 1 ? "text-gray-600 cursor-not-allowed" : "text-white hover:bg-white/10"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </button>
                
                {step < 6 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center px-6 py-2 bg-white text-black text-sm font-bold rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center px-6 py-2 bg-gradient-to-r from-cyan-neon to-purple-neon text-white text-sm font-bold rounded-md hover:opacity-90 transition-opacity"
                  >
                    {isSubmitting ? "Sending..." : "Submit Inquiry"} <Send className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
