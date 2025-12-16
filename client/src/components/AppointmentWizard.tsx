"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CityOption } from "./WizardSteps/CitySelection";
import { TravelerForm } from "./WizardSteps/TravelerForm";

interface AppointmentWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AppointmentWizard({ isOpen, onClose }: AppointmentWizardProps) {
  const [step, setStep] = useState<"city" | "details" | "confirmation">("city");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
      />

      {/* Dialog */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 md:p-12 z-10"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {step === "city" && (
          <div className="text-center max-w-2xl mx-auto">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/US-DepartmentOfState-Seal.svg/1200px-US-DepartmentOfState-Seal.svg.png" 
                  alt="US Seal" 
                  className="h-16 mx-auto mb-6"
             />
             <h2 className="text-2xl md:text-3xl font-bold mb-2">Guaranteed Visa Appointment Before</h2>
             <div className="text-4xl font-black text-textDark mb-8">31 Jan, 03:31 AM</div>
             
             <h3 className="text-xl font-bold mb-4">Would you like to select a specific city for your appointment?</h3>
             <p className="text-textLight mb-10">Choosing a different city may affect how quickly we can book your appointment.</p>
             
             <div className="grid md:grid-cols-3 gap-4 mb-10">
                <CityOption 
                  city="Pan India" 
                  date="31 Jan" 
                  isFastest 
                  selected={selectedCity === "Pan India"} 
                  onClick={() => setSelectedCity("Pan India")}
                />
                <CityOption 
                  city="Mumbai" 
                  date="01 May" 
                  selected={selectedCity === "Mumbai"} 
                  onClick={() => setSelectedCity("Mumbai")}
                />
                <CityOption 
                  city="Delhi" 
                  date="17 Mar" 
                  selected={selectedCity === "Delhi"} 
                  onClick={() => setSelectedCity("Delhi")}
                />
                <CityOption 
                  city="Hyderabad" 
                  date="17 Mar" 
                  selected={selectedCity === "Hyderabad"} 
                  onClick={() => setSelectedCity("Hyderabad")}
                />
                <CityOption 
                  city="Kolkata" 
                  date="17 Mar" 
                  selected={selectedCity === "Kolkata"} 
                  onClick={() => setSelectedCity("Kolkata")}
                />
                <CityOption 
                  city="Chennai" 
                  date="31 May" 
                  selected={selectedCity === "Chennai"} 
                  onClick={() => setSelectedCity("Chennai")}
                />
             </div>
             
             <Button 
               size="lg" 
               className="w-full max-w-md mx-auto h-14 text-lg"
               onClick={() => setStep("details")}
               disabled={!selectedCity}
             >
               Continue
             </Button>
          </div>
        )}

        {step === "details" && (
          <div className="max-w-xl mx-auto">
             <TravelerForm onUpdate={(travelers) => console.log(travelers)} />
             
             <Button 
               size="lg" 
               className="w-full h-14 mt-8 text-lg"
               onClick={() => setStep("confirmation")}
             >
               Continue
             </Button>
          </div>
        )}

        {step === "confirmation" && (
            <div className="text-center max-w-xl mx-auto py-10">
               <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle className="h-12 w-12 text-green-600" />
               </div>
               <h2 className="text-3xl font-bold mb-4">Details Saved!</h2>
               <p className="text-gray-600 mb-8">
                 We are mocking the rest of the flow here. In a real app, you would now proceed to payment gateway.
               </p>
               <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
                 <div className="text-sm text-textLight uppercase font-semibold mb-2">Total Payable</div>
                 <div className="text-4xl font-bold text-primary">₹17,200</div>
               </div>
               <Button onClick={onClose} size="lg" className="w-full">
                 Done
               </Button>
            </div>
        )}

      </motion.div>
    </div>
  );
}
