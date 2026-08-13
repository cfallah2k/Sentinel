import { StepperForm } from '@/components/registry/form-steps';

const sources = ['CSV manifest', 'Gateway telemetry export', 'Service catalog API', 'Configuration repository scan'];

export default function Page() {
  return (
    <StepperForm
      eyebrow="Registry · Applications"
      title="Import Applications"
      description="Bulk-import application records from a manifest or discovery scan."
      backHref="/applications"
      submitLabel="Run Import"
      steps={[
        {
          title: 'Source',
          description: 'Choose where application records are imported from.',
          fields: [
            { name: 'source', label: 'Import Source', type: 'select', required: true, options: sources },
            { name: 'location', label: 'File or Endpoint', type: 'text', required: true, placeholder: 's3://... or https://...' }
          ]
        },
        {
          title: 'Mapping',
          description: 'Define how source fields map to registry attributes.',
          fields: [
            { name: 'idField', label: 'Identifier Field', type: 'text', required: true, defaultValue: 'app_id' },
            { name: 'nameField', label: 'Name Field', type: 'text', required: true, defaultValue: 'name' },
            { name: 'ownerField', label: 'Owner Field', type: 'text', required: true, defaultValue: 'owner_email' }
          ]
        },
        {
          title: 'Defaults',
          description: 'Apply defaults for unrecorded attributes.',
          fields: [
            { name: 'environment', label: 'Default Environment', type: 'select', required: true, options: ['Production', 'Staging', 'Development'] },
            { name: 'status', label: 'Initial Status', type: 'select', required: true, options: ['Active', 'Discovered'], defaultValue: 'Discovered' }
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