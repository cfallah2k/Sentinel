import { StepperForm } from '@/components/registry/form-steps';
import { providers } from '@/lib/mock-data';

const modalities = ['Text', 'Vision', 'Audio', 'Embedding', 'Multimodal'];
const contexts = ['4k', '8k', '32k', '128k', '200k', '1M'];

export default function Page() {
  return (
    <StepperForm
      eyebrow="Registry · Models"
      title="Register Model"
      description="Add a model to the gateway catalog under an approved provider."
      backHref="/models"
      submitLabel="Submit for Approval"
      steps={[
        {
          title: 'Model',
          description: 'Identify the model and its capabilities.',
          fields: [
            { name: 'name', label: 'Model Name', type: 'text', required: true, placeholder: 'e.g. gpt-4.1' },
            { name: 'modality', label: 'Modality', type: 'select', required: true, options: modalities },
            { name: 'context', label: 'Context Window', type: 'select', required: true, options: contexts }
          ]
        },
        {
          title: 'Provider',
          description: 'Attach the model to a provider.',
          fields: [
            { name: 'provider', label: 'Provider', type: 'select', required: true, options: providers.map((p) => p.name) },
            { name: 'pricing', label: 'Pricing', type: 'text', required: true, placeholder: 'e.g. $2.00 / 1M in' }
          ]
        },
        {
          title: 'Governance',
          description: 'Set approval and risk expectations.',
          fields: [
            { name: 'status', label: 'Initial Status', type: 'select', required: true, options: ['Approved', 'Restricted'], defaultValue: 'Restricted' },
            { name: 'risk', label: 'Risk Level', type: 'select', required: true, options: ['Low', 'Medium', 'High'], defaultValue: 'Medium' }
          ]
        },
        {
          title: 'Review',
          description: 'Confirm the model details before submission.',
          fields: []
        }
      ]}
    />
  );
}