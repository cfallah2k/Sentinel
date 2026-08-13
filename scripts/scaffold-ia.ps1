# Sentinel frontend information-architecture scaffolder.
# Creates a placeholder page.tsx for every route in the page inventory
# (sections 1-37) using the existing PlaceholderPage component convention.
# Idempotent: existing page.tsx files are left untouched.

$ErrorActionPreference = 'Stop'
$web = 'D:\Sentinel\apps\web'
$root = Join-Path $web 'app'
$placeholderComponent = 'components/placeholder-page'

# --- Inventory -------------------------------------------------------------
# Each entry: @{ Group = route group dir (under app/); Path = segments string; Title; Desc }
$script:routes = New-Object System.Collections.Generic.List[object]

function Add-Route($group, $path, $title, $desc) {
  $script:routes.Add([pscustomobject]@{ Group = $group; Path = $path; Title = $title; Desc = $desc })
}

# 1. PUBLIC WEBSITE
$mk = '(marketing)'
$public = @(
  @('/about', 'About', 'Sentinel — AI Data Governance & Control Infrastructure. About the company and mission.'),
  @('/solutions', 'Solutions', 'Solutions overview covering enterprise, government, security, privacy, compliance, and developer use cases.'),
  @('/solutions/enterprise', 'Enterprise Solutions', 'AI governance for enterprise organizations.'),
  @('/solutions/government', 'Government Solutions', 'AI governance for government organizations and agencies.'),
  @('/solutions/security', 'Security Solutions', 'Security team controls for AI and data flows.'),
  @('/solutions/privacy', 'Privacy Solutions', 'Privacy team controls for AI and data handling.'),
  @('/solutions/compliance', 'Compliance Solutions', 'Compliance team tooling for frameworks and audits.'),
  @('/solutions/developers', 'Developer Solutions', 'Developer tools, API, SDKs, and gateway integration.'),
  @('/product', 'Product', 'Sentinel product overview.'),
  @('/product/ai-governance', 'AI Governance', 'AI Governance product module.'),
  @('/product/ai-gateway', 'AI Gateway', 'AI Gateway product module.'),
  @('/product/data-classification', 'Data Classification', 'Data Classification product module.'),
  @('/product/policy-engine', 'Policy Engine', 'Policy Engine product module.'),
  @('/product/data-flow', 'Data Flow', 'Data Flow product module.'),
  @('/product/audit', 'Audit', 'Audit product module.'),
  @('/product/ai-passport', 'AI Passport', 'AI Passport product module.'),
  @('/product/incidents', 'Incidents', 'Incidents product module.'),
  @('/product/approvals', 'Approvals', 'Approvals product module.'),
  @('/integrations', 'Integrations', 'Integrations catalog and supported connectcors.'),
  @('/security', 'Security', 'Security at Sentinel — practices, certifications, and architecture.'),
  @('/trust', 'Trust Center', 'Sentinel trust center.'),
  @('/compliance', 'Compliance', 'Compliance program and supported frameworks.'),
  @('/pricing', 'Pricing', 'Pricing plans for B2B, enterprise, and government.'),
  @('/resources', 'Resources', 'Resources — guides, whitepapers, and webinars.'),
  @('/docs', 'Documentation', 'Product documentation.'),
  @('/blog', 'Blog', 'Sentinel blog.'),
  @('/contact', 'Contact', 'Contact Sentinel.'),
  @('/request-demo', 'Request a Demo', 'Request a Sentinel demo.'),
  @('/get-started', 'Get Started', 'Get started with Sentinel.'),
  @('/status', 'System Status', 'Real-time system status and incidents.'),
  @('/careers', 'Careers', 'Careers at Sentinel.'),
  @('/legal/privacy', 'Privacy Policy', 'Sentinel privacy policy.'),
  @('/legal/terms', 'Terms of Service', 'Sentinel terms of service.'),
  @('/legal/cookies', 'Cookie Policy', 'Sentinel cookie policy.'),
  @('/legal/security', 'Security Policy', 'Sentinel security policy and disclosures.')
)
foreach ($r in $public) { Add-Route $mk $r[0] $r[1] $r[2] }

# 2. AUTHENTICATION
$auth = '(auth)'
$authRoutes = @(
  @('/login', 'Sign In', 'Email, SSO, SAML, OIDC, Google, and Microsoft sign-in.'),
  @('/register', 'Create Account', 'Register a new Sentinel account.'),
  @('/verify-email', 'Verify Email', 'Verify your email address.'),
  @('/forgot-password', 'Forgot Password', 'Request a password reset link.'),
  @('/reset-password', 'Reset Password', 'Set a new password using a reset token.'),
  @('/accept-invitation', 'Accept Invitation', 'Accept a team or organization invitation.'),
  @('/mfa', 'Multi-Factor Authentication', 'MFA entry point.'),
  @('/mfa/setup', 'Set Up MFA', 'Enroll an MFA factor.'),
  @('/mfa/verify', 'Verify MFA', 'Verify an MFA challenge.'),
  @('/logout', 'Sign Out', 'Sign out of Sentinel.'),
  @('/auth/error', 'Authentication Error', 'Authentication error handler.')
)
# /auth/error uses a non-grouped path; keep inside (auth) group with path '/auth/error'.
foreach ($r in $authRoutes) { Add-Route $auth $r[0] $r[1] $r[2] }

# 3. ONBOARDING
$ob = '(app)'
$onb = @(
  @('/onboarding', 'Onboarding', 'Organization onboarding entry point.'),
  @('/onboarding/organization', 'Create Organization', 'Define the organization.'),
  @('/onboarding/profile', 'Your Profile', 'Set up your personal profile.'),
  @('/onboarding/industry', 'Industry', 'Select your industry.'),
  @('/onboarding/use-case', 'Use Case', 'Describe your primary use case.'),
  @('/onboarding/team', 'Invite Team', 'Invite teammates and assign roles.'),
  @('/onboarding/security', 'Security Setup', 'Configure initial security settings.'),
  @('/onboarding/data-classification', 'Data Classification', 'Set up initial data classification taxonomy.'),
  @('/onboarding/policies', 'Policies', 'Configure starter policies.'),
  @('/onboarding/ai-providers', 'AI Providers', 'Connect approved AI providers.'),
  @('/onboarding/applications', 'Applications', 'Register first applications.'),
  @('/onboarding/api', 'API Access', 'Generate first API keys.'),
  @('/onboarding/integrations', 'Integrations', 'Connect initial integrations.'),
  @('/onboarding/complete', 'Onboarding Complete', 'Finish onboarding.')
)
foreach ($r in $onb) { Add-Route $ob $r[0] $r[1] $r[2] }

# 4. MAIN DASHBOARD
$dash = @(
  @('/dashboard', 'Dashboard', 'Organization dashboard home.'),
  @('/dashboard/overview', 'Overview', 'Activity, risk, AI usage, and data-flow summary.'),
  @('/dashboard/activity', 'Activity', 'Recent organization activity.'),
  @('/dashboard/risk', 'Risk Summary', 'Risk posture across AI systems, data flows, and policies.'),
  @('/dashboard/ai-usage', 'AI Usage', 'AI usage trends across providers and models.'),
  @('/dashboard/data-flow', 'Data Flow', 'Live and recent data flow.'),
  @('/dashboard/incidents', 'Incidents', 'Open and recent incidents.'),
  @('/dashboard/policies', 'Policies', 'Active and violated policies.'),
  @('/dashboard/compliance', 'Compliance', 'Compliance posture across frameworks.'),
  @('/dashboard/approvals', 'Approvals', 'Pending and recent approvals.')
)
foreach ($r in $dash) { Add-Route $ob $r[0] $r[1] $r[2] }

