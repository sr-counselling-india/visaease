import { create } from "zustand";

export type QuestionType = "text" | "select" | "date" | "yes_no" | "textarea";

export interface Question {
  id: string;
  label: string;
  type: QuestionType;
  options?: string[]; // For select
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  condition?: (answers: any) => boolean; // Logic to show/hide
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface DS160State {
  currentSectionIndex: number;
  currentQuestionIndex: number;
  sections: Section[]; // Store sections in state to support randomization
  answers: Record<string, any>; // flattended map of questionId -> value
  
  // Navigation
  goToNext: () => void;
  goToPrev: () => void;
  setAnswer: (questionId: string, value: any) => void;
  initialize: () => void;
  
  // Helpers
  getSections: () => Section[];
  getCurrentQuestion: () => Question | null;
  getCurrentSection: () => Section | null;
}

// Define the static structure of the form
const ORIGINAL_SECTIONS: Section[] = [
  {
    id: "personal",
    title: "Personal Information",
    description: "In this section, you will provide details about your personal background.",
    questions: [
      { id: "personal_surname", label: "Surnames (As in Passport)", type: "text", required: true, helperText: "Enter your surname exactly as it appears in your passport." },
      { id: "personal_given_names", label: "Given Names", type: "text", required: true },
      { id: "personal_full_name_native", label: "Full Name in Native Alphabet", type: "text", required: true },
      { id: "personal_other_names_used", label: "Have you ever used other names (i.e., maiden, religious, professional, alias, etc.)?", type: "yes_no", required: true },
      { id: "personal_other_names", label: "Other Names Used", type: "text", condition: (answers) => answers.personal_other_names_used === true },
      { id: "personal_sex", label: "Sex", type: "select", options: ["Male", "Female"], required: true },
      { id: "personal_marital_status", label: "Marital Status", type: "select", options: ["Single", "Married", "Divorced", "Widowed"], required: true },
      { id: "personal_dob", label: "Date of Birth", type: "date", required: true },
      { id: "personal_pob_city", label: "City of Birth", type: "text", required: true },
      { id: "personal_pob_state", label: "State/Province of Birth", type: "text", required: true },
      { id: "personal_pob_country", label: "Country/Region of Birth", type: "text", required: true },
    ]
  },
  {
    id: "travel",
    title: "Travel Information",
    description: "Provide details about your travel plans.",
    questions: [
      { id: "travel_purpose", label: "Purpose of Trip to the U.S.", type: "select", options: ["Tourism/Medical (B2)", "Business (B1)", "Student (F1)", "Exchange (J1)"], required: true },
      { id: "travel_specific_plans", label: "Have you made specific travel plans?", type: "yes_no", required: true },
      { id: "travel_arrival_date", label: "Intended Date of Arrival", type: "date", required: true },
      { id: "travel_stay_length", label: "Intended Length of Stay in U.S.", type: "text", required: true },
      { id: "travel_address_stay", label: "Address where you will stay in the U.S.", type: "text", required: true },
    ]
  },
   {
    id: "family",
    title: "Family Information",
    description: "Provide details about your family.",
    questions: [
      { id: "family_father_surname", label: "Father's Surnames", type: "text", required: true },
      { id: "family_father_given_name", label: "Father's Given Names", type: "text", required: true },
      { id: "family_father_dob", label: "Father's Date of Birth", type: "date", required: true },
      { id: "family_father_in_us", label: "Is your father in the U.S.?", type: "yes_no", required: true },
      { id: "family_mother_surname", label: "Mother's Surnames", type: "text", required: true },
      { id: "family_mother_given_name", label: "Mother's Given Names", type: "text", required: true },
      { id: "family_mother_dob", label: "Mother's Date of Birth", type: "date", required: true },
      { id: "family_mother_in_us", label: "Is your mother in the U.S.?", type: "yes_no", required: true },
    ]
  },
  {
      id: "work_edu",
      title: "Work / Education / Training",
      description: "In this section, you will provide details about your educational background, including the institutions you attended and the qualifications you obtained.",
      questions: [
          { id: "work_occupation", label: "Primary Occupation", type: "select", options: ["Business", "Student", "Homemaker", "Retired", "Other"], required: true },
          { id: "work_employer_name", label: "Present Employer or School Name", type: "text", required: true },
          { id: "work_employer_address", label: "Address", type: "text", required: true },
          { id: "work_start_date", label: "Start Date", type: "date", required: true, helperText: "If unsure - select an approximate date" },
          { id: "work_salary", label: "Monthly Salary in Local Currency", type: "text", required: false },
          { id: "work_duties", label: "Briefly Describe your Duties", type: "textarea", required: true },
      ]
  }
];

export const useDS160Store = create<DS160State>((set, get) => ({
  currentSectionIndex: 0,
  currentQuestionIndex: 0,
  sections: [...ORIGINAL_SECTIONS],
  answers: {},

  initialize: () => {
      // Logic: Keep first section (Personal) fixed, shuffle the rest
      const [first, ...rest] = ORIGINAL_SECTIONS;
      
      // Fisher-Yates shuffle
      for (let i = rest.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rest[i], rest[j]] = [rest[j], rest[i]];
      }
      
      set({ 
          sections: [first, ...rest],
          currentSectionIndex: 0,
          currentQuestionIndex: 0
      });
  },

  getSections: () => get().sections,

  getCurrentSection: () => {
    return get().sections[get().currentSectionIndex] || null;
  },

  getCurrentQuestion: () => {
    const section = get().sections[get().currentSectionIndex];
    if (!section) return null;
    return section.questions[get().currentQuestionIndex] || null;
  },

  setAnswer: (questionId: string, value: any) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: value }
    }));
  },

  goToNext: () => {
    const state = get();
    const section = state.sections[state.currentSectionIndex];
    if (!section) return;

    // Check if there are more questions in this section
    let nextQIndex = state.currentQuestionIndex + 1;
    
    // Skip questions if condition not met
    while (nextQIndex < section.questions.length) {
        const nextQ = section.questions[nextQIndex];
        if (!nextQ.condition || nextQ.condition(state.answers)) {
            break; // Found a valid question
        }
        nextQIndex++;
    }

    if (nextQIndex < section.questions.length) {
      set({ currentQuestionIndex: nextQIndex });
    } else {
      // Move to next section
      if (state.currentSectionIndex < state.sections.length - 1) {
        set({ 
            currentSectionIndex: state.currentSectionIndex + 1,
            currentQuestionIndex: 0 
        });
      } else {
        // Form Complete - Handle submission or summary
        console.log("Form Completed", state.answers);
      }
    }
  },

  goToPrev: () => {
      const state = get();
      if (state.currentQuestionIndex > 0) {
           let prevQIndex = state.currentQuestionIndex - 1;
           const section = state.sections[state.currentSectionIndex];

           // Backtrack skipping hidden questions
           while (prevQIndex >= 0) {
               const prevQ = section.questions[prevQIndex];
               if (!prevQ.condition || prevQ.condition(state.answers)) {
                   break;
               }
               prevQIndex--;
           }
           
           if (prevQIndex >= 0) {
               set({ currentQuestionIndex: prevQIndex });
           } else if (state.currentSectionIndex > 0) {
                set({ 
                    currentSectionIndex: state.currentSectionIndex - 1,
                    currentQuestionIndex: 0 
                });
           }

      } else if (state.currentSectionIndex > 0) {
          set({ 
            currentSectionIndex: state.currentSectionIndex - 1,
            currentQuestionIndex: 0 
        });
      }
  }

}));
