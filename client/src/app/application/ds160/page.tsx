"use client";

import { useEffect } from "react";
import { useDS160Store } from "@/store/ds160Store";
import { QuestionCard } from "@/components/ds160/QuestionCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DS160Page() {
    const { 
        getCurrentQuestion, 
        getCurrentSection,
        currentSectionIndex,
        getSections,
        answers,
        setAnswer,
        goToNext,
        goToPrev,
        initialize
    } = useDS160Store();

    // Initialize randomization on mount
    useEffect(() => {
        initialize();
    }, []);

    const currentQuestion = getCurrentQuestion();
    const currentSection = getCurrentSection();
    const sections = getSections();
    const totalSections = sections.length;

    // Calculate progress
    const progress = ((currentSectionIndex) / totalSections) * 100;

    const handleAnswer = (val: any) => {
        if (!currentQuestion) return;
        setAnswer(currentQuestion.id, val);
    };

    if (!currentQuestion || !currentSection) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center text-gray-900">
                <div className="text-center">
                    <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h1 className="text-4xl font-bold mb-4">Application Complete!</h1>
                    <p className="text-gray-500">Thank you for providing all the details.</p>
                </div>
            </div>
        );
    }

    const currentValue = answers[currentQuestion.id];

    return (
        <div className="min-h-screen bg-white text-gray-900 overflow-hidden flex flex-col font-sans">
            
            {/* Header */}
            <header className="p-6 md:p-12 pb-6 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-start justify-between gap-6">
                
                {/* Left: Title & Description */}
                <div className="max-w-2xl">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-[#0B0F3B] tracking-tight">
                        {currentSection.title}
                    </h1>
                     <p className="text-gray-500 text-lg leading-relaxed">
                        {currentSection.description || "Provide the requested details below."}
                    </p>
                </div>

                {/* Right: Progress Indicator */}
                <div className="w-full md:w-auto flex items-center gap-4">
                     <span className="text-sm font-semibold text-gray-400 whitespace-nowrap hidden md:inline-block">Section {currentSectionIndex + 1} of {totalSections}</span>
                     <div className="h-4 w-full md:w-64 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-[#8B80F9]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                     </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-4 relative w-full max-w-7xl mx-auto">
                {/* Previous Button (Float left or absolute) */}
                {/* We can keep it subtle */}
                {currentSectionIndex > 0 || useDS160Store.getState().currentQuestionIndex > 0 ? (
                    <button 
                        onClick={goToPrev}
                        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-4 text-gray-400 hover:text-gray-900 transition-colors"
                        title="Previous Question"
                    >
                        <ArrowLeft className="w-8 h-8" />
                    </button>
                ) : null}

                <div className="w-full max-w-2xl">
                     <AnimatePresence mode="wait">
                        <QuestionCard 
                            key={currentQuestion.id}
                            question={currentQuestion}
                            value={currentValue}
                            onChange={handleAnswer}
                            onEnter={goToNext}
                        />
                    </AnimatePresence>
                </div>
            </main>
            
             {/* Mobile Navigation Footer (Only if needed, but card has button now) */}
             <div className="md:hidden p-4 text-center">
                 {currentSectionIndex > 0 && (
                     <button onClick={goToPrev} className="text-gray-400 text-sm font-medium">
                         Go Back
                     </button>
                 )}
             </div>

        </div>
    );
}
