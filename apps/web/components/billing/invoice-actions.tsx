'use client';

import { Download, Printer } from 'lucide-react';

export default function InvoiceActions({ number, amount, date }: { number: string; amount: number; date: string }) {
  const handlePrint = () => window.print();

  const handleDownload = () => {
    const body = [
      'Sentinel invoice',
      '',
      `Invoice: ${number}`,
      `Issued: ${date}`,
      `Amount due: $${amount.toLocaleString()}.00`,
      '',
      'Paid via Nexora Industries'
    ].join('\n');
    const blob = new Blob([body], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${number}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10"
      >
        <Printer className="h-3.5 w-3.5" /> Print
      </button>
      <button
        type="button"
        onClick={handleDownload}
        className="inline-flex items-center gap-1.5 rounded-full bg-sentinel-500 px-4 py-2 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
      >
        <Download className="h-3.5 w-3.5" /> Download PDF
      </button>
    </>
  );
}