# 5. AI SYSTEM MANAGEMENT
$ai = @(
  @('/ai-systems', 'AI Systems', 'All AI systems.'),
  @('/ai-systems/discover', 'Discover AI Systems', 'Discovered and shadow AI systems.'),
  @('/ai-systems/registered', 'Registered AI Systems', 'Registered AI systems.'),
  @('/ai-systems/pending', 'Pending AI Systems', 'Pending review AI systems.'),
  @('/ai-systems/approved', 'Approved AI Systems', 'Approved AI systems.'),
  @('/ai-systems/rejected', 'Rejected AI Systems', 'Rejected AI systems.'),
  @('/ai-systems/high-risk', 'High-Risk AI Systems', 'High-risk AI systems.'),
  @('/ai-systems/create', 'Create AI System', 'Register a new AI system.'),
  @('/ai-systems/import', 'Import AI Systems', 'Bulk import AI systems.'),
  @('/ai-systems/[id]', 'AI System', 'Individual AI system overview.'),
  @('/ai-systems/[id]/overview', 'AI System Overview', 'Overview for an individual AI system.'),
  @('/ai-systems/[id]/details', 'AI System Details', 'Details for an individual AI system.'),
  @('/ai-systems/[id]/owner', 'AI System Owner', 'Owner and accountability for an AI system.'),
  @('/ai-systems/[id]/models', 'AI System Models', 'Models used by an AI system.'),
  @('/ai-systems/[id]/providers', 'AI System Providers', 'Providers used by an AI system.'),
  @('/ai-systems/[id]/data', 'AI System Data', 'Data accessed by an AI system.'),
  @('/ai-systems/[id]/data-flows', 'AI System Data Flows', 'Data flows related to an AI system.'),
  @('/ai-systems/[id]/policies', 'AI System Policies', 'Policies applied to an AI system.'),
  @('/ai-systems/[id]/risk', 'AI System Risk', 'Risk profile for an AI system.'),
  @('/ai-systems/[id]/approvals', 'AI System Approvals', 'Approvals associated with an AI system.'),
  @('/ai-systems/[id]/incidents', 'AI System Incidents', 'Incidents related to an AI system.'),
  @('/ai-systems/[id]/activity', 'AI System Activity', 'Activity stream for an AI system.'),
  @('/ai-systems/[id]/audit', 'AI System Audit', 'Audit trail for an AI system.'),
  @('/ai-systems/[id]/passport', 'AI System Passport', 'AI Data Passport for an AI system.'),
  @('/ai-systems/[id]/settings', 'AI System Settings', 'Settings for an AI system.')
)
foreach ($r in $ai) { Add-Route $ob $r[0] $r[1] $r[2] }

# 6. APPLICATION REGISTRY
$apps = @(
  @('/applications', 'Applications', 'All applications.'),
  @('/applications/create', 'Create Application', 'Register a new application.'),
  @('/applications/import', 'Import Applications', 'Bulk import applications.'),
  @('/applications/discovered', 'Discovered Applications', 'Discovered applications not yet registered.'),
  @('/applications/approved', 'Approved Applications', 'Approved applications.'),
  @('/applications/archived', 'Archived Applications', 'Archived applications.'),
  @('/applications/[id]', 'Application', 'Individual application overview.'),
  @('/applications/[id]/overview', 'Application Overview', 'Overview for an individual application.'),
  @('/applications/[id]/details', 'Application Details', 'Details for an individual application.'),
  @('/applications/[id]/ai-systems', 'Application AI Systems', 'AI systems used by an application.'),
  @('/applications/[id]/providers', 'Application Providers', 'Providers used by an application.'),
  @('/applications/[id]/data', 'Application Data', 'Data accessed by an application.'),
  @('/applications/[id]/data-flows', 'Application Data Flows', 'Data flows related to an application.'),
  @('/applications/[id]/policies', 'Application Policies', 'Policies applied to an application.'),
  @('/applications/[id]/api-keys', 'Application API Keys', 'API keys issued to an application.'),
  @('/applications/[id]/activity', 'Application Activity', 'Activity stream for an application.'),
  @('/applications/[id]/incidents', 'Application Incidents', 'Incidents related to an application.'),
  @('/applications/[id]/audit', 'Application Audit', 'Audit trail for an application.'),
  @('/applications/[id]/settings', 'Application Settings', 'Settings for an application.')
)
foreach ($r in $apps) { Add-Route $ob $r[0] $r[1] $r[2] }

# 7. AI PROVIDERS
$prov = @(
  @('/providers', 'AI Providers', 'All AI providers.'),
  @('/providers/discover', 'Discover Providers', 'Discover available providers.'),
  @('/providers/approved', 'Approved Providers', 'Approved providers.'),
  @('/providers/pending', 'Pending Providers', 'Pending approval providers.'),
  @('/providers/restricted', 'Restricted Providers', 'Restricted providers.'),
  @('/providers/create', 'Create Provider', 'Register a new provider.'),
  @('/providers/import', 'Import Providers', 'Bulk import providers.'),
  @('/providers/[id]', 'Provider', 'Individual provider overview.'),
  @('/providers/[id]/overview', 'Provider Overview', 'Overview for an individual provider.'),
  @('/providers/[id]/models', 'Provider Models', 'Models offered by a provider.'),
  @('/providers/[id]/data', 'Provider Data', 'Data handling by a provider.'),
  @('/providers/[id]/policies', 'Provider Policies', 'Policies applied to a provider.'),
  @('/providers/[id]/risk', 'Provider Risk', 'Risk profile for a provider.'),
  @('/providers/[id]/usage', 'Provider Usage', 'Usage metrics for a provider.'),
  @('/providers/[id]/activity', 'Provider Activity', 'Activity stream for a provider.'),
  @('/providers/[id]/incidents', 'Provider Incidents', 'Incidents related to a provider.'),
  @('/providers/[id]/audit', 'Provider Audit', 'Audit trail for a provider.'),
  @('/providers/[id]/settings', 'Provider Settings', 'Settings for a provider.')
)
foreach ($r in $prov) { Add-Route $ob $r[0] $r[1] $r[2] }

# 8. MODEL REGISTRY
$mod = @(
  @('/models', 'Models', 'All AI models.'),
  @('/models/discover', 'Discover Models', 'Discover available models.'),
  @('/models/approved', 'Approved Models', 'Approved models.'),
  @('/models/restricted', 'Restricted Models', 'Restricted models.'),
  @('/models/create', 'Create Model', 'Register a new model.'),
  @('/models/import', 'Import Models', 'Bulk import models.'),
  @('/models/[id]', 'Model', 'Individual model overview.'),
  @('/models/[id]/overview', 'Model Overview', 'Overview for an individual model.'),
  @('/models/[id]/provider', 'Model Provider', 'Provider for an individual model.'),
  @('/models/[id]/risk', 'Model Risk', 'Risk profile for a model.'),
  @('/models/[id]/data', 'Model Data', 'Data handling by a model.'),
  @('/models/[id]/policies', 'Model Policies', 'Policies applied to a model.'),
  @('/models/[id]/usage', 'Model Usage', 'Usage metrics for a model.'),
  @('/models/[id]/activity', 'Model Activity', 'Activity stream for a model.'),
  @('/models/[id]/audit', 'Model Audit', 'Audit trail for a model.')
)
foreach ($r in $mod) { Add-Route $ob $r[0] $r[1] $r[2] }

