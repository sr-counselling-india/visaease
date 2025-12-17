import { create } from "zustand";
import { api } from "@/lib/api";

export interface Traveler {
  firstName: string;
  lastName: string;
  passportNumber: string;
  // Add other fields as needed
}

interface ApplicationState {
  country: string | null;
  city: string | null;
  appointmentDate: string | null;
  travelers: Traveler[];
  submissionStatus: 'idle' | 'submitting' | 'success' | 'error';
  errorMessage: string | null;

  setCountry: (country: string) => void;
  setCity: (city: string) => void;
  setAppointmentDate: (date: string) => void;
  setTravelers: (travelers: Traveler[]) => void;
  reset: () => void;
  
  submitApplication: () => Promise<void>;
}

export const useApplicationStore = create<ApplicationState>((set, get) => ({
  country: null,
  city: null,
  appointmentDate: null,
  travelers: [],
  submissionStatus: 'idle',
  errorMessage: null,

  setCountry: (country) => set({ country }),
  setCity: (city) => set({ city }),
  setAppointmentDate: (date) => set({ appointmentDate: date }),
  setTravelers: (travelers) => set({ travelers }),
  
  reset: () => set({
    country: null,
    city: null,
    appointmentDate: null,
    travelers: [],
    submissionStatus: 'idle',
    errorMessage: null
  }),

  submitApplication: async () => {
    const state = get();
    // Basic validation
    if (!state.country || !state.city || state.travelers.length === 0) {
        set({ submissionStatus: 'error', errorMessage: 'Missing required fields' });
        return;
    }

    set({ submissionStatus: 'submitting', errorMessage: null });
    
    try {
      const payload = {
        country: state.country,
        city: state.city,
        appointmentDate: state.appointmentDate, // This might be null if not selected yet, or pre-filled
        travelers: state.travelers,
      };

      await api.post('/applications', payload);
      set({ submissionStatus: 'success' });
    } catch (error: any) {
        console.error("Submission failed", error);
        set({ 
            submissionStatus: 'error', 
            errorMessage: error.response?.data?.message || 'Failed to submit application' 
        });
    }
  },
}));
