"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface AppointmentTimelineProps {
  guaranteedDate: string; // e.g. "Jan 2026"
  standardDate: string;   // e.g. "Jan 2027"
}

export function AppointmentTimeline({ guaranteedDate, standardDate }: AppointmentTimelineProps) {
  return (
    <div className="w-full">
      <div className="relative pt-8 pb-4">
        {/* Base Track */}
        <div className="absolute top-10 left-0 w-full h-1 bg-gray-100 rounded-full" />
        
        {/* Progress Track (approx 33% for visual) */}
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "33%" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-10 left-0 h-1 bg-primary rounded-full" 
        />

        <div className="flex justify-between relative text-sm">
          {/* Today */}
          <div className="text-center w-24 flex flex-col items-center">
            <div className="h-4 w-4 bg-black rounded-full mb-2 relative z-10 border-4 border-white shadow-sm" />
            <span className="text-xs text-gray-400 mb-1">Current Date</span>
            <span className="font-semibold text-textDark">Today</span>
          </div>

          {/* Guaranteed Date */}
          <div className="text-center w-32 flex flex-col items-center -ml-8">
             <motion.div 
               initial={{ scale: 0 }}
               whileInView={{ scale: 1 }}
               transition={{ delay: 0.5, type: "spring" }}
               className="h-6 w-auto px-2 py-0.5 bg-primary rounded-full mb-1 relative z-10 border-2 border-white shadow-md flex items-center justify-center text-[10px] text-white font-bold"
             >
               Atlys
             </motion.div>
            <span className="font-semibold text-primary">{guaranteedDate}</span>
          </div>

          {/* Standard Date */}
          <div className="text-center w-24 flex flex-col items-center opacity-50">
             <div className="h-auto w-auto px-2 py-0.5 bg-gray-500 rounded-sm mb-1 relative z-10 text-[10px] text-white">
               Govt. Site
             </div>
             <div className="h-4 w-4 bg-gray-200 rounded-full mb-2 border-4 border-white" />
            <span className="font-semibold text-textDark">{standardDate}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50/50 rounded-xl p-6 border border-blue-100">
        <h4 className="text-blue-600 font-semibold mb-2">How we book appointments 12 months sooner</h4>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <div>
                    <h5 className="font-bold text-sm text-gray-900">24/7 Appointment Monitoring</h5>
                    <p className="text-xs text-gray-500 mt-1">We track openings round the clock, ensuring none are missed.</p>
                </div>
            </div>
            <div className="flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div>
                    <h5 className="font-bold text-sm text-gray-900">Instant Booking</h5>
                    <p className="text-xs text-gray-500 mt-1">Our team instantly books an appointment the moment it's available.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
