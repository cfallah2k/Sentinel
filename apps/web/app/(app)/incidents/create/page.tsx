import { StepperForm } from '@/components/registry/form-steps';
import { aiSystems, policies } from '@/lib/mock-data';

const severities = ['Critical', 'High', 'Medium', 'Low'];
const types = ['Policy Violation', 'Data Exposure', 'AI Risk', 'Anomaly'];

export default function Page() {
  return (
    <StepperForm
      eyebrow="Enforcement · Incidents"
      title="Report Incident"
      description="Create an incident record. Severity and SLA are set during triage, and a responder is assigned on submission."
      backHref="/incidents"
      submitLabel="Open Incident"
      steps={[
        {
          title: 'Triage',
          description: 'Classify the event so it is routed to the right team.',
          fields: [
            { name: 'severity', label: 'Severity', type: 'select', required: true, options: severities },
            { name: 'type', label: 'Type', type: 'select', required: true, options: types },
            { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'e.g. PII transmitted to unapproved provider' }
          ]
        },
        {
          title: 'Description',
          description: 'Summarize what happened and the observed impact.',
          fields: [
            { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'What happened, when, and what data was involved' }
          ]
        },
        {
          title: 'Context',
          description: 'Link the affected AI system and any related policy.',
          fields: [
            { name: 'system', label: 'Affected AI System', type: 'select', required: true, options: aiSystems.map((s) => s.name) },
            { name: 'policy', label: 'Related Policy', type: 'select', options: policies.map((p) => p.name) }
          ]
        },
        {
          title: 'Review',
          description: 'Confirm the incident details before opening.',
          fields: []
        }
      ]}
    />
  );
}