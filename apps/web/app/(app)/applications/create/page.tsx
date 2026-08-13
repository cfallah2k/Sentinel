import { StepperForm } from '@/components/registry/form-steps';
import { aiSystems } from '@/lib/mock-data';

const types = ['Web App', 'Mobile App', 'AI Agent', 'Internal System', 'Automation'];
const environments = ['Production', 'Staging', 'Development'];

export default function Page() {
  return (
    <StepperForm
      eyebrow="Registry · Applications"
      title="Register Application"
      description="Onboard an application that consumes AI systems through the gateway."
      backHref="/applications"
      submitLabel="Submit for Approval"
      steps={[
        {
          title: 'Identity',
          description: 'Name the application and its category.',
          fields: [
            { name: 'name', label: 'Application Name', type: 'text', required: true, placeholder: 'e.g. Nexora Web Portal' },
            { name: 'type', label: 'Application Type', type: 'select', required: true, options: types },
            { name: 'environment', label: 'Environment', type: 'select', required: true, options: environments }
          ]
        },
        {
          title: 'Ownership',
          description: 'Assign an owner for the application.',
          fields: [
            { name: 'owner', label: 'Owner', type: 'text', required: true, placeholder: 'Full name' }
          ]
        },
        {
          title: 'AI Systems',
          description: 'Attach AI systems this application will consume.',
          fields: [
            { name: 'system', label: 'Primary AI System', type: 'select', required: true, options: aiSystems.map((s) => s.name) },
            { name: 'usage', label: 'Expected Usage', type: 'textarea', placeholder: 'Describe expected request volume and data categories' }
          ]
        },
        {
          title: 'Review',
          description: 'Confirm the application details before submission.',
          fields: []
        }
      ]}
    />
  );
}