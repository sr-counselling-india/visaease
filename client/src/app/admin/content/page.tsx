"use client";

import { useState } from "react";
import { Edit2, Save, X, Globe, DollarSign, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data for Countries (duplicated from Countries page for admin simulation)
const INITIAL_COUNTRIES = [
  {
    id: "usa",
    name: "United States",
    image: "https://images.unsplash.com/photo-1550565118-3a1498d30d55?q=80&w=800&auto=format&fit=crop",
    visaType: "B1/B2 Tourist",
    processingTime: "3-4 Weeks",
    price: "₹12,499",
    successRate: "98%"
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    image: "https://images.unsplash.com/photo-1512453979798-5ea904ac66de?q=80&w=800&auto=format&fit=crop",
    visaType: "Tourist Visa",
    processingTime: "2-3 Days",
    price: "₹6,499",
    successRate: "99%"
  },
  {
    id: "uk",
    name: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop",
    visaType: "Standard Visitor",
    processingTime: "15 Working Days",
    price: "₹11,999",
    successRate: "95%"
  },
  {
    id: "canada",
    name: "Canada",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=800&auto=format&fit=crop",
    visaType: "Visitor Visa",
    processingTime: "25-30 Days",
    price: "₹13,999",
    successRate: "92%"
  },
];

export default function ContentManager() {
  const [countries, setCountries] = useState(INITIAL_COUNTRIES);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<typeof INITIAL_COUNTRIES[0] | null>(null);

  const handleEdit = (country: typeof INITIAL_COUNTRIES[0]) => {
    setEditingId(country.id);
    setEditForm({ ...country });
  };

  const handleSave = () => {
    if (editForm) {
      setCountries(countries.map(c => c.id === editForm.id ? editForm : c));
      setEditingId(null);
      setEditForm(null);
      // In real app, make API call here
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
        <p className="text-gray-500">Update country details, prices, and processing times.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {countries.map((country) => (
          <div key={country.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            {/* Image Preview */}
            <div className="h-48 relative overflow-hidden">
               <img src={country.image} alt={country.name} className="w-full h-full object-cover" />
               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                 {country.id.toUpperCase()}
               </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
               {editingId === country.id && editForm ? (
                 <div className="space-y-4 flex-1">
                   <div>
                     <label className="text-xs text-gray-400 font-bold uppercase">Processing Time</label>
                     <input 
                       className="w-full border-b border-gray-200 py-1 text-gray-900 font-medium focus:outline-none focus:border-primary"
                       value={editForm.processingTime}
                       onChange={e => setEditForm({...editForm, processingTime: e.target.value})}
                     />
                   </div>
                   <div>
                     <label className="text-xs text-gray-400 font-bold uppercase">Price</label>
                     <input 
                       className="w-full border-b border-gray-200 py-1 text-gray-900 font-medium focus:outline-none focus:border-primary"
                       value={editForm.price}
                       onChange={e => setEditForm({...editForm, price: e.target.value})}
                     />
                   </div>
                   <div>
                     <label className="text-xs text-gray-400 font-bold uppercase">Success Rate</label>
                     <input 
                       className="w-full border-b border-gray-200 py-1 text-gray-900 font-medium focus:outline-none focus:border-primary"
                       value={editForm.successRate}
                       onChange={e => setEditForm({...editForm, successRate: e.target.value})}
                     />
                   </div>

                   <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
                     <Button onClick={handleSave} className="flex-1 gap-2 bg-green-600 hover:bg-green-700 text-white">
                        <Save className="h-4 w-4" /> Save
                     </Button>
                     <Button onClick={handleCancel} variant="ghost" className="flex-1 gap-2 text-red-600 hover:bg-red-50 hover:text-red-700">
                        <X className="h-4 w-4" /> Cancel
                     </Button>
                   </div>
                 </div>
               ) : (
                 <>
                   <div className="flex justify-between items-start mb-4">
                     <div>
                       <h3 className="text-xl font-bold text-gray-900">{country.name}</h3>
                       <p className="text-sm text-gray-500">{country.visaType}</p>
                     </div>
                     <Button 
                       onClick={() => handleEdit(country)} 
                       variant="outline" 
                       size="sm" 
                       className="h-8 w-8 p-0 rounded-full border-gray-200 hover:border-primary hover:text-primary"
                     >
                       <Edit2 className="h-4 w-4" />
                     </Button>
                   </div>
                   
                   <div className="space-y-3 mt-auto">
                     <div className="flex items-center justify-between text-sm">
                       <span className="text-gray-500 flex items-center gap-2"><Clock className="h-4 w-4" /> Processing</span>
                       <span className="font-medium text-gray-900">{country.processingTime}</span>
                     </div>
                     <div className="flex items-center justify-between text-sm">
                       <span className="text-gray-500 flex items-center gap-2"><DollarSign className="h-4 w-4" /> Price</span>
                       <span className="font-medium text-primary">{country.price}</span>
                     </div>
                     <div className="flex items-center justify-between text-sm">
                       <span className="text-gray-500 flex items-center gap-2"><MapPin className="h-4 w-4" /> Success Rate</span>
                       <span className="font-medium text-green-600">{country.successRate}</span>
                     </div>
                   </div>
                 </>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
