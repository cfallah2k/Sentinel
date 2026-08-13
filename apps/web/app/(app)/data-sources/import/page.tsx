import { StepperForm } from '@/components/registry/form-steps';

const sources = ['CSV manifest', 'Cloud account scan', 'Network telemetry export', 'Data catalog API'];

export default function Page() {
  return (
    <StepperForm
      eyebrow="Registry · Data Sources"
      title="Import Data Sources"
      description="Bulk-import data source records from a manifest or discovery scan."
      backHref="/data-sources"
      submitLabel="Run Import"
      steps={[
        {
          title: 'Source',
          description: 'Choose where source records are imported from.',
          fields: [
            { name: 'source', label: 'Import Source', type: 'select', required: true, options: sources },
            { name: 'location', label: 'File or Endpoint', type: 'text', required: true, placeholder: 's3://... or https://...' }
          ]
        },
        {
          title: 'Mapping',
          description: 'Define how source fields map to registry attributes.',
          fields: [
            { name: 'idField', label: 'Identifier Field', type: 'text', required: true, defaultValue: 'source_id' },
            { name: 'nameField', label: 'Name Field', type: 'text', required: true, defaultValue: 'name' },
            { name: 'connectorField', label: 'Connector Field', type: 'text', required: true, defaultValue: 'engine' }
          ]
        },
        {
          title: 'Defaults',
          description: 'Apply defaults for unrecorded attributes.',
          fields: [
            { name: 'status', label: 'Initial Status', type: 'select', required: true, options: ['Connected', 'Pending', 'Restricted'], defaultValue: 'Pending' },
            { name: 'risk', label: 'Default Risk', type: 'select', required: true, options: ['Low', 'Medium', 'High'], defaultValue: 'Medium' }
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