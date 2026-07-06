"use client";

import React, { useState } from "react";
import DynamicOnboarding, { OnboardingFormData } from "@/app/components/DynamicOnboarding";
import { CaralIcon } from "iconcaral2";
import { defaultConfig } from "./default-config";

export default function OnboardingDemoPage() {
  const [completedData, setCompletedData] = useState<OnboardingFormData | null>(null);

  // Form Submission callback
  const handleOnboardingComplete = (data: OnboardingFormData) => {
    setCompletedData(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-stretch font-poppins select-none transition-colors duration-300 bg-full text-foreground">


      {/* Dynamic Onboarding Element View */}
      <DynamicOnboarding
        config={defaultConfig}
        onComplete={handleOnboardingComplete}
      />

      {/* Data Captured output display (Callback confirmation) */}
      {completedData && (
        <div className="p-6 bg-full flex flex-col items-center justify-start border-t border-neutral-300 dark:border-neutral-800">
          <div className="w-full max-w-[1000px] bg-container border border-emerald-500/30 rounded-[20px] p-6 space-y-4 animate-fade-in shadow-md">
            <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
              <CaralIcon name="check" size="m" />
              <h3 className="font-bold text-sm uppercase tracking-wide">Captured Configuration Registry</h3>
            </div>
            <pre className="p-4 bg-white dark:bg-neutral-900 border border-neutral-350 dark:border-neutral-800 rounded-xl text-xs font-mono text-neutral-900 dark:text-neutral-200 overflow-x-auto">
              {JSON.stringify(completedData, null, 2)}
            </pre>
            <div className="flex justify-end">
              <button
                onClick={() => setCompletedData(null)}
                className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-350 dark:border-neutral-800 text-xs font-bold rounded-lg text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