# 9. DATA SOURCES
$ds = @(
  @('/data-sources', 'Data Sources', 'All data sources.'),
  @('/data-sources/discover', 'Discover Data Sources', 'Discovered data sources.'),
  @('/data-sources/connected', 'Connected Data Sources', 'Connected data sources.'),
  @('/data-sources/pending', 'Pending Data Sources', 'Pending data sources.'),
  @('/data-sources/restricted', 'Restricted Data Sources', 'Restricted data sources.'),
  @('/data-sources/create', 'Create Data Source', 'Connect a new data source.'),
  @('/data-sources/import', 'Import Data Sources', 'Bulk import data sources.'),
  @('/data-sources/[id]', 'Data Source', 'Individual data source overview.'),
  @('/data-sources/[id]/overview', 'Data Source Overview', 'Overview for an individual data source.'),
  @('/data-sources/[id]/schema', 'Data Source Schema', 'Schema for a data source.'),
  @('/data-sources/[id]/data-categories', 'Data Source Data Categories', 'Data categories within a data source.'),
  @('/data-sources/[id]/ai-systems', 'Data Source AI Systems', 'AI systems accessing a data source.'),
  @('/data-sources/[id]/data-flows', 'Data Source Data Flows', 'Data flows from a data source.'),
  @('/data-sources/[id]/policies', 'Data Source Policies', 'Policies applied to a data source.'),
  @('/data-sources/[id]/risk', 'Data Source Risk', 'Risk profile for a data source.'),
  @('/data-sources/[id]/activity', 'Data Source Activity', 'Activity stream for a data source.'),
  @('/data-sources/[id]/audit', 'Data Source Audit', 'Audit trail for a data source.'),
  @('/data-sources/[id]/settings', 'Data Source Settings', 'Settings for a data source.')
)
foreach ($r in $ds) { Add-Route $ob $r[0] $r[1] $r[2] }

# 10. DATA CLASSIFICATION
$dc = @(
  @('/data-classification', 'Data Classification', 'Data classification home.'),
  @('/data-classification/overview', 'Data Classification Overview', 'Classification posture overview.'),
  @('/data-classification/categories', 'Data Categories', 'Data categories taxonomy.'),
  @('/data-classification/types', 'Data Types', 'Data types taxonomy.'),
  @('/data-classification/sensitive-data', 'Sensitive Data', 'Sensitive data inventory.'),
  @('/data-classification/detectors', 'Detectors', 'Classification detectors.'),
  @('/data-classification/rules', 'Classification Rules', 'Classification rules.'),
  @('/data-classification/custom', 'Custom Classifications', 'Custom classifications.'),
  @('/data-classification/create', 'Create Classification', 'Create a new classification.'),
  @('/data-classification/test', 'Test Classification', 'Test classification rules against samples.'),
  @('/data-classification/[id]', 'Classification', 'Individual classification overview.'),
  @('/data-classification/[id]/overview', 'Classification Overview', 'Overview for a classification.'),
  @('/data-classification/[id]/rules', 'Classification Rules', 'Rules for a classification.'),
  @('/data-classification/[id]/detectors', 'Classification Detectors', 'Detectors for a classification.'),
  @('/data-classification/[id]/usage', 'Classification Usage', 'Usage of a classification.'),
  @('/data-classification/[id]/activity', 'Classification Activity', 'Activity stream for a classification.'),
  @('/data-classification/[id]/settings', 'Classification Settings', 'Settings for a classification.')
)
foreach ($r in $dc) { Add-Route $ob $r[0] $r[1] $r[2] }

# 11. DATA FLOW
$df = @(
  @('/data-flows', 'Data Flows', 'Data flows home.'),
  @('/data-flows/overview', 'Data Flow Overview', 'Data flow posture overview.'),
  @('/data-flows/live', 'Live Data Flows', 'Live data flows.'),
  @('/data-flows/map', 'Data Flow Map', 'Visual data flow map.'),
  @('/data-flows/sources', 'Data Flow Sources', 'Data flow sources.'),
  @('/data-flows/destinations', 'Data Flow Destinations', 'Data flow destinations.'),
  @('/data-flows/external', 'External Data Flows', 'External data flows.'),
  @('/data-flows/internal', 'Internal Data Flows', 'Internal data flows.'),
  @('/data-flows/high-risk', 'High-Risk Data Flows', 'High-risk data flows.'),
  @('/data-flows/blocked', 'Blocked Data Flows', 'Blocked data flows.'),
  @('/data-flows/recent', 'Recent Data Flows', 'Recent data flows.'),
  @('/data-flows/[id]', 'Data Flow', 'Individual data flow overview.'),
  @('/data-flows/[id]/overview', 'Data Flow Overview', 'Overview for an individual data flow.'),
  @('/data-flows/[id]/source', 'Data Flow Source', 'Source for a data flow.'),
  @('/data-flows/[id]/destination', 'Data Flow Destination', 'Destination for a data flow.'),
  @('/data-flows/[id]/data', 'Data Flow Data', 'Data involved in a data flow.'),
  @('/data-flows/[id]/policies', 'Data Flow Policies', 'Policies evaluated against a data flow.'),
  @('/data-flows/[id]/risk', 'Data Flow Risk', 'Risk profile for a data flow.'),
  @('/data-flows/[id]/activity', 'Data Flow Activity', 'Activity stream for a data flow.'),
  @('/data-flows/[id]/audit', 'Data Flow Audit', 'Audit trail for a data flow.')
)
foreach ($r in $df) { Add-Route $ob $r[0] $r[1] $r[2] }

# 12. POLICY MANAGEMENT
$pol = @(
  @('/policies', 'Policies', 'Policies home.'),
  @('/policies/overview', 'Policy Overview', 'Policy posture overview.'),
  @('/policies/active', 'Active Policies', 'Active policies.'),
  @('/policies/draft', 'Draft Policies', 'Draft policies.'),
  @('/policies/disabled', 'Disabled Policies', 'Disabled policies.'),
  @('/policies/violated', 'Violated Policies', 'Policies with recent violations.'),
  @('/policies/templates', 'Policy Templates', 'Reusable policy templates.'),
  @('/policies/create', 'Create Policy', 'Create a new policy.'),
  @('/policies/import', 'Import Policies', 'Bulk import policies.'),
  @('/policies/simulator', 'Policy Simulator', 'Simulate policy evaluation against samples.'),
  @('/policies/test', 'Policy Test', 'Test policy evaluation against samples.'),
  @('/policies/[id]', 'Policy', 'Individual policy overview.'),
  @('/policies/[id]/overview', 'Policy Overview', 'Overview for a policy.'),
  @('/policies/[id]/rules', 'Policy Rules', 'Rules for a policy.'),
  @('/policies/[id]/conditions', 'Policy Conditions', 'Conditions for a policy.'),
  @('/policies/[id]/actions', 'Policy Actions', 'Actions enforced by a policy.'),
  @('/policies/[id]/scope', 'Policy Scope', 'Scope of a policy.'),
  @('/policies/[id]/exceptions', 'Policy Exceptions', 'Exceptions to a policy.'),
  @('/policies/[id]/versions', 'Policy Versions', 'Version history for a policy.'),
  @('/policies/[id]/simulation', 'Policy Simulation', 'Simulation results for a policy.'),
  @('/policies/[id]/activity', 'Policy Activity', 'Activity stream for a policy.'),
  @('/policies/[id]/violations', 'Policy Violations', 'Violations for a policy.'),
  @('/policies/[id]/audit', 'Policy Audit', 'Audit trail for a policy.'),
  @('/policies/[id]/settings', 'Policy Settings', 'Settings for a policy.')
)
foreach ($r in $pol) { Add-Route $ob $r[0] $r[1] $r[2] }

