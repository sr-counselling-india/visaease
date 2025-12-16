"use client";

import React, { use, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Calendar, Zap, Shield, MessageSquare, ArrowRight, Lock, MapPin, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentWizard } from "@/components/AppointmentWizard";

// New Components
import { AppointmentTimeline } from "@/components/country/AppointmentTimeline";
import { SlotsMonitorMap } from "@/components/country/SlotsMonitorMap";
import { AppointmentCalendar } from "@/components/country/AppointmentCalendar";
import { ServiceTierSelector } from "@/components/country/ServiceTierSelector";
import { FaqSection } from "@/components/country/FaqSection";
import { SimulatorWidget } from "@/components/country/SimulatorWidget";

export default function CountryDetails({ params }: { params: Promise<{ countryName: string }> }) {
  const { countryName } = use(params);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  
  const country = countryName === 'usa' ? 'United States' : 
                 countryName === 'uae' ? 'United Arab Emirates' : 
                 countryName.charAt(0).toUpperCase() + countryName.slice(1);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-primary/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFDFD] via-transparent to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1550565118-3a1498d30d55?q=80&w=1920&auto=format&fit=crop" 
          alt="USA" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 pb-12 pt-32">
          <div className="container mx-auto px-6">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="max-w-3xl"
             >
               <div className="flex items-center gap-2 text-white font-medium mb-4 backdrop-blur-md bg-white/10 w-fit px-3 py-1 rounded-full border border-white/20">
                 <Shield className="h-4 w-4" />
                 <span>Guaranteed Visa Assistance</span>
               </div>
               <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
                 {country} Visa <br /> <span className="text-primary">Platform as a Service</span>
               </h1>
             </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-10 relative z-30 pb-24">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* 1. Guaranteed Appointment Section (Timeline) */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Guaranteed Appointment before 31st January 2026</h2>
                    <div className="h-1 w-20 bg-primary rounded-full" />
                </div>
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
                    <AppointmentTimeline guaranteedDate="Jan 2026" standardDate="Jan 2027" />
                </div>
            </section>

            {/* 2. Map & Calendar Grid */}
            <section className="grid lg:grid-cols-1 gap-8">
                <SlotsMonitorMap />
                <AppointmentCalendar />
            </section>

            {/* 3. How it works (Existing) */}
             <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">How Appointment Process Works</h2>
                    <div className="h-1 w-20 bg-primary rounded-full" />
                </div>
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-border space-y-8">
                  {[
                    { title: "Seamless DS-160 Form Filling", desc: "MyEasyVisa smart automation ensures an effortless DS-160 form completion" },
                    { title: "Guaranteed US Visa Appointment", desc: "We track availability 24/7." },
                    { title: "FREE Interview Preparation", desc: "Prepare for your interview with our AI bot." }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                       <div className="flex flex-col items-center">
                         <div className="h-3 w-3 rounded-full bg-primary mt-2" />
                         {i !== 2 && <div className="w-0.5 h-full bg-gray-100 my-2" />}
                       </div>
                       <div>
                         <h4 className="text-lg font-bold mb-1">{step.title}</h4>
                         <p className="text-gray-500">{step.desc}</p>
                       </div>
                    </div>
                  ))}
                </div>
            </section>

            {/* 4. Service Selection Tiers */}
            <section id="pricing">
                <ServiceTierSelector />
            </section>

            {/* 5. Simulator & Dropbox */}
            <section className="grid md:grid-cols-2 gap-8">
                <SimulatorWidget />
                
                {/* Dropbox Availability Widget */}
                <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                                <Archive className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold">Dropbox Eligibility</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Skip the interview! Check if you qualify for the Dropbox submission process for your visa renewal.
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Previous visa expired &#60; 48 months ago
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Applying for same visa class
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                No prior refusals
                            </li>
                        </ul>
                    </div>
                    <Button variant="outline" className="w-full h-12 rounded-xl">Check Dropbox Eligibility</Button>
                </div>
            </section>

            {/* 6. FAQ */}
            <FaqSection />

          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1 hidden lg:block">
             <div className="sticky top-24 space-y-6">
                
                {/* Timer Widget */}
                <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex items-center justify-between text-xs font-medium">
                    <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg">
                        <Clock className="h-3 w-3" /> in 46 days
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 text-gray-500">
                        <Zap className="h-3 w-3" /> in 31 days
                    </div>
                </div>

                {/* Main Booking Card */}
                <motion.div 
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="bg-white rounded-3xl p-6 shadow-xl border border-primary/10 overflow-hidden relative"
                >
                   <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-primary" />
                   
                   <div className="bg-primary rounded-xl p-4 text-white mb-6 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform" />
                     <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                             <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                                <span className="font-bold text-sm">Fast Track</span>
                             </div>
                             <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">3 slots left</span>
                        </div>
                        <h3 className="font-bold text-lg leading-tight">Appointment guaranteed in 46 Days or less!</h3>
                     </div>
                   </div>

                   <div className="flex items-center justify-between mb-2">
                     <span className="text-gray-500">Service Fee</span>
                     <span className="font-bold text-lg">₹990</span>
                   </div>
                   <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                     <span className="text-gray-500">Embassy Fee</span>
                     <span className="font-bold text-lg">₹19,000</span>
                   </div>

                   <div className="flex items-center justify-between mb-6 text-xl">
                     <span className="font-bold text-gray-900">Total</span>
                     <span className="font-bold text-gray-900">₹19,990</span>
                   </div>

                   <Button 
                     size="lg" 
                     className="w-full text-lg h-14 mb-4 shadow-lg shadow-primary/25 hover:shadow-primary/10 transition-all transform hover:-translate-y-0.5"
                     onClick={() => setIsWizardOpen(true)}
                   >
                     Reserve Appointment
                   </Button>
                   
                   <p className="text-center text-xs text-gray-400 mb-6">
                     Reserve now, pay the rest later.
                   </p>

                   <div className="flex items-center justify-center gap-2">
                      <div className="flex -space-x-2">
                          <div className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white" />
                          <div className="h-6 w-6 rounded-full bg-gray-300 border-2 border-white" />
                          <div className="h-6 w-6 rounded-full bg-gray-400 border-2 border-white" />
                      </div>
                      <span className="text-xs text-gray-500 font-medium">+12k trusted users</span>
                   </div>
                </motion.div>

                {/* Help Button */}
                <div className="flex justify-center">
                  <Button variant="outline" className="gap-2 rounded-full border-green-500 text-green-600 hover:bg-green-50 w-full">
                    <MessageSquare className="h-4 w-4" />
                    Chat with Expert
                  </Button>
                </div>
             </div>
          </div>

        </div>
      </div>
      
      <AppointmentWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
    </div>
  );
}
