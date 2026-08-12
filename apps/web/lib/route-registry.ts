export type PageType = 'page' | 'section' | 'detail' | 'workflow' | 'auth' | 'error';
export interface RouteDefinition {
  route: string;
  module: string;
  pageName: string;
  pageType: PageType;
  requiredRole: string[];
  parent: string | null;
  authentication: boolean;
  organizationScope: boolean;
  governmentScope: boolean;
  adminScope: boolean;
}

export const routeRegistry: RouteDefinition[] = [
  {
    "path": "/",
    "module": "marketing",
    "pageName": "Home",
    "pageType": "page",
    "requiredRole": [],
    "parent": null,
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/about",
    "module": "marketing",
    "pageName": "About",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/product",
    "module": "marketing",
    "pageName": "Product",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/pricing",
    "module": "marketing",
    "pageName": "Pricing",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/contact",
    "module": "marketing",
    "pageName": "Contact",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/security",
    "module": "marketing",
    "pageName": "Security",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/privacy",
    "module": "marketing",
    "pageName": "Privacy",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/terms",
    "module": "marketing",
    "pageName": "Terms",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/status",
    "module": "marketing",
    "pageName": "System Status",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/login",
    "module": "auth",
    "pageName": "Login",
    "pageType": "auth",
    "requiredRole": [],
    "parent": null,
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/register",
    "module": "auth",
    "pageName": "Register",
    "pageType": "auth",
    "requiredRole": [],
    "parent": null,
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/forgot-password",
    "module": "auth",
    "pageName": "Forgot Password",
    "pageType": "auth",
    "requiredRole": [],
    "parent": null,
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/reset-password",
    "module": "auth",
    "pageName": "Reset Password",
    "pageType": "auth",
    "requiredRole": [],
    "parent": null,
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/verify-email",
    "module": "auth",
    "pageName": "Verify Email",
    "pageType": "auth",
    "requiredRole": [],
    "parent": null,
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/logout",
    "module": "auth",
    "pageName": "Logout",
    "pageType": "auth",
    "requiredRole": [],
    "parent": null,
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/onboarding",
    "module": "onboarding",
    "pageName": "Onboarding",
    "pageType": "workflow",
    "requiredRole": [
      "owner",
      "admin"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/onboarding/organization",
    "module": "onboarding",
    "pageName": "Organization Setup",
    "pageType": "workflow",
    "requiredRole": [
      "owner",
      "admin"
    ],
    "parent": "/onboarding",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/onboarding/profile",
    "module": "onboarding",
    "pageName": "Profile Setup",
    "pageType": "workflow",
    "requiredRole": [
      "owner",
      "admin"
    ],
    "parent": "/onboarding",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/onboarding/industry",
    "module": "onboarding",
    "pageName": "Industry Selection",
    "pageType": "workflow",
    "requiredRole": [
      "owner",
      "admin"
    ],
    "parent": "/onboarding",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/onboarding/complete",
    "module": "onboarding",
    "pageName": "Onboarding Complete",
    "pageType": "workflow",
    "requiredRole": [
      "owner",
      "admin"
    ],
    "parent": "/onboarding",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/dashboard",
    "module": "dashboard",
    "pageName": "Dashboard",
    "pageType": "page",
    "requiredRole": [
      "owner",
      "admin",
      "security"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/dashboard/overview",
    "module": "dashboard",
    "pageName": "Dashboard Overview",
    "pageType": "page",
    "requiredRole": [
      "owner",
      "admin",
      "security"
    ],
    "parent": "/dashboard",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/dashboard/activity",
    "module": "dashboard",
    "pageName": "Activity",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/dashboard",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/ai-systems",
    "module": "ai-systems",
    "pageName": "AI Systems",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/applications",
    "module": "applications",
    "pageName": "Applications",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "security"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/providers",
    "module": "providers",
    "pageName": "Providers",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/data-sources",
    "module": "data-sources",
    "pageName": "Data Sources",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/data-classification",
    "module": "classification",
    "pageName": "Data Classification",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/data-flows",
    "module": "data-flows",
    "pageName": "Data Flows",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/policies",
    "module": "policies",
    "pageName": "Policies",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/gateway",
    "module": "gateway",
    "pageName": "Gateway",
    "pageType": "page",
    "requiredRole": [
      "security",
      "developer"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/incidents",
    "module": "incidents",
    "pageName": "Incidents",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/approvals",
    "module": "approvals",
    "pageName": "Approvals",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/passports",
    "module": "passports",
    "pageName": "AI Passports",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/risk",
    "module": "risk",
    "pageName": "Risk",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/compliance",
    "module": "compliance",
    "pageName": "Compliance",
    "pageType": "page",
    "requiredRole": [
      "compliance"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/audit",
    "module": "audit",
    "pageName": "Audit",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/reports",
    "module": "reports",
    "pageName": "Reports",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "compliance"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/integrations",
    "module": "integrations",
    "pageName": "Integrations",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "admin"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/team",
    "module": "team",
    "pageName": "Team",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/settings",
    "module": "settings",
    "pageName": "Settings",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/billing",
    "module": "billing",
    "pageName": "Billing",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/search",
    "module": "search",
    "pageName": "Search",
    "pageType": "page",
    "requiredRole": [
      "authenticated"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/government",
    "module": "government",
    "pageName": "Government Portal",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "path": "/government/overview",
    "module": "government",
    "pageName": "Government Overview",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "path": "/government/organizations",
    "module": "government",
    "pageName": "Government Organizations",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "path": "/government/agencies",
    "module": "government",
    "pageName": "Government Agencies",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "path": "/admin",
    "module": "admin",
    "pageName": "Platform Admin",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "path": "/admin/overview",
    "module": "admin",
    "pageName": "Platform Overview",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "path": "/admin/users",
    "module": "admin",
    "pageName": "Platform Users",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "path": "/404",
    "module": "system",
    "pageName": "Page Not Found",
    "pageType": "error",
    "requiredRole": [],
    "parent": null,
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/403",
    "module": "system",
    "pageName": "Forbidden",
    "pageType": "error",
    "requiredRole": [],
    "parent": null,
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "path": "/500",
    "module": "system",
    "pageName": "Server Error",
    "pageType": "error",
    "requiredRole": [],
    "parent": null,
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  }
];
