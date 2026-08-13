import { StepperForm } from '@/components/registry/form-steps';

const sources = ['CSV manifest', 'Gateway telemetry export', 'Cloud provider catalog', 'OpenAI-compatible registry scan'];

export default function Page() {
  return (
    <StepperForm
      eyebrow="Registry · Providers"
      title="Import Providers"
      description="Bulk-import provider records from a manifest or discovery scan."
      backHref="/providers"
      submitLabel="Run Import"
      steps={[
        {
          title: 'Source',
          description: 'Choose where provider records are imported from.',
          fields: [
            { name: 'source', label: 'Import Source', type: 'select', required: true, options: sources },
            { name: 'location', label: 'File or Endpoint', type: 'text', required: true, placeholder: 's3://... or https://...' }
          ]
        },
        {
          title: 'Mapping',
          description: 'Define how source fields map to registry attributes.',
          fields: [
            { name: 'idField', label: 'Identifier Field', type: 'text', required: true, defaultValue: 'provider_id' },
            { name: 'nameField', label: 'Name Field', type: 'text', required: true, defaultValue: 'name' },
            { name: 'regionField', label: 'Region Field', type: 'text', required: true, defaultValue: 'region' }
          ]
        },
        {
          title: 'Defaults',
          description: 'Apply defaults for unrecorded attributes.',
          fields: [
            { name: 'status', label: 'Initial Status', type: 'select', required: true, options: ['Approved', 'Pending', 'Restricted'], defaultValue: 'Pending' },
            { name: 'type', label: 'Default Type', type: 'select', required: true, options: ['External', 'Cloud', 'Self-hosted', 'OpenAI-compatible', 'Custom'] }
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