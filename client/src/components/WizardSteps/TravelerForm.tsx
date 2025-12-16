"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Traveler {
  id: string;
  firstName: string;
  lastName: string;
  passportNumber: string;
  documents?: {
    bankStatements?: boolean;
    salarySlips?: boolean;
    taxReturns?: boolean;
  }; 
}

interface TravelerFormProps {
  onUpdate: (travelers: Traveler[]) => void;
}

export function TravelerForm({ onUpdate }: TravelerFormProps) {
  const [travelers, setTravelers] = useState<Traveler[]>([
    { id: '1', firstName: '', lastName: '', passportNumber: '' }
  ]);
  const [activeTravelerId, setActiveTravelerId] = useState<string>('1');

  const addTraveler = () => {
    const newId = (travelers.length + 1).toString();
    const newTraveler = { id: newId, firstName: '', lastName: '', passportNumber: '' };
    setTravelers([...travelers, newTraveler]);
    setActiveTravelerId(newId);
  };

  const removeTraveler = (id: string) => {
    if (travelers.length === 1) return;
    const filtered = travelers.filter(t => t.id !== id);
    setTravelers(filtered);
    if (activeTravelerId === id) {
      setActiveTravelerId(filtered[filtered.length - 1].id);
    }
  };

  const updateTraveler = (id: string, field: keyof Traveler, value: string) => {
    const updated = travelers.map(t => t.id === id ? { ...t, [field]: value } : t);
    setTravelers(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Enter Travelers Details</h3>
        <div className="flex justify-center gap-1">
          {travelers.map((t) => (
             <div 
               key={t.id} 
               onClick={() => setActiveTravelerId(t.id)}
               className={cn(
                 "h-2 w-2 rounded-full cursor-pointer transition-colors",
                 activeTravelerId === t.id ? "bg-primary" : "bg-gray-200"
               )} 
             />
          ))}
        </div>
        <p className="text-textLight text-sm mt-4">
          We need some personal details to get you started.
        </p>
      </div>

      <div className="space-y-4">
        {travelers.map((traveler) => (
          <div key={traveler.id} className={cn(activeTravelerId !== traveler.id && "hidden")}>
             <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  value={traveler.firstName}
                  onChange={(e) => updateTraveler(traveler.id, 'firstName', e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  value={traveler.lastName}
                  onChange={(e) => updateTraveler(traveler.id, 'lastName', e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
             </div>
             <input 
               type="text" 
               placeholder="Passport Number" 
               value={traveler.passportNumber}
               onChange={(e) => updateTraveler(traveler.id, 'passportNumber', e.target.value)}
               className="w-full h-12 px-4 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
             />

             {/* Document Checklist Mock */}
             <div className="bg-secondary/50 p-4 rounded-xl space-y-3 mt-4">
               <p className="text-sm font-semibold text-textDark">Optional Documents check:</p>
               {['Bank Statements', 'Salary Slips', 'Income Tax Returns'].map((doc) => (
                 <label key={doc} className="flex items-center gap-2 text-sm text-textLight cursor-pointer">
                   <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                   {doc}
                 </label>
               ))}
             </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4">
         <Button 
           variant="ghost" 
           size="sm" 
           onClick={addTraveler} 
           className="text-primary hover:text-primary hover:bg-primary/5"
         >
           <Plus className="h-4 w-4 mr-1" /> Add Another Traveler
         </Button>
         
         {travelers.length > 1 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => removeTraveler(activeTravelerId)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-1" /> Remove Current
            </Button>
         )}
      </div>
      
      {/* Accordion view for overview */}
      <div className="space-y-2 mt-8">
        {travelers.map((t) => (
           <div 
             key={t.id}
             onClick={() => setActiveTravelerId(t.id)} 
             className={cn(
               "p-3 rounded-lg border border-border flex items-center justify-between cursor-pointer",
               activeTravelerId === t.id ? "bg-primary/5 border-primary/20" : "bg-white"
             )}
           >
             <div className="flex items-center gap-2">
                {t.firstName ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-gray-300" />
                )}
                <span className="text-sm font-medium">
                  {t.firstName && t.lastName ? `${t.firstName} ${t.lastName}` : `Traveler ${t.id}`}
                </span>
             </div>
             <ChevronDown className={cn("h-4 w-4 transition-transform", activeTravelerId === t.id && "rotate-180")} />
           </div>
        ))}
      </div>
    </div>
  );
}
