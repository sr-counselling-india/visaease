import { MOCK_STATS, MOCK_APPLICATIONS } from "@/lib/mockAdminData";
import { Users, CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ApplicationsTable } from "@/components/admin/ApplicationsTable";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Revenue", value: MOCK_STATS.totalRevenue, icon: CreditCard, color: "text-green-600", bg: "bg-green-100" },
    { label: "Active Applications", value: MOCK_STATS.activeApplications, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Success Rate", value: MOCK_STATS.successRate, icon: CheckCircle2, color: "text-indigo-600", bg: "bg-indigo-100" },
    { label: "Pending Reviews", value: MOCK_STATS.pendingReviews, icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-100" },
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
        
        <ApplicationsTable applications={MOCK_APPLICATIONS} limit={5} />
      </div>
    </div>
  );
}
