"use client";

import React, { useState } from "react";
import { Brand, CaralIcon, Icons } from "iconcaral2";
import { Button } from "caralstable";
import TextInput from "@/app/components/TextInput";
import { OnboardingStep, OnboardingElement } from "@/app/demo/onboarding/default-config";

// Interface for form data dictionary
export interface OnboardingFormData {
  [key: string]: string;
}

interface DynamicOnboardingProps {
  config: OnboardingStep[];
  onComplete?: (data: OnboardingFormData) => void;
}

export default function DynamicOnboarding({ config, onComplete }: DynamicOnboardingProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [formData, setFormData] = useState<OnboardingFormData>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const currentStep = config[currentStepIdx] || config[0];
  const isFirstStep = currentStepIdx === 0;
  const isLastStep = currentStepIdx === config.length - 1;

  // Handle Input Changes
  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
    // Clear error for this field if any
    if (errors[key]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }
  };

  // Field Validation for the active step
  const validateStep = (): boolean => {
    const activeElements = currentStep.elements;
    const newErrors: { [key: string]: string } = {};

    activeElements.forEach((el) => {
      if (el.type === "input" || el.type === "select") {
        const value = formData[el.key || ""] || "";
        if (el.required && !value.trim()) {
          newErrors[el.key || ""] = `${el.label || "Este campo"} es obligatorio`;
        }

        // Additional basic validation
        if (el.required && el.inputType === "email" && value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value.trim())) {
            newErrors[el.key || ""] = "Introduce un email válido";
          }
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigations
  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStepIdx < config.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    } else {
      if (onComplete) {
        onComplete(formData);
      }
    }
  };

  const handleBack = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  // Width Class Translator
  const getWidthClass = (width?: "25%" | "50%" | "75%" | "full") => {
    switch (width) {
      case "25%":
        return "col-span-12 sm:col-span-3";
      case "50%":
        return "col-span-12 sm:col-span-6";
      case "75%":
        return "col-span-12 sm:col-span-9";
      case "full":
      default:
        return "col-span-12";
    }
  };

  // Render Single Element
  const renderElement = (el: OnboardingElement, index: number) => {
    const widthClass = getWidthClass(el.width);
    const key = el.key || `el-${currentStep.id}-${index}`;

    switch (el.type) {
      case "title":
        return (
          <div key={key} className={`${widthClass} mt-4 mb-2`}>
            <h3 className="text-lg font-bold text-seidor-main dark:text-white tracking-tight">
              {el.text}
            </h3>
          </div>
        );

      case "subtitle":
        return (
          <div key={key} className={`${widthClass} -mt-2 mb-2`}>
            <p className="text-sm text-neutral-800 dark:text-neutral-300 leading-relaxed">
              {el.text}
            </p>
          </div>
        );

      case "divider":
        return (
          <div key={key} className={`${widthClass} py-2`}>
            <div className="h-[1px] bg-neutral-300 dark:bg-neutral-800 w-full" />
          </div>
        );

      case "input":
        return (
          <div key={key} className={widthClass}>
            <TextInput
              label={el.label}
              placeholder={el.placeholder}
              value={formData[el.key || ""] || ""}
              onChange={(e) => handleInputChange(el.key || "", e.target.value)}
              type={el.inputType || "text"}
              iconName={el.icon as Icons}
              helperText={el.helperText}
              requiredMessage={errors[el.key || ""]}
              required={el.required}
            />
          </div>
        );

      case "select":
        return (
          <div key={key} className={widthClass}>
            {el.label && (
              <label className="block text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {el.label}
                {el.required && <span className="text-danger-main ml-1">*</span>}
              </label>
            )}
            <div className="relative">
              <select
                value={formData[el.key || ""] || ""}
                onChange={(e) => handleInputChange(el.key || "", e.target.value)}
                className={`block w-full rounded-lg bg-white dark:bg-neutral-800 border px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 outline-none transition-all duration-200 focus:border-seidor-main focus:ring-2 focus:ring-seidor-main/20 appearance-none ${errors[el.key || ""] ? "border-danger-main" : "border-neutral-300"
                  }`}
              >
                <option value="" disabled>Select an option...</option>
                {el.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-500 dark:text-neutral-400">
                <CaralIcon name="chevronDown" size="s" />
              </div>
            </div>
            {errors[el.key || ""] && (
              <span className="text-xs font-semibold text-danger-main mt-1 block">
                {errors[el.key || ""]}
              </span>
            )}
          </div>
        );

      case "custom":
        return renderCustomElement(el.customType, key, widthClass);

      default:
        return null;
    }
  };

  // Render Custom UI elements (Welcome Banner, Steps List, Review Summary, Success Page)
  const renderCustomElement = (customType?: string, key?: string, widthClass?: string) => {
    if (customType === "welcome-banner") {
      return (
        <div key={key} className={`${widthClass} overflow-hidden rounded-xl border border-neutral-300 dark:border-neutral-800 shadow-sm bg-neutral-100 dark:bg-neutral-900`}>
          <div className="bg-[#07153a] text-white p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#d2ebff] text-[#07153a] rounded-full shrink-0">
                <Brand name="Crestone" size={32} />
              </div>
              <div>
                <h4 className="font-bold text-lg tracking-tight uppercase">CRESTONE MIGRATE</h4>
                <p className="text-xs text-neutral-300">Activated from your marketplace subscription</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-300 dark:divide-neutral-800 bg-white dark:bg-neutral-900/50">
            <div className="px-6 py-4">
              <span className="text-xs text-neutral-800 block uppercase font-medium">Plan</span>
              <span className="text-base font-bold text-neutral-900 dark:text-white">Cloud</span>
            </div>
            <div className="px-6 py-4">
              <span className="text-xs text-neutral-800 block uppercase font-medium">Term</span>
              <span className="text-base font-bold text-neutral-900 dark:text-white">12 months</span>
            </div>
            <div className="px-6 py-4">
              <span className="text-xs text-neutral-800 block uppercase font-medium">Limit</span>
              <span className="text-base font-bold text-neutral-900 dark:text-white">2 sources</span>
            </div>
          </div>
        </div>
      );
    }

    if (customType === "setup-list") {
      const stepsList = [
        { icon: "user" as Icons, title: "Your profile", desc: "Name, role and contact info" },
        { icon: "building" as Icons, title: "Organization", desc: "Company and industry details" },
        { icon: "database" as Icons, title: "SAP environment", desc: "Role, host, port and Client ID" },
        { icon: "usersMap" as Icons, title: "Your team", desc: "Invite teammates to collaborate (optional)" },
      ];

      return (
        <div key={key} className={`${widthClass} space-y-3`}>
          <p className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">What you&apos;ll set up</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stepsList.map((step, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 rounded-xl"
              >
                <div className="p-2.5 bg-info-light/20 text-info-main rounded-lg shrink-0">
                  <CaralIcon name={step.icon} size="m" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-neutral-900 dark:text-white">{step.title}</h5>
                  <p className="text-xs text-neutral-800">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (customType === "summary") {
      // Clean up passwords for security display
      const displayData = { ...formData };
      if (displayData.password) displayData.password = "••••••••";
      if (displayData.confirmPassword) displayData.confirmPassword = "••••••••";

      const sections = [
        {
          title: "Account & Profile",
          items: [
            { label: "Email", val: displayData.email },
            { label: "Password", val: displayData.password },
            { label: "Name", val: `${displayData.firstName || ""} ${displayData.lastName || ""}`.trim() },
            { label: "Job Title", val: displayData.jobTitle },
            { label: "Phone", val: displayData.phone },
          ]
        },
        {
          title: "Organization",
          items: [
            { label: "Company Name", val: displayData.companyName },
            { label: "Industry", val: displayData.industry },
            { label: "Company Size", val: displayData.companySize },
          ]
        },
        {
          title: "SAP connection",
          items: [
            { label: "Environment", val: displayData.sapEnv },
            { label: "Host Address", val: displayData.sapHost },
            { label: "Port", val: displayData.sapPort },
            { label: "Client ID", val: displayData.sapClient },
            { label: "Username", val: displayData.sapUser },
          ]
        },
        {
          title: "Teammates invited",
          items: [
            { label: "Teammate 1", val: displayData.teamEmail1 ? `${displayData.teamEmail1} (${displayData.teamRole1 || "Viewer"})` : undefined },
            { label: "Teammate 2", val: displayData.teamEmail2 ? `${displayData.teamEmail2} (${displayData.teamRole2 || "Viewer"})` : undefined },
          ]
        }
      ];

      return (
        <div key={key} className={`${widthClass} space-y-6 max-h-[400px] overflow-y-auto pr-2`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section, idx) => {
              const activeItems = section.items.filter(item => item.val);
              if (activeItems.length === 0) return null;

              return (
                <div key={idx} className="border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 p-4 rounded-xl space-y-3">
                  <h4 className="text-xs font-extrabold uppercase text-seidor-main dark:text-seidor-light tracking-wider">
                    {section.title}
                  </h4>
                  <table className="w-full text-xs text-left">
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                      {activeItems.map((item, itemIdx) => (
                        <tr key={itemIdx} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/10">
                          <td className="py-2 pr-4 font-medium text-neutral-500 w-1/3">{item.label}</td>
                          <td className="py-2 font-semibold text-neutral-900 dark:text-white break-all">{item.val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (customType === "success-check") {
      return (
        <div key={key} className={`${widthClass} flex flex-col items-center justify-center py-10 text-center space-y-6`}>
          <div className="w-20 h-20 bg-success-main/10 border-2 border-success-main rounded-full flex items-center justify-center text-success-main animate-bounce">
            <CaralIcon name="check" size="xl" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Congratulations!
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
              Your SAP connection and account setup was configured successfully. You can now close this assistant and navigate to the dashboard.
            </p>
          </div>
          <div className="p-4 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl text-xs text-neutral-500 font-mono">
            Workspace: {formData.companyName || "Default Workspace"} &bull; SAP User: {formData.sapUser || "None"}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex-1 flex flex-row items-stretch w-full min-h-screen bg-full">

      {/* 1. Left Progress Stepper Sidebar */}
      <div className="bg-container border-b md:border-b-0 md:border-r rounded-tr-[20px] rounded-br-[20px] border-neutral-300 dark:border-neutral-800 w-[350px] shrink-0 p-6 flex flex-col justify-between gap-8">
        <div className="space-y-6">
          {/* Brand Logo Header */}
          <div className="flex items-center gap-3">
            <div className="text-seidor-main dark:text-white shrink-0">
              <Brand name="Crestone" size={36} />
            </div>
            <span className="font-extrabold text-xl text-seidor-main dark:text-white tracking-tight">
              Crestone
            </span>
          </div>

          {/* Stepper Header Text */}
          <div className="space-y-1">
            <h3 className="font-extrabold text-sm text-seidor-main dark:text-white uppercase tracking-wider">
              Set up your workspace
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-normal">
              A few quick steps and you&apos;ll be replicating SAP data in minutes.
            </p>
          </div>

          {/* Stepper Steps List */}
          <div className="space-y-1 relative">
            {config.map((step, idx) => {
              const isStepDone = idx < currentStepIdx;
              const isStepActive = idx === currentStepIdx;
              const isLastTimeline = idx === config.length - 1;

              return (
                <div key={step.id} className="flex items-start gap-4 group relative">

                  {/* Step Connector Line */}
                  {!isLastTimeline && (
                    <div
                      className={`absolute left-[15px] top-[26px] w-[2px] h-[calc(100%-8px)] -translate-x-1/2 z-0 transition-colors duration-300 ${idx < currentStepIdx ? "bg-success-main" : "bg-neutral-300 dark:bg-neutral-800"
                        }`}
                    />
                  )}

                  {/* Step Dot */}
                  <div className="z-10 relative mt-0.5">
                    {isStepDone ? (
                      <div className="w-8 h-8 rounded-full bg-success-main text-white flex items-center justify-center border border-success-main text-xs font-bold shadow-md shadow-success-main/20">
                        <CaralIcon name="check" size="s" />
                      </div>
                    ) : isStepActive ? (
                      <div className="w-8 h-8 rounded-full bg-seidor-main dark:bg-white text-white dark:text-seidor-main flex items-center justify-center border-2 border-seidor-main dark:border-white text-xs font-extrabold shadow-md shadow-seidor-main/15">
                        {step.stepNumber}
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-850 text-neutral-500 flex items-center justify-center border border-neutral-350 dark:border-neutral-800 text-xs font-bold">
                        {step.stepNumber}
                      </div>
                    )}
                  </div>

                  {/* Step Text Label */}
                  <div className="py-1">
                    <span
                      className={`text-xs font-bold block transition-colors duration-200 ${isStepActive
                        ? "text-seidor-main dark:text-white"
                        : isStepDone
                          ? "text-success-main"
                          : "text-neutral-800"
                        }`}
                    >
                      {step.title}
                    </span>
                    <span className="text-[10px] text-neutral-800 block">
                      {isStepDone ? "Completed" : isStepActive ? "In progress" : "Pending"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Button
          variant="light"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border border-neutral-350 dark:border-neutral-800 hover:border-neutral-500 rounded-lg text-xs font-bold text-neutral-800 dark:text-neutral-200 transition-colors bg-white/50 dark:bg-neutral-900/50"
        >
          <CaralIcon name="book" size="s" />
          <span>Documentation / Help</span>
        </Button>
      </div>

      {/* 2. Right Content Section */}
      <div className="flex-1 p-[18px] md:p-[24px] flex flex-col justify-start items-center overflow-y-auto">

        {/* Onboarding Form Card Container (Dashboard style) */}
        <div className="w-full max-w-[1000px] border border-neutral-500 dark:border-neutral-300 rounded-[20px] p-6 md:p-8 shadow-sm space-y-8 bg-container transition-colors duration-300 my-auto">

          {/* Active Step Content */}
          <div className="space-y-6">
            {/* Header Info */}
            <div className="border-b border-neutral-500 dark:border-neutral-300 pb-4 transition-colors duration-300">
              <span className="text-[10px] font-bold text-info-main uppercase tracking-wider block">
                Step {currentStep.stepNumber} of {config.length}
              </span>
              <h2 className="text-[30px] font-semibold tracking-tight leading-[35px] text-foreground transition-colors duration-300 mt-1">
                {currentStep.title}
              </h2>
              {currentStep.subtitle && (
                <p className="text-[16px] leading-6 text-neutral-900 mt-1 transition-colors duration-300">
                  {currentStep.subtitle}
                </p>
              )}
            </div>

            {/* Dynamic Forms Elements Container */}
            <div className="grid grid-cols-12 gap-x-4 gap-y-5">
              {currentStep.elements.map((el, idx) => renderElement(el, idx))}
            </div>
          </div>

          {/* Form Controls Buttons Footer */}
          <div className="border-t border-neutral-500 dark:border-neutral-300 pt-6 flex items-center justify-between transition-colors duration-300">
            <div>
              {!isFirstStep && (
                <Button
                  variant="light"
                  onClick={handleBack}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-neutral-350 dark:border-neutral-800 hover:border-neutral-500 rounded-lg text-xs font-bold text-neutral-800 dark:text-neutral-200 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
                >
                  <CaralIcon name="chevronLeft" size="s" />
                  <span>Back</span>
                </Button>
              )}
            </div>

            <div>
              {isLastStep ? (
                <Button
                  variant="success"
                  onClick={() => onComplete && onComplete(formData)}

                >
                  <span>Finish Setup</span>
                  <CaralIcon name="check" size="s" />
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={handleNext}
                  size="lg"
                >
                  <span>Continue</span>
                  <CaralIcon name="chevronRigth" size="s" />
                </Button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
