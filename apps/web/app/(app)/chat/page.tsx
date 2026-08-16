import { MessagesSquare } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import Assistant from '@/components/chat/assistant';

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Workspace"
        title="Sentinel Chat"
        description="A governed AI assistant for every role. Every message is inspected against your active policy, redacted or blocked where needed, and recorded to the audit trail before any model responds."
      />
      <Assistant />
    </div>
  );
}