# 13. SENTINEL AI GATEWAY
$gw = @(
  @('/gateway', 'AI Gateway', 'Sentinel AI Gateway home.'),
  @('/gateway/overview', 'Gateway Overview', 'Gateway posture overview.'),
  @('/gateway/requests', 'Gateway Requests', 'All gateway requests.'),
  @('/gateway/live', 'Live Requests', 'Live gateway requests.'),
  @('/gateway/allowed', 'Allowed Requests', 'Allowed requests.'),
  @('/gateway/blocked', 'Blocked Requests', 'Blocked requests.'),
  @('/gateway/redacted', 'Redacted Requests', 'Redacted requests.'),
  @('/gateway/approval-required', 'Approval-Required Requests', 'Requests requiring approval.'),
  @('/gateway/errors', 'Gateway Errors', 'Gateway error requests.'),
  @('/gateway/providers', 'Gateway Providers', 'Providers routed through the gateway.'),
  @('/gateway/models', 'Gateway Models', 'Models routed through the gateway.'),
  @('/gateway/applications', 'Gateway Applications', 'Applications routed through the gateway.'),
  @('/gateway/api-keys', 'Gateway API Keys', 'Gateway API keys.'),
  @('/gateway/webhooks', 'Gateway Webhooks', 'Gateway webhooks.'),
  @('/gateway/configuration', 'Gateway Configuration', 'Gateway configuration.'),
  @('/gateway/logs', 'Gateway Logs', 'Gateway logs.'),
  @('/gateway/requests/[id]', 'Gateway Request', 'Individual gateway request overview.'),
  @('/gateway/requests/[id]/overview', 'Request Overview', 'Overview for a gateway request.'),
  @('/gateway/requests/[id]/data', 'Request Data', 'Data involved in a gateway request.'),
  @('/gateway/requests/[id]/classification', 'Request Classification', 'Classification result for a gateway request.'),
  @('/gateway/requests/[id]/policy', 'Request Policy', 'Policy decisions for a gateway request.'),
  @('/gateway/requests/[id]/decision', 'Request Decision', 'Decision for a gateway request.'),
  @('/gateway/requests/[id]/provider', 'Request Provider', 'Provider for a gateway request.'),
  @('/gateway/requests/[id]/audit', 'Request Audit', 'Audit trail for a gateway request.')
)
foreach ($r in $gw) { Add-Route $ob $r[0] $r[1] $r[2] }

# 14. INCIDENT MANAGEMENT
$inc = @(
  @('/incidents', 'Incidents', 'Incidents home.'),
  @('/incidents/overview', 'Incident Overview', 'Incident posture overview.'),
  @('/incidents/open', 'Open Incidents', 'Open incidents.'),
  @('/incidents/investigating', 'Investigating Incidents', 'Incidents under investigation.'),
  @('/incidents/resolved', 'Resolved Incidents', 'Resolved incidents.'),
  @('/incidents/critical', 'Critical Incidents', 'Critical-severity incidents.'),
  @('/incidents/high', 'High-Severity Incidents', 'High-severity incidents.'),
  @('/incidents/policy-violations', 'Policy Violation Incidents', 'Incidents from policy violations.'),
  @('/incidents/data-exposure', 'Data Exposure Incidents', 'Data exposure incidents.'),
  @('/incidents/ai-risk', 'AI Risk Incidents', 'AI risk incidents.'),
  @('/incidents/create', 'Create Incident', 'Report a new incident.'),
  @('/incidents/[id]', 'Incident', 'Individual incident overview.'),
  @('/incidents/[id]/overview', 'Incident Overview', 'Overview for an incident.'),
  @('/incidents/[id]/timeline', 'Incident Timeline', 'Timeline for an incident.'),
  @('/incidents/[id]/evidence', 'Incident Evidence', 'Evidence for an incident.'),
  @('/incidents/[id]/data', 'Incident Data', 'Data involved in an incident.'),
  @('/incidents/[id]/policy', 'Incident Policy', 'Policy context for an incident.'),
  @('/incidents/[id]/ai-system', 'Incident AI System', 'AI system involved in an incident.'),
  @('/incidents/[id]/application', 'Incident Application', 'Application involved in an incident.'),
  @('/incidents/[id]/assignments', 'Incident Assignments', 'Assignments for an incident.'),
  @('/incidents/[id]/comments', 'Incident Comments', 'Comments on an incident.'),
  @('/incidents/[id]/actions', 'Incident Actions', 'Actions taken on an incident.'),
  @('/incidents/[id]/resolution', 'Incident Resolution', 'Resolution for an incident.'),
  @('/incidents/[id]/audit', 'Incident Audit', 'Audit trail for an incident.')
)
foreach ($r in $inc) { Add-Route $ob $r[0] $r[1] $r[2] }

# 15. APPROVAL MANAGEMENT
$appr = @(
  @('/approvals', 'Approvals', 'Approvals home.'),
  @('/approvals/overview', 'Approval Overview', 'Approval posture overview.'),
  @('/approvals/pending', 'Pending Approvals', 'Pending approval requests.'),
  @('/approvals/approved', 'Approved Requests', 'Approved requests.'),
  @('/approvals/denied', 'Denied Requests', 'Denied requests.'),
  @('/approvals/expired', 'Expired Requests', 'Expired approval requests.'),
  @('/approvals/my-approvals', 'My Approvals', 'Approval requests assigned to me.'),
  @('/approvals/create', 'Create Approval Request', 'Submit a new approval request.'),
  @('/approvals/[id]', 'Approval', 'Individual approval overview.'),
  @('/approvals/[id]/overview', 'Approval Overview', 'Overview for an approval.'),
  @('/approvals/[id]/request', 'Approval Request', 'Request details for an approval.'),
  @('/approvals/[id]/data', 'Approval Data', 'Data involved in an approval.'),
  @('/approvals/[id]/policy', 'Approval Policy', 'Policy context for an approval.'),
  @('/approvals/[id]/history', 'Approval History', 'History for an approval.'),
  @('/approvals/[id]/audit', 'Approval Audit', 'Audit trail for an approval.')
)
foreach ($r in $appr) { Add-Route $ob $r[0] $r[1] $r[2] }

# 16. AI DATA PASSPORT
$pp = @(
  @('/ai-passports', 'AI Passports', 'AI Data Passports home.'),
  @('/ai-passports/overview', 'Passport Overview', 'Passport posture overview.'),
  @('/ai-passports/all', 'All Passports', 'All AI Data Passports.'),
  @('/ai-passports/approved', 'Approved Passports', 'Approved passports.'),
  @('/ai-passports/pending', 'Pending Passports', 'Pending passports.'),
  @('/ai-passports/high-risk', 'High-Risk Passports', 'High-risk passports.'),
  @('/ai-passports/create', 'Create Passport', 'Create a new AI Data Passport.'),
  @('/ai-passports/import', 'Import Passports', 'Bulk import passports.'),
  @('/ai-passports/[id]', 'AI Data Passport', 'Individual passport overview.'),
  @('/ai-passports/[id]/overview', 'Passport Overview', 'Overview for an individual passport.'),
  @('/ai-passports/[id]/identity', 'Passport Identity', 'Identity of an AI Data Passport.'),
  @('/ai-passports/[id]/purpose', 'Passport Purpose', 'Purpose of an AI Data Passport.'),
  @('/ai-passports/[id]/models', 'Passport Models', 'Models covered by a passport.'),
  @('/ai-passports/[id]/providers', 'Passport Providers', 'Providers covered by a passport.'),
  @('/ai-passports/[id]/data', 'Passport Data', 'Data covered by a passport.'),
  @('/ai-passports/[id]/risk', 'Passport Risk', 'Risk profile for a passport.'),
  @('/ai-passports/[id]/controls', 'Passport Controls', 'Controls for a passport.'),
  @('/ai-passports/[id]/approvals', 'Passport Approvals', 'Approvals for a passport.'),
  @('/ai-passports/[id]/audit', 'Passport Audit', 'Audit trail for a passport.'),
  @('/ai-passports/[id]/export', 'Export Passport', 'Export a passport.')
)
foreach ($r in $pp) { Add-Route $ob $r[0] $r[1] $r[2] }

