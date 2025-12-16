"use client";

import React, { useState } from "react";
import { Check, Calendar, MessageSquare, PieChart, Users, Bot, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const TIERS = [
  {
    id: "basic",
    name: "Basic",
    price: "990",
    features: [
      { name: "Guaranteed Date", icon: Calendar },
      { name: "Interview Bot", icon: Bot },
    ],
    highlight: false
  },
  {
    id: "standard",
    name: "Standard",
    price: "1,490",
    features: [
      { name: "Guaranteed Date", icon: Calendar },
      { name: "Document Feedback", icon: MessageSquare },
      { name: "Interview Bot", icon: Bot },
    ],
    highlight: true
  },
  {
    id: "premium",
    name: "Premium",
    price: "2,490",
    features: [
      { name: "Guaranteed Date", icon: Calendar },
      { name: "Document Feedback", icon: MessageSquare },
      { name: "Financial Planning", icon: PieChart },
      { name: "Interview Bot", icon: Bot },
    ],
    highlight: false
  },
  {
    id: "elite",
    name: "Elite",
    price: "4,990",
    features: [
      { name: "Guaranteed Date", icon: Calendar },
      { name: "Document Feedback", icon: MessageSquare },
      { name: "Financial Planning", icon: PieChart },
      { name: "Ex-Consular Counselor", icon: Users },
      { name: "Interview Bot", icon: Bot },
    ],
    highlight: false
  }
];

export function ServiceTierSelector() {
  const [selectedTier, setSelectedTier] = useState<string>("standard");

  return (
    <div className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Choose Your Visa Service Level</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          From automated booking to full personalized counseling, select the package that fits your needs.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TIERS.map((tier) => (
          <motion.div
            key={tier.id}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedTier(tier.id)}
            className={`
              relative p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col
              ${selectedTier === tier.id 
                ? "border-primary bg-primary/5 shadow-lg" 
                : "border-transparent bg-white shadow-sm hover:border-gray-200"}
            `}
          >
            {tier.highlight && (
                <div className="absolute -top-3 inset-x-0 flex justify-center">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        Most Popular
                    </span>
                </div>
            )}

            <div className="mb-6">
                <h3 className="font-bold text-lg mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">₹{tier.price}</span>
                    <span className="text-gray-400 text-sm">/ person</span>
                </div>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className={`p-1 rounded-full ${selectedTier === tier.id ? "bg-primary/20 text-primary" : "bg-gray-100 text-gray-500"}`}>
                            <feature.icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{feature.name}</span>
                    </div>
                ))}
            </div>

            <Button 
                variant={selectedTier === tier.id ? "primary" : "outline"}
                className="w-full rounded-xl"
            >
                {selectedTier === tier.id ? "Select Plan" : "Choose"}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Additional Options */}
      <div className="mt-12 grid md:grid-cols-2 gap-6">
         <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-3xl p-8 text-white relative overflow-hidden group hover:shadow-xl transition-shadow">
            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium mb-4">
                    <Bot className="h-3 w-3" /> AI Powered
                </div>
                <h3 className="text-2xl font-bold mb-2">Interview Prep Bot</h3>
                <p className="text-indigo-200 mb-6 text-sm max-w-xs">
                    Practice unlimited mock interviews with our AI trained on real consular questions.
                </p>
                <Button className="bg-white text-indigo-900 hover:bg-indigo-50 border-0">
                    Try for Free <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </div>
            <Bot className="absolute -bottom-8 -right-8 h-48 w-48 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
         </div>

         <div className="bg-orange-50 rounded-3xl p-8 border border-orange-100 relative overflow-hidden group hover:shadow-xl transition-shadow">
            <div className="relative z-10">
                 <div className="inline-flex items-center gap-2 bg-orange-200/50 px-3 py-1 rounded-full text-xs font-medium text-orange-800 mb-4">
                    <Users className="h-3 w-3" /> First Time Applicant?
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Personal Consultation</h3>
                <p className="text-gray-600 mb-6 text-sm max-w-xs">
                    Get a 30-min valid assessment call with our experts for specific country guidance.
                </p>
                <Button variant="outline" className="border-orange-200 text-orange-800 hover:bg-orange-100">
                    Book Consultation
                </Button>
            </div>
            <Users className="absolute -bottom-8 -right-8 h-48 w-48 text-orange-200/20 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
         </div>
      </div>
    </div>
  );
}
