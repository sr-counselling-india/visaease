"use client";

import { Application } from "@/lib/mockAdminData";
import { Eye, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ApplicationsTableProps {
  applications: Application[];
  limit?: number;
}

export function ApplicationsTable({ applications, limit }: ApplicationsTableProps) {
  const displayData = limit ? applications.slice(0, limit) : applications;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-xs uppercase text-gray-500 font-medium">
            <tr>
              <th className="px-6 py-4">Application ID</th>
              <th className="px-6 py-4">Applicant</th>
              <th className="px-6 py-4">Country</th>
              <th className="px-6 py-4">Travelers</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {displayData.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-xs font-mono text-gray-500">
                    {app.id}
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{app.userName}</div>
                  <div className="text-xs text-gray-500">{app.details.email}</div>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2">
                     <span className="text-gray-900 font-medium">{app.country}</span>
                     <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{app.visaType}</span>
                   </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-1">
                        <UsersIcon className="h-4 w-4 text-gray-400" />
                        {app.travelers}
                    </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                    ${app.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' : 
                      app.status === 'Action Required' ? 'bg-red-50 text-red-700 border-red-200' : 
                      'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">{app.date}</td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/applications/${app.id}`}>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-full border-gray-200 hover:border-primary hover:text-primary">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UsersIcon(props: any) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
}