# 17. RISK MANAGEMENT
$risk = @(
  @('/risk', 'Risk', 'Risk management home.'),
  @('/risk/overview', 'Risk Overview', 'Risk posture overview.'),
  @('/risk/ai-systems', 'AI System Risk', 'Risk across AI systems.'),
  @('/risk/applications', 'Application Risk', 'Risk across applications.'),
  @('/risk/providers', 'Provider Risk', 'Risk across providers.'),
  @('/risk/models', 'Model Risk', 'Risk across models.'),
  @('/risk/data', 'Data Risk', 'Risk across data assets.'),
  @('/risk/data-flows', 'Data Flow Risk', 'Risk across data flows.'),
  @('/risk/policies', 'Policy Risk', 'Risk from policy coverage gaps.'),
  @('/risk/incidents', 'Incident Risk', 'Risk from incidents.'),
  @('/risk/high-risk', 'High-Risk Items', 'High-risk items across the organization.'),
  @('/risk/assessments', 'Risk Assessments', 'Risk assessments.'),
  @('/risk/create-assessment', 'Create Risk Assessment', 'Create a new risk assessment.'),
  @('/risk/assessments/[id]', 'Risk Assessment', 'Individual risk assessment overview.'),
  @('/risk/assessments/[id]/overview', 'Assessment Overview', 'Overview for a risk assessment.'),
  @('/risk/assessments/[id]/questions', 'Assessment Questions', 'Questions for a risk assessment.'),
  @('/risk/assessments/[id]/evidence', 'Assessment Evidence', 'Evidence for a risk assessment.'),
  @('/risk/assessments/[id]/findings', 'Assessment Findings', 'Findings for a risk assessment.'),
  @('/risk/assessments/[id]/actions', 'Assessment Actions', 'Remediation actions for a risk assessment.'),
  @('/risk/assessments/[id]/report', 'Assessment Report', 'Report for a risk assessment.')
)
foreach ($r in $risk) { Add-Route $ob $r[0] $r[1] $r[2] }

# 18. COMPLIANCE
$comp = @(
  @('/compliance', 'Compliance', 'Compliance home.'),
  @('/compliance/overview', 'Compliance Overview', 'Compliance posture overview.'),
  @('/compliance/frameworks', 'Frameworks', 'Supported compliance frameworks.'),
  @('/compliance/requirements', 'Requirements', 'Compliance requirements.'),
  @('/compliance/controls', 'Controls', 'Compliance controls.'),
  @('/compliance/evidence', 'Evidence', 'Compliance evidence.'),
  @('/compliance/gaps', 'Gaps', 'Compliance gaps.'),
  @('/compliance/findings', 'Findings', 'Compliance findings.'),
  @('/compliance/remediation', 'Remediation', 'Compliance remediation plans.'),
  @('/compliance/audits', 'Audits', 'Compliance audits.'),
  @('/compliance/reports', 'Compliance Reports', 'Compliance reports.'),
  @('/compliance/frameworks/[id]', 'Framework', 'Individual framework overview.'),
  @('/compliance/frameworks/[id]/overview', 'Framework Overview', 'Overview for a framework.'),
  @('/compliance/frameworks/[id]/requirements', 'Framework Requirements', 'Requirements for a framework.'),
  @('/compliance/frameworks/[id]/controls', 'Framework Controls', 'Controls for a framework.'),
  @('/compliance/frameworks/[id]/evidence', 'Framework Evidence', 'Evidence for a framework.'),
  @('/compliance/frameworks/[id]/gaps', 'Framework Gaps', 'Gaps for a framework.'),
  @('/compliance/frameworks/[id]/report', 'Framework Report', 'Report for a framework.')
)
foreach ($r in $comp) { Add-Route $ob $r[0] $r[1] $r[2] }

# 19. AUDIT CENTER
$aud = @(
  @('/audit', 'Audit Center', 'Audit center home.'),
  @('/audit/overview', 'Audit Overview', 'Audit posture overview.'),
  @('/audit/logs', 'Audit Logs', 'All audit logs.'),
  @('/audit/security', 'Security Events', 'Security audit events.'),
  @('/audit/data-access', 'Data Access Events', 'Data access audit events.'),
  @('/audit/ai-activity', 'AI Activity Events', 'AI activity audit events.'),
  @('/audit/policy-events', 'Policy Events', 'Policy audit events.'),
  @('/audit/admin-events', 'Admin Events', 'Administrative audit events.'),
  @('/audit/authentication', 'Authentication Events', 'Authentication audit events.'),
  @('/audit/api', 'API Events', 'API audit events.'),
  @('/audit/export', 'Audit Export', 'Export audit logs.'),
  @('/audit/[id]', 'Audit Event', 'Individual audit event overview.'),
  @('/audit/[id]/overview', 'Audit Event Overview', 'Overview for an audit event.'),
  @('/audit/[id]/context', 'Audit Event Context', 'Context for an audit event.'),
  @('/audit/[id]/actor', 'Audit Event Actor', 'Actor for an audit event.'),
  @('/audit/[id]/resource', 'Audit Event Resource', 'Resource for an audit event.'),
  @('/audit/[id]/timeline', 'Audit Event Timeline', 'Timeline for an audit event.')
)
foreach ($r in $aud) { Add-Route $ob $r[0] $r[1] $r[2] }

# 20. REPORTING
$rep = @(
  @('/reports', 'Reports', 'Reports home.'),
  @('/reports/overview', 'Reports Overview', 'Reporting overview.'),
  @('/reports/security', 'Security Reports', 'Security reports.'),
  @('/reports/ai-governance', 'AI Governance Reports', 'AI governance reports.'),
  @('/reports/data-governance', 'Data Governance Reports', 'Data governance reports.'),
  @('/reports/compliance', 'Compliance Reports', 'Compliance reports.'),
  @('/reports/incidents', 'Incident Reports', 'Incident reports.'),
  @('/reports/policies', 'Policy Reports', 'Policy reports.'),
  @('/reports/usage', 'Usage Reports', 'Usage reports.'),
  @('/reports/risk', 'Risk Reports', 'Risk reports.'),
  @('/reports/custom', 'Custom Reports', 'Custom reports.'),
  @('/reports/scheduled', 'Scheduled Reports', 'Scheduled reports.'),
  @('/reports/templates', 'Report Templates', 'Report templates.'),
  @('/reports/create', 'Create Report', 'Create a new report.'),
  @('/reports/[id]', 'Report', 'Individual report overview.'),
  @('/reports/[id]/preview', 'Report Preview', 'Preview for a report.'),
  @('/reports/[id]/data', 'Report Data', 'Data for a report.'),
  @('/reports/[id]/schedule', 'Report Schedule', 'Schedule for a report.'),
  @('/reports/[id]/recipients', 'Report Recipients', 'Recipients for a report.'),
  @('/reports/[id]/history', 'Report History', 'History for a report.')
)
foreach ($r in $rep) { Add-Route $ob $r[0] $r[1] $r[2] }

