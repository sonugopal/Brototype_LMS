import { unparse } from 'papaparse';

export function downloadCSV(data: object[], filename: string) {
  const csv = unparse(data);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename || 'download.csv';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
