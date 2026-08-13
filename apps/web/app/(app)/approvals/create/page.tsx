import { StepperForm } from '@/components/registry/form-steps';
import { aiSystems, policies } from '@/lib/mock-data';

const types = ['Policy Exception', 'High-Risk Request', 'New System', 'Data Access', 'Provider Access'];
const risks = ['Low', 'Medium', 'High', 'Critical'];

export default function Page() {
  return (
    <StepperForm
      eyebrow="Enforcement · Approvals"
      title="New Approval Request"
      description="Request access, an exception, or a new system. The request is routed to reviewers based on risk."
      backHref="/approvals"
      submitLabel="Submit Request"
      steps={[
        {
          title: 'Request',
          description: 'What are you asking for?',
          fields: [
            { name: 'type', label: 'Request Type', type: 'select', required: true, options: types },
            { name: 'risk', label: 'Risk Level', type: 'select', required: true, options: risks, defaultValue: 'Medium' }
          ]
        },
        {
          title: 'Context',
          description: 'Scope the request to a system and policy.',
          fields: [
            { name: 'system', label: 'AI System', type: 'select', required: true, options: aiSystems.map((s) => s.name) },
            { name: 'policy', label: 'Related Policy', type: 'select', options: policies.map((p) => p.name) }
          ]
        },
        {
          title: 'Justification',
          description: 'Explain why this request should be approved.',
          fields: [{ name: 'note', label: 'Justification', type: 'textarea', required: true, placeholder: 'Why is this access needed, and for how long?' }]
        },
        {
          title: 'Review',
          description: 'Confirm the request before submission.',
          fields: []
        }
      ]}
    />
  );
}