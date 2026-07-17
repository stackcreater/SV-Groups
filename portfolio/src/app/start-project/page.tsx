"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Send } from "lucide-react";
import { ParticleCard, BentoSection, useMobileDetection } from "@/components/MagicBento";
import {
  HaloInput,
  HaloTextarea,
  HaloSelect,
  HaloCheckbox,
  HaloButton,
} from "@/components/halo";

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
  const isMobile = useMobileDetection();

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

  return (
    <div className="relative min-h-screen py-24 bg-background transition-colors duration-300 overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-80 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-neon/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-neon/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Start a Project</h1>
          <p className="text-slate-600 dark:text-gray-400">Tell me about your idea. I'll review it and get back to you within 24 hours.</p>
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
          <BentoSection
            className=""
            enableSpotlight={true}
            spotlightRadius={570}
            glowColor="132, 0, 255"
            disableAnimations={isMobile}
          >
            <ParticleCard
              className="magic-bento-card magic-bento-card--border-glow bg-card text-card-foreground border border-border rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden transition-colors duration-300"
              disableAnimations={isMobile}
              particleCount={8}
              glowColor="132, 0, 255"
              enableTilt={false}
              clickEffect={true}
              enableMagnetism={false}
            >
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-200 dark:bg-gray-800">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-neon dark:to-purple-neon"
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
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">1. About You</h2>
                    
                    <HaloInput 
                      label="Full Name *" 
                      placeholder="John Doe" 
                      error={errors.name ? "Name is required" : undefined}
                      {...register("name", { required: true })} 
                    />
                    
                    <HaloInput 
                      type="email" 
                      label="Email Address *" 
                      placeholder="john@example.com" 
                      error={errors.email ? "Email is required" : undefined}
                      {...register("email", { required: true })} 
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <HaloInput 
                        label="Phone / WhatsApp (optional)" 
                        placeholder="+1 234 567 8900" 
                        {...register("phone")} 
                      />
                      <HaloInput 
                        label="Company (optional)" 
                        placeholder="Acme Inc." 
                        {...register("company")} 
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Project Type */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={formSectionClasses}>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">2. Project Type</h2>
                    
                    <HaloSelect 
                      label="What do you want to build?" 
                      {...register("projectType")}
                    >
                      <option value="Web Application">Web Application</option>
                      <option value="Mobile App">Mobile App (Android/iOS)</option>
                      <option value="E-commerce Store">E-commerce Store</option>
                      <option value="Portfolio Website">Portfolio/Personal Website</option>
                      <option value="SaaS Product">SaaS Product</option>
                      <option value="Landing Page">Landing Page</option>
                      <option value="Other">Other (specify in problem statement)</option>
                    </HaloSelect>
                  </motion.div>
                )}

                {/* Step 3: Problem Statement */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={formSectionClasses}>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">3. Problem Statement</h2>
                    
                    <HaloTextarea 
                      label="Describe the problem your project solves *" 
                      rows={4} 
                      placeholder="What is the core purpose of this project?" 
                      error={errors.problemStatement ? "Problem description is required" : undefined}
                      {...register("problemStatement", { required: true })} 
                    />
                    
                    <HaloTextarea 
                      label="Who is your target audience?" 
                      rows={2} 
                      placeholder="Who will use this product?" 
                      {...register("targetAudience")} 
                    />

                    <HaloInput 
                      label="Do you have a reference website or app?" 
                      placeholder="https://example.com" 
                      {...register("referenceUrl")} 
                    />
                  </motion.div>
                )}

                {/* Step 4: Tech Preferences */}
                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={formSectionClasses}>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">4. Tech Preferences</h2>
                    
                    <div>
                      <label className="halo-field-label block mb-3">Preferred Tech Stack</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {["React / Next.js", "Vue.js", "Node.js / Express", "Python", "Flutter", "No preference"].map(tech => (
                          <HaloCheckbox 
                            key={tech} 
                            label={tech} 
                            value={tech} 
                            {...register("techStack")} 
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <HaloSelect 
                        label="Preferred Database" 
                        {...register("database")}
                      >
                        <option value="MongoDB">MongoDB</option>
                        <option value="PostgreSQL">PostgreSQL</option>
                        <option value="MySQL">MySQL</option>
                        <option value="Firebase">Firebase</option>
                        <option value="No preference">No preference</option>
                      </HaloSelect>
                      
                      <HaloSelect 
                        label="Database Usage Level" 
                        {...register("dbUsage")}
                      >
                        <option value="Simple">Simple (basic CRUD)</option>
                        <option value="Moderate">Moderate (user auth, relations)</option>
                        <option value="Complex">Complex (large scale, real-time)</option>
                      </HaloSelect>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <HaloSelect label="Need Auth?" {...register("needAuth")}>
                        <option>Yes</option>
                        <option>No</option>
                        <option>Not Sure</option>
                      </HaloSelect>
                      <HaloSelect label="Need Payments?" {...register("needPayment")}>
                        <option>Yes</option>
                        <option>No</option>
                        <option>Maybe later</option>
                      </HaloSelect>
                      <HaloSelect label="Need Admin Dashboard?" {...register("needAdmin")}>
                        <option>Yes</option>
                        <option>No</option>
                      </HaloSelect>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Timeline & Budget */}
                {step === 5 && (
                  <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={formSectionClasses}>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">5. Timeline & Budget</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <HaloSelect label="Expected Timeline" {...register("timeline")}>
                        <option value="Less than 2 weeks">Less than 2 weeks</option>
                        <option value="2–4 weeks">2–4 weeks</option>
                        <option value="1–2 months">1–2 months</option>
                        <option value="3+ months">3+ months</option>
                        <option value="Flexible">Flexible</option>
                      </HaloSelect>
                      
                      <HaloSelect label="Approximate Budget (₹)" {...register("budget")}>
                        <option value="Under ₹5,000">Under ₹5,000</option>
                        <option value="₹5,000 – ₹15,000">₹5,000 – ₹15,000</option>
                        <option value="₹15,000 – ₹50,000">₹15,000 – ₹50,000</option>
                        <option value="₹50,000+">₹50,000+</option>
                        <option value="Let's discuss">Let's discuss</option>
                      </HaloSelect>
                    </div>
                  </motion.div>
                )}

                {/* Step 6: Additional Info */}
                {step === 6 && (
                  <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={formSectionClasses}>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">6. Additional Info</h2>
                    
                    <HaloTextarea 
                      label="Any specific features or integrations needed?" 
                      rows={3} 
                      placeholder="E.g., Stripe, SendGrid, OpenAI API..." 
                      {...register("features")} 
                    />
                    
                    <HaloSelect label="How did you find me?" {...register("foundVia")}>
                      <option value="Instagram">Instagram</option>
                      <option value="Google">Google</option>
                      <option value="Referral">Referral</option>
                      <option value="Other">Other</option>
                    </HaloSelect>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-10 pt-6 border-t border-border">
                <HaloButton
                  type="button"
                  onClick={prevStep}
                  disabled={step === 1}
                  variant="secondary"
                  size="sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </HaloButton>
                
                {step < 6 ? (
                  <HaloButton
                    type="button"
                    onClick={nextStep}
                    size="sm"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </HaloButton>
                ) : (
                  <HaloButton
                    type="submit"
                    disabled={isSubmitting}
                    size="sm"
                  >
                    {isSubmitting ? "Sending..." : "Submit Inquiry"} <Send className="w-4 h-4 ml-2" />
                  </HaloButton>
                )}
              </div>
            </form>
            </ParticleCard>
          </BentoSection>
        )}
      </div>
    </div>
  );
}
