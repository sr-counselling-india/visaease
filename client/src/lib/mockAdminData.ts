export interface Application {
  id: string;
  userId: string;
  userName: string;
  country: string;
  visaType: string;
  status: "Pending" | "Approved" | "Action Required" | "Rejected";
  date: string;
  travelers: number;
  totalAmount: string;
  details: {
    phone: string;
    email: string;
    travelDates: string;
    passportNumber: string; // Primary traveler
  }
}

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: "APP-2024-001",
    userId: "USER-101",
    userName: "Arjun Mehta",
    country: "United States",
    visaType: "B1/B2 Tourist",
    status: "Pending",
    date: "2024-02-14",
    travelers: 2,
    totalAmount: "₹38,000",
    details: {
      phone: "+91 98765 43210",
      email: "arjun.m@example.com",
      travelDates: "10 Mar 2024 - 25 Mar 2024",
      passportNumber: "Z1234567"
    }
  },
  {
    id: "APP-2024-002",
    userId: "USER-102",
    userName: "Priya Sharma",
    country: "United Kingdom",
    visaType: "Standard Visitor",
    status: "Approved",
    date: "2024-02-12",
    travelers: 1,
    totalAmount: "₹12,500",
    details: {
      phone: "+91 87654 32109",
      email: "priya.s@example.com",
      travelDates: "05 Apr 2024 - 12 Apr 2024",
      passportNumber: "A9876543"
    }
  },
  {
    id: "APP-2024-003",
    userId: "USER-103",
    userName: "Rahul Verma",
    country: "Canada",
    visaType: "Tourist",
    status: "Action Required",
    date: "2024-02-10",
    travelers: 3,
    totalAmount: "₹45,000",
    details: {
      phone: "+91 99887 76655",
      email: "rahul.v@example.com",
      travelDates: "20 May 2024 - 10 Jun 2024",
      passportNumber: "C1122334"
    }
  }
];

export const MOCK_STATS = {
  totalRevenue: "₹8,45,000",
  activeApplications: 124,
  successRate: "94%",
  pendingReviews: 12
};
