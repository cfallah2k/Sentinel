'use client';

import Modal from './modal';

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel'
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      tone="danger"
      title={title}
      description={description}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_30px_rgba(244,63,94,0.35)] transition hover:bg-rose-400"
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <p className="text-xs leading-5 text-slate-400">
        This action {description ? `— ${description}` : 'cannot be undone.'} Proceed only if you are sure.
      </p>
    </Modal>
  );
}