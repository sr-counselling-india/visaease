"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Question } from "@/store/ds160Store";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"; 
import { Button } from "@/components/ui/button";

interface QuestionCardProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  onEnter: () => void;
}

export function QuestionCard({ question, value, onChange, onEnter }: QuestionCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [question.id]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
        e.preventDefault();
        onEnter();
    }
  };

  return (
    <motion.div 
      key={question.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Scroll Bar Indicator (Decorative) */}
        <div className="absolute right-2 top-20 bottom-20 w-1.5 bg-gray-100 rounded-full">
            <div className="w-full h-1/3 bg-gray-300 rounded-full" />
        </div>

        <div className="flex items-center gap-2 mb-6 text-sm font-medium text-gray-400">
             <span>QUESTION</span> <span>{question.id.split('_').pop()?.toUpperCase()}</span> {/* Placeholder index */}
        </div>

        <label className="block text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center leading-tight">
            {question.label}
        </label>

        {question.helperText && (
            <div className="bg-green-50 text-green-800 p-4 rounded-xl mb-8 flex items-center gap-3 text-sm font-medium border border-green-100">
                 <div className="bg-white p-1 rounded-full shadow-sm text-green-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                 </div>
                 {question.helperText}
            </div>
        )}

        <div className="space-y-6 mb-8">
            {question.type === 'text' && (
                <Input 
                    ref={inputRef}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={question.placeholder || "Type your answer here..."}
                    className="text-center text-xl h-14 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 transition-all rounded-xl"
                />
            )}

            {question.type === 'date' && (
                <div className="relative">
                    <Input 
                        type="date"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="text-center text-xl h-14 pl-12 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 transition-all rounded-xl"
                    />
                     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                     </div>
                </div>
            )}

            {question.type === 'textarea' && (
                <Textarea 
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    className="text-lg bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 transition-all min-h-[120px] rounded-xl p-4"
                />
            )}
            
            {question.type === 'select' && (
                <Select
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    className="text-center text-xl h-14 bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 transition-all rounded-xl"
                >
                    <option value="" disabled>Select an option</option>
                    {question.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </Select>
            )}

            {question.type === 'yes_no' && (
                <div className="grid grid-cols-2 gap-4">
                    <Button 
                        type="button"
                        variant={value === true ? "primary" : "outline"}
                        className={`h-16 text-lg rounded-xl transition-all shadow-sm ${value === true ? 'bg-blue-600 hover:bg-blue-700 text-white border-transparent ring-2 ring-blue-600 ring-offset-2' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}
                        onClick={() => onChange(true)}
                    >
                        Yes
                    </Button>
                    <Button 
                        type="button"
                         variant={value === false ? "primary" : "outline"}
                         className={`h-16 text-lg rounded-xl transition-all shadow-sm ${value === false ? 'bg-blue-600 hover:bg-blue-700 text-white border-transparent ring-2 ring-blue-600 ring-offset-2' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}
                        onClick={() => onChange(false)}
                    >
                        No
                    </Button>
                </div>
            )}
        </div>

        <Button 
            onClick={onEnter}
            className="w-full h-14 text-lg font-medium bg-[#8B80F9] hover:bg-[#7a6ff5] text-white rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
        >
            Continue
        </Button>

      </div>
    </motion.div>
  );
}
