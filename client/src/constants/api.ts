const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export const API = {
  BASE_URL: baseUrl,
  AUTH: {
    LOGIN: `${baseUrl}/auth/login`,
    SIGNUP: `${baseUrl}/auth/register`,
    ME: `${baseUrl}/auth/me`,
  },
  ADMIN: {
    DASHBOARD_METRICS: `${baseUrl}/admin/dashboard-metrics`,
    APPLICATIONS: `${baseUrl}/admin/applications`,
    APPLICATION_DETAIL: (id: string | number) => `${baseUrl}/admin/application/${id}`,
  },
  APPLICATIONS: {
    ROOT: `${baseUrl}/applications`,
  },
} as const;