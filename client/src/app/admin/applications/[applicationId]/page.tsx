"use client";

import { use, useState, useEffect } from "react";
import { ArrowLeft, User, Calendar, FileText, CheckCircle, AlertTriangle, XCircle, Phone, Mail, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { API } from "@/constants/api";

// Interface matching the provided JSON response
interface APIApplicationDetail {
  id: number;
  status: string;
  applicationType: string;
  user: {
    id: number;
    firebaseId: string;
    email: string;
    name: string;
    role: string;
  };
  typeOfTrip: string;
  slotCity: string;
  startDate: string;
  country: {
    id: number;
    name: string;
    slots: number;
    fees30: number;
    fees45: number;
    typesAvailable: string[];
    citySlot: string[];
  };
  returnDate: string;
  travellers: {
    id: number;
    name: string;
    passportNo: string;
  }[];
}

// UI Interface (similar to what was used before, but adapted)
interface ApplicationUI {
  id: string;
  userName: string;
  status: string;
  totalAmount: string;
  travelers: number;
  country: string;
  visaType: string;
  details: {
    passportNumber: string;
    travelDates: string;
    phone: string;
    email: string;
  };
}

export default function ApplicationDetails({ params }: { params: Promise<{ applicationId: string }> }) {
  const { applicationId } = use(params);
  const router = useRouter();
  const [application, setApplication] = useState<ApplicationUI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        // The API constants file has APPLICATION_DETAIL defined as a function
        const url = API.ADMIN.APPLICATION_DETAIL(applicationId);
        const response = await api.get(url);
        const data = response.data.data as APIApplicationDetail;
        
        // Map API data to UI format
        let status = 'Pending';
        const apiStatus = data.status.toUpperCase();
        if (apiStatus === 'APPROVED') status = 'Approved';
        else if (apiStatus === 'REJECTED') status = 'Rejected';
        else if (apiStatus === 'ACTION_REQUIRED') status = 'Action Required';

        const uiApp: ApplicationUI = {
          id: `${data.id}`,
          userName: data.user.name || data.user.email.split('@')[0],
          status: status,
          // Total amount not explicitly in response, using mock or calculated if available later. 
          // For now using placeholder "Wait for API" as per previous agreement or 0
          totalAmount: "Wait for API", 
          travelers: data.travellers.length,
          country: data.country.name,
          visaType: data.typeOfTrip,
          details: {
            passportNumber: data.travellers[0]?.passportNo || "N/A",
            travelDates: `${data.startDate} - ${data.returnDate || '...'}`,
            phone: "N/A", // Not in API
            email: data.user.email
          }
        };

        setApplication(uiApp);
      } catch (err) {
        console.error("Failed to fetch application details:", err);
        setError("Failed to load application details.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [applicationId]);

  if (loading) {
     return <div className="p-8 text-center text-gray-500">Loading application details...</div>;
  }

  if (error || !application) {
    return <div className="p-8 text-center text-gray-500">{error || "Application not found"}</div>;
  }

  const handleApprove = () => {
    // Implement approve logic call to backend here later
    alert(`Application ${applicationId} approved!`);
    router.push('/admin/applications');
  };

  const handleRevert = () => {
    router.push(`/admin/applications/${applicationId}/revert`);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Link href="/admin/applications" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 text-sm font-medium">
        <ArrowLeft className="h-4 w-4" /> Back to Applications
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Info */}
        <div className="flex-1 space-y-6">
           <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
             <div className="flex items-start justify-between mb-8">
               <div>
                 <div className="flex items-center gap-3 mb-2">
                   <h1 className="text-2xl font-bold text-gray-900">{application.userName}</h1>
                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                      ${application.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' : 
                        application.status === 'Action Required' ? 'bg-red-50 text-red-700 border-red-200' : 
                        'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                      {application.status}
                    </span>
                 </div>
                 <p className="text-gray-500 font-mono text-sm">ID: {application.id}</p>
               </div>
               <div className="text-right">
                 <p className="text-sm text-gray-500">Total Amount</p>
                 <p className="text-2xl font-bold text-gray-900">{application.totalAmount}</p>
               </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
               <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" /> Traveler Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500 block">Primary Traveler</label>
                      <p className="font-medium text-gray-900">{application.userName}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block">Passport Number</label>
                      <p className="font-medium font-mono text-gray-900">{application.details.passportNumber}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block">Total Travelers</label>
                      <p className="font-medium text-gray-900">{application.travelers} Person(s)</p>
                    </div>
                  </div>
               </div>

               <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-400" /> Visa Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500 block">Destination</label>
                      <p className="font-medium text-gray-900">{application.country}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block">Visa Type</label>
                      <p className="font-medium text-gray-900">{application.visaType}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block">Travel Dates</label>
                      <p className="font-medium text-gray-900">{application.details.travelDates}</p>
                    </div>
                  </div>
               </div>
             </div>
             
             <div className="mt-8 pt-8 border-t border-gray-100 grid md:grid-cols-2 gap-8">
               <div>
                 <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" /> Contact Info
                 </h3>
                 <p className="text-gray-900">{application.details.phone}</p>
               </div>
               <div>
                 <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" /> Email Address
                 </h3>
                 <p className="text-gray-900">{application.details.email}</p>
               </div>
             </div>
           </div>

           <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-400" /> Uploaded Documents
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                 {['Passport Front', 'Passport Back', 'Photo', 'Bank Statement'].map((doc) => (
                   <div key={doc} className="p-4 rounded-xl border border-gray-200 flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer bg-gray-50">
                     <span className="text-sm font-medium text-gray-700">{doc}.pdf</span>
                     <Button variant="ghost" size="sm" className="h-8 text-xs">View</Button>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Action Sidebar */}
        <div className="lg:w-80">
           <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl sticky top-8">
             <h3 className="text-lg font-bold mb-6">Actions</h3>
             
             <div className="space-y-3">
               <Button onClick={handleApprove} className="w-full bg-green-600 hover:bg-green-700 text-white gap-2" size="lg">
                 <CheckCircle className="h-4 w-4" /> Approve Application
               </Button>
               
               <Button onClick={handleRevert} variant="outline" className="w-full border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 hover:text-orange-800 gap-2" size="lg">
                 <AlertTriangle className="h-4 w-4" /> Request Changes
               </Button>
               
               <Button variant="ghost" className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 gap-2">
                 <XCircle className="h-4 w-4" /> Reject Application
               </Button>
             </div>
             
             <div className="mt-6 pt-6 border-t border-gray-100">
               <p className="text-xs text-gray-500 mb-2">Last updated</p>
               <p className="text-sm font-medium text-gray-900">Today, 10:23 AM</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
