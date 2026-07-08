export interface OnboardingElement {
  type: "title" | "subtitle" | "divider" | "input" | "select" | "custom";
  text?: string;
  label?: string;
  placeholder?: string;
  key?: string;
  inputType?: string;
  width?: "25%" | "50%" | "75%" | "full";
  icon?: string;
  helperText?: string;
  required?: boolean;
  options?: string[];
  customType?: "welcome-banner" | "setup-list" | "summary" | "success-check" | "teammates-form";
  planName?: string;
  planTerm?: string;
  planLimit?: string;
  showPasswordStrength?: boolean;
}

export interface OnboardingStep {
  id: string;
  stepNumber: number;
  title: string;
  subtitle?: string;
  elements: OnboardingElement[];
  skippable?: boolean;
}

export const defaultConfig: OnboardingStep[] = [
  {
    id: "welcome",
    stepNumber: 1,
    title: "Welcome to CRESTONE",
    subtitle: "Let's get your account set up. This takes about 2 minutes.",
    elements: [
      {
        type: "custom",
        customType: "welcome-banner",
        width: "full",
        planName: "Cloud",
        planTerm: "12 months",
        planLimit: "2 sources"
      },
      {
        type: "custom",
        customType: "setup-list",
        width: "full"
      }
    ]
  },
  {
    id: "account",
    stepNumber: 2,
    title: "Create your account",
    subtitle: "This email and password will be your sign-in credentials.",
    elements: [
      {
        type: "input",
        inputType: "email",
        label: "Work email",
        placeholder: "Work email",
        key: "email",
        icon: "envelope",
        width: "full",
        required: true
      },
      {
        type: "input",
        inputType: "password",
        label: "Password",
        placeholder: "Password",
        key: "password",
        icon: "lock",
        width: "50%",
        required: true,
        helperText: "Use 8+ characters with a number and an uppercase letter",
        showPasswordStrength: true
      },
      {
        type: "input",
        inputType: "password",
        label: "Confirm password",
        placeholder: "Confirm password",
        key: "confirmPassword",
        icon: "lock",
        width: "50%",
        required: true
      }
    ]
  },
  {
    id: "profile",
    stepNumber: 3,
    title: "Your profile",
    subtitle: "Tell us who you are so we can personalize CRESTONE.",
    elements: [
      {
        type: "input",
        inputType: "text",
        label: "First name",
        placeholder: "First name",
        key: "firstName",
        width: "50%",
        required: true
      },
      {
        type: "input",
        inputType: "text",
        label: "Last name",
        placeholder: "Last name",
        key: "lastName",
        width: "50%",
        required: true
      },
      {
        type: "input",
        inputType: "text",
        label: "Job title",
        placeholder: "Job title",
        key: "jobTitle",
        icon: "portfolio",
        width: "full"
      },
      {
        type: "input",
        inputType: "tel",
        label: "Phone",
        placeholder: "Phone",
        key: "phone",
        icon: "mobile",
        helperText: "Optional — used for account security alerts",
        width: "full"
      }
    ]
  },
  {
    id: "organization",
    stepNumber: 4,
    title: "Organization",
    subtitle: "Tell us about your company and team.",
    elements: [
      {
        type: "input",
        inputType: "text",
        label: "Company name",
        placeholder: "Company name",
        key: "companyName",
        icon: "building",
        width: "full",
        required: true
      },
      {
        type: "select",
        label: "Industry",
        key: "industry",
        options: ["Technology", "Finance", "Healthcare", "Manufacturing", "Retail", "Services", "Other"],
        width: "50%",
        required: true
      },
      {
        type: "select",
        label: "Company size",
        key: "companySize",
        options: ["1-10 employees", "11-50 employees", "51-200 employees", "201-500 employees", "500+ employees"],
        width: "50%",
        required: true
      }
    ]
  },
  {
    id: "technical",
    stepNumber: 4,
    title: "Technical setup",
    subtitle: "Configure your SAP integration credentials.",
    skippable: true,
    elements: [
      {
        type: "select",
        label: "Your SAP role",
        key: "sapRole",
        options: ["SAP Basis administrator", "Data engineer", "Integration specialist", "BI / Analytics specialist", "Security analyst", "ABAP developer", "Other"],
        width: "full",
        required: true
      },
      {
        type: "select",
        label: "Data residency region",
        key: "dataResidency",
        options: ["UK - Frankfurt", "EU - Ireland", "US - Virginia", "UK - London", "APAC - Singapore"],
        width: "50%",
        required: true
      },
      {
        type: "select",
        label: "Timezone",
        key: "sapPort",
        options: ["GMT-12:00 (International Date Line West)",
          "GMT-11:00 (Samoa)",
          "GMT-10:00 (Hawaii)",
          "GMT-09:00 (Alaska)",
          "GMT-08:00 (Pacific Time - US/Canada)",
          "GMT-07:00 (Mountain Time - US/Canada)",
          "GMT-06:00 (Central Time - US/Canada)",
          "GMT-05:00 (Eastern Time - US/Canada)",
          "GMT-04:00 (Atlantic Time - US/Canada)",
          "GMT-03:30 (Newfoundland)",
          "GMT-03:00 (Argentina, Brazil, Chile)",
          "GMT-02:00 (Brazil, South Georgia)",
          "GMT-01:00 (Azores, Cape Verde)",
          "GMT+00:00 (Greenwich Mean Time/Western European Time)",
          "GMT+01:00 (Central European Time)",
          "GMT+02:00 (Eastern European Time)",
          "GMT+03:00 (Moscow Standard Time)",
          "GMT+03:30 (Iran)",
          "GMT+04:00 (Gulf Standard Time)",
          "GMT+04:30 (Afghanistan)",
          "GMT+05:00 (Pakistan Standard Time)",
          "GMT+05:30 (Indian Standard Time)",
          "GMT+05:45 (Nepal Time)",
          "GMT+06:00 (Bangladesh Standard Time)",
          "GMT+06:30 (Myanmar)",
          "GMT+07:00 (Indochina Time)",
          "GMT+08:00 (China Standard Time)",
          "GMT+08:45 (Australia Central Western Time)",
          "GMT+09:00 (Japan Standard Time)",
          "GMT+09:30 (Australia Central Standard Time)",
          "GMT+10:00 (Australia Eastern Standard Time)",
          "GMT+10:30 (Lord Howe Island)",
          "GMT+11:00 (Solomon Islands Time)",
          "GMT+12:00 (New Zealand Time)",
          "GMT+13:00 (Tonga)",
          "GMT+14:00 (Kiribati)"
        ],
        width: "50%",
        required: true
      }
    ]
  },
  {
    id: "team",
    stepNumber: 5,
    title: "Invite your Team",
    subtitle: "Share access with your colleagues so you can collaborate.",
    skippable: true,
    elements: [
      {
        type: "custom",
        customType: "teammates-form",
        width: "full"
      }
    ]
  },
  {
    id: "verify",
    stepNumber: 6,
    title: "Verify your configurations",
    subtitle: "Double check all parameters before finalizing setup.",
    elements: [
      {
        type: "custom",
        customType: "summary",
        width: "full"
      }
    ]
  },
  {
    id: "confirm",
    stepNumber: 7,
    title: "Setup Completed",
    subtitle: "Your Crestone workspace is ready to sync SAP data.",
    elements: [
      {
        type: "custom",
        customType: "success-check",
        width: "full"
      }
    ]
  }
];
