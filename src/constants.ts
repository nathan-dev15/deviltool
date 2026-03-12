

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
  name: string;
  description: string;
  icon: string;
  category: ToolCategory;
  path: string;
  trending?: boolean;
}

export const TOOLS: Tool[] = [
  // --- Image Tools ---
  {
    id: 'image-to-base64',
    name: 'Image → Base64',
    description: 'Convert images to Base64 strings for embedding or transfer.',
    icon: 'image',
    category: 'image',
    path: '/image-to-base64',
  },
  {
    id: 'base64-to-image',
    name: 'Base64 → Image',
    description: 'Convert Base64 strings back to images.',
    icon: 'file-image',
    category: 'image',
    path: '/base64-to-image',
  },
  {
    id: 'image-size-converter',
    name: 'Image Size Converter',
    description: 'Resize or convert image dimensions and file size easily.',
    icon: 'image',
    category: 'image',
    path: '/image-size-converter',
  },
  // --- JSON Tools ---
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Clean, prettify, and validate your JSON data instantly with syntax highlighting.',
    icon: 'code-xml',
    category: 'json',
    path: '/json-formatter',
    trending: true,
  },
  {
  id: 'json-to-typescript',
  name: 'JSON to TypeScript Generator',
  description: 'Convert JSON data into TypeScript interfaces instantly. Perfect for developers building APIs with React, Angular, or Node.js.',
  icon: 'file-code',
  category: 'json',
  path: '/json-to-typescript'
},
    {
      id: 'json-validator',
      name: 'JSON Validator',
      description: 'Validate your JSON data for errors and correctness.',
      icon: 'code-xml',
      category: 'json',
      path: '/json-validator',
    },
    {
      id: 'json-minifier',
      name: 'JSON Minifier',
      description: 'Minify JSON data to reduce file size and remove whitespace.',
      icon: 'code-xml',
      category: 'json',
      path: '/json-minifier',
    },
    {
      id: 'json-pretty-print',
      name: 'JSON Pretty Print',
      description: 'Format and pretty print your JSON for easy reading.',
      icon: 'code-xml',
      category: 'json',
      path: '/json-pretty-print',
    },
    {
      id: 'json-to-csv',
      name: 'JSON to CSV',
      description: 'Convert JSON data to CSV format for spreadsheets.',
      icon: 'database',
      category: 'json',
      path: '/json-to-csv',
    },
    {
      id: 'json-to-xml',
      name: 'JSON to XML',
      description: 'Convert JSON data to XML format.',
      icon: 'code-xml',
      category: 'json',
      path: '/json-to-xml',
    },
    {
      id: 'json-to-yaml',
      name: 'JSON to YAML',
      description: 'Convert JSON data to YAML format.',
      icon: 'code-xml',
      category: 'json',
      path: '/json-to-yaml',
    },
    {
      id: 'json-to-html-table',
      name: 'JSON to HTML Table',
      description: 'Convert JSON data to an HTML table for easy viewing.',
      icon: 'database',
      category: 'json',
      path: '/json-to-html-table',
    },
    {
      id: 'json-compare',
      name: 'JSON Compare',
      description: 'Compare two JSON objects and highlight the differences.',
      icon: 'git-compare',
      category: 'json',
      path: '/json-compare',
    },
    {
      id: 'json-sort-keys',
      name: 'JSON Sort Keys',
      description: 'Sort the keys in your JSON objects alphabetically.',
      icon: 'code-xml',
      category: 'json',
      path: '/json-sort-keys',
    },

    // --- Encoding / Decoding Tools ---
    {
      id: 'base64-encode',
      name: 'Base64 Encode',
      description: 'Encode text or files to Base64 format.',
      icon: 'type',
      category: 'encoding',
      path: '/base64-encode',
    },
    {
      id: 'base64-decode',
      name: 'Base64 Decode',
      description: 'Decode Base64 strings back to text or files.',
      icon: 'type',
      category: 'encoding',
      path: '/base64-decode',
    },
    {
      id: 'url-encode',
      name: 'URL Encode',
      description: 'Encode URLs to make them safe for transmission.',
      icon: 'type',
      category: 'encoding',
      path: '/url-encode',
    },
    {
      id: 'url-decode',
      name: 'URL Decode',
      description: 'Decode encoded URLs back to their original form.',
      icon: 'type',
      category: 'encoding',
      path: '/url-decode',
    },
    {
      id: 'html-encode',
      name: 'HTML Encode',
      description: 'Encode HTML entities to prevent XSS and display code.',
      icon: 'type',
      category: 'encoding',
      path: '/html-encode',
    },
    {
      id: 'html-decode',
      name: 'HTML Decode',
      description: 'Decode HTML entities back to readable text.',
      icon: 'type',
      category: 'encoding',
      path: '/html-decode',
    },
    {
      id: 'jwt-decoder',
      name: 'JWT Decoder',
      description: 'Decode and inspect JSON Web Tokens (JWTs).',
      icon: 'lock',
      category: 'encoding',
      path: '/jwt-decoder',
    },
    {
      id: 'text-to-base64',
      name: 'Text to Base64',
      description: 'Convert plain text to Base64 encoding.',
      icon: 'type',
      category: 'encoding',
      path: '/text-to-base64',
    },
    {
      id: 'base64-to-image',
      name: 'Base64 to Image',
      description: 'Convert Base64 strings to images.',
      icon: 'file-image',
      category: 'encoding',
      path: '/base64-to-image',
    },
    {
      id: 'unicode-converter',
      name: 'Unicode Converter',
      description: 'Convert text to Unicode and vice versa.',
      icon: 'type',
      category: 'encoding',
      path: '/unicode-converter',
    },
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
  id: 'string-comparison',
  name: 'String Comparison',
  description: 'Compare two strings or text blocks and highlight the differences instantly.',
  icon: 'git-compare',
  category: 'developer',
  path: '/string-comparison',
  trending: true,
},
{
  id: 'json-converter',
  name: 'JSON Serialize / Deserialize',
  description: 'Convert objects to JSON and JSON to object instantly. Validate and format JSON easily.',
  icon: 'database',
  category: 'developer',
  path: '/json-converter',
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
