"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_APPLICATIONS } from "@/lib/mockAdminData";
import { ArrowLeft, AlertTriangle, Send } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RevertApplicationPage({ params }: { params: Promise<{ applicationId: string }> }) {
  const { applicationId } = use(params);
  const router = useRouter();
  const application = MOCK_APPLICATIONS.find(app => app.id === applicationId);

  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!application) return null;

  const fields = [
    "Passport Front Page",
    "Passport Back Page",
    "Passport Photo",
    "Bank Statements",
    "Travel Dates",
    "Personal Details (Name matching)",
  ];

  const toggleField = (field: string) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter(f => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Mock API call
    console.log({ applicationId, selectedFields, comment });
    
    setTimeout(() => {
        setSubmitting(false);
        alert("Revert request sent to user!");
        router.push(`/admin/applications/${applicationId}`);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Link href={`/admin/applications/${applicationId}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 text-sm font-medium">
        <ArrowLeft className="h-4 w-4" /> Back to Application
      </Link>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-orange-50 border-b border-orange-100 p-8">
           <div className="flex items-center gap-4 text-orange-800 mb-2">
             <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center border border-orange-200">
               <AlertTriangle className="h-5 w-5" />
             </div>
             <h1 className="text-2xl font-bold">Request Changes</h1>
           </div>
           <p className="text-orange-700 ml-14">
             Select the fields that need correction. The user will be notified to update these details.
           </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
           <div className="mb-8">
             <label className="block text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
               What needs to be corrected?
             </label>
             <div className="grid md:grid-cols-2 gap-3">
               {fields.map((field) => (
                 <div 
                   key={field}
                   onClick={() => toggleField(field)}
                   className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3
                     ${selectedFields.includes(field) 
                       ? 'border-orange-500 bg-orange-50 text-orange-900 ring-1 ring-orange-500' 
                       : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'}`}
                 >
                   <input 
                     type="checkbox" 
                     className="rounded text-orange-600 focus:ring-orange-500 h-5 w-5"
                     checked={selectedFields.includes(field)}
                     readOnly
                   />
                   <span className="font-medium">{field}</span>
                 </div>
               ))}
             </div>
           </div>

           <div className="mb-8">
             <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
               Admin Instructions
             </label>
             <textarea 
               className="w-full h-32 rounded-xl border border-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-900"
               placeholder="Please describe exactly what changes are needed (e.g., 'Passport photo is blurry, please re-upload')..."
               value={comment}
               onChange={(e) => setComment(e.target.value)}
               required
             />
           </div>

           <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
             <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
             <Button 
               type="submit" 
               disabled={submitting || selectedFields.length === 0} 
               className="bg-orange-600 hover:bg-orange-700 text-white gap-2 pl-6 pr-6"
             >
               {submitting ? "Sending..." : "Send Request"}
               {!submitting && <Send className="h-4 w-4" />}
             </Button>
           </div>
        </form>
      </div>
    </div>
  );
}