# 21. INTEGRATIONS
$intg = @(
  @('/integrations', 'Integrations', 'Integrations home.'),
  @('/integrations/overview', 'Integrations Overview', 'Integrations overview.'),
  @('/integrations/ai-providers', 'AI Provider Integrations', 'AI provider integrations.'),
  @('/integrations/cloud', 'Cloud Integrations', 'Cloud provider integrations.'),
  @('/integrations/databases', 'Database Integrations', 'Database integrations.'),
  @('/integrations/security', 'Security Integrations', 'Security tool integrations.'),
  @('/integrations/identity', 'Identity Integrations', 'Identity provider integrations.'),
  @('/integrations/siem', 'SIEM Integrations', 'SIEM integrations.'),
  @('/integrations/monitoring', 'Monitoring Integrations', 'Monitoring integrations.'),
  @('/integrations/developer-tools', 'Developer Tool Integrations', 'Developer tool integrations.'),
  @('/integrations/webhooks', 'Webhooks', 'Outbound webhook integrations.'),
  @('/integrations/custom', 'Custom Integrations', 'Custom integrations.'),
  @('/integrations/[id]', 'Integration', 'Individual integration overview.'),
  @('/integrations/[id]/overview', 'Integration Overview', 'Overview for an integration.'),
  @('/integrations/[id]/configuration', 'Integration Configuration', 'Configuration for an integration.'),
  @('/integrations/[id]/credentials', 'Integration Credentials', 'Credentials for an integration.'),
  @('/integrations/[id]/events', 'Integration Events', 'Events for an integration.'),
  @('/integrations/[id]/logs', 'Integration Logs', 'Logs for an integration.'),
  @('/integrations/[id]/settings', 'Integration Settings', 'Settings for an integration.')
)
foreach ($r in $intg) { Add-Route $ob $r[0] $r[1] $r[2] }

# 22. API & DEVELOPER CENTER
$dev = @(
  @('/developers', 'Developer Center', 'Developer center home.'),
  @('/developers/overview', 'Developer Overview', 'Developer center overview.'),
  @('/developers/api', 'API Reference', 'Sentinel API reference.'),
  @('/developers/api-keys', 'API Keys', 'API keys.'),
  @('/developers/service-accounts', 'Service Accounts', 'Service accounts.'),
  @('/developers/webhooks', 'Webhooks', 'Developer webhooks.'),
  @('/developers/sdks', 'SDKs', 'SDKs.'),
  @('/developers/logs', 'Developer Logs', 'Developer-facing API logs.'),
  @('/developers/testing', 'Testing', 'API testing tools.'),
  @('/developers/sandbox', 'Sandbox', 'API sandbox environment.'),
  @('/developers/changelog', 'Changelog', 'API and developer center changelog.'),
  @('/developers/api-keys/[id]', 'API Key', 'Individual API key.'),
  @('/developers/service-accounts/[id]', 'Service Account', 'Individual service account.'),
  @('/developers/webhooks/[id]', 'Webhook', 'Individual webhook.')
)
foreach ($r in $dev) { Add-Route $ob $r[0] $r[1] $r[2] }

# 23. TEAM MANAGEMENT
$team = @(
  @('/team', 'Team', 'Team management home.'),
  @('/team/members', 'Members', 'Team members.'),
  @('/team/invitations', 'Invitations', 'Pending team invitations.'),
  @('/team/roles', 'Roles', 'Defined roles.'),
  @('/team/permissions', 'Permissions', 'Permission matrix.'),
  @('/team/groups', 'Groups', 'Team groups.'),
  @('/team/service-accounts', 'Team Service Accounts', 'Team service accounts.'),
  @('/team/access-requests', 'Access Requests', 'Access requests.'),
  @('/team/members/[id]', 'Member', 'Individual team member.'),
  @('/team/roles/[id]', 'Role', 'Individual role.')
)
foreach ($r in $team) { Add-Route $ob $r[0] $r[1] $r[2] }

# 24. ORGANIZATION SETTINGS
$set = @(
  @('/settings', 'Settings', 'Organization settings home.'),
  @('/settings/general', 'General Settings', 'General organization settings.'),
  @('/settings/organization', 'Organization', 'Organization profile.'),
  @('/settings/security', 'Security Settings', 'Security settings.'),
  @('/settings/authentication', 'Authentication', 'Authentication settings.'),
  @('/settings/mfa', 'MFA', 'MFA settings.'),
  @('/settings/sso', 'SSO', 'Single sign-on settings.'),
  @('/settings/domains', 'Domains', 'Verified domains.'),
  @('/settings/roles', 'Roles', 'Roles configuration.'),
  @('/settings/permissions', 'Permissions', 'Permissions configuration.'),
  @('/settings/notifications', 'Notifications', 'Notification preferences.'),
  @('/settings/email', 'Email', 'Email delivery settings.'),
  @('/settings/webhooks', 'Webhooks', 'Outbound webhook settings.'),
  @('/settings/api', 'API', 'API access settings.'),
  @('/settings/data', 'Data', 'Data settings.'),
  @('/settings/data-retention', 'Data Retention', 'Data retention policy.'),
  @('/settings/privacy', 'Privacy', 'Privacy controls.'),
  @('/settings/audit', 'Audit Settings', 'Audit settings.'),
  @('/settings/integrations', 'Integrations Settings', 'Integrations settings.'),
  @('/settings/developer', 'Developer Settings', 'Developer settings.'),
  @('/settings/billing', 'Billing Settings', 'Billing settings.'),
  @('/settings/usage', 'Usage Settings', 'Usage settings.'),
  @('/settings/export', 'Data Export', 'Data export.'),
  @('/settings/danger-zone', 'Danger Zone', 'Destructive organization actions.')
)
foreach ($r in $set) { Add-Route $ob $r[0] $r[1] $r[2] }

# 25. BILLING
$bill = @(
  @('/billing', 'Billing', 'Billing home.'),
  @('/billing/overview', 'Billing Overview', 'Billing overview.'),
  @('/billing/plan', 'Plan', 'Current plan.'),
  @('/billing/usage', 'Usage', 'Billing usage.'),
  @('/billing/invoices', 'Invoices', 'Invoices.'),
  @('/billing/payment-methods', 'Payment Methods', 'Payment methods.'),
  @('/billing/subscription', 'Subscription', 'Subscription management.'),
  @('/billing/credits', 'Credits', 'Credits and balance.'),
  @('/billing/limits', 'Limits', 'Usage limits.'),
  @('/billing/upgrade', 'Upgrade', 'Upgrade plan.'),
  @('/billing/downgrade', 'Downgrade', 'Downgrade plan.'),
  @('/billing/invoices/[id]', 'Invoice', 'Individual invoice.')
)
foreach ($r in $bill) { Add-Route $ob $r[0] $r[1] $r[2] }

# 34. SUPPORT
$sup = @(
  @('/support', 'Support', 'Support home.'),
  @('/support/overview', 'Support Overview', 'Support overview.'),
  @('/support/tickets', 'Support Tickets', 'Support tickets.'),
  @('/support/knowledge-base', 'Knowledge Base', 'Knowledge base.'),
  @('/support/contact', 'Contact Support', 'Contact support.'),
  @('/support/status', 'Support Status', 'Support status.'),
  @('/support/tickets/[id]', 'Support Ticket', 'Individual support ticket.')
)
foreach ($r in $sup) { Add-Route $ob $r[0] $r[1] $r[2] }

