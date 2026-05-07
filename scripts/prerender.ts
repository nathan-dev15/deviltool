/**
 * Prerender script — runs after `vite build`.
 * For each URL route, writes dist/{path}/index.html with the correct
 * <title>, <meta description>, and <link rel="canonical"> already in the HTML.
 * Vercel serves these static files directly — no JavaScript needed for Googlebot
 * to read the page metadata.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

const BASE_URL = 'https://koobrain.com';

// ---------------------------------------------------------------------------
// Route definitions — title, description, canonical path
// Keep in sync with sitemap.xml and toolSeo.ts
// ---------------------------------------------------------------------------
const ROUTES: Array<{ path: string; title: string; description: string }> = [
  // Home
  { path: '/', title: 'KooBrain — Free Online Tools for Developers & Everyone', description: 'KooBrain: 50+ free online tools for developers, designers, and everyone. JSON Formatter, PDF tools, Image Compressor, Password Generator, EMI Calculator and more. No sign-up, no tracking.' },

  // JSON Tools
  { path: '/json-formatter', title: 'JSON Formatter Online — Beautify & Validate JSON Free', description: 'Format and validate JSON online free. Instantly beautify minified JSON with syntax highlighting and error detection. Fast, private, browser-based.' },
  { path: '/json-validator', title: 'JSON Validator Online — Check JSON Syntax Free', description: 'Validate JSON syntax online free. Instantly check for errors, missing commas, and bracket mismatches. Fast, private, browser-based JSON checker.' },
  { path: '/json-minifier', title: 'JSON Minifier Online — Compress JSON Free', description: 'Minify JSON online free. Remove whitespace and compress JSON for APIs, web apps, and storage. Fast, private, browser-based JSON compressor.' },
  { path: '/json-pretty-print', title: 'JSON Pretty Print Online — Beautify JSON Free', description: 'Pretty print JSON online free. Convert minified or messy JSON into a clean, indented, readable format instantly. No login required.' },
  { path: '/json-to-typescript', title: 'JSON to TypeScript Generator — Convert JSON to Interfaces Free', description: 'Convert JSON to TypeScript interfaces online free. Instantly generate accurate TypeScript types from any JSON object. No login required.' },
  { path: '/json-to-csv', title: 'JSON to CSV Converter Online — Free & Instant', description: 'Convert JSON to CSV online free. Turn JSON arrays into spreadsheet-ready CSV files instantly. No login, no upload — runs in your browser.' },
  { path: '/json-to-xml', title: 'JSON to XML Converter Online — Free & Instant', description: 'Convert JSON to XML online free. Transform JSON objects to well-formed XML instantly. No login required — runs entirely in your browser.' },
  { path: '/json-to-yaml', title: 'JSON to YAML Converter Online — Free & Instant', description: 'Convert JSON to YAML online free. Transform JSON configs and data into clean YAML format instantly. No login required.' },
  { path: '/json-to-html-table', title: 'JSON to HTML Table Generator — Free Online Tool', description: 'Convert JSON to an HTML table online free. Turn JSON arrays into formatted, copy-ready HTML tables instantly. No login required.' },
  { path: '/json-compare', title: 'JSON Compare Tool — Diff Two JSON Objects Online Free', description: 'Compare two JSON objects online free. Highlight added, removed, and changed keys side by side. Fast JSON diff tool — no login required.' },
  { path: '/json-sort-keys', title: 'JSON Sort Keys Online — Alphabetize JSON Free', description: 'Sort JSON keys alphabetically online free. Normalize JSON structure for stable diffs, consistent hashing, and clean output. No login required.' },
  { path: '/json-converter', title: 'JSON Serialize & Deserialize Online — Stringify & Parse Free', description: 'Serialize objects to JSON strings and deserialize JSON back to structured objects online. Free, instant JSON stringify and parse tool.' },

  // Encoding Tools
  { path: '/base64-encode', title: 'Base64 Encode Online — Encode Text to Base64 Free', description: 'Encode text to Base64 online free. Convert any string to Base64 format instantly for APIs, HTTP headers, and data URIs. Browser-based and private.' },
  { path: '/base64-decode', title: 'Base64 Decode Online — Decode Base64 to Text Free', description: 'Decode Base64 strings back to text online free. Instantly decode any Base64-encoded value. Handles standard and URL-safe Base64. Browser-based.' },
  { path: '/url-encode', title: 'URL Encode Online — Percent-Encode Text Free', description: 'URL encode text online free. Convert any string to percent-encoded format safe for URLs, query parameters, and HTTP requests. Instant, browser-based.' },
  { path: '/url-decode', title: 'URL Decode Online — Decode Percent-Encoded URLs Free', description: 'URL decode percent-encoded strings online free. Convert %20, %3A, and other encoded characters back to readable text instantly. No login required.' },
  { path: '/html-encode', title: 'HTML Encode & Decode Online — Escape HTML Entities Free', description: 'HTML encode and decode online free. Escape &lt; &gt; &amp; and other entities for safe HTML rendering. Prevents XSS vulnerabilities. Browser-based.' },
  { path: '/jwt-decoder', title: 'JWT Decoder Online — Inspect JSON Web Tokens Free', description: 'Decode and inspect JWT tokens online free. View the header, payload claims, expiry, algorithm, and all JWT fields instantly. No login required.' },
  { path: '/text-to-base64', title: 'Text to Base64 Converter Online — Encode Text Free', description: 'Convert plain text to Base64 encoding online free. Encode any string, password, or message to Base64 instantly. Browser-based and private.' },
  { path: '/unicode-converter', title: 'Unicode Converter Online — Text to Unicode Escape Free', description: 'Convert text to Unicode escape sequences and decode Unicode back to readable text online free. Essential for internationalization debugging.' },

  // Text & Developer Tools
  { path: '/text-case-converter', title: 'Text Case Converter Online — UPPER, lower, Title, camelCase', description: 'Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, PascalCase and more. Free online text case converter — instant results.' },
  { path: '/string-comparison', title: 'String Comparison Tool — Diff Two Texts Online Free', description: 'Compare two strings or text blocks online free. Highlights every character and line difference instantly. Browser-based, no login required.' },
  { path: '/word-counter', title: 'Word Counter Online — Count Words & Characters Free', description: 'Count words, characters, sentences, paragraphs, and reading time online free. Live updates as you type. Perfect for essays, SEO, and social media.' },
  { path: '/sql-formatter', title: 'SQL Formatter Online — Beautify SQL Queries Free', description: 'Format SQL queries online free. Beautify messy SQL with proper indentation and keyword casing. Supports MySQL, PostgreSQL, SQLite, and SQL Server.' },
  { path: '/uuid-generator', title: 'UUID v4 Generator Online — Generate Secure UUIDs Free', description: 'Generate cryptographically secure UUID v4 values online free. Bulk generate UUIDs, copy to clipboard, and use instantly. No login required.' },
  { path: '/password-generator', title: 'Password Generator Online — Create Strong Passwords Free', description: 'Generate strong, random passwords online free using cryptographic randomness. Control length, uppercase, numbers, and symbols. Browser-based, private.' },

  // Calculator Tools
  { path: '/age-calculator', title: 'Age Calculator Online — Calculate Exact Age Free', description: 'Calculate your exact age in years, months, and days online free. Accounts for leap years and month lengths. Useful for forms and eligibility checks.' },
  { path: '/couple-age-calculator', title: 'Couple Age Calculator — Calculate Age Difference Free', description: 'Calculate the exact age difference between two people online free. Shows each person\'s current age and the precise gap in years, months, and days.' },
  { path: '/gst-calculator', title: 'GST Calculator Online India — Add or Remove GST Free', description: 'Calculate GST online free. Add GST to get the final price or remove GST from an inclusive amount. Supports all Indian GST slabs: 5%, 12%, 18%, 28%.' },
  { path: '/emi-calculator', title: 'EMI Calculator Online — Home, Car & Personal Loan EMI Free', description: 'Calculate EMI for home loans, car loans, and personal loans online free. Get monthly installment, total interest, and full amortization schedule instantly.' },
  { path: '/time-between-dates', title: 'Time Between Dates Calculator — Calculate Duration Free', description: 'Calculate the exact number of days, weeks, months, and years between any two dates online free. Accounts for leap years and varying month lengths.' },

  // Image Tools
  { path: '/image-compressor', title: 'Compress Image Online Free (JPG/PNG/WebP)', description: 'Compress image online free. Reduce image size without losing quality for JPG, PNG, and WebP. Fast, secure, browser-based image compressor.' },
  { path: '/image-to-base64', title: 'Image to Base64 Converter Online — Encode Images Free', description: 'Convert images to Base64 data URIs online free. Encode JPG, PNG, and WebP for HTML/CSS embedding and API payloads. Browser-based and private.' },
  { path: '/base64-to-image', title: 'Base64 to Image Converter Online — Decode Images Free', description: 'Convert Base64 strings back to images online free. Paste any Base64 image string to preview and download it instantly. No login required.' },
  { path: '/image-size-converter', title: 'Image Resizer Online — Resize & Convert Image Size Free', description: 'Resize images to exact pixel dimensions online free. Preserve aspect ratio or set custom width and height. Browser-based, no upload to servers.' },
  { path: '/pro-image-tool', title: 'Pro Image Studio — Batch Compress, Watermark & Resize', description: 'Professional batch image processing online free. Compress, resize, and watermark images. Remove EXIF metadata and compare before/after quality.' },
  { path: '/image-to-pdf', title: 'Image to PDF Converter Online Free — JPG/PNG to PDF', description: 'Convert images to PDF online free. Turn JPG, PNG, and WebP photos into a PDF document. Combine multiple images into one PDF. No watermark, no login.' },

  // PDF Tools
  { path: '/pdf/editor', title: 'PDF Editor Online Free — Annotate & Add Text to PDF', description: 'Edit PDF files online free. Add text annotations, notes, and markup to any PDF directly in your browser. No login, no upload to servers.' },
  { path: '/pdf/create', title: 'Create PDF Online Free — Make a New PDF Document Instantly', description: 'Create a PDF document online free. Type your content and download a professional PDF instantly. No login, no software — works in your browser.' },
  { path: '/pdf/merge', title: 'Merge PDF Online Free — Combine PDF Files Instantly', description: 'Merge PDF files online free. Combine multiple PDFs into one document instantly. No watermark, no login — runs in your browser. Fast and secure.' },
  { path: '/pdf/split', title: 'Split PDF Online Free — Extract Pages from PDF Instantly', description: 'Split PDF files online free. Extract specific pages or page ranges from any PDF. No watermark, no login — fast and secure browser-based PDF splitter.' },
  { path: '/pdf/add-files', title: 'Add Files to PDF Online Free — Append PDF Pages Instantly', description: 'Add pages from another PDF to an existing document online free. Append or insert PDF files with no watermark, no login — runs in your browser.' },
  { path: '/pdf/compress', title: 'Compress PDF Online Free — Reduce PDF Size Instantly', description: 'Compress PDF files online free. Reduce PDF size for email, web upload, or storage. No watermark, no login — fast browser-based PDF compressor.' },
  { path: '/pdf-to-word', title: 'PDF to Word Converter Online Free — Convert PDF to DOCX', description: 'Convert PDF to Word online free. Extract text and content from any PDF into an editable Word document. No login required — fast browser-based PDF converter.' },

  // Security
  { path: '/security', title: 'Security Tools Online — JWT, Password & Encoding Utilities Free', description: 'Privacy-first security tools for developers. JWT decoder, password generator, Base64, URL encoding — all processed locally in your browser.' },

  // Guides
  { path: '/guides', title: 'Developer Guides — JSON, Base64, JWT, SQL & More | KooBrain', description: 'Free practical guides for developers: JSON explained, Base64 encoding, JWT tokens, SQL formatting, URL encoding, and more. Written clearly for all levels.' },
  { path: '/guides/what-is-json', title: "What is JSON? A Complete Beginner's Guide | KooBrain", description: 'Learn what JSON is, how it works, and why developers use it everywhere. Covers syntax, data types, real-world examples, and common mistakes.' },
  { path: '/guides/base64-encoding-explained', title: 'Base64 Encoding Explained: What It Is and When to Use It | KooBrain', description: 'A clear guide to Base64 encoding: how the algorithm works, why it exists, real-world use cases in email, images, and APIs, and when NOT to use it.' },
  { path: '/guides/image-compression-guide', title: 'Image Compression for the Web: The Complete Guide | KooBrain', description: 'Learn how image compression works, which formats to use, lossy vs lossless, and how to cut image size without losing quality for the web.' },
  { path: '/guides/strong-password-guide', title: 'How to Create Strong Passwords (And Actually Remember Them) | KooBrain', description: 'Weak passwords are the leading cause of account breaches. Learn what makes a password strong, how generators work, and how to manage credentials safely.' },
  { path: '/guides/url-encoding-explained', title: 'URL Encoding Explained: Why % Signs Appear in URLs | KooBrain', description: 'Learn what URL encoding is, how percent-encoding works, which characters must be escaped, and the %20 vs + space debate. Practical guide with examples.' },
  { path: '/guides/how-jwt-works', title: "How JWT Tokens Work: A Developer's Visual Guide | KooBrain", description: 'Learn what JSON Web Tokens are, how the three-part structure works, how signatures prevent tampering, and critical security mistakes to avoid.' },
  { path: '/guides/what-is-uuid', title: 'What is a UUID? Guide to Unique Identifiers (GUID, v4, v7) | KooBrain', description: 'Learn what UUIDs are, how v4 vs v7 differ, what GUIDs are, and how to use UUIDs safely as database primary keys and API identifiers.' },
  { path: '/guides/yaml-vs-json', title: 'YAML vs JSON: When to Use Each and How to Convert | KooBrain', description: 'Compare YAML and JSON: syntax differences, use cases, when to choose each format, common YAML gotchas, and how to convert between them.' },
  { path: '/guides/sql-formatting-guide', title: 'SQL Formatting Best Practices: Write Readable Queries | KooBrain', description: 'Learn SQL formatting conventions: keyword casing, indentation, JOIN formatting, CTEs, and how to write queries your team can actually understand.' },
  { path: '/guides/html-encoding-xss', title: 'HTML Encoding and XSS Prevention Guide | KooBrain', description: 'Learn what HTML encoding is, how Cross-Site Scripting attacks work, which characters must be escaped, and how to protect users from injection attacks.' },
  { path: '/guides/how-emi-works', title: 'How EMI Works: Loan Installment Calculation Guide | KooBrain', description: 'Understand EMI calculation: the formula, reducing balance vs flat rate, how tenure and interest rate affect your monthly payment and total interest cost.' },
  { path: '/guides/gst-india-explained', title: 'GST in India Explained: Slabs, CGST, SGST, IGST & Calculation | KooBrain', description: 'Complete guide to GST in India: tax slabs (5%, 12%, 18%, 28%), CGST vs SGST vs IGST, how to add and remove GST from a price, and input tax credit basics.' },
  { path: '/guides/word-count-writing-guide', title: 'Word Count for SEO and Writing: What the Numbers Mean | KooBrain', description: 'Understand word count, character limits, reading time, and optimal content lengths for blog posts, social media, essays, and SEO content.' },
  { path: '/guides/working-with-pdf-files', title: 'Working with PDF Files: Merge, Split, Compress & Edit Guide | KooBrain', description: 'Complete guide to working with PDFs: how to merge and split pages, reduce file size, add annotations, and convert to Word — without paid software.' },
  { path: '/guides/typing-json-in-typescript', title: 'Typing API Responses in TypeScript: From JSON to Interfaces | KooBrain', description: 'Learn how to convert JSON API responses to TypeScript interfaces, handle optional fields and nested types, use type guards, and generate types automatically.' },

  // Security / Vault
  { path: '/vault', title: 'Session Vault — Temporary Private Notes | KooBrain', description: 'A private, browser-only session vault for storing temporary notes, tokens, and code snippets. Data is never sent to any server and is deleted when you close the tab.' },

  // Static pages
  { path: '/about', title: 'About KooBrain — Free Online Tools for Everyone', description: 'Learn about KooBrain: a free suite of developer tools and utilities built for speed, privacy, and simplicity. No sign-up, no tracking, no cost.' },
  { path: '/contact', title: 'Contact KooBrain — Get in Touch', description: 'Contact the KooBrain team with questions, feedback, partnership enquiries, or tool requests.' },
  { path: '/privacy', title: 'Privacy Policy — KooBrain', description: 'KooBrain Privacy Policy. We collect no personal data. All tool processing happens in your browser. Read our full privacy commitment.' },
  { path: '/terms', title: 'Terms of Service — KooBrain', description: 'KooBrain Terms of Service. Read our terms for using the free online tools and services available at koobrain.com.' },
  { path: '/disclaimer', title: 'Disclaimer — KooBrain', description: 'KooBrain Disclaimer. Important information about the use of our free online tools, accuracy of results, and third-party services including Google AdSense.' },
];

// ---------------------------------------------------------------------------
// HTML generation helpers
// ---------------------------------------------------------------------------

function escapeAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildHtml(template: string, route: (typeof ROUTES)[number]): string {
  const canonical = `${BASE_URL}${route.path}`;

  let html = template;

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(route.title)}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeAttr(route.description)}"`
  );

  // Inject canonical + OG tags just before </head>
  const headInject = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${escapeAttr(route.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(route.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="KooBrain" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`,
  ].join('\n    ');

  html = html.replace('</head>', `  ${headInject}\n  </head>`);

  return html;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

let count = 0;
for (const route of ROUTES) {
  const html = buildHtml(template, route);

  if (route.path === '/') {
    // Home — overwrite dist/index.html directly
    writeFileSync(join(distDir, 'index.html'), html, 'utf-8');
  } else {
    // dist/json-formatter/index.html  OR  dist/pdf/merge/index.html
    const segments = route.path.replace(/^\//, '').split('/').filter(Boolean);
    const dir = join(distDir, ...segments);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html, 'utf-8');
  }
  count++;
}

console.log(`\n✅ Prerendered ${count} pages into dist/\n`);
