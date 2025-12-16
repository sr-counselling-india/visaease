"use client";

import { MOCK_APPLICATIONS } from "@/lib/mockAdminData";
import { ApplicationsTable } from "@/components/admin/ApplicationsTable";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ApplicationsPage() {
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

      <ApplicationsTable applications={MOCK_APPLICATIONS} />
    </div>
  );
}
