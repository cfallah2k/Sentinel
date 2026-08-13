export function systemNav(id: string) {
  return [
    { href: `/ai-systems/${id}`, label: 'Overview' },
    { href: `/ai-systems/${id}/details`, label: 'Details' },
    { href: `/ai-systems/${id}/models`, label: 'Models' },
    { href: `/ai-systems/${id}/providers`, label: 'Providers' },
    { href: `/ai-systems/${id}/data`, label: 'Data' },
    { href: `/ai-systems/${id}/data-flows`, label: 'Data Flows' },
    { href: `/ai-systems/${id}/policies`, label: 'Policies' },
    { href: `/ai-systems/${id}/risk`, label: 'Risk' },
    { href: `/ai-systems/${id}/approvals`, label: 'Approvals' },
    { href: `/ai-systems/${id}/incidents`, label: 'Incidents' },
    { href: `/ai-systems/${id}/activity`, label: 'Activity' },
    { href: `/ai-systems/${id}/audit`, label: 'Audit' },
    { href: `/ai-systems/${id}/passport`, label: 'Passport' },
    { href: `/ai-systems/${id}/settings`, label: 'Settings' }
  ];
}

export function appNav(id: string) {
  return [
    { href: `/applications/${id}`, label: 'Overview' },
    { href: `/applications/${id}/details`, label: 'Details' },
    { href: `/applications/${id}/ai-systems`, label: 'AI Systems' },
    { href: `/applications/${id}/providers`, label: 'Providers' },
    { href: `/applications/${id}/data`, label: 'Data' },
    { href: `/applications/${id}/data-flows`, label: 'Data Flows' },
    { href: `/applications/${id}/policies`, label: 'Policies' },
    { href: `/applications/${id}/api-keys`, label: 'API Keys' },
    { href: `/applications/${id}/incidents`, label: 'Incidents' },
    { href: `/applications/${id}/activity`, label: 'Activity' },
    { href: `/applications/${id}/audit`, label: 'Audit' },
    { href: `/applications/${id}/settings`, label: 'Settings' }
  ];
}

export function providerNav(id: string) {
  return [
    { href: `/providers/${id}`, label: 'Overview' },
    { href: `/providers/${id}/overview`, label: 'Profile' },
    { href: `/providers/${id}/models`, label: 'Models' },
    { href: `/providers/${id}/usage`, label: 'Usage' },
    { href: `/providers/${id}/data`, label: 'Data' },
    { href: `/providers/${id}/policies`, label: 'Policies' },
    { href: `/providers/${id}/risk`, label: 'Risk' },
    { href: `/providers/${id}/incidents`, label: 'Incidents' },
    { href: `/providers/${id}/activity`, label: 'Activity' },
    { href: `/providers/${id}/audit`, label: 'Audit' },
    { href: `/providers/${id}/settings`, label: 'Settings' }
  ];
}

export function modelNav(id: string) {
  return [
    { href: `/models/${id}`, label: 'Overview' },
    { href: `/models/${id}/overview`, label: 'Profile' },
    { href: `/models/${id}/provider`, label: 'Provider' },
    { href: `/models/${id}/usage`, label: 'Usage' },
    { href: `/models/${id}/data`, label: 'Data' },
    { href: `/models/${id}/policies`, label: 'Policies' },
    { href: `/models/${id}/risk`, label: 'Risk' },
    { href: `/models/${id}/activity`, label: 'Activity' },
    { href: `/models/${id}/audit`, label: 'Audit' }
  ];
}

export function sourceNav(id: string) {
  return [
    { href: `/data-sources/${id}`, label: 'Overview' },
    { href: `/data-sources/${id}/overview`, label: 'Profile' },
    { href: `/data-sources/${id}/schema`, label: 'Schema' },
    { href: `/data-sources/${id}/data-categories`, label: 'Categories' },
    { href: `/data-sources/${id}/ai-systems`, label: 'AI Systems' },
    { href: `/data-sources/${id}/data-flows`, label: 'Data Flows' },
    { href: `/data-sources/${id}/policies`, label: 'Policies' },
    { href: `/data-sources/${id}/risk`, label: 'Risk' },
    { href: `/data-sources/${id}/activity`, label: 'Activity' },
    { href: `/data-sources/${id}/audit`, label: 'Audit' },
    { href: `/data-sources/${id}/settings`, label: 'Settings' }
  ];
}