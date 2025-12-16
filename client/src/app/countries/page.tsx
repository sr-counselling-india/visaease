"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Search, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mock Data
const countries = [
  {
    id: "usa",
    name: "United States",
    image: "https://images.unsplash.com/photo-1550565118-3a1498d30d55?q=80&w=1000&auto=format&fit=crop",
    visaType: "Tourist (B1/B2)",
    processingTime: "3-4 Weeks",
    price: "From ₹14,500",
    successRate: "95%"
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    image: "https://images.unsplash.com/photo-1512453979798-5ea932a88405?q=80&w=1000&auto=format&fit=crop",
    visaType: "Tourist / Business",
    processingTime: "2-3 Days",
    price: "From ₹5,500",
    successRate: "99%"
  },
  {
    id: "uk",
    name: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop",
    visaType: "Standard Visitor",
    processingTime: "15 Days",
    price: "From ₹12,000",
    successRate: "92%"
  },
  {
    id: "canada",
    name: "Canada",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1000&auto=format&fit=crop",
    visaType: "Visitor Visa",
    processingTime: "20 Days",
    price: "From ₹11,000",
    successRate: "94%"
  },
  {
    id: "schengen",
    name: "Schengen Area",
    image: "https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?q=80&w=1000&auto=format&fit=crop",
    visaType: "Tourist C-Type",
    processingTime: "15 Days",
    price: "From ₹7,200",
    successRate: "96%"
  },
  {
    id: "australia",
    name: "Australia",
    image: "https://images.unsplash.com/photo-1523482580672-01e6f2eb60b3?q=80&w=1000&auto=format&fit=crop",
    visaType: "Visitor (600)",
    processingTime: "10-15 Days",
    price: "From ₹10,500",
    successRate: "90%"
  }
];

export default function CountriesPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 container mx-auto">
        <div className="max-w-xl mx-auto text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-textDark mb-4"
          >
            Choose Your Destination
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-textLight mb-8"
          >
            Select a country to start your streamlined visa application process designed by experts.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search country..." 
              className="w-full h-12 pl-12 pr-4 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
            />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country, index) => (
            <motion.div
              key={country.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/countries/${country.id}`}>
                <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border hover:-translate-y-1 cursor-pointer">
                  {/* Image Area */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={country.image} 
                      alt={country.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-1.5 text-xs font-medium bg-white/20 backdrop-blur-md px-2 py-1 rounded-full w-fit mb-2">
                        <MapPin className="h-3 w-3" />
                        {country.visaType}
                      </div>
                      <h3 className="text-2xl font-bold">{country.name}</h3>
                    </div>
                  </div>
                  
                  {/* Content Area */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-xs text-textLight uppercase font-medium">Processing</p>
                        <p className="font-semibold text-textDark">{country.processingTime}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-textLight uppercase font-medium">Starting From</p>
                        <p className="font-semibold text-primary">{country.price}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-border pt-4 mt-2">
                       <span className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                         ● {country.successRate} Approval
                       </span>
                       <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                         View Details <ArrowRight className="h-4 w-4" />
                       </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
