

export type ToolCategory =
  | 'developer'
  | 'image'
  | 'text'
  | 'calculator'
  | 'security'
  | 'json'
  | 'encoding';

export interface Tool {
  id: string;
  icon: string;
  category: ToolCategory;
  path: string;
  trending?: boolean;
}

export const TOOLS: Tool[] = [
  // --- Image Tools ---
  {
    id: 'base64-to-image',
    icon: 'file-image',
    category: 'image',
    path: '/base64-to-image',
  },
  {
    id: 'pro-image-tool',
    icon: 'image',
    category: 'image',
    path: '/pro-image-tool',
  },
  // --- JSON Tools ---
  {
    id: 'json-formatter',
    icon: 'code-xml',
    category: 'json',
    path: '/json-formatter',
    trending: true,
  },
  {
    id: 'json-to-typescript',
    icon: 'file-code',
    category: 'json',
    path: '/json-to-typescript'
  },
  {
    id: 'json-validator',
    icon: 'code-xml',
    category: 'json',
    path: '/json-validator',
  },
  {
    id: 'json-minifier',
    icon: 'code-xml',
    category: 'json',
    path: '/json-minifier',
  },
  {
    id: 'json-pretty-print',
    icon: 'code-xml',
    category: 'json',
    path: '/json-pretty-print',
  },
  {
    id: 'json-to-csv',
    icon: 'database',
    category: 'json',
    path: '/json-to-csv',
  },
  {
    id: 'json-to-xml',
    icon: 'code-xml',
    category: 'json',
    path: '/json-to-xml',
  },
  {
    id: 'json-to-yaml',
    icon: 'code-xml',
    category: 'json',
    path: '/json-to-yaml',
  },
  {
    id: 'json-to-html-table',
    icon: 'database',
    category: 'json',
    path: '/json-to-html-table',
  },
  {
    id: 'json-compare',
    icon: 'git-compare',
    category: 'json',
    path: '/json-compare',
  },
  {
    id: 'json-sort-keys',
    icon: 'code-xml',
    category: 'json',
    path: '/json-sort-keys',
  },

  // --- Encoding / Decoding Tools ---
  {
    id: 'base64-encode',
    icon: 'type',
    category: 'encoding',
    path: '/base64-encode',
  },
  {
    id: 'base64-decode',
    icon: 'type',
    category: 'encoding',
    path: '/base64-decode',
  },
  {
    id: 'url-encode',
    icon: 'type',
    category: 'encoding',
    path: '/url-encode',
  },
  {
    id: 'url-decode',
    icon: 'type',
    category: 'encoding',
    path: '/url-decode',
  },
  {
    id: 'html-encode',
    icon: 'type',
    category: 'encoding',
    path: '/html-encode',
  },
  {
    id: 'jwt-decoder',
    icon: 'lock',
    category: 'encoding',
    path: '/jwt-decoder',
  },
  {
    id: 'text-to-base64',
    icon: 'type',
    category: 'encoding',
    path: '/text-to-base64',
  },
  {
    id: 'unicode-converter',
    icon: 'type',
    category: 'encoding',
    path: '/unicode-converter',
  },
  {
    id: 'string-comparison',
    icon: 'git-compare',
    category: 'developer',
    path: '/string-comparison',
    trending: true,
  },
  {
    id: 'json-converter',
    icon: 'database',
    category: 'developer',
    path: '/json-converter',
    trending: true,
  },
  {
    id: 'password-generator',
    icon: 'lock',
    category: 'security',
    path: '/password-generator',
    trending: true,
  },
  {
    id: 'word-counter',
    icon: 'type',
    category: 'text',
    path: '/word-counter',
    trending: true,
  },
  {
    id: 'sql-formatter',
    icon: 'database',
    category: 'developer',
    path: '/sql-formatter',
  },
  {
    id: 'age-calculator',
    icon: 'calendar',
    category: 'calculator',
    path: '/age-calculator',
  },
  {
    id: 'time-between-dates',
    icon: 'clock',
    category: 'calculator',
    path: '/time-between-dates',
  },
  {
    id: 'image-compressor',
    icon: 'file-image',
    category: 'image',
    path: '/image-compressor',
    trending: true,
  },
  {
    id: 'image-to-base64',
    icon: 'image',
    category: 'image',
    path: '/image-to-base64',
  }
];
