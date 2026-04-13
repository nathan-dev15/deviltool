import { useState } from 'react';
import { AdSense } from "@/src/components/AdSense";
export const useToolActions = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    if (!text || !navigator.clipboard) {
      console.warn("Clipboard API not available or text empty");
      return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error("Failed to copy text: ", err);
    });
  };

  const downloadFile = (content: string, fileName: string, contentType: string) => {
    if (!content) return;
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const readFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          resolve(e.target.result);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(new Error('File reader error'));
      reader.readAsText(file);
    });
  };

  return {
    copied,
    copyToClipboard,
    downloadFile,
    readFile
  };
};