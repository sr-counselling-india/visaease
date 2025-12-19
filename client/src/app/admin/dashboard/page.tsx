"use client";

import { Users, CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ApplicationsTable } from "@/components/admin/ApplicationsTable";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { API } from "@/constants/api";
import { Application } from "@/lib/mockAdminData";

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

interface DashboardMetrics {
  totalRevenue: number;
  activeApplications: number;
  successRate: number;
  pendingReview: number;
  recentApplications?: APIApplication[];
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalRevenue: 0,
    activeApplications: 0,
    successRate: 0,
    pendingReview: 0,
  });
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
    const fetchMetrics = async () => {
      try {
        const response = await api.get(API.ADMIN.DASHBOARD_METRICS);
        console.log(response.data);
        
        setMetrics(response.data);
        
        // Handle confirmed unified response structure
        const appsData = response.data.recentApplications || [];
        const mappedApps = appsData.map(mapApiApplicationToUi);
        setApplications(mappedApps);
        
      } catch (error) {
        console.error("Failed to fetch dashboard metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (rate: number) => {
    return `${rate}%`;
  };

  const stats = [
    { 
      label: "Total Revenue", 
      value: loading ? "..." : formatCurrency(metrics.totalRevenue), 
      icon: CreditCard, 
      color: "text-green-600", 
      bg: "bg-green-100" 
    },
    { 
      label: "Active Applications", 
      value: loading ? "..." : metrics.activeApplications, 
      icon: Users, 
      color: "text-blue-600", 
      bg: "bg-blue-100" 
    },
    { 
      label: "Success Rate", 
      value: loading ? "..." : formatPercentage(metrics.successRate), 
      icon: CheckCircle2, 
      color: "text-indigo-600", 
      bg: "bg-indigo-100" 
    },
    { 
      label: "Pending Reviews", 
      value: loading ? "..." : metrics.pendingReview, 
      icon: AlertCircle, 
      color: "text-orange-600", 
      bg: "bg-orange-100" 
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back, Administrator.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Applications</h2>
          <Link href="/admin/applications">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </div>
        
        <ApplicationsTable applications={applications} limit={5} />
      </div>
    </div>
  );
}