# 35. NOTIFICATIONS
$notif = @(
  @('/notifications', 'Notifications', 'Notifications home.'),
  @('/notifications/all', 'All Notifications', 'All notifications.'),
  @('/notifications/unread', 'Unread Notifications', 'Unread notifications.'),
  @('/notifications/security', 'Security Notifications', 'Security notifications.'),
  @('/notifications/incidents', 'Incident Notifications', 'Incident notifications.'),
  @('/notifications/approvals', 'Approval Notifications', 'Approval notifications.'),
  @('/notifications/system', 'System Notifications', 'System notifications.')
)
foreach ($r in $notif) { Add-Route $ob $r[0] $r[1] $r[2] }

# 36. SEARCH
Add-Route $ob '/search' 'Search' 'Global search across AI systems, applications, providers, models, policies, incidents, approvals, data sources, data flows, users, audit events, and reports.'

# 37. ERROR / SYSTEM PAGES
$err = @(
  @('/404', 'Not Found', 'The requested page could not be found.'),
  @('/403', 'Forbidden', 'You do not have access to this page.'),
  @('/401', 'Unauthorized', 'You must be signed in to view this page.'),
  @('/500', 'Server Error', 'An unexpected server error occurred.'),
  @('/error', 'Error', 'An unexpected error occurred.'),
  @('/maintenance', 'Maintenance', 'Sentinel is under maintenance.'),
  @('/offline', 'Offline', 'You are offline.'),
  @('/access-denied', 'Access Denied', 'Access denied.'),
  @('/session-expired', 'Session Expired', 'Your session has expired.')
)
foreach ($r in $err) { Add-Route $ob $r[0] $r[1] $r[2] }

# 26. GOVERNMENT DASHBOARD
$gov = '(government)'
$govRoot = @(
  @('/government', 'Government', 'Government dashboard home.'),
  @('/government/overview', 'Government Overview', 'Government-wide overview.'),
  @('/government/organizations', 'Government Organizations', 'Government organizations.'),
  @('/government/agencies', 'Government Agencies', 'Government agencies.'),
  @('/government/ai-registry', 'AI Registry', 'Government AI registry.'),
  @('/government/ai-systems', 'Government AI Systems', 'Government AI systems.'),
  @('/government/providers', 'Government Providers', 'Government AI providers.'),
  @('/government/models', 'Government Models', 'Government AI models.'),
  @('/government/risk', 'Government Risk', 'Government risk posture.'),
  @('/government/incidents', 'Government Incidents', 'Government incidents.'),
  @('/government/policies', 'Government Policies', 'Government policies.'),
  @('/government/compliance', 'Government Compliance', 'Government compliance.'),
  @('/government/audits', 'Government Audits', 'Government audits.'),
  @('/government/reports', 'Government Reports', 'Government reports.'),
  @('/government/approvals', 'Government Approvals', 'Government approvals.'),
  @('/government/standards', 'Government Standards', 'Government AI standards.'),
  @('/government/frameworks', 'Government Frameworks', 'Government frameworks.'),
  @('/government/alerts', 'Government Alerts', 'Government alerts.'),
  @('/government/analytics', 'Government Analytics', 'Government analytics.')
)
foreach ($r in $govRoot) { Add-Route $gov $r[0] $r[1] $r[2] }

# 27. GOVERNMENT ORGANIZATION MANAGEMENT
$govOrg = @(
  @('/government/organizations/[id]', 'Government Organization', 'Individual government organization overview.'),
  @('/government/organizations/[id]/overview', 'Organization Overview', 'Overview for a government organization.'),
  @('/government/organizations/[id]/agencies', 'Organization Agencies', 'Agencies within a government organization.'),
  @('/government/organizations/[id]/ai-systems', 'Organization AI Systems', 'AI systems within a government organization.'),
  @('/government/organizations/[id]/providers', 'Organization Providers', 'Providers used by a government organization.'),
  @('/government/organizations/[id]/models', 'Organization Models', 'Models used by a government organization.'),
  @('/government/organizations/[id]/data', 'Organization Data', 'Data handled by a government organization.'),
  @('/government/organizations/[id]/risk', 'Organization Risk', 'Risk posture for a government organization.'),
  @('/government/organizations/[id]/incidents', 'Organization Incidents', 'Incidents for a government organization.'),
  @('/government/organizations/[id]/compliance', 'Organization Compliance', 'Compliance for a government organization.'),
  @('/government/organizations/[id]/audit', 'Organization Audit', 'Audit trail for a government organization.'),
  @('/government/organizations/[id]/reports', 'Organization Reports', 'Reports for a government organization.')
)
foreach ($r in $govOrg) { Add-Route $gov $r[0] $r[1] $r[2] }

# 28. GOVERNMENT AGENCY MANAGEMENT
$govAg = @(
  @('/government/agencies/[id]', 'Government Agency', 'Individual agency overview.'),
  @('/government/agencies/[id]/overview', 'Agency Overview', 'Overview for a government agency.'),
  @('/government/agencies/[id]/ai-systems', 'Agency AI Systems', 'AI systems within an agency.'),
  @('/government/agencies/[id]/applications', 'Agency Applications', 'Applications within an agency.'),
  @('/government/agencies/[id]/providers', 'Agency Providers', 'Providers used by an agency.'),
  @('/government/agencies/[id]/data', 'Agency Data', 'Data handled by an agency.'),
  @('/government/agencies/[id]/risk', 'Agency Risk', 'Risk posture for an agency.'),
  @('/government/agencies/[id]/incidents', 'Agency Incidents', 'Incidents for an agency.'),
  @('/government/agencies/[id]/compliance', 'Agency Compliance', 'Compliance for an agency.'),
  @('/government/agencies/[id]/audit', 'Agency Audit', 'Audit trail for an agency.'),
  @('/government/agencies/[id]/reports', 'Agency Reports', 'Reports for an agency.')
)
foreach ($r in $govAg) { Add-Route $gov $r[0] $r[1] $r[2] }

# 29. GOVERNMENT AI REGISTRY
$govReg = @(
  @('/government/ai-registry/all', 'All AI Records', 'All government AI records.'),
  @('/government/ai-registry/approved', 'Approved AI Records', 'Approved AI records.'),
  @('/government/ai-registry/pending', 'Pending AI Records', 'Pending AI records.'),
  @('/government/ai-registry/restricted', 'Restricted AI Records', 'Restricted AI records.'),
  @('/government/ai-registry/high-risk', 'High-Risk AI Records', 'High-risk AI records.'),
  @('/government/ai-registry/expired', 'Expired AI Records', 'Expired AI records.'),
  @('/government/ai-registry/review-required', 'Review Required', 'AI records requiring review.'),
  @('/government/ai-registry/[id]', 'AI Record', 'Individual government AI record overview.'),
  @('/government/ai-registry/[id]/overview', 'AI Record Overview', 'Overview for a government AI record.'),
  @('/government/ai-registry/[id]/operator', 'AI Record Operator', 'Operator for a government AI record.'),
  @('/government/ai-registry/[id]/purpose', 'AI Record Purpose', 'Purpose for a government AI record.'),
  @('/government/ai-registry/[id]/data', 'AI Record Data', 'Data handling for a government AI record.'),
  @('/government/ai-registry/[id]/provider', 'AI Record Provider', 'Provider for a government AI record.'),
  @('/government/ai-registry/[id]/risk', 'AI Record Risk', 'Risk profile for a government AI record.'),
  @('/government/ai-registry/[id]/compliance', 'AI Record Compliance', 'Compliance for a government AI record.'),
  @('/government/ai-registry/[id]/audit', 'AI Record Audit', 'Audit trail for a government AI record.')
)
foreach ($r in $govReg) { Add-Route $gov $r[0] $r[1] $r[2] }

