export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'developer' | 'image' | 'text' | 'calculator' | 'security';
  path: string;
  trending?: boolean;
}

export const TOOLS: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Clean, prettify, and validate your JSON data instantly with syntax highlighting.',
    icon: 'code-xml',
    category: 'developer',
    path: '/json-formatter',
    trending: true,
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Create strong, secure, and random passwords with custom requirements.',
    icon: 'lock',
    category: 'security',
    path: '/password-generator',
    trending: true,
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Real-time word, character, and sentence counting for any text input.',
    icon: 'type',
    category: 'text',
    path: '/word-counter',
    trending: true,
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    description: 'Beautify complex SQL queries for various dialects.',
    icon: 'database',
    category: 'developer',
    path: '/sql-formatter',
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, and days with high precision.',
    icon: 'calendar',
    category: 'calculator',
    path: '/age-calculator',
  },
  {
    id: 'time-between-dates',
    name: 'Time Between Dates',
    description: 'Calculate the exact duration between any two dates instantly.',
    icon: 'clock',
    category: 'calculator',
    path: '/time-between-dates',
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Optimize your images with high quality compression. Reduce file size without losing clarity.',
    icon: 'file-image',
    category: 'image',
    path: '/image-compressor',
    trending: true,
  },
  {
    id: 'image-to-base64',
    name: 'Image to Base64',
    description: 'Convert your images into strings instantly for embedding in HTML, CSS, or JSON.',
    icon: 'image',
    category: 'image',
    path: '/image-to-base64',
  }
];
