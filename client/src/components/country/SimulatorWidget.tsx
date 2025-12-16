"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle2, XCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SimulatorWidget() {
  const [balance, setBalance] = useState<string>("");
  const [result, setResult] = useState<"success" | "warning" | "error" | null>(null);

  const checkEligibility = () => {
    const amount = parseInt(balance.replace(/,/g, ""));
    if (isNaN(amount)) {
        setResult(null);
        return;
    }

    if (amount >= 500000) setResult("success");
    else if (amount >= 300000) setResult("warning");
    else setResult("error");
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                <AlertCircle className="h-6 w-6" />
            </div>
            <div>
                <h3 className="text-xl font-bold">Financial Simulator</h3>
                <p className="text-gray-500 text-sm">Check if your bank statement meets standard visa requirements.</p>
            </div>
        </div>

        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Average Monthly Balance (last 6 months)</label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                    <input 
                        type="text" 
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        placeholder="e.g. 5,00,000"
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-semibold"
                    />
                </div>
            </div>

            {result && (
                <div className={`
                    p-4 rounded-xl flex items-start gap-3 text-sm
                    ${result === "success" ? "bg-green-50 text-green-700 border border-green-100" : ""}
                    ${result === "warning" ? "bg-yellow-50 text-yellow-700 border border-yellow-100" : ""}
                    ${result === "error" ? "bg-red-50 text-red-700 border border-red-100" : ""}
                `}>
                    {result === "success" && <CheckCircle2 className="h-5 w-5 shrink-0" />}
                    {result === "warning" && <AlertCircle className="h-5 w-5 shrink-0" />}
                    {result === "error" && <XCircle className="h-5 w-5 shrink-0" />}
                    
                    <div>
                        <div className="font-bold mb-0.5">
                            {result === "success" && "Strong Financial Profile"}
                            {result === "warning" && "Moderate Profile - Caution"}
                            {result === "error" && "Insufficient Funds Detected"}
                        </div>
                        <div className="opacity-90">
                            {result === "success" && "Your balance meets the recommended threshold for tourist visas."}
                            {result === "warning" && "You might need additional supporting documents or valid sponsorship."}
                            {result === "error" && "The balance is below recommended levels. Consider 'Elite' tier for sponsorship guidance."}
                        </div>
                    </div>
                </div>
            )}

            <Button 
                onClick={checkEligibility}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 text-lg rounded-xl"
            >
                Check Eligibility
            </Button>
            
            {result && (
                <button 
                  onClick={() => { setBalance(""); setResult(null); }}
                  className="w-full text-center text-xs text-gray-400 flex items-center justify-center gap-1 hover:text-gray-600"
                >
                    <RefreshCcw className="h-3 w-3" /> Reset
                </button>
            )}
        </div>
    </div>
  );
}
