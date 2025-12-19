import { create } from "zustand";
import { api } from "@/lib/api";
import { auth } from "@/config/firebaseConfig";

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
      const user = auth.currentUser;
      const userEmail = user?.email || "guest@example.com"; // Fallback or handle auth requirement separate

      // Map country name to ID (Placeholder logic)
      const countryId = 1; 
      // if (state.country === 'United States') countryId = 1;
      
      const startDate = state.appointmentDate || new Date().toISOString().split('T')[0];
      
      // Calculate end date (placeholder: +30 days)
      const startObj = new Date(startDate);
      const endObj = new Date(startObj);
      endObj.setDate(startObj.getDate() + 30);
      const endDate = endObj.toISOString().split('T')[0];

      const payload = {
        userEmail: userEmail,
        countryId: countryId,
        typeOfTrip: "TOURIST", // Default for now
        applicationType: "TYPE1", // Default for now
        slotCity: state.city,
        startDate: startDate,
        endDate: endDate,
        travellers: state.travelers.map(t => ({
            name: `${t.firstName} ${t.lastName}`.trim(),
            passportNo: t.passportNumber
        }))
      };

      console.log("Submitting payload:", payload);

      await api.post('/user/create-application', payload);
      set({ submissionStatus: 'success' });
    } catch (error: unknown) {
        console.error("Submission failed", error);
        
        let message = 'Failed to submit application';
        if (typeof error === 'object' && error !== null && 'response' in error) {
            const err = error as { response?: { data?: { message?: string } } };
            if (err.response?.data?.message) {
                message = err.response.data.message;
            }
        }
        
        set({ 
            submissionStatus: 'error', 
            errorMessage: message
        });
    }
  },
}));
