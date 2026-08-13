import { StepperForm } from '@/components/registry/form-steps';

const sources = ['CSV manifest', 'Gateway telemetry export', 'OpenAI-compatible endpoint scan', 'Cloud metadata API'];

export default function Page() {
  return (
    <StepperForm
      eyebrow="Registry · AI Systems"
      title="Import AI System"
      description="Bulk-import AI system records from a manifest, telemetry export or discovery scan."
      backHref="/ai-systems"
      submitLabel="Run Import"
      steps={[
        {
          title: 'Source',
          description: 'Choose where the system records are imported from.',
          fields: [
            { name: 'source', label: 'Import Source', type: 'select', required: true, options: sources },
            { name: 'location', label: 'File or Endpoint', type: 'text', required: true, placeholder: 's3://... or https://...' }
          ]
        },
        {
          title: 'Mapping',
          description: 'Define how source fields map to registry attributes.',
          fields: [
            { name: 'idField', label: 'Identifier Field', type: 'text', required: true, defaultValue: 'system_id' },
            { name: 'nameField', label: 'Name Field', type: 'text', required: true, defaultValue: 'display_name' },
            { name: 'ownerField', label: 'Owner Field', type: 'text', required: true, defaultValue: 'owner_email' }
          ]
        },
        {
          title: 'Defaults',
          description: 'Apply defaults for attributes missing from the source.',
          fields: [
            { name: 'environment', label: 'Default Environment', type: 'select', required: true, options: ['Production', 'Staging', 'Development'] },
            { name: 'oversight', label: 'Default Oversight', type: 'select', required: true, options: ['Human', 'Automated', 'Supervised'] },
            { name: 'status', label: 'Initial Status', type: 'select', required: true, options: ['Registered', 'Pending'], defaultValue: 'Registered' }
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