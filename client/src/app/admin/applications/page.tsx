"use client";

import { Application } from "@/lib/mockAdminData";
import { ApplicationsTable } from "@/components/admin/ApplicationsTable";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { API } from "@/constants/api";

interface APIApplication {
  id: number;
  status: string;
  applicationType: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  country: {
    name: string;
  };
  typeOfTrip: string;
  startDate: string;
  travellers: {
    id: number;
    name: string;
    passportNo: string;
  }[];
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function to map API response to UI model
  const mapApiApplicationToUi = (apiApp: APIApplication): Application => {
    // Map status string to UI expected type
    let status: Application['status'] = 'Pending';
    const apiStatus = apiApp.status.toUpperCase();
    
    if (apiStatus === 'APPROVED') status = 'Approved';
    else if (apiStatus === 'REJECTED') status = 'Rejected';
    else if (apiStatus === 'ACTION_REQUIRED') status = 'Action Required';
    
    return {
      id: `${apiApp.id}`,
      userId: `${apiApp.user.id}`,
      userName: apiApp.user.name || apiApp.user.email.split('@')[0],
      country: apiApp.country?.name || 'Unknown',
      visaType: apiApp.typeOfTrip,
      status: status,
      date: apiApp.startDate,
      travelers: apiApp.travellers?.length || 0,
      totalAmount: "Wait for API",
      details: {
        phone: "N/A",
        email: apiApp.user.email,
        travelDates: `${apiApp.startDate} - ...`,
        passportNumber: apiApp.travellers?.[0]?.passportNo || "N/A"
      }
    };
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get(API.ADMIN.APPLICATIONS);
        const appsData = response.data.data || [];
        const mappedApps = appsData.map(mapApiApplicationToUi);
        setApplications(mappedApps);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-500">Manage and track all visa applications.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
             <input 
               type="text" 
               placeholder="Search by ID or Name..." 
               className="h-10 pl-9 pr-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
             />
           </div>
           <Button variant="outline" className="gap-2">
             <Filter className="h-4 w-4" /> Filter
           </Button>
        </div>
      </div>

      <ApplicationsTable applications={applications} />
    </div>
  );
}
