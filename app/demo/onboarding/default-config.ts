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
  customType?: "welcome-banner" | "setup-list" | "summary" | "success-check";
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
        width: "full"
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
        required: true
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
      },
      {
        type: "divider",
        width: "full"
      },
      {
        type: "title",
        text: "Your profile",
        width: "full"
      },
      {
        type: "subtitle",
        text: "Tell us who you are so we can personalize CRESTONE.",
        width: "full"
      },
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
    stepNumber: 3,
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
        label: "SAP Environment",
        key: "sapEnv",
        options: ["SAP S/4HANA Cloud", "SAP HANA On-Premise", "SAP ECC (ERP Central Component)"],
        width: "50%",
        required: true
      },
      {
        type: "input",
        inputType: "text",
        label: "Host Name / IP Address",
        placeholder: "sap-hana.yourdomain.com",
        key: "sapHost",
        icon: "globe",
        width: "50%",
        required: true
      },
      {
        type: "input",
        inputType: "number",
        label: "Port",
        placeholder: "30015",
        key: "sapPort",
        width: "25%",
        required: true
      },
      {
        type: "input",
        inputType: "text",
        label: "SAP Client ID",
        placeholder: "100",
        key: "sapClient",
        width: "25%",
        required: true
      },
      {
        type: "input",
        inputType: "text",
        label: "Username (SAP BASIS)",
        placeholder: "CRESTONE_USER",
        key: "sapUser",
        icon: "user",
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
        type: "input",
        inputType: "email",
        label: "Teammate 1 email",
        placeholder: "colleague1@company.com",
        key: "teamEmail1",
        icon: "envelope",
        width: "75%"
      },
      {
        type: "select",
        label: "Role",
        key: "teamRole1",
        options: ["Administrator", "Developer", "Billing Manager", "Viewer"],
        width: "25%"
      },
      {
        type: "input",
        inputType: "email",
        label: "Teammate 2 email",
        placeholder: "colleague2@company.com",
        key: "teamEmail2",
        icon: "envelope",
        width: "75%"
      },
      {
        type: "select",
        label: "Role",
        key: "teamRole2",
        options: ["Administrator", "Developer", "Billing Manager", "Viewer"],
        width: "25%"
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