# 30. GOVERNMENT POLICY CENTER
$govPol = @(
  @('/government/policies/overview', 'Government Policy Overview', 'Government policy overview.'),
  @('/government/policies/active', 'Active Government Policies', 'Active government policies.'),
  @('/government/policies/draft', 'Draft Government Policies', 'Draft government policies.'),
  @('/government/policies/templates', 'Government Policy Templates', 'Government policy templates.'),
  @('/government/policies/violations', 'Government Policy Violations', 'Government policy violations.'),
  @('/government/policies/create', 'Create Government Policy', 'Create a government policy.'),
  @('/government/policies/simulator', 'Government Policy Simulator', 'Simulate a government policy.'),
  @('/government/policies/[id]', 'Government Policy', 'Individual government policy overview.'),
  @('/government/policies/[id]/overview', 'Government Policy Overview', 'Overview for a government policy.'),
  @('/government/policies/[id]/rules', 'Government Policy Rules', 'Rules for a government policy.'),
  @('/government/policies/[id]/scope', 'Government Policy Scope', 'Scope for a government policy.'),
  @('/government/policies/[id]/exceptions', 'Government Policy Exceptions', 'Exceptions for a government policy.'),
  @('/government/policies/[id]/versions', 'Government Policy Versions', 'Versions for a government policy.'),
  @('/government/policies/[id]/violations', 'Government Policy Violations', 'Violations for a government policy.'),
  @('/government/policies/[id]/audit', 'Government Policy Audit', 'Audit trail for a government policy.')
)
foreach ($r in $govPol) { Add-Route $gov $r[0] $r[1] $r[2] }

# 31. PLATFORM ADMIN DASHBOARD
$adm = '(admin)'
$adRoot = @(
  @('/admin', 'Platform Admin', 'Platform administration home.'),
  @('/admin/overview', 'Admin Overview', 'Platform admin overview.'),
  @('/admin/organizations', 'Organizations', 'All customer organizations.'),
  @('/admin/users', 'Users', 'All platform users.'),
  @('/admin/subscriptions', 'Subscriptions', 'All subscriptions.'),
  @('/admin/billing', 'Billing', 'Platform billing.'),
  @('/admin/usage', 'Usage', 'Platform usage.'),
  @('/admin/ai-systems', 'AI Systems', 'All AI systems across the platform.'),
  @('/admin/providers', 'Providers', 'All providers across the platform.'),
  @('/admin/models', 'Models', 'All models across the platform.'),
  @('/admin/incidents', 'Incidents', 'All platform incidents.'),
  @('/admin/security', 'Security', 'Platform security.'),
  @('/admin/audit', 'Audit', 'Platform audit.'),
  @('/admin/system', 'System', 'System operations entry.'),
  @('/admin/infrastructure', 'Infrastructure', 'Platform infrastructure.'),
  @('/admin/jobs', 'Jobs', 'Background jobs.'),
  @('/admin/queues', 'Queues', 'Queue status.'),
  @('/admin/feature-flags', 'Feature Flags', 'Feature flags.'),
  @('/admin/configuration', 'Configuration', 'Platform configuration.'),
  @('/admin/support', 'Support', 'Platform support.'),
  @('/admin/announcements', 'Announcements', 'Platform announcements.')
)
foreach ($r in $adRoot) { Add-Route $adm $r[0] $r[1] $r[2] }

# 32. PLATFORM ADMIN ORGANIZATIONS
$adOrg = @(
  @('/admin/organizations/[id]', 'Organization', 'Individual organization overview (admin).'),
  @('/admin/organizations/[id]/overview', 'Organization Overview', 'Overview for an organization (admin).'),
  @('/admin/organizations/[id]/users', 'Organization Users', 'Users within an organization (admin).'),
  @('/admin/organizations/[id]/subscription', 'Organization Subscription', 'Subscription for an organization (admin).'),
  @('/admin/organizations/[id]/usage', 'Organization Usage', 'Usage for an organization (admin).'),
  @('/admin/organizations/[id]/security', 'Organization Security', 'Security posture for an organization (admin).'),
  @('/admin/organizations/[id]/activity', 'Organization Activity', 'Activity for an organization (admin).'),
  @('/admin/organizations/[id]/audit', 'Organization Audit', 'Audit trail for an organization (admin).')
)
foreach ($r in $adOrg) { Add-Route $adm $r[0] $r[1] $r[2] }

# 33. SYSTEM OPERATIONS
$adSys = @(
  @('/admin/system/health', 'System Health', 'System health.'),
  @('/admin/system/services', 'Services', 'System services.'),
  @('/admin/system/database', 'Database', 'Database status.'),
  @('/admin/system/cache', 'Cache', 'Cache status.'),
  @('/admin/system/queues', 'System Queues', 'System queue status.'),
  @('/admin/system/workers', 'Workers', 'Worker status.'),
  @('/admin/system/providers', 'System Providers', 'System provider connectivity.'),
  @('/admin/system/storage', 'Storage', 'Storage status.'),
  @('/admin/system/metrics', 'Metrics', 'System metrics.'),
  @('/admin/system/logs', 'System Logs', 'System logs.')
)
foreach ($r in $adSys) { Add-Route $adm $r[0] $r[1] $r[2] }

# --- Scaffold --------------------------------------------------------------

function Get-ImportDepth($groupDir, $segments) {
  # path to page file relative to app/; counts segments from file up to app/ root, plus 1 for components/
  # depth = number of '..' needed to go from file's folder to app/, plus 1 to reach web root, plus 'components/...'
  # Simpler: depth = (segmentCount) + 1   where segmentCount includes groupDir + all path segments
  $segCount = 1 + (($segments -split '/' | Where-Object { $_ -ne '' }).Count)
  return $segCount + 1
}

$created = 0
$skipped = 0
$log = New-Object System.Collections.Generic.List[string]

foreach ($r in $script:routes) {
  $group = $r.Group
  $path  = $r.Path
  $title = $r.Title
  $desc  = $r.Desc
  $url   = $path

  $segments = $path -split '/' | Where-Object { $_ -ne '' }
  $relDir  = Join-Path $group ($segments -join '\')
  $absDir   = Join-Path $root $relDir
  $pageFile = Join-Path $absDir 'page.tsx'

  if (Test-Path -LiteralPath $pageFile) {
    $skipped++
    continue
  }

  New-Item -ItemType Directory -Path $absDir -Force | Out-Null

  $depth = Get-ImportDepth $group $path
  $relImport = '../' * $depth | ForEach-Object { $_ }   # build string of '../' repeated $depth times
  $relImport = ''
  for ($i = 0; $i -lt $depth; $i++) { $relImport += '../' }
  $importPath = $relImport + $placeholderComponent

  $escapedTitle = $title -replace "'", "''"
  $escapedDesc  = $desc  -replace "'", "''"

  $content = "import PlaceholderPage from '" + $importPath + "';`n`nexport default function Page() {`n  return <PlaceholderPage title={" + "'" + $escapedTitle + "'" + "} description={" + '"' + $escapedDesc + '"' + "} />;`n}`n"

  Set-Content -LiteralPath $pageFile -Value $content -Encoding UTF8 -NoNewline
  Add-Content  -LiteralPath $pageFile -Value "`n" -Encoding UTF8
  $log.Add("created: app/" + ($relDir -replace '\\','/') + "/page.tsx  ->  $url")
  $created++
}

Write-Output ("Created: " + $created)
Write-Output ("Skipped (already existed): " + $skipped)
Write-Output ("Total inventory routes: " + $script:routes.Count)
$log | Sort-Object | ForEach-Object { Write-Output $_ }
