"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "How does the 'Guaranteed Appointment' work?",
    a: "We use automated systems to monitor visa appointment slots 24/7. When a slot opens up that matches your criteria, our system instantly books it for you. If we fail to get a slot within the guaranteed timeframe, you get a full refund."
  },
  {
    q: "Can I choose a specific date?",
    a: "You can provide your preferred date range. While we can't guarantee a specific day due to embassy availability, we will book the earliest available slot within your window."
  },
  {
    q: "What if my visa gets rejected?",
    a: "Our service fee covers the appointment booking and documentation assistance. Visa approval is at the sole discretion of the embassy. However, our 'Elite' tier includes re-application assistance."
  },
  {
    q: "Is the simulation of bank statements accurate?",
    a: "Our simulator provides a readiness score based on standard embassy requirements (e.g., minimum balance, transaction history clarity). It is a guidance tool, not an official verification."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-12 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {FAQS.map((faq, i) => (
          <div 
            key={i} 
            className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-gray-300 transition-colors"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="font-semibold text-lg">{faq.q}</span>
              {openIndex === i ? <Minus className="h-5 w-5 text-primary" /> : <Plus className="h-5 w-5 text-gray-400" />}
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
