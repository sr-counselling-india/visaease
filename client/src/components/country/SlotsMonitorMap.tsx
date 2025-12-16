"use client";

import React, { useState } from "react";
import { MapPin } from "lucide-react";

const CITIES = [
  { name: "New Delhi", top: "30%", left: "30%", slots: 343, color: "bg-red-500" },
  { name: "Mumbai", top: "60%", left: "20%", slots: 343, color: "bg-green-500" },
  { name: "Kolkata", top: "45%", left: "70%", slots: 355, color: "bg-yellow-500" },
  { name: "Chennai", top: "75%", left: "45%", slots: 335, color: "bg-green-500" },
  { name: "Hyderabad", top: "70%", left: "35%", slots: 285, color: "bg-orange-500" },
];

export function SlotsMonitorMap() {
  const [activeCity, setActiveCity] = useState(CITIES[0]);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Appointment Centers & Available Slots</h3>
            <p className="text-gray-500">
                in the last 30 days
            </p>
            <div className="h-0.5 w-10 bg-primary mt-4"></div>
        </div>

        <p className="text-gray-600 mb-8">
            We track slots 24/7 and book any opening instantly. The map below shows slots booked in the last 30 days across locations.
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
            {/* Map Area */}
            <div className="relative flex-grow bg-gray-50 rounded-2xl h-[400px] w-full overflow-hidden border border-gray-100">
                {/* Placeholder Map Image - Using a generic India map silhouette or similar */}
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/India_outline_map_with_states_and_union_territories.svg/2086px-India_outline_map_with_states_and_union_territories.svg.png" 
                    alt="Map"
                    className="absolute inset-0 w-full h-full object-contain opacity-20 p-8" 
                />
                
                {/* Pins */}
                {CITIES.map((city) => (
                    <div 
                        key={city.name}
                        className="absolute group cursor-pointer"
                        style={{ top: city.top, left: city.left }}
                        onClick={() => setActiveCity(city)}
                    >
                        <div className={`h-4 w-4 rounded-full ${city.color} border-4 border-white shadow-md relative z-10 transition-transform transform group-hover:scale-125`} />
                        <div className={`absolute -inset-2 ${city.color} opacity-20 rounded-full animate-ping`} />
                        {activeCity.name === city.name && (
                             <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-lg shadow-lg whitespace-nowrap z-20 font-bold text-xs border border-gray-100 flex items-center gap-2">
                                <span className={`h-2 w-2 rounded-full ${city.color}`} />
                                {city.name}
                             </div>
                        )}
                    </div>
                ))}
            </div>

            {/* List Area */}
            <div className="w-full lg:w-64 flex flex-col gap-3">
                {CITIES.map((city) => (
                    <button 
                        key={city.name}
                        onClick={() => setActiveCity(city)}
                        className={`text-left p-4 rounded-xl border transition-all ${
                            activeCity.name === city.name 
                            ? "bg-white border-gray-200 shadow-md transform scale-105" 
                            : "bg-white border-transparent hover:bg-gray-50"
                        }`}
                    >
                        <div className="font-bold text-gray-900">{city.name}</div>
                        <div className="text-xs flex items-center gap-2 mt-1">
                            <span className={`h-2 w-2 rounded-full ${city.color}`} />
                            <span className="text-gray-500">{city.slots} Appts</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    </div>
  );
}
