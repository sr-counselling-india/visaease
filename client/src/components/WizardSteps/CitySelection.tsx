"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CityOptionProps {
  city: string;
  date: string;
  isFastest?: boolean;
  selected?: boolean;
  onClick: () => void;
}

export function CityOption({ city, date, isFastest, selected, onClick }: CityOptionProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 relative overflow-hidden text-center",
        selected 
          ? "border-primary bg-primary/10 ring-2 ring-primary ring-offset-2" 
          : "border-border bg-white hover:border-primary/40 hover:shadow-md"
      )}
    >
      <div className="font-bold text-lg mb-1">{city}</div>
      <div className="text-xs text-textLight uppercase tracking-wide mb-1">Appt by</div>
      <div className="text-xl font-semibold text-textDark">{date}</div>
      
      {isFastest && (
        <div className="mt-3 bg-primary/10 text-primary text-xs font-bold py-1 px-3 rounded-full inline-block">
          Fastest!
        </div>
      )}
    </div>
  );
}
