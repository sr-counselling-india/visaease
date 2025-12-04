const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api";

export const API = {
  BASE_URL: baseUrl,
  AUTH: {
    LOGIN: `${baseUrl}/auth/login`,
    SIGNUP: `${baseUrl}/auth/register`,
    ME: `${baseUrl}/auth/me`,
  },
  APPLICATIONS: {
    ROOT: `${baseUrl}/applications`,
  },
} as const;