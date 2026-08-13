import { StepperForm } from '@/components/registry/form-steps';

const sources = ['CSV manifest', 'Provider catalog API', 'OpenAI-compatible models endpoint', 'Registry export'];

export default function Page() {
  return (
    <StepperForm
      eyebrow="Registry · Models"
      title="Import Models"
      description="Bulk-import model records from a provider catalog or manifest."
      backHref="/models"
      submitLabel="Run Import"
      steps={[
        {
          title: 'Source',
          description: 'Choose where model records are imported from.',
          fields: [
            { name: 'source', label: 'Import Source', type: 'select', required: true, options: sources },
            { name: 'location', label: 'File or Endpoint', type: 'text', required: true, placeholder: 's3://... or https://...' }
          ]
        },
        {
          title: 'Mapping',
          description: 'Define how source fields map to registry attributes.',
          fields: [
            { name: 'idField', label: 'Identifier Field', type: 'text', required: true, defaultValue: 'model_id' },
            { name: 'nameField', label: 'Name Field', type: 'text', required: true, defaultValue: 'id' },
            { name: 'modalityField', label: 'Modality Field', type: 'text', required: true, defaultValue: 'modality' }
          ]
        },
        {
          title: 'Defaults',
          description: 'Apply defaults for unrecorded attributes.',
          fields: [
            { name: 'status', label: 'Initial Status', type: 'select', required: true, options: ['Approved', 'Restricted'], defaultValue: 'Restricted' },
            { name: 'provider', label: 'Provider', type: 'text', required: true, placeholder: 'Provider id' }
          ]
        },
        {
          title: 'Review',
          description: 'Confirm the import configuration before running.',
          fields: []
        }
      ]}
    />
  );
}