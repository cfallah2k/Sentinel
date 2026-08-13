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
    "route": "/",
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
    "route": "/about",
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
    "route": "/solutions",
    "module": "marketing",
    "pageName": "Solutions",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/solutions/enterprise",
    "module": "marketing",
    "pageName": "Enterprise Solutions",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/solutions",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/solutions/government",
    "module": "marketing",
    "pageName": "Government Solutions",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/solutions",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/solutions/security",
    "module": "marketing",
    "pageName": "Security Solutions",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/solutions",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/solutions/privacy",
    "module": "marketing",
    "pageName": "Privacy Solutions",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/solutions",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/solutions/compliance",
    "module": "marketing",
    "pageName": "Compliance Solutions",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/solutions",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/solutions/developers",
    "module": "marketing",
    "pageName": "Developer Solutions",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/solutions",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/product",
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
    "route": "/product/ai-governance",
    "module": "marketing",
    "pageName": "AI Governance",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/product",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/product/ai-gateway",
    "module": "marketing",
    "pageName": "AI Gateway",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/product",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/product/data-classification",
    "module": "marketing",
    "pageName": "Data Classification",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/product",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/product/policy-engine",
    "module": "marketing",
    "pageName": "Policy Engine",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/product",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/product/data-flow",
    "module": "marketing",
    "pageName": "Data Flow",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/product",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/product/audit",
    "module": "marketing",
    "pageName": "Audit",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/product",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/product/ai-passport",
    "module": "marketing",
    "pageName": "AI Passport",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/product",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/product/incidents",
    "module": "marketing",
    "pageName": "Incidents",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/product",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/product/approvals",
    "module": "marketing",
    "pageName": "Approvals",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/product",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/integrations",
    "module": "marketing",
    "pageName": "Integrations",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/security",
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
    "route": "/trust",
    "module": "marketing",
    "pageName": "Trust",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/compliance",
    "module": "marketing",
    "pageName": "Compliance",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/pricing",
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
    "route": "/resources",
    "module": "marketing",
    "pageName": "Resources",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/docs",
    "module": "marketing",
    "pageName": "Docs",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/blog",
    "module": "marketing",
    "pageName": "Blog",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/contact",
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
    "route": "/request-demo",
    "module": "marketing",
    "pageName": "Request Demo",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/get-started",
    "module": "marketing",
    "pageName": "Get Started",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/status",
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
    "route": "/careers",
    "module": "marketing",
    "pageName": "Careers",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/legal/privacy",
    "module": "marketing",
    "pageName": "Privacy Policy",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/legal",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/legal/terms",
    "module": "marketing",
    "pageName": "Terms of Service",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/legal",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/legal/cookies",
    "module": "marketing",
    "pageName": "Cookie Policy",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/legal",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/legal/security",
    "module": "marketing",
    "pageName": "Security Policy",
    "pageType": "page",
    "requiredRole": [],
    "parent": "/legal",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/login",
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
    "route": "/register",
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
    "route": "/verify-email",
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
    "route": "/forgot-password",
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
    "route": "/reset-password",
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
    "route": "/accept-invitation",
    "module": "auth",
    "pageName": "Accept Invitation",
    "pageType": "auth",
    "requiredRole": [],
    "parent": null,
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/mfa",
    "module": "auth",
    "pageName": "MFA",
    "pageType": "auth",
    "requiredRole": [],
    "parent": null,
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/mfa/setup",
    "module": "auth",
    "pageName": "MFA Setup",
    "pageType": "auth",
    "requiredRole": [],
    "parent": "/mfa",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/mfa/verify",
    "module": "auth",
    "pageName": "MFA Verify",
    "pageType": "auth",
    "requiredRole": [],
    "parent": "/mfa",
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/logout",
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
    "route": "/auth/error",
    "module": "auth",
    "pageName": "Authentication Error",
    "pageType": "auth",
    "requiredRole": [],
    "parent": null,
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/onboarding",
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
    "route": "/onboarding/organization",
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
    "route": "/onboarding/profile",
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
    "route": "/onboarding/industry",
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
    "route": "/onboarding/use-case",
    "module": "onboarding",
    "pageName": "Use Case Selection",
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
    "route": "/onboarding/team",
    "module": "onboarding",
    "pageName": "Team Setup",
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
    "route": "/onboarding/security",
    "module": "onboarding",
    "pageName": "Security Setup",
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
    "route": "/onboarding/data-classification",
    "module": "onboarding",
    "pageName": "Data Classification Setup",
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
    "route": "/onboarding/policies",
    "module": "onboarding",
    "pageName": "Policy Setup",
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
    "route": "/onboarding/ai-providers",
    "module": "onboarding",
    "pageName": "AI Providers Setup",
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
    "route": "/onboarding/applications",
    "module": "onboarding",
    "pageName": "Applications Setup",
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
    "route": "/onboarding/api",
    "module": "onboarding",
    "pageName": "API Setup",
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
    "route": "/onboarding/integrations",
    "module": "onboarding",
    "pageName": "Integrations Setup",
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
    "route": "/onboarding/complete",
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
    "route": "/dashboard",
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
    "route": "/dashboard/overview",
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
    "route": "/dashboard/activity",
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
    "route": "/dashboard/risk",
    "module": "dashboard",
    "pageName": "Risk",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/dashboard",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/dashboard/ai-usage",
    "module": "dashboard",
    "pageName": "AI Usage",
    "pageType": "page",
    "requiredRole": [
      "security",
      "developer"
    ],
    "parent": "/dashboard",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/dashboard/data-flow",
    "module": "dashboard",
    "pageName": "Data Flow",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/dashboard",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/dashboard/incidents",
    "module": "dashboard",
    "pageName": "Incidents",
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
    "route": "/dashboard/policies",
    "module": "dashboard",
    "pageName": "Policies",
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
    "route": "/dashboard/compliance",
    "module": "dashboard",
    "pageName": "Compliance",
    "pageType": "page",
    "requiredRole": [
      "compliance"
    ],
    "parent": "/dashboard",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/dashboard/approvals",
    "module": "dashboard",
    "pageName": "Approvals",
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
    "route": "/ai-systems",
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
    "route": "/ai-systems/discover",
    "module": "ai-systems",
    "pageName": "Discover AI Systems",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-systems",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/registered",
    "module": "ai-systems",
    "pageName": "Registered AI Systems",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-systems",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/pending",
    "module": "ai-systems",
    "pageName": "Pending AI Systems",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-systems",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/approved",
    "module": "ai-systems",
    "pageName": "Approved AI Systems",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-systems",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/rejected",
    "module": "ai-systems",
    "pageName": "Rejected AI Systems",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-systems",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/high-risk",
    "module": "ai-systems",
    "pageName": "High Risk AI Systems",
    "pageType": "page",
    "requiredRole": [
      "security",
      "risk"
    ],
    "parent": "/ai-systems",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/create",
    "module": "ai-systems",
    "pageName": "Create AI System",
    "pageType": "page",
    "requiredRole": [
      "security"
    ],
    "parent": "/ai-systems",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/import",
    "module": "ai-systems",
    "pageName": "Import AI System",
    "pageType": "page",
    "requiredRole": [
      "security"
    ],
    "parent": "/ai-systems",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/:id",
    "module": "ai-systems",
    "pageName": "AI System Details",
    "pageType": "detail",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-systems",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/:id/overview",
    "module": "ai-systems",
    "pageName": "AI System Overview",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-systems/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/:id/details",
    "module": "ai-systems",
    "pageName": "AI System Details",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-systems/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/:id/owner",
    "module": "ai-systems",
    "pageName": "AI System Owner",
    "pageType": "page",
    "requiredRole": [
      "security",
      "admin"
    ],
    "parent": "/ai-systems/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/:id/models",
    "module": "ai-systems",
    "pageName": "AI System Models",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-systems/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/:id/providers",
    "module": "ai-systems",
    "pageName": "AI System Providers",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-systems/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/:id/data",
    "module": "ai-systems",
    "pageName": "AI System Data",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/ai-systems/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/:id/data-flows",
    "module": "ai-systems",
    "pageName": "AI System Data Flows",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/ai-systems/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/:id/policies",
    "module": "ai-systems",
    "pageName": "AI System Policies",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/ai-systems/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/:id/risk",
    "module": "ai-systems",
    "pageName": "AI System Risk",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/ai-systems/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/:id/approvals",
    "module": "ai-systems",
    "pageName": "AI System Approvals",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/ai-systems/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/:id/incidents",
    "module": "ai-systems",
    "pageName": "AI System Incidents",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/ai-systems/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/:id/activity",
    "module": "ai-systems",
    "pageName": "AI System Activity",
    "pageType": "page",
    "requiredRole": [
      "security",
      "auditor"
    ],
    "parent": "/ai-systems/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/:id/audit",
    "module": "ai-systems",
    "pageName": "AI System Audit",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/ai-systems/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/:id/passport",
    "module": "ai-systems",
    "pageName": "AI System Passport",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/ai-systems/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-systems/:id/settings",
    "module": "ai-systems",
    "pageName": "AI System Settings",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "security"
    ],
    "parent": "/ai-systems/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/applications",
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
    "route": "/applications/create",
    "module": "applications",
    "pageName": "Create Application",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/applications",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/applications/import",
    "module": "applications",
    "pageName": "Import Application",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/applications",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/applications/discovered",
    "module": "applications",
    "pageName": "Discovered Applications",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "security"
    ],
    "parent": "/applications",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/applications/approved",
    "module": "applications",
    "pageName": "Approved Applications",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "security"
    ],
    "parent": "/applications",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/applications/archived",
    "module": "applications",
    "pageName": "Archived Applications",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "security"
    ],
    "parent": "/applications",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/applications/:id",
    "module": "applications",
    "pageName": "Application Details",
    "pageType": "detail",
    "requiredRole": [
      "admin",
      "security"
    ],
    "parent": "/applications",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/applications/:id/overview",
    "module": "applications",
    "pageName": "Application Overview",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "security"
    ],
    "parent": "/applications/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/applications/:id/details",
    "module": "applications",
    "pageName": "Application Details",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "security"
    ],
    "parent": "/applications/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/applications/:id/ai-systems",
    "module": "applications",
    "pageName": "Application AI Systems",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "security"
    ],
    "parent": "/applications/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/applications/:id/providers",
    "module": "applications",
    "pageName": "Application Providers",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "security"
    ],
    "parent": "/applications/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/applications/:id/data",
    "module": "applications",
    "pageName": "Application Data",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/applications/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/applications/:id/data-flows",
    "module": "applications",
    "pageName": "Application Data Flows",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/applications/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/applications/:id/policies",
    "module": "applications",
    "pageName": "Application Policies",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/applications/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/applications/:id/api-keys",
    "module": "applications",
    "pageName": "Application API Keys",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "developer"
    ],
    "parent": "/applications/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/applications/:id/activity",
    "module": "applications",
    "pageName": "Application Activity",
    "pageType": "page",
    "requiredRole": [
      "security",
      "auditor"
    ],
    "parent": "/applications/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/applications/:id/incidents",
    "module": "applications",
    "pageName": "Application Incidents",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/applications/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/applications/:id/audit",
    "module": "applications",
    "pageName": "Application Audit",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/applications/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/applications/:id/settings",
    "module": "applications",
    "pageName": "Application Settings",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/applications/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/providers",
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
    "route": "/providers/discover",
    "module": "providers",
    "pageName": "Discover Providers",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/providers",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/providers/approved",
    "module": "providers",
    "pageName": "Approved Providers",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/providers",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/providers/pending",
    "module": "providers",
    "pageName": "Pending Providers",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/providers",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/providers/restricted",
    "module": "providers",
    "pageName": "Restricted Providers",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/providers",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/providers/create",
    "module": "providers",
    "pageName": "Create Provider",
    "pageType": "page",
    "requiredRole": [
      "security"
    ],
    "parent": "/providers",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/providers/import",
    "module": "providers",
    "pageName": "Import Provider",
    "pageType": "page",
    "requiredRole": [
      "security"
    ],
    "parent": "/providers",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/providers/:id",
    "module": "providers",
    "pageName": "Provider Details",
    "pageType": "detail",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/providers",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/providers/:id/overview",
    "module": "providers",
    "pageName": "Provider Overview",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/providers/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/providers/:id/models",
    "module": "providers",
    "pageName": "Provider Models",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/providers/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/providers/:id/data",
    "module": "providers",
    "pageName": "Provider Data",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/providers/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/providers/:id/policies",
    "module": "providers",
    "pageName": "Provider Policies",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/providers/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/providers/:id/risk",
    "module": "providers",
    "pageName": "Provider Risk",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/providers/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/providers/:id/usage",
    "module": "providers",
    "pageName": "Provider Usage",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "admin"
    ],
    "parent": "/providers/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/providers/:id/activity",
    "module": "providers",
    "pageName": "Provider Activity",
    "pageType": "page",
    "requiredRole": [
      "security",
      "auditor"
    ],
    "parent": "/providers/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/providers/:id/incidents",
    "module": "providers",
    "pageName": "Provider Incidents",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/providers/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/providers/:id/audit",
    "module": "providers",
    "pageName": "Provider Audit",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/providers/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/providers/:id/settings",
    "module": "providers",
    "pageName": "Provider Settings",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "security"
    ],
    "parent": "/providers/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/models",
    "module": "models",
    "pageName": "Models",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "security"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/models/discover",
    "module": "models",
    "pageName": "Discover Models",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "security"
    ],
    "parent": "/models",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/models/approved",
    "module": "models",
    "pageName": "Approved Models",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "security"
    ],
    "parent": "/models",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/models/restricted",
    "module": "models",
    "pageName": "Restricted Models",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/models",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/models/create",
    "module": "models",
    "pageName": "Create Model",
    "pageType": "page",
    "requiredRole": [
      "developer"
    ],
    "parent": "/models",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/models/import",
    "module": "models",
    "pageName": "Import Model",
    "pageType": "page",
    "requiredRole": [
      "developer"
    ],
    "parent": "/models",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/models/:id",
    "module": "models",
    "pageName": "Model Details",
    "pageType": "detail",
    "requiredRole": [
      "developer",
      "security"
    ],
    "parent": "/models",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/models/:id/overview",
    "module": "models",
    "pageName": "Model Overview",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "security"
    ],
    "parent": "/models/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/models/:id/provider",
    "module": "models",
    "pageName": "Model Provider",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "security"
    ],
    "parent": "/models/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/models/:id/risk",
    "module": "models",
    "pageName": "Model Risk",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/models/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/models/:id/data",
    "module": "models",
    "pageName": "Model Data",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/models/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/models/:id/policies",
    "module": "models",
    "pageName": "Model Policies",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/models/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/models/:id/usage",
    "module": "models",
    "pageName": "Model Usage",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "security"
    ],
    "parent": "/models/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/models/:id/activity",
    "module": "models",
    "pageName": "Model Activity",
    "pageType": "page",
    "requiredRole": [
      "security",
      "auditor"
    ],
    "parent": "/models/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/models/:id/audit",
    "module": "models",
    "pageName": "Model Audit",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/models/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-sources",
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
    "route": "/data-sources/discover",
    "module": "data-sources",
    "pageName": "Discover Data Sources",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-sources",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-sources/connected",
    "module": "data-sources",
    "pageName": "Connected Data Sources",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-sources",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-sources/pending",
    "module": "data-sources",
    "pageName": "Pending Data Sources",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-sources",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-sources/restricted",
    "module": "data-sources",
    "pageName": "Restricted Data Sources",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-sources",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-sources/create",
    "module": "data-sources",
    "pageName": "Create Data Source",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-sources",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-sources/import",
    "module": "data-sources",
    "pageName": "Import Data Source",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-sources",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-sources/:id",
    "module": "data-sources",
    "pageName": "Data Source Details",
    "pageType": "detail",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-sources",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-sources/:id/overview",
    "module": "data-sources",
    "pageName": "Data Source Overview",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-sources/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-sources/:id/schema",
    "module": "data-sources",
    "pageName": "Data Source Schema",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-sources/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-sources/:id/data-categories",
    "module": "data-sources",
    "pageName": "Data Categories",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-sources/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-sources/:id/ai-systems",
    "module": "data-sources",
    "pageName": "AI Systems Using Data Source",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-sources/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-sources/:id/data-flows",
    "module": "data-sources",
    "pageName": "Data Source Flows",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-sources/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-sources/:id/policies",
    "module": "data-sources",
    "pageName": "Data Source Policies",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/data-sources/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-sources/:id/risk",
    "module": "data-sources",
    "pageName": "Data Source Risk",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/data-sources/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-sources/:id/activity",
    "module": "data-sources",
    "pageName": "Data Source Activity",
    "pageType": "page",
    "requiredRole": [
      "security",
      "auditor"
    ],
    "parent": "/data-sources/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-sources/:id/audit",
    "module": "data-sources",
    "pageName": "Data Source Audit",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/data-sources/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-sources/:id/settings",
    "module": "data-sources",
    "pageName": "Data Source Settings",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "security"
    ],
    "parent": "/data-sources/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-classification",
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
    "route": "/data-classification/overview",
    "module": "classification",
    "pageName": "Classification Overview",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-classification",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-classification/categories",
    "module": "classification",
    "pageName": "Categories",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-classification",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-classification/types",
    "module": "classification",
    "pageName": "Classification Types",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-classification",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-classification/sensitive-data",
    "module": "classification",
    "pageName": "Sensitive Data",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-classification",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-classification/detectors",
    "module": "classification",
    "pageName": "Detectors",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-classification",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-classification/rules",
    "module": "classification",
    "pageName": "Classification Rules",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-classification",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-classification/custom",
    "module": "classification",
    "pageName": "Custom Classification",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-classification",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-classification/create",
    "module": "classification",
    "pageName": "Create Classification",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-classification",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-classification/test",
    "module": "classification",
    "pageName": "Test Classification",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-classification",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-classification/:id",
    "module": "classification",
    "pageName": "Classification Definition",
    "pageType": "detail",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-classification",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-classification/:id/overview",
    "module": "classification",
    "pageName": "Classification Overview",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-classification/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-classification/:id/rules",
    "module": "classification",
    "pageName": "Classification Rules",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-classification/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-classification/:id/detectors",
    "module": "classification",
    "pageName": "Classification Detectors",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-classification/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-classification/:id/usage",
    "module": "classification",
    "pageName": "Classification Usage",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-classification/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-classification/:id/activity",
    "module": "classification",
    "pageName": "Classification Activity",
    "pageType": "page",
    "requiredRole": [
      "security",
      "auditor"
    ],
    "parent": "/data-classification/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-classification/:id/settings",
    "module": "classification",
    "pageName": "Classification Settings",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "privacy"
    ],
    "parent": "/data-classification/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-flows",
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
    "route": "/data-flows/overview",
    "module": "data-flows",
    "pageName": "Data Flow Overview",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/data-flows",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-flows/live",
    "module": "data-flows",
    "pageName": "Live Data Flows",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/data-flows",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-flows/map",
    "module": "data-flows",
    "pageName": "Data Flow Map",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/data-flows",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-flows/sources",
    "module": "data-flows",
    "pageName": "Sources",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/data-flows",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-flows/destinations",
    "module": "data-flows",
    "pageName": "Destinations",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/data-flows",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-flows/external",
    "module": "data-flows",
    "pageName": "External Flows",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/data-flows",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-flows/internal",
    "module": "data-flows",
    "pageName": "Internal Flows",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/data-flows",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-flows/high-risk",
    "module": "data-flows",
    "pageName": "High Risk Flows",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/data-flows",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-flows/blocked",
    "module": "data-flows",
    "pageName": "Blocked Flows",
    "pageType": "page",
    "requiredRole": [
      "security"
    ],
    "parent": "/data-flows",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-flows/recent",
    "module": "data-flows",
    "pageName": "Recent Flows",
    "pageType": "page",
    "requiredRole": [
      "security"
    ],
    "parent": "/data-flows",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-flows/:id",
    "module": "data-flows",
    "pageName": "Data Flow Details",
    "pageType": "detail",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/data-flows",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-flows/:id/overview",
    "module": "data-flows",
    "pageName": "Data Flow Overview",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/data-flows/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-flows/:id/source",
    "module": "data-flows",
    "pageName": "Flow Source",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/data-flows/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-flows/:id/destination",
    "module": "data-flows",
    "pageName": "Flow Destination",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/data-flows/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-flows/:id/data",
    "module": "data-flows",
    "pageName": "Flow Data",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/data-flows/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-flows/:id/policies",
    "module": "data-flows",
    "pageName": "Flow Policies",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/data-flows/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-flows/:id/risk",
    "module": "data-flows",
    "pageName": "Flow Risk",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/data-flows/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-flows/:id/activity",
    "module": "data-flows",
    "pageName": "Flow Activity",
    "pageType": "page",
    "requiredRole": [
      "security",
      "auditor"
    ],
    "parent": "/data-flows/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/data-flows/:id/audit",
    "module": "data-flows",
    "pageName": "Flow Audit",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/data-flows/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies",
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
    "route": "/policies/overview",
    "module": "policies",
    "pageName": "Policy Overview",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/active",
    "module": "policies",
    "pageName": "Active Policies",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/draft",
    "module": "policies",
    "pageName": "Draft Policies",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/disabled",
    "module": "policies",
    "pageName": "Disabled Policies",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/violated",
    "module": "policies",
    "pageName": "Violated Policies",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/templates",
    "module": "policies",
    "pageName": "Policy Templates",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/create",
    "module": "policies",
    "pageName": "Create Policy",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/import",
    "module": "policies",
    "pageName": "Import Policies",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/simulator",
    "module": "policies",
    "pageName": "Policy Simulator",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/test",
    "module": "policies",
    "pageName": "Policy Testing",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/:id",
    "module": "policies",
    "pageName": "Policy Details",
    "pageType": "detail",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/:id/overview",
    "module": "policies",
    "pageName": "Policy Overview",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/:id/rules",
    "module": "policies",
    "pageName": "Policy Rules",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/:id/conditions",
    "module": "policies",
    "pageName": "Policy Conditions",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/:id/actions",
    "module": "policies",
    "pageName": "Policy Actions",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/:id/scope",
    "module": "policies",
    "pageName": "Policy Scope",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/:id/exceptions",
    "module": "policies",
    "pageName": "Policy Exceptions",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/:id/versions",
    "module": "policies",
    "pageName": "Policy Versions",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/:id/simulation",
    "module": "policies",
    "pageName": "Policy Simulation",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/:id/activity",
    "module": "policies",
    "pageName": "Policy Activity",
    "pageType": "page",
    "requiredRole": [
      "security",
      "auditor"
    ],
    "parent": "/policies/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/:id/violations",
    "module": "policies",
    "pageName": "Policy Violations",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/policies/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/:id/audit",
    "module": "policies",
    "pageName": "Policy Audit",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/policies/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/policies/:id/settings",
    "module": "policies",
    "pageName": "Policy Settings",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "security"
    ],
    "parent": "/policies/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway",
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
    "route": "/gateway/overview",
    "module": "gateway",
    "pageName": "Gateway Overview",
    "pageType": "page",
    "requiredRole": [
      "security",
      "developer"
    ],
    "parent": "/gateway",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/requests",
    "module": "gateway",
    "pageName": "Gateway Requests",
    "pageType": "page",
    "requiredRole": [
      "security",
      "developer"
    ],
    "parent": "/gateway",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/live",
    "module": "gateway",
    "pageName": "Live Gateway",
    "pageType": "page",
    "requiredRole": [
      "security",
      "developer"
    ],
    "parent": "/gateway",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/allowed",
    "module": "gateway",
    "pageName": "Allowed Requests",
    "pageType": "page",
    "requiredRole": [
      "security",
      "developer"
    ],
    "parent": "/gateway",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/blocked",
    "module": "gateway",
    "pageName": "Blocked Requests",
    "pageType": "page",
    "requiredRole": [
      "security",
      "developer"
    ],
    "parent": "/gateway",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/redacted",
    "module": "gateway",
    "pageName": "Redacted Requests",
    "pageType": "page",
    "requiredRole": [
      "security",
      "developer"
    ],
    "parent": "/gateway",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/approval-required",
    "module": "gateway",
    "pageName": "Approval Required",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/gateway",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/errors",
    "module": "gateway",
    "pageName": "Gateway Errors",
    "pageType": "page",
    "requiredRole": [
      "security",
      "developer"
    ],
    "parent": "/gateway",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/providers",
    "module": "gateway",
    "pageName": "Gateway Providers",
    "pageType": "page",
    "requiredRole": [
      "security",
      "developer"
    ],
    "parent": "/gateway",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/models",
    "module": "gateway",
    "pageName": "Gateway Models",
    "pageType": "page",
    "requiredRole": [
      "security",
      "developer"
    ],
    "parent": "/gateway",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/applications",
    "module": "gateway",
    "pageName": "Gateway Applications",
    "pageType": "page",
    "requiredRole": [
      "security",
      "developer"
    ],
    "parent": "/gateway",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/api-keys",
    "module": "gateway",
    "pageName": "Gateway API Keys",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "admin"
    ],
    "parent": "/gateway",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/webhooks",
    "module": "gateway",
    "pageName": "Gateway Webhooks",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "admin"
    ],
    "parent": "/gateway",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/configuration",
    "module": "gateway",
    "pageName": "Gateway Configuration",
    "pageType": "page",
    "requiredRole": [
      "security",
      "developer"
    ],
    "parent": "/gateway",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/logs",
    "module": "gateway",
    "pageName": "Gateway Logs",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/gateway",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/requests/:id",
    "module": "gateway",
    "pageName": "Gateway Request Detail",
    "pageType": "detail",
    "requiredRole": [
      "security",
      "developer"
    ],
    "parent": "/gateway/requests",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/requests/:id/overview",
    "module": "gateway",
    "pageName": "Request Overview",
    "pageType": "page",
    "requiredRole": [
      "security",
      "developer"
    ],
    "parent": "/gateway/requests/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/requests/:id/data",
    "module": "gateway",
    "pageName": "Request Data",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/gateway/requests/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/requests/:id/classification",
    "module": "gateway",
    "pageName": "Request Classification",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/gateway/requests/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/requests/:id/policy",
    "module": "gateway",
    "pageName": "Request Policy",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/gateway/requests/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/requests/:id/decision",
    "module": "gateway",
    "pageName": "Request Decision",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/gateway/requests/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/requests/:id/provider",
    "module": "gateway",
    "pageName": "Request Provider",
    "pageType": "page",
    "requiredRole": [
      "security",
      "developer"
    ],
    "parent": "/gateway/requests/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/gateway/requests/:id/audit",
    "module": "gateway",
    "pageName": "Request Audit",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/gateway/requests/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents",
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
    "route": "/incidents/overview",
    "module": "incidents",
    "pageName": "Incident Overview",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/incidents",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/open",
    "module": "incidents",
    "pageName": "Open Incidents",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/incidents",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/investigating",
    "module": "incidents",
    "pageName": "Investigating Incidents",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/incidents",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/resolved",
    "module": "incidents",
    "pageName": "Resolved Incidents",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/incidents",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/critical",
    "module": "incidents",
    "pageName": "Critical Incidents",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/incidents",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/high",
    "module": "incidents",
    "pageName": "High Severity Incidents",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/incidents",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/policy-violations",
    "module": "incidents",
    "pageName": "Policy Violation Incidents",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/incidents",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/data-exposure",
    "module": "incidents",
    "pageName": "Data Exposure Incidents",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/incidents",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/ai-risk",
    "module": "incidents",
    "pageName": "AI Risk Incidents",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/incidents",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/create",
    "module": "incidents",
    "pageName": "Create Incident",
    "pageType": "page",
    "requiredRole": [
      "security"
    ],
    "parent": "/incidents",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/:id",
    "module": "incidents",
    "pageName": "Incident Detail",
    "pageType": "detail",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/incidents",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/:id/overview",
    "module": "incidents",
    "pageName": "Incident Overview",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/incidents/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/:id/timeline",
    "module": "incidents",
    "pageName": "Incident Timeline",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/incidents/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/:id/evidence",
    "module": "incidents",
    "pageName": "Incident Evidence",
    "pageType": "page",
    "requiredRole": [
      "security",
      "auditor"
    ],
    "parent": "/incidents/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/:id/data",
    "module": "incidents",
    "pageName": "Incident Data",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/incidents/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/:id/policy",
    "module": "incidents",
    "pageName": "Incident Policy",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/incidents/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/:id/ai-system",
    "module": "incidents",
    "pageName": "Incident AI System",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/incidents/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/:id/application",
    "module": "incidents",
    "pageName": "Incident Application",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/incidents/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/:id/assignments",
    "module": "incidents",
    "pageName": "Incident Assignments",
    "pageType": "page",
    "requiredRole": [
      "security",
      "admin"
    ],
    "parent": "/incidents/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/:id/comments",
    "module": "incidents",
    "pageName": "Incident Comments",
    "pageType": "page",
    "requiredRole": [
      "security",
      "support"
    ],
    "parent": "/incidents/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/:id/actions",
    "module": "incidents",
    "pageName": "Incident Actions",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/incidents/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/:id/resolution",
    "module": "incidents",
    "pageName": "Incident Resolution",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/incidents/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/incidents/:id/audit",
    "module": "incidents",
    "pageName": "Incident Audit",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/incidents/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/approvals",
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
    "route": "/approvals/overview",
    "module": "approvals",
    "pageName": "Approval Overview",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/approvals",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/approvals/pending",
    "module": "approvals",
    "pageName": "Pending Approvals",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/approvals",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/approvals/approved",
    "module": "approvals",
    "pageName": "Approved Approvals",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/approvals",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/approvals/denied",
    "module": "approvals",
    "pageName": "Denied Approvals",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/approvals",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/approvals/expired",
    "module": "approvals",
    "pageName": "Expired Approvals",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/approvals",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/approvals/my-approvals",
    "module": "approvals",
    "pageName": "My Approvals",
    "pageType": "page",
    "requiredRole": [
      "authenticated"
    ],
    "parent": "/approvals",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/approvals/create",
    "module": "approvals",
    "pageName": "Create Approval",
    "pageType": "page",
    "requiredRole": [
      "security",
      "admin"
    ],
    "parent": "/approvals",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/approvals/:id",
    "module": "approvals",
    "pageName": "Approval Detail",
    "pageType": "detail",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/approvals",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/approvals/:id/overview",
    "module": "approvals",
    "pageName": "Approval Overview",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/approvals/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/approvals/:id/request",
    "module": "approvals",
    "pageName": "Approval Request",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/approvals/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/approvals/:id/data",
    "module": "approvals",
    "pageName": "Approval Data",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/approvals/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/approvals/:id/policy",
    "module": "approvals",
    "pageName": "Approval Policy",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/approvals/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/approvals/:id/history",
    "module": "approvals",
    "pageName": "Approval History",
    "pageType": "page",
    "requiredRole": [
      "security",
      "auditor"
    ],
    "parent": "/approvals/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/approvals/:id/audit",
    "module": "approvals",
    "pageName": "Approval Audit",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/approvals/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-passports",
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
    "route": "/ai-passports/overview",
    "module": "passports",
    "pageName": "Passport Overview",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-passports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-passports/all",
    "module": "passports",
    "pageName": "All Passports",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-passports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-passports/approved",
    "module": "passports",
    "pageName": "Approved Passports",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-passports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-passports/pending",
    "module": "passports",
    "pageName": "Pending Passports",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-passports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-passports/high-risk",
    "module": "passports",
    "pageName": "High Risk Passports",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/ai-passports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-passports/create",
    "module": "passports",
    "pageName": "Create Passport",
    "pageType": "page",
    "requiredRole": [
      "security"
    ],
    "parent": "/ai-passports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-passports/import",
    "module": "passports",
    "pageName": "Import Passports",
    "pageType": "page",
    "requiredRole": [
      "security"
    ],
    "parent": "/ai-passports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-passports/:id",
    "module": "passports",
    "pageName": "Passport Detail",
    "pageType": "detail",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-passports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-passports/:id/overview",
    "module": "passports",
    "pageName": "Passport Overview",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-passports/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-passports/:id/identity",
    "module": "passports",
    "pageName": "Passport Identity",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-passports/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-passports/:id/purpose",
    "module": "passports",
    "pageName": "Passport Purpose",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-passports/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-passports/:id/models",
    "module": "passports",
    "pageName": "Passport Models",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-passports/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-passports/:id/providers",
    "module": "passports",
    "pageName": "Passport Providers",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-passports/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-passports/:id/data",
    "module": "passports",
    "pageName": "Passport Data",
    "pageType": "page",
    "requiredRole": [
      "privacy",
      "security"
    ],
    "parent": "/ai-passports/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-passports/:id/risk",
    "module": "passports",
    "pageName": "Passport Risk",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/ai-passports/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-passports/:id/controls",
    "module": "passports",
    "pageName": "Passport Controls",
    "pageType": "page",
    "requiredRole": [
      "security",
      "privacy"
    ],
    "parent": "/ai-passports/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-passports/:id/approvals",
    "module": "passports",
    "pageName": "Passport Approvals",
    "pageType": "page",
    "requiredRole": [
      "security",
      "compliance"
    ],
    "parent": "/ai-passports/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-passports/:id/audit",
    "module": "passports",
    "pageName": "Passport Audit",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/ai-passports/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/ai-passports/:id/export",
    "module": "passports",
    "pageName": "Passport Export",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "security"
    ],
    "parent": "/ai-passports/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/risk",
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
    "route": "/risk/overview",
    "module": "risk",
    "pageName": "Risk Overview",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/risk",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/risk/ai-systems",
    "module": "risk",
    "pageName": "AI System Risk",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/risk",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/risk/applications",
    "module": "risk",
    "pageName": "Application Risk",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/risk",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/risk/providers",
    "module": "risk",
    "pageName": "Provider Risk",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/risk",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/risk/models",
    "module": "risk",
    "pageName": "Model Risk",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/risk",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/risk/data",
    "module": "risk",
    "pageName": "Data Risk",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "privacy"
    ],
    "parent": "/risk",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/risk/data-flows",
    "module": "risk",
    "pageName": "Data Flow Risk",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/risk",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/risk/policies",
    "module": "risk",
    "pageName": "Policy Risk",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/risk",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/risk/incidents",
    "module": "risk",
    "pageName": "Incident Risk",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/risk",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/risk/high-risk",
    "module": "risk",
    "pageName": "High Risk Items",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/risk",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/risk/assessments",
    "module": "risk",
    "pageName": "Risk Assessments",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/risk",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/risk/create-assessment",
    "module": "risk",
    "pageName": "Create Assessment",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/risk",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/risk/assessments/:id",
    "module": "risk",
    "pageName": "Assessment Detail",
    "pageType": "detail",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/risk/assessments",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/risk/assessments/:id/overview",
    "module": "risk",
    "pageName": "Assessment Overview",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/risk/assessments/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/risk/assessments/:id/questions",
    "module": "risk",
    "pageName": "Assessment Questions",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/risk/assessments/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/risk/assessments/:id/evidence",
    "module": "risk",
    "pageName": "Assessment Evidence",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/risk/assessments/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/risk/assessments/:id/findings",
    "module": "risk",
    "pageName": "Assessment Findings",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/risk/assessments/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/risk/assessments/:id/actions",
    "module": "risk",
    "pageName": "Assessment Actions",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/risk/assessments/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/risk/assessments/:id/report",
    "module": "risk",
    "pageName": "Assessment Report",
    "pageType": "page",
    "requiredRole": [
      "risk",
      "security"
    ],
    "parent": "/risk/assessments/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/compliance-admin",
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
    "route": "/compliance/overview",
    "module": "compliance-admin",
    "pageName": "Compliance Overview",
    "pageType": "page",
    "requiredRole": [
      "compliance"
    ],
    "parent": "/compliance-admin",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/compliance/frameworks",
    "module": "compliance-admin",
    "pageName": "Compliance Frameworks",
    "pageType": "page",
    "requiredRole": [
      "compliance"
    ],
    "parent": "/compliance-admin",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/compliance/requirements",
    "module": "compliance-admin",
    "pageName": "Compliance Requirements",
    "pageType": "page",
    "requiredRole": [
      "compliance"
    ],
    "parent": "/compliance-admin",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/compliance/controls",
    "module": "compliance-admin",
    "pageName": "Compliance Controls",
    "pageType": "page",
    "requiredRole": [
      "compliance"
    ],
    "parent": "/compliance-admin",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/compliance/evidence",
    "module": "compliance-admin",
    "pageName": "Compliance Evidence",
    "pageType": "page",
    "requiredRole": [
      "compliance"
    ],
    "parent": "/compliance-admin",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/compliance/gaps",
    "module": "compliance-admin",
    "pageName": "Compliance Gaps",
    "pageType": "page",
    "requiredRole": [
      "compliance"
    ],
    "parent": "/compliance-admin",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/compliance/findings",
    "module": "compliance-admin",
    "pageName": "Compliance Findings",
    "pageType": "page",
    "requiredRole": [
      "compliance"
    ],
    "parent": "/compliance-admin",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/compliance/remediation",
    "module": "compliance-admin",
    "pageName": "Compliance Remediation",
    "pageType": "page",
    "requiredRole": [
      "compliance"
    ],
    "parent": "/compliance-admin",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/compliance/audits",
    "module": "compliance-admin",
    "pageName": "Compliance Audits",
    "pageType": "page",
    "requiredRole": [
      "compliance"
    ],
    "parent": "/compliance-admin",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/compliance/reports",
    "module": "compliance-admin",
    "pageName": "Compliance Reports",
    "pageType": "page",
    "requiredRole": [
      "compliance"
    ],
    "parent": "/compliance-admin",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/compliance/frameworks/:id",
    "module": "compliance-admin",
    "pageName": "Framework Details",
    "pageType": "detail",
    "requiredRole": [
      "compliance"
    ],
    "parent": "/compliance/frameworks",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/compliance/frameworks/:id/overview",
    "module": "compliance",
    "pageName": "Framework Overview",
    "pageType": "page",
    "requiredRole": [
      "compliance"
    ],
    "parent": "/compliance/frameworks/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/compliance/frameworks/:id/requirements",
    "module": "compliance",
    "pageName": "Framework Requirements",
    "pageType": "page",
    "requiredRole": [
      "compliance"
    ],
    "parent": "/compliance/frameworks/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/compliance/frameworks/:id/controls",
    "module": "compliance",
    "pageName": "Framework Controls",
    "pageType": "page",
    "requiredRole": [
      "compliance"
    ],
    "parent": "/compliance/frameworks/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/compliance/frameworks/:id/evidence",
    "module": "compliance",
    "pageName": "Framework Evidence",
    "pageType": "page",
    "requiredRole": [
      "compliance"
    ],
    "parent": "/compliance/frameworks/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/compliance/frameworks/:id/gaps",
    "module": "compliance",
    "pageName": "Framework Gaps",
    "pageType": "page",
    "requiredRole": [
      "compliance"
    ],
    "parent": "/compliance/frameworks/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/compliance/frameworks/:id/report",
    "module": "compliance",
    "pageName": "Framework Report",
    "pageType": "page",
    "requiredRole": [
      "compliance"
    ],
    "parent": "/compliance/frameworks/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/audit",
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
    "route": "/audit/overview",
    "module": "audit",
    "pageName": "Audit Overview",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/audit",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/audit/logs",
    "module": "audit",
    "pageName": "Audit Logs",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/audit",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/audit/security",
    "module": "audit",
    "pageName": "Audit Security",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/audit",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/audit/data-access",
    "module": "audit",
    "pageName": "Audit Data Access",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/audit",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/audit/ai-activity",
    "module": "audit",
    "pageName": "AI Activity Audit",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/audit",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/audit/policy-events",
    "module": "audit",
    "pageName": "Policy Events",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/audit",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/audit/admin-events",
    "module": "audit",
    "pageName": "Admin Events",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/audit",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/audit/authentication",
    "module": "audit",
    "pageName": "Authentication Audit",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/audit",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/audit/api",
    "module": "audit",
    "pageName": "API Audit",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/audit",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/audit/export",
    "module": "audit",
    "pageName": "Audit Export",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/audit",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/audit/:id",
    "module": "audit",
    "pageName": "Audit Event Detail",
    "pageType": "detail",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/audit",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/audit/:id/overview",
    "module": "audit",
    "pageName": "Audit Event Overview",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/audit/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/audit/:id/context",
    "module": "audit",
    "pageName": "Audit Event Context",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/audit/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/audit/:id/actor",
    "module": "audit",
    "pageName": "Audit Event Actor",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/audit/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/audit/:id/resource",
    "module": "audit",
    "pageName": "Audit Event Resource",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/audit/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/audit/:id/timeline",
    "module": "audit",
    "pageName": "Audit Event Timeline",
    "pageType": "page",
    "requiredRole": [
      "auditor",
      "security"
    ],
    "parent": "/audit/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/reports",
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
    "route": "/reports/overview",
    "module": "reports",
    "pageName": "Reports Overview",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "compliance"
    ],
    "parent": "/reports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/reports/security",
    "module": "reports",
    "pageName": "Security Reports",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "compliance"
    ],
    "parent": "/reports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/reports/ai-governance",
    "module": "reports",
    "pageName": "AI Governance Reports",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "compliance"
    ],
    "parent": "/reports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/reports/data-governance",
    "module": "reports",
    "pageName": "Data Governance Reports",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "compliance"
    ],
    "parent": "/reports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/reports/compliance",
    "module": "reports",
    "pageName": "Compliance Reports",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "compliance"
    ],
    "parent": "/reports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/reports/incidents",
    "module": "reports",
    "pageName": "Incident Reports",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "security"
    ],
    "parent": "/reports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/reports/policies",
    "module": "reports",
    "pageName": "Policy Reports",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "compliance"
    ],
    "parent": "/reports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/reports/usage",
    "module": "reports",
    "pageName": "Usage Reports",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "finance"
    ],
    "parent": "/reports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/reports/risk",
    "module": "reports",
    "pageName": "Risk Reports",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "risk",
      "compliance"
    ],
    "parent": "/reports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/reports/custom",
    "module": "reports",
    "pageName": "Custom Reports",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "compliance"
    ],
    "parent": "/reports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/reports/scheduled",
    "module": "reports",
    "pageName": "Scheduled Reports",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "compliance"
    ],
    "parent": "/reports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/reports/templates",
    "module": "reports",
    "pageName": "Report Templates",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "compliance"
    ],
    "parent": "/reports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/reports/create",
    "module": "reports",
    "pageName": "Create Report",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "compliance"
    ],
    "parent": "/reports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/reports/:id",
    "module": "reports",
    "pageName": "Report Detail",
    "pageType": "detail",
    "requiredRole": [
      "admin",
      "compliance"
    ],
    "parent": "/reports",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/reports/:id/preview",
    "module": "reports",
    "pageName": "Report Preview",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "compliance"
    ],
    "parent": "/reports/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/reports/:id/data",
    "module": "reports",
    "pageName": "Report Data",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "compliance"
    ],
    "parent": "/reports/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/reports/:id/schedule",
    "module": "reports",
    "pageName": "Report Schedule",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "compliance"
    ],
    "parent": "/reports/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/reports/:id/recipients",
    "module": "reports",
    "pageName": "Report Recipients",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "compliance"
    ],
    "parent": "/reports/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/reports/:id/history",
    "module": "reports",
    "pageName": "Report History",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "compliance"
    ],
    "parent": "/reports/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/integrations-hub",
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
    "route": "/integrations-hub/overview",
    "module": "integrations",
    "pageName": "Integrations Overview",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "admin"
    ],
    "parent": "/integrations-hub",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/integrations-hub/ai-providers",
    "module": "integrations",
    "pageName": "AI Provider Integrations",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "admin"
    ],
    "parent": "/integrations-hub",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/integrations-hub/cloud",
    "module": "integrations",
    "pageName": "Cloud Integrations",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "admin"
    ],
    "parent": "/integrations-hub",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/integrations-hub/databases",
    "module": "integrations",
    "pageName": "Database Integrations",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "admin"
    ],
    "parent": "/integrations-hub",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/integrations-hub/security",
    "module": "integrations",
    "pageName": "Security Integrations",
    "pageType": "page",
    "requiredRole": [
      "security",
      "admin"
    ],
    "parent": "/integrations-hub",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/integrations-hub/identity",
    "module": "integrations",
    "pageName": "Identity Integrations",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "admin"
    ],
    "parent": "/integrations-hub",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/integrations-hub/siem",
    "module": "integrations",
    "pageName": "SIEM Integrations",
    "pageType": "page",
    "requiredRole": [
      "security",
      "admin"
    ],
    "parent": "/integrations-hub",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/integrations-hub/monitoring",
    "module": "integrations",
    "pageName": "Monitoring Integrations",
    "pageType": "page",
    "requiredRole": [
      "security",
      "admin"
    ],
    "parent": "/integrations-hub",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/integrations-hub/developer-tools",
    "module": "integrations",
    "pageName": "Developer Tools",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "admin"
    ],
    "parent": "/integrations-hub",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/integrations-hub/webhooks",
    "module": "integrations",
    "pageName": "Webhooks",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "admin"
    ],
    "parent": "/integrations-hub",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/integrations-hub/custom",
    "module": "integrations",
    "pageName": "Custom Integrations",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "admin"
    ],
    "parent": "/integrations-hub",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/integrations-hub/:id",
    "module": "integrations",
    "pageName": "Integration Details",
    "pageType": "detail",
    "requiredRole": [
      "developer",
      "admin"
    ],
    "parent": "/integrations-hub",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/integrations-hub/:id/overview",
    "module": "integrations",
    "pageName": "Integration Overview",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "admin"
    ],
    "parent": "/integrations-hub/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/integrations-hub/:id/configuration",
    "module": "integrations",
    "pageName": "Integration Configuration",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "admin"
    ],
    "parent": "/integrations-hub/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/integrations-hub/:id/credentials",
    "module": "integrations",
    "pageName": "Integration Credentials",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "admin"
    ],
    "parent": "/integrations-hub/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/integrations-hub/:id/events",
    "module": "integrations",
    "pageName": "Integration Events",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "admin"
    ],
    "parent": "/integrations-hub/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/integrations-hub/:id/logs",
    "module": "integrations",
    "pageName": "Integration Logs",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "admin"
    ],
    "parent": "/integrations-hub/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/integrations-hub/:id/settings",
    "module": "integrations",
    "pageName": "Integration Settings",
    "pageType": "page",
    "requiredRole": [
      "developer",
      "admin"
    ],
    "parent": "/integrations-hub/:id",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/developer-portal",
    "module": "developers",
    "pageName": "Developer Center",
    "pageType": "page",
    "requiredRole": [
      "developer"
    ],
    "parent": null,
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/developer-portal/overview",
    "module": "developers",
    "pageName": "Developer Overview",
    "pageType": "page",
    "requiredRole": [
      "developer"
    ],
    "parent": "/developer-portal",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/developer-portal/api",
    "module": "developers",
    "pageName": "API",
    "pageType": "page",
    "requiredRole": [
      "developer"
    ],
    "parent": "/developer-portal",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/developer-portal/api-keys",
    "module": "developers",
    "pageName": "API Keys",
    "pageType": "page",
    "requiredRole": [
      "developer"
    ],
    "parent": "/developer-portal",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/developer-portal/service-accounts",
    "module": "developers",
    "pageName": "Service Accounts",
    "pageType": "page",
    "requiredRole": [
      "developer"
    ],
    "parent": "/developer-portal",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/developer-portal/webhooks",
    "module": "developers",
    "pageName": "Webhooks",
    "pageType": "page",
    "requiredRole": [
      "developer"
    ],
    "parent": "/developer-portal",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/developer-portal/sdks",
    "module": "developers",
    "pageName": "SDKs",
    "pageType": "page",
    "requiredRole": [
      "developer"
    ],
    "parent": "/developer-portal",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/developer-portal/logs",
    "module": "developers",
    "pageName": "Developer Logs",
    "pageType": "page",
    "requiredRole": [
      "developer"
    ],
    "parent": "/developer-portal",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/developer-portal/testing",
    "module": "developers",
    "pageName": "Developer Testing",
    "pageType": "page",
    "requiredRole": [
      "developer"
    ],
    "parent": "/developer-portal",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/developer-portal/sandbox",
    "module": "developers",
    "pageName": "Sandbox",
    "pageType": "page",
    "requiredRole": [
      "developer"
    ],
    "parent": "/developer-portal",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/developer-portal/changelog",
    "module": "developers",
    "pageName": "Changelog",
    "pageType": "page",
    "requiredRole": [
      "developer"
    ],
    "parent": "/developer-portal",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/developer-portal/api-keys/:id",
    "module": "developers",
    "pageName": "API Key Detail",
    "pageType": "detail",
    "requiredRole": [
      "developer"
    ],
    "parent": "/developer-portal/api-keys",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/developer-portal/service-accounts/:id",
    "module": "developers",
    "pageName": "Service Account Detail",
    "pageType": "detail",
    "requiredRole": [
      "developer"
    ],
    "parent": "/developer-portal/service-accounts",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/developer-portal/webhooks/:id",
    "module": "developers",
    "pageName": "Webhook Detail",
    "pageType": "detail",
    "requiredRole": [
      "developer"
    ],
    "parent": "/developer-portal/webhooks",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/team",
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
    "route": "/team/members",
    "module": "team",
    "pageName": "Team Members",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/team",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/team/invitations",
    "module": "team",
    "pageName": "Invitations",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/team",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/team/roles",
    "module": "team",
    "pageName": "Roles",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/team",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/team/permissions",
    "module": "team",
    "pageName": "Permissions",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/team",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/team/groups",
    "module": "team",
    "pageName": "Groups",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/team",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/team/service-accounts",
    "module": "team",
    "pageName": "Team Service Accounts",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/team",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/team/access-requests",
    "module": "team",
    "pageName": "Access Requests",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/team",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/team/members/:id",
    "module": "team",
    "pageName": "Member Detail",
    "pageType": "detail",
    "requiredRole": [
      "admin"
    ],
    "parent": "/team/members",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/team/roles/:id",
    "module": "team",
    "pageName": "Role Detail",
    "pageType": "detail",
    "requiredRole": [
      "admin"
    ],
    "parent": "/team/roles",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings",
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
    "route": "/settings/general",
    "module": "settings",
    "pageName": "General Settings",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/organization",
    "module": "settings",
    "pageName": "Organization Settings",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/security",
    "module": "settings",
    "pageName": "Security Settings",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "security"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/authentication",
    "module": "settings",
    "pageName": "Authentication Settings",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/mfa",
    "module": "settings",
    "pageName": "MFA Settings",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "security"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/sso",
    "module": "settings",
    "pageName": "SSO Settings",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/domains",
    "module": "settings",
    "pageName": "Domain Settings",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/roles",
    "module": "settings",
    "pageName": "Role Management",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/permissions",
    "module": "settings",
    "pageName": "Permission Management",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/notifications",
    "module": "settings",
    "pageName": "Notification Settings",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/email",
    "module": "settings",
    "pageName": "Email Settings",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/webhooks",
    "module": "settings",
    "pageName": "Webhook Settings",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "developer"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/api",
    "module": "settings",
    "pageName": "API Settings",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "developer"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/data",
    "module": "settings",
    "pageName": "Data Settings",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "privacy"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/data-retention",
    "module": "settings",
    "pageName": "Data Retention",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "compliance"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/privacy",
    "module": "settings",
    "pageName": "Privacy Settings",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "privacy"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/audit",
    "module": "settings",
    "pageName": "Audit Settings",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "auditor"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/integrations",
    "module": "settings",
    "pageName": "Integration Settings",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "developer"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/developer",
    "module": "settings",
    "pageName": "Developer Settings",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "developer"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/billing",
    "module": "settings",
    "pageName": "Billing Settings",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "finance"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/usage",
    "module": "settings",
    "pageName": "Usage Settings",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "finance"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/export",
    "module": "settings",
    "pageName": "Export Settings",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/settings/danger-zone",
    "module": "settings",
    "pageName": "Danger Zone",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/settings",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/billing",
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
    "route": "/billing/overview",
    "module": "billing",
    "pageName": "Billing Overview",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/billing",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/billing/plan",
    "module": "billing",
    "pageName": "Plan",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/billing",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/billing/usage",
    "module": "billing",
    "pageName": "Usage",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "finance"
    ],
    "parent": "/billing",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/billing/invoices",
    "module": "billing",
    "pageName": "Invoices",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "finance"
    ],
    "parent": "/billing",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/billing/payment-methods",
    "module": "billing",
    "pageName": "Payment Methods",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "finance"
    ],
    "parent": "/billing",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/billing/subscription",
    "module": "billing",
    "pageName": "Subscription",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/billing",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/billing/credits",
    "module": "billing",
    "pageName": "Credits",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "finance"
    ],
    "parent": "/billing",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/billing/limits",
    "module": "billing",
    "pageName": "Limits",
    "pageType": "page",
    "requiredRole": [
      "admin",
      "finance"
    ],
    "parent": "/billing",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/billing/upgrade",
    "module": "billing",
    "pageName": "Upgrade",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/billing",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/billing/downgrade",
    "module": "billing",
    "pageName": "Downgrade",
    "pageType": "page",
    "requiredRole": [
      "admin"
    ],
    "parent": "/billing",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/billing/invoices/:id",
    "module": "billing",
    "pageName": "Invoice Detail",
    "pageType": "detail",
    "requiredRole": [
      "admin",
      "finance"
    ],
    "parent": "/billing/invoices",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/government",
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
    "route": "/government/overview",
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
    "route": "/government/organizations",
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
    "route": "/government/agencies",
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
    "route": "/government/ai-registry",
    "module": "government",
    "pageName": "Government AI Registry",
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
    "route": "/government/ai-systems",
    "module": "government",
    "pageName": "Government AI Systems",
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
    "route": "/government/providers",
    "module": "government",
    "pageName": "Government Providers",
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
    "route": "/government/models",
    "module": "government",
    "pageName": "Government Models",
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
    "route": "/government/risk",
    "module": "government",
    "pageName": "Government Risk",
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
    "route": "/government/incidents",
    "module": "government",
    "pageName": "Government Incidents",
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
    "route": "/government/policies",
    "module": "government",
    "pageName": "Government Policies",
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
    "route": "/government/compliance",
    "module": "government",
    "pageName": "Government Compliance",
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
    "route": "/government/audits",
    "module": "government",
    "pageName": "Government Audits",
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
    "route": "/government/reports",
    "module": "government",
    "pageName": "Government Reports",
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
    "route": "/government/approvals",
    "module": "government",
    "pageName": "Government Approvals",
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
    "route": "/government/standards",
    "module": "government",
    "pageName": "Government Standards",
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
    "route": "/government/frameworks",
    "module": "government",
    "pageName": "Government Frameworks",
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
    "route": "/government/alerts",
    "module": "government",
    "pageName": "Government Alerts",
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
    "route": "/government/analytics",
    "module": "government",
    "pageName": "Government Analytics",
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
    "route": "/government/organizations/:id",
    "module": "government",
    "pageName": "Government Organization Detail",
    "pageType": "detail",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/organizations",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/organizations/:id/overview",
    "module": "government",
    "pageName": "Organization Overview",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/organizations/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/organizations/:id/agencies",
    "module": "government",
    "pageName": "Organization Agencies",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/organizations/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/organizations/:id/ai-systems",
    "module": "government",
    "pageName": "Organization AI Systems",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/organizations/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/organizations/:id/providers",
    "module": "government",
    "pageName": "Organization Providers",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/organizations/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/organizations/:id/models",
    "module": "government",
    "pageName": "Organization Models",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/organizations/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/organizations/:id/data",
    "module": "government",
    "pageName": "Organization Data",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/organizations/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/organizations/:id/risk",
    "module": "government",
    "pageName": "Organization Risk",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/organizations/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/organizations/:id/incidents",
    "module": "government",
    "pageName": "Organization Incidents",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/organizations/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/organizations/:id/compliance",
    "module": "government",
    "pageName": "Organization Compliance",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/organizations/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/organizations/:id/audit",
    "module": "government",
    "pageName": "Organization Audit",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/organizations/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/organizations/:id/reports",
    "module": "government",
    "pageName": "Organization Reports",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/organizations/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/agencies/:id",
    "module": "government",
    "pageName": "Government Agency Detail",
    "pageType": "detail",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/agencies",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/agencies/:id/overview",
    "module": "government",
    "pageName": "Agency Overview",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/agencies/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/agencies/:id/ai-systems",
    "module": "government",
    "pageName": "Agency AI Systems",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/agencies/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/agencies/:id/applications",
    "module": "government",
    "pageName": "Agency Applications",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/agencies/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/agencies/:id/providers",
    "module": "government",
    "pageName": "Agency Providers",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/agencies/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/agencies/:id/data",
    "module": "government",
    "pageName": "Agency Data",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/agencies/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/agencies/:id/risk",
    "module": "government",
    "pageName": "Agency Risk",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/agencies/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/agencies/:id/incidents",
    "module": "government",
    "pageName": "Agency Incidents",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/agencies/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/agencies/:id/compliance",
    "module": "government",
    "pageName": "Agency Compliance",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/agencies/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/agencies/:id/audit",
    "module": "government",
    "pageName": "Agency Audit",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/agencies/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/agencies/:id/reports",
    "module": "government",
    "pageName": "Agency Reports",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/agencies/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/ai-registry/all",
    "module": "government",
    "pageName": "AI Registry All",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/ai-registry",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/ai-registry/approved",
    "module": "government",
    "pageName": "AI Registry Approved",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/ai-registry",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/ai-registry/pending",
    "module": "government",
    "pageName": "AI Registry Pending",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/ai-registry",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/ai-registry/restricted",
    "module": "government",
    "pageName": "AI Registry Restricted",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/ai-registry",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/ai-registry/high-risk",
    "module": "government",
    "pageName": "AI Registry High Risk",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/ai-registry",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/ai-registry/expired",
    "module": "government",
    "pageName": "AI Registry Expired",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/ai-registry",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/ai-registry/review-required",
    "module": "government",
    "pageName": "AI Registry Review Required",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/ai-registry",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/ai-registry/:id",
    "module": "government",
    "pageName": "AI Registry Detail",
    "pageType": "detail",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/ai-registry",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/ai-registry/:id/overview",
    "module": "government",
    "pageName": "AI Registry Overview",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/ai-registry/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/ai-registry/:id/operator",
    "module": "government",
    "pageName": "AI Registry Operator",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/ai-registry/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/ai-registry/:id/purpose",
    "module": "government",
    "pageName": "AI Registry Purpose",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/ai-registry/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/ai-registry/:id/data",
    "module": "government",
    "pageName": "AI Registry Data",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/ai-registry/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/ai-registry/:id/provider",
    "module": "government",
    "pageName": "AI Registry Provider",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/ai-registry/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/ai-registry/:id/risk",
    "module": "government",
    "pageName": "AI Registry Risk",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/ai-registry/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/ai-registry/:id/compliance",
    "module": "government",
    "pageName": "AI Registry Compliance",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/ai-registry/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/ai-registry/:id/audit",
    "module": "government",
    "pageName": "AI Registry Audit",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/ai-registry/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/policies",
    "module": "government",
    "pageName": "Government Policy Center",
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
    "route": "/government/policies/overview",
    "module": "government",
    "pageName": "Government Policy Overview",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/policies",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/policies/active",
    "module": "government",
    "pageName": "Government Active Policies",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/policies",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/policies/draft",
    "module": "government",
    "pageName": "Government Draft Policies",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/policies",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/policies/templates",
    "module": "government",
    "pageName": "Government Policy Templates",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/policies",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/policies/violations",
    "module": "government",
    "pageName": "Government Policy Violations",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/policies",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/policies/create",
    "module": "government",
    "pageName": "Create Government Policy",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/policies",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/policies/simulator",
    "module": "government",
    "pageName": "Government Policy Simulator",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/policies",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/policies/:id",
    "module": "government",
    "pageName": "Government Policy Detail",
    "pageType": "detail",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/policies",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/policies/:id/overview",
    "module": "government",
    "pageName": "Government Policy Overview",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/policies/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/policies/:id/rules",
    "module": "government",
    "pageName": "Government Policy Rules",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/policies/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/policies/:id/scope",
    "module": "government",
    "pageName": "Government Policy Scope",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/policies/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/policies/:id/exceptions",
    "module": "government",
    "pageName": "Government Policy Exceptions",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/policies/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/policies/:id/versions",
    "module": "government",
    "pageName": "Government Policy Versions",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/policies/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/policies/:id/violations",
    "module": "government",
    "pageName": "Government Policy Violations",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/policies/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/government/policies/:id/audit",
    "module": "government",
    "pageName": "Government Policy Audit",
    "pageType": "page",
    "requiredRole": [
      "government-admin"
    ],
    "parent": "/government/policies/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": true,
    "adminScope": false
  },
  {
    "route": "/admin",
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
    "route": "/admin/overview",
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
    "route": "/admin/organizations",
    "module": "admin",
    "pageName": "Platform Organizations",
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
    "route": "/admin/users",
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
    "route": "/admin/subscriptions",
    "module": "admin",
    "pageName": "Platform Subscriptions",
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
    "route": "/admin/billing",
    "module": "admin",
    "pageName": "Platform Billing",
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
    "route": "/admin/usage",
    "module": "admin",
    "pageName": "Platform Usage",
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
    "route": "/admin/ai-systems",
    "module": "admin",
    "pageName": "Platform AI Systems",
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
    "route": "/admin/providers",
    "module": "admin",
    "pageName": "Platform Providers",
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
    "route": "/admin/models",
    "module": "admin",
    "pageName": "Platform Models",
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
    "route": "/admin/incidents",
    "module": "admin",
    "pageName": "Platform Incidents",
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
    "route": "/admin/security",
    "module": "admin",
    "pageName": "Platform Security",
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
    "route": "/admin/audit",
    "module": "admin",
    "pageName": "Platform Audit",
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
    "route": "/admin/system",
    "module": "admin",
    "pageName": "System Operations",
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
    "route": "/admin/infrastructure",
    "module": "admin",
    "pageName": "Infrastructure",
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
    "route": "/admin/jobs",
    "module": "admin",
    "pageName": "Jobs",
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
    "route": "/admin/queues",
    "module": "admin",
    "pageName": "Queues",
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
    "route": "/admin/feature-flags",
    "module": "admin",
    "pageName": "Feature Flags",
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
    "route": "/admin/configuration",
    "module": "admin",
    "pageName": "Configuration",
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
    "route": "/admin/support",
    "module": "admin",
    "pageName": "Platform Support",
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
    "route": "/admin/announcements",
    "module": "admin",
    "pageName": "Announcements",
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
    "route": "/admin/organizations/:id",
    "module": "admin",
    "pageName": "Organization Detail",
    "pageType": "detail",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin/organizations",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "route": "/admin/organizations/:id/overview",
    "module": "admin",
    "pageName": "Organization Overview",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin/organizations/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "route": "/admin/organizations/:id/users",
    "module": "admin",
    "pageName": "Organization Users",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin/organizations/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "route": "/admin/organizations/:id/subscription",
    "module": "admin",
    "pageName": "Organization Subscription",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin/organizations/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "route": "/admin/organizations/:id/usage",
    "module": "admin",
    "pageName": "Organization Usage",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin/organizations/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "route": "/admin/organizations/:id/security",
    "module": "admin",
    "pageName": "Organization Security",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin/organizations/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "route": "/admin/organizations/:id/activity",
    "module": "admin",
    "pageName": "Organization Activity",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin/organizations/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "route": "/admin/organizations/:id/audit",
    "module": "admin",
    "pageName": "Organization Audit",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin/organizations/:id",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "route": "/admin/system/health",
    "module": "admin",
    "pageName": "System Health",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin/system",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "route": "/admin/system/services",
    "module": "admin",
    "pageName": "System Services",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin/system",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "route": "/admin/system/database",
    "module": "admin",
    "pageName": "Database",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin/system",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "route": "/admin/system/cache",
    "module": "admin",
    "pageName": "Cache",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin/system",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "route": "/admin/system/queues",
    "module": "admin",
    "pageName": "Queues",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin/system",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "route": "/admin/system/workers",
    "module": "admin",
    "pageName": "Workers",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin/system",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "route": "/admin/system/providers",
    "module": "admin",
    "pageName": "System Providers",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin/system",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "route": "/admin/system/storage",
    "module": "admin",
    "pageName": "System Storage",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin/system",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "route": "/admin/system/metrics",
    "module": "admin",
    "pageName": "System Metrics",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin/system",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "route": "/admin/system/logs",
    "module": "admin",
    "pageName": "System Logs",
    "pageType": "page",
    "requiredRole": [
      "platform-admin"
    ],
    "parent": "/admin/system",
    "authentication": true,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": true
  },
  {
    "route": "/support",
    "module": "support",
    "pageName": "Support",
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
    "route": "/support/overview",
    "module": "support",
    "pageName": "Support Overview",
    "pageType": "page",
    "requiredRole": [
      "authenticated"
    ],
    "parent": "/support",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/support/tickets",
    "module": "support",
    "pageName": "Support Tickets",
    "pageType": "page",
    "requiredRole": [
      "authenticated"
    ],
    "parent": "/support",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/support/knowledge-base",
    "module": "support",
    "pageName": "Knowledge Base",
    "pageType": "page",
    "requiredRole": [
      "authenticated"
    ],
    "parent": "/support",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/support/contact",
    "module": "support",
    "pageName": "Support Contact",
    "pageType": "page",
    "requiredRole": [
      "authenticated"
    ],
    "parent": "/support",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/support/status",
    "module": "support",
    "pageName": "Support Status",
    "pageType": "page",
    "requiredRole": [
      "authenticated"
    ],
    "parent": "/support",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/support/tickets/:id",
    "module": "support",
    "pageName": "Support Ticket Detail",
    "pageType": "detail",
    "requiredRole": [
      "authenticated"
    ],
    "parent": "/support/tickets",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/notifications",
    "module": "notifications",
    "pageName": "Notifications",
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
    "route": "/notifications/all",
    "module": "notifications",
    "pageName": "All Notifications",
    "pageType": "page",
    "requiredRole": [
      "authenticated"
    ],
    "parent": "/notifications",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/notifications/unread",
    "module": "notifications",
    "pageName": "Unread Notifications",
    "pageType": "page",
    "requiredRole": [
      "authenticated"
    ],
    "parent": "/notifications",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/notifications/security",
    "module": "notifications",
    "pageName": "Security Notifications",
    "pageType": "page",
    "requiredRole": [
      "authenticated"
    ],
    "parent": "/notifications",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/notifications/incidents",
    "module": "notifications",
    "pageName": "Incident Notifications",
    "pageType": "page",
    "requiredRole": [
      "authenticated"
    ],
    "parent": "/notifications",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/notifications/approvals",
    "module": "notifications",
    "pageName": "Approval Notifications",
    "pageType": "page",
    "requiredRole": [
      "authenticated"
    ],
    "parent": "/notifications",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/notifications/system",
    "module": "notifications",
    "pageName": "System Notifications",
    "pageType": "page",
    "requiredRole": [
      "authenticated"
    ],
    "parent": "/notifications",
    "authentication": true,
    "organizationScope": true,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/search",
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
    "route": "/401",
    "module": "system",
    "pageName": "Unauthorized",
    "pageType": "error",
    "requiredRole": [],
    "parent": null,
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/error",
    "module": "system",
    "pageName": "Error",
    "pageType": "error",
    "requiredRole": [],
    "parent": null,
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/maintenance",
    "module": "system",
    "pageName": "Maintenance",
    "pageType": "error",
    "requiredRole": [],
    "parent": null,
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/offline",
    "module": "system",
    "pageName": "Offline",
    "pageType": "error",
    "requiredRole": [],
    "parent": null,
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/access-denied",
    "module": "system",
    "pageName": "Access Denied",
    "pageType": "error",
    "requiredRole": [],
    "parent": null,
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/session-expired",
    "module": "system",
    "pageName": "Session Expired",
    "pageType": "error",
    "requiredRole": [],
    "parent": null,
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/403",
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
    "route": "/404",
    "module": "system",
    "pageName": "Not Found",
    "pageType": "error",
    "requiredRole": [],
    "parent": null,
    "authentication": false,
    "organizationScope": false,
    "governmentScope": false,
    "adminScope": false
  },
  {
    "route": "/500",
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
