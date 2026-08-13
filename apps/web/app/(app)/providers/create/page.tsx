import { StepperForm } from '@/components/registry/form-steps';
import { models } from '@/lib/mock-data';

const types = ['External', 'Cloud', 'Self-hosted', 'OpenAI-compatible', 'Custom'];
const regions = ['US', 'EU', 'US / EU', 'US / Global', 'US-East', 'Global'];

export default function Page() {
  return (
    <StepperForm
      eyebrow="Registry · Providers"
      title="Register Provider"
      description="Onboard a model provider for gateway routing. Approval is required before traffic is allowed."
      backHref="/providers"
      submitLabel="Submit for Approval"
      steps={[
        {
          title: 'Provider',
          description: 'Identify the provider and its deployment model.',
          fields: [
            { name: 'name', label: 'Provider Name', type: 'text', required: true, placeholder: 'e.g. OpenAI' },
            { name: 'type', label: 'Provider Type', type: 'select', required: true, options: types },
            { name: 'region', label: 'Data Residency', type: 'select', required: true, options: regions }
          ]
        },
        {
          title: 'Access',
          description: 'Configure endpoint and authentication details.',
          fields: [
            { name: 'endpoint', label: 'API Endpoint', type: 'text', required: true, placeholder: 'https://api.example.com/v1' },
            { name: 'auth', label: 'Authentication', type: 'select', required: true, options: ['API Key', 'OAuth 2.0', 'Service Account', 'MTLS'] }
          ]
        },
        {
          title: 'Models',
          description: 'Expose models from this provider.',
          fields: [
            { name: 'model', label: 'Primary Model', type: 'select', required: true, options: models.map((m) => m.name) },
            { name: 'compatible', label: 'OpenAI-compatible', type: 'select', required: true, options: ['Yes', 'No'] }
          ]
        },
        {
          title: 'Review',
          description: 'Confirm the provider details before submission.',
          fields: []
        }
      ]}
    />
  );
}