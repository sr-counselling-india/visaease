"use client";

import React from "react";
import { Check } from "lucide-react";

export function AppointmentCalendar() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Mock available dates
  const availableDates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Early dates open

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm h-full">
         <div className="flex items-center justify-between mb-8">
            <div>
               <div className="flex items-center gap-2 mb-2">
                 <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    16 Dec, 2025
                 </span>
               </div>
               <h3 className="text-xl font-bold">9 Appointments Detected Today</h3>
            </div>
         </div>

         <div className="mb-2">
            <h2 className="text-4xl font-bold text-gray-900">December</h2>
            <div className="text-2xl text-gray-400 font-light">2025</div>
         </div>

         <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs text-gray-400 font-medium py-4">
            {weekDays.map(d => <div key={d}>{d}</div>)}
         </div>

         <div className="grid grid-cols-7 gap-2 text-center">
             {/* Offset for start of month (mock) */}
             <div /> 
             
             {days.map(day => (
                <div 
                  key={day}
                  className={`
                    aspect-square flex items-center justify-center rounded-xl text-sm font-semibold border
                    ${availableDates.includes(day) 
                        ? "bg-white border-gray-200 text-gray-900 shadow-sm" 
                        : "bg-transparent border-transparent text-gray-400"}
                  `}
                >
                   {day < 10 ? `0${day}` : day}
                </div>
             ))}
         </div>
    </div>
  );
}
