import { StepperForm } from '@/components/registry/form-steps';
import { aiSystems, classificationCategories, models, providers } from '@/lib/mock-data';

const types = ['LLM', 'Agent', 'Assistant', 'Chatbot', 'Copilot', 'Decision', 'Embedding', 'Vision'];
const environments = ['Production', 'Staging', 'Development'];
const oversight = ['Human', 'Automated', 'Supervised'];

export default function Page() {
  return (
    <StepperForm
      eyebrow="Registry · AI Systems"
      title="Register AI System"
      description="Onboard a new AI system into the registry. The record is submitted for governance approval after review."
      backHref="/ai-systems"
      submitLabel="Submit for Approval"
      steps={[
        {
          title: 'Identity',
          description: 'Describe the system and its primary purpose.',
          fields: [
            { name: 'name', label: 'System Name', type: 'text', required: true, placeholder: 'e.g. Atlas Support Copilot' },
            { name: 'type', label: 'System Type', type: 'select', required: true, options: types },
            { name: 'purpose', label: 'Purpose', type: 'textarea', required: true, placeholder: 'Describe what the system does with data' }
          ]
        },
        {
          title: 'Ownership',
          description: 'Assign an owner, environment and oversight model.',
          fields: [
            { name: 'owner', label: 'Owner', type: 'text', required: true, placeholder: 'Full name' },
            { name: 'environment', label: 'Environment', type: 'select', required: true, options: environments },
            { name: 'oversight', label: 'Oversight', type: 'select', required: true, options: oversight }
          ]
        },
        {
          title: 'Model & Data',
          description: 'Select the backing model, provider and data categories.',
          fields: [
            { name: 'model', label: 'Base Model', type: 'select', required: true, options: models.map((m) => m.name) },
            { name: 'provider', label: 'Provider', type: 'select', required: true, options: providers.map((p) => p.name) },
            { name: 'categories', label: 'Data Categories', type: 'select', required: true, options: classificationCategories.map((c) => c.name), defaultValue: 'INTERNAL' }
          ]
        },
        {
          title: 'Review',
          description: 'Confirm the registration details before submission.',
          fields: []
        }
      ]}
    />
  );
}