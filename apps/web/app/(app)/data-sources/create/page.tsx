import { StepperForm } from '@/components/registry/form-steps';
import { classificationCategories } from '@/lib/mock-data';

const types = ['Database', 'Data Warehouse', 'Data Lake', 'SaaS', 'CRM', 'HRIS', 'Messaging', 'Streaming'];
const connectors = ['postgres', 'snowflake', 's3', 'salesforce', 'workday', 'slack', 'kafka', 'oracle', 'mysql', 'bigquery'];

export default function Page() {
  return (
    <StepperForm
      eyebrow="Registry · Data Sources"
      title="Register Data Source"
      description="Onboard a data source and classify its contents for gateway control."
      backHref="/data-sources"
      submitLabel="Submit for Approval"
      steps={[
        {
          title: 'Source',
          description: 'Identify the source and its connector.',
          fields: [
            { name: 'name', label: 'Source Name', type: 'text', required: true, placeholder: 'e.g. Customer PostgreSQL' },
            { name: 'type', label: 'Source Type', type: 'select', required: true, options: types },
            { name: 'connector', label: 'Connector', type: 'select', required: true, options: connectors }
          ]
        },
        {
          title: 'Access',
          description: 'Configure connection and sync settings.',
          fields: [
            { name: 'host', label: 'Host / Endpoint', type: 'text', required: true, placeholder: 'db.internal.nexora.io' },
            { name: 'auth', label: 'Authentication', type: 'select', required: true, options: ['Service Account', 'SSO', 'Static Credentials', 'MTLS'] },
            { name: 'sync', label: 'Sync Frequency', type: 'select', required: true, options: ['Real-time', 'Hourly', 'Daily', 'On-demand'] }
          ]
        },
        {
          title: 'Classification',
          description: 'Declare data categories for policy evaluation.',
          fields: [
            { name: 'categories', label: 'Data Category', type: 'select', required: true, options: classificationCategories.map((c) => c.name), defaultValue: 'INTERNAL' },
            { name: 'risk', label: 'Risk Level', type: 'select', required: true, options: ['Low', 'Medium', 'High'], defaultValue: 'Medium' }
          ]
        },
        {
          title: 'Review',
          description: 'Confirm the source details before submission.',
          fields: []
        }
      ]}
    />
  );
}