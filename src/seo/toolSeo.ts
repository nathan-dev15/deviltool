import type { SupportedLocale } from "@/src/i18n/locales";

export type ToolFaq = { question: string; answer: string };
export type ToolInternalLink = { label: string; href: string; note?: string };

export type ToolSeoConfig = {
  toolName: string;
  mainKeyword: string;
  secondaryKeywords: string[];
  urlSlug: string;
  imageAltText: string;
  // Optional custom content for higher quality per tool.
  intro?: string;
  howToSteps?: string[];
  features?: string[];
  benefits?: string[];
  faqs?: ToolFaq[];
  internalLinks?: ToolInternalLink[];
  cta?: { headline: string; copy: string; buttonText: string; buttonHref: string };
  seoTitle?: string; // <= 60 chars
  metaDescription?: string; // <= 160 chars

  // Optional per-locale overrides for full multilingual SEO pages.
  // Only include fields you want to override; anything missing falls back to templates.
  locales?: Partial<Record<SupportedLocale, Partial<Omit<ToolSeoConfig, "locales">>>>;
};

export const TOOL_SEO_BY_PATH: Record<string, ToolSeoConfig> = {
  "/image-compressor": {
    toolName: "Image Compressor",
    mainKeyword: "compress image online free",
    secondaryKeywords: [
      "reduce image size without losing quality",
      "image compressor online fast",
      "compress jpg png online",
      "compress webp image online",
      "shrink image size for email",
      "reduce photo size for website",
      "compress images for faster page speed",
      "bulk image compression in browser",
      "reduce image size for WhatsApp",
      "best free image compressor",
    ],
    urlSlug: "/image-compressor",
    imageAltText: "Image compressor tool showing original vs compressed size and download button",
    seoTitle: "Compress Image Online Free (JPG/PNG/WebP)",
    metaDescription:
      "Compress image online free. Reduce image size without losing quality for JPG/PNG/WebP. Fast, secure, browser-based.",
    intro:
      "Need to compress image online free without sacrificing quality? This Image Compressor reduces file size for JPG, PNG, and WebP so your site loads faster and your uploads finish quicker. Your images stay private because compression runs in your browser, not on a server. Simply upload an image, choose the quality level, and download the optimized result in seconds. Use it to reduce image size without losing quality for web pages, email attachments, forms, resumes, and social media. If you want an image compressor online fast that works on mobile and desktop, this tool is built for speed and simplicity.",
    howToSteps: [
      "Upload a JPG, PNG, or WebP image using the upload area.",
      "Adjust the quality slider to balance size and clarity.",
      "Preview the new file size and compression savings.",
      "Click Download to save the compressed image.",
    ],
    features: [
      "Compress image online free with no signup",
      "Reduce image size without losing quality (smart quality control)",
      "Image compressor online fast (local processing)",
      "Supports JPG, PNG, and WebP uploads",
      "Shows original size, compressed size, and savings",
      "Secure and private: files stay in your browser",
    ],
    benefits: [
      "Faster websites: smaller images improve page speed and Core Web Vitals",
      "Easier sharing: send photos on email, WhatsApp, and forms without size errors",
      "Lower bandwidth and storage: save space on devices and hosting",
      "Better UX: quick compression with clear results and simple controls",
    ],
    faqs: [
      {
        question: "How can I compress image online free without losing quality?",
        answer:
          "Upload your image, then lower the quality slightly until the preview still looks good. The tool keeps detail while removing unnecessary data to reduce size.",
      },
      {
        question: "Can I compress JPG and PNG online?",
        answer:
          "Yes. You can upload JPG and PNG, and the tool will compress them quickly. You can also upload WebP images.",
      },
      {
        question: "Is this image compressor online fast and secure?",
        answer:
          "Yes. Compression runs locally in your browser, so your file is not uploaded to a server. That keeps it private and fast.",
      },
      {
        question: "Will compressing an image reduce its dimensions?",
        answer:
          "No. This tool reduces file size by optimizing compression. Your image width and height remain the same unless you use a separate resize tool.",
      },
      {
        question: "What quality setting should I use for best results?",
        answer:
          "Start around 80% for photos. If you need a smaller file, reduce it step-by-step until the image still looks sharp for your use case.",
      },
    ],
    internalLinks: [
      { label: "Base64 to Image", href: "/base64-to-image", note: "Convert Base64 strings into images." },
      { label: "Image to Base64", href: "/image-to-base64", note: "Encode images for APIs and JSON payloads." },
      { label: "Pro Image Tool", href: "/pro-image-tool", note: "Resize and compare image outputs." },
      { label: "JSON Formatter", href: "/json-formatter", note: "Format image metadata or API responses." },
    ],
    cta: {
      headline: "Compress your image in seconds",
      copy: "Try the Image Compressor now and reduce image size without losing quality.",
      buttonText: "Try Image Compressor",
      buttonHref: "/image-compressor",
    },
    locales: {
      hi: {
        mainKeyword: "फोटो कंप्रेस करें ऑनलाइन",
        secondaryKeywords: ["इमेज साइज कैसे कम करें", "फोटो साइज घटाएं", "फ्री इमेज कंप्रेसर", "अनलिमिटेड फोटो कंप्रेशन"],
        seoTitle: "फोटो कंप्रेस करें ऑनलाइन - इमेज साइज घटाने का फ्री टूल",
        metaDescription: "फोटो कंप्रेस करें ऑनलाइन। बिना क्वालिटी खोए अपने JPG/PNG/WebP इमेज का साइज कम करें। तेज, सुरक्षित और पूरी तरह से फ्री।"
      },
      ta: {
        mainKeyword: "பட சுருக்கி ஆன்லைன்",
        secondaryKeywords: ["படத்தின் அளவை குறைக்க", "இலவச ஆன்லைன் பட சுருக்கி", "தரம் குறையாமல் படம் சுருக்க"],
        seoTitle: "பட சுருக்கி ஆன்லைன் - தரமான இலவச கருவி",
        metaDescription: "எங்கள் பட சுருக்கி ஆன்லைன் கருவியைப் பயன்படுத்தி தரம் குறையாமல் உங்கள் படங்களின் அளவை விரைவாகவும் எளிதாகவும் குறைக்கவும்."
      },
      ru: {
        mainKeyword: "Сжать фото онлайн",
        secondaryKeywords: ["уменьшить размер фото", "сжатие изображений онлайн", "уменьшить вес картинки", "бесплатный компрессор фото"],
        seoTitle: "Сжать фото онлайн без потери качества (JPG/PNG/WebP)",
        metaDescription: "Сжать фото онлайн бесплатно и быстро. Уменьшите размер файлов JPG, PNG и WebP. Полная приватность – файлы остаются в браузере."
      }
    }
  },

  // Generic configs (content is generated from templates in the renderer).
  "/json-formatter": {
    toolName: "JSON Formatter",
    mainKeyword: "json formatter online",
    secondaryKeywords: [
      "beautify json online",
      "format json prettify",
      "json formatter and validator",
      "pretty print json",
      "format minified json",
      "json formatter free tool",
    ],
    urlSlug: "/json-formatter",
    imageAltText: "JSON formatter tool showing input and formatted JSON output",
    locales: {
      hi: {
        mainKeyword: "JSON फॉर्मैटर ऑनलाइन",
        secondaryKeywords: ["JSON को सुंदर बनाएं", "JSON डेटा फॉर्मेट करें", "फ्री ऑनलाइन JSON फॉर्मैटर", "JSON वैलिडेशन टूल"],
        seoTitle: "JSON फॉर्मैटर ऑनलाइन - डेटा सुंदर और व्यवस्थित करें",
        metaDescription: "JSON फॉर्मैटर ऑनलाइन का उपयोग करके अपने JSON डेटा को सुंदर, पठनीय और एरर-फ्री बनाएं। तेज, सुरक्षित और पूरी तरह से फ्री।"
      },
      ta: {
        mainKeyword: "JSON வடிவமைப்பான் ஆன்லைன்",
        secondaryKeywords: ["JSON ஐ அழகுபடுத்த", "JSON தரவு சரிபார்ப்பு", "இலவச ஆன்லைன் JSON கருவி"],
        seoTitle: "JSON வடிவமைப்பான் - ஆன்லைன் தரவை அழகுபடுத்த",
        metaDescription: "எங்கள் JSON வடிவமைப்பான் ஆன்லைன் கருவியைப் பயன்படுத்தி உங்கள் JSON தரவை படிக்க எளிதானதாகவும் பிழை இல்லாமலும் மாற்றவும்."
      },
      ru: {
        mainKeyword: "JSON форматирование онлайн",
        secondaryKeywords: ["красивый JSON", "валидация JSON", "форматировать JSON онлайн", "бесплатный инструмент JSON"],
        seoTitle: "JSON Форматтер - Красивое форматирование и валидация онлайн",
        metaDescription: "Форматируйте ваш JSON онлайн быстро и бесплатно. Красивый вывод, проверка синтаксиса и полная безопасность в браузере."
      }
    }
  },
  "/json-validator": {
    toolName: "JSON Validator",
    mainKeyword: "json validator online",
    secondaryKeywords: [
      "validate json syntax",
      "json syntax checker",
      "find json errors",
      "json validator free",
      "check json online",
    ],
    urlSlug: "/json-validator",
    imageAltText: "JSON validator tool showing valid and invalid JSON messages",
  },
  "/json-minifier": {
    toolName: "JSON Minifier",
    mainKeyword: "json minifier online",
    secondaryKeywords: [
      "minify json",
      "compress json",
      "reduce json size",
      "json minify tool",
      "remove whitespace from json",
    ],
    urlSlug: "/json-minifier",
    imageAltText: "JSON minifier tool showing original and minified JSON output",
  },
  "/json-pretty-print": {
    toolName: "JSON Pretty Print",
    mainKeyword: "json pretty print",
    secondaryKeywords: [
      "pretty print json online",
      "beautify json",
      "json formatter pretty",
      "readable json output",
      "json pretty printer free",
    ],
    urlSlug: "/json-pretty-print",
    imageAltText: "JSON pretty print tool with readable formatted output",
  },
  "/json-to-csv": {
    toolName: "JSON to CSV Converter",
    mainKeyword: "json to csv converter",
    secondaryKeywords: [
      "convert json to csv online",
      "json array to csv",
      "download csv from json",
      "json to spreadsheet csv",
      "json to csv free tool",
    ],
    urlSlug: "/json-to-csv",
    imageAltText: "JSON to CSV converter tool showing JSON input and CSV output",
  },
  "/json-to-xml": {
    toolName: "JSON to XML Converter",
    mainKeyword: "json to xml converter",
    secondaryKeywords: [
      "convert json to xml online",
      "json xml converter free",
      "json to xml format",
      "json to xml tool",
      "export xml from json",
    ],
    urlSlug: "/json-to-xml",
    imageAltText: "JSON to XML converter showing JSON input and XML output",
  },
  "/json-to-yaml": {
    toolName: "JSON to YAML Converter",
    mainKeyword: "json to yaml converter",
    secondaryKeywords: [
      "convert json to yaml online",
      "json yaml converter free",
      "yaml from json",
      "json to yml",
      "json to yaml tool",
    ],
    urlSlug: "/json-to-yaml",
    imageAltText: "JSON to YAML converter showing YAML output",
  },
  "/json-to-html-table": {
    toolName: "JSON to HTML Table",
    mainKeyword: "json to html table",
    secondaryKeywords: [
      "convert json to html table",
      "json table generator",
      "json to table online",
      "html table from json",
      "json table tool",
    ],
    urlSlug: "/json-to-html-table",
    imageAltText: "JSON to HTML table tool rendering data into a table",
  },
  "/json-compare": {
    toolName: "JSON Compare",
    mainKeyword: "json compare tool",
    secondaryKeywords: [
      "json diff online",
      "compare two json files",
      "find difference in json",
      "json compare free",
      "json comparison tool",
    ],
    urlSlug: "/json-compare",
    imageAltText: "JSON compare tool showing differences between two JSON inputs",
  },
  "/json-sort-keys": {
    toolName: "JSON Sort Keys",
    mainKeyword: "sort json keys",
    secondaryKeywords: [
      "json key sorter",
      "alphabetize json keys",
      "sort keys in json online",
      "stable json output",
      "json sort tool",
    ],
    urlSlug: "/json-sort-keys",
    imageAltText: "JSON sort keys tool showing alphabetically sorted JSON output",
  },
  "/json-to-typescript": {
    toolName: "JSON to TypeScript",
    mainKeyword: "json to typescript converter",
    secondaryKeywords: [
      "generate typescript interface from json",
      "json to ts type",
      "typescript types from json",
      "json to typescript online",
      "json to interface generator",
    ],
    urlSlug: "/json-to-typescript",
    imageAltText: "JSON to TypeScript tool generating TypeScript interfaces",
  },

  "/base64-encode": {
    toolName: "Base64 Encode",
    mainKeyword: "base64 encode",
    secondaryKeywords: [
      "text to base64",
      "base64 encoder online",
      "encode string to base64",
      "base64 encode free",
      "base64 encoding tool",
    ],
    urlSlug: "/base64-encode",
    imageAltText: "Base64 encode tool showing input text and Base64 output",
  },
  "/base64-decode": {
    toolName: "Base64 Decode",
    mainKeyword: "base64 decode",
    secondaryKeywords: [
      "base64 decoder online",
      "decode base64 to text",
      "base64 to string",
      "base64 decode free",
      "base64 decoding tool",
    ],
    urlSlug: "/base64-decode",
    imageAltText: "Base64 decode tool showing Base64 input and decoded text output",
  },
  "/url-encode": {
    toolName: "URL Encode",
    mainKeyword: "url encode",
    secondaryKeywords: [
      "encode url online",
      "url encoder",
      "encode query parameters",
      "url encoding tool",
      "url encode free",
    ],
    urlSlug: "/url-encode",
    imageAltText: "URL encode tool showing encoded URL output",
  },
  "/url-decode": {
    toolName: "URL Decode",
    mainKeyword: "url decode",
    secondaryKeywords: [
      "decode url online",
      "url decoder",
      "decode query parameters",
      "url decoding tool",
      "url decode free",
    ],
    urlSlug: "/url-decode",
    imageAltText: "URL decode tool showing decoded URL output",
  },
  "/html-encode": {
    toolName: "HTML Encode/Decode",
    mainKeyword: "html encode decode",
    secondaryKeywords: [
      "html entity encoder",
      "html entity decoder",
      "escape html online",
      "unescape html online",
      "html encode tool",
    ],
    urlSlug: "/html-encode",
    imageAltText: "HTML encode decode tool showing encoded HTML entities",
  },
  "/jwt-decoder": {
    toolName: "JWT Decoder",
    mainKeyword: "jwt decoder",
    secondaryKeywords: [
      "decode jwt token",
      "jwt decode online",
      "jwt payload viewer",
      "jwt header payload",
      "jwt decoder free",
    ],
    urlSlug: "/jwt-decoder",
    imageAltText: "JWT decoder tool showing token header, payload, and signature sections",
  },
  "/text-to-base64": {
    toolName: "Text to Base64",
    mainKeyword: "text to base64",
    secondaryKeywords: [
      "convert text to base64",
      "base64 encoder for text",
      "string to base64 online",
      "base64 text converter",
      "text base64 tool",
    ],
    urlSlug: "/text-to-base64",
    imageAltText: "Text to Base64 tool converting plain text into Base64 output",
  },
  "/unicode-converter": {
    toolName: "Unicode Converter",
    mainKeyword: "unicode converter",
    secondaryKeywords: [
      "unicode to text",
      "text to unicode",
      "unicode escape converter",
      "decode unicode escapes",
      "unicode converter online",
    ],
    urlSlug: "/unicode-converter",
    imageAltText: "Unicode converter tool showing Unicode escapes and decoded text",
  },

  "/string-comparison": {
    toolName: "String Comparison",
    mainKeyword: "string comparison tool",
    secondaryKeywords: [
      "compare two strings",
      "string diff checker",
      "text comparison online",
      "find difference between texts",
      "string compare free",
    ],
    urlSlug: "/string-comparison",
    imageAltText: "String comparison tool highlighting differences between two texts",
  },
  "/password-generator": {
    toolName: "Password Generator",
    mainKeyword: "password generator",
    secondaryKeywords: [
      "strong password generator",
      "random password generator",
      "secure password generator",
      "generate password online",
      "password generator free",
    ],
    urlSlug: "/password-generator",
    imageAltText: "Password generator tool with options and generated strong password",
  },
  "/word-counter": {
    toolName: "Word Counter",
    mainKeyword: "word counter",
    secondaryKeywords: [
      "count words online",
      "character counter",
      "sentence counter",
      "word count tool free",
      "word counter for essays",
    ],
    urlSlug: "/word-counter",
    imageAltText: "Word counter tool showing word and character counts",
  },
  "/sql-formatter": {
    toolName: "SQL Formatter",
    mainKeyword: "sql formatter",
    secondaryKeywords: [
      "format sql online",
      "sql beautifier",
      "pretty print sql",
      "sql formatter free",
      "sql query formatter",
    ],
    urlSlug: "/sql-formatter",
    imageAltText: "SQL formatter tool showing input query and formatted SQL output",
  },
  "/age-calculator": {
    toolName: "Age Calculator",
    mainKeyword: "age calculator",
    secondaryKeywords: [
      "calculate age from date of birth",
      "age calculator online",
      "age in years months days",
      "date of birth calculator",
      "age calculator free",
    ],
    urlSlug: "/age-calculator",
    imageAltText: "Age calculator tool showing date input and calculated age result",
  },
  "/time-between-dates": {
    toolName: "Time Between Dates",
    mainKeyword: "time between dates calculator",
    secondaryKeywords: [
      "days between dates",
      "date difference calculator",
      "calculate weeks between dates",
      "months between dates",
      "time difference tool",
    ],
    urlSlug: "/time-between-dates",
    imageAltText: "Time between dates tool showing date range and difference result",
  },
  "/image-to-base64": {
    toolName: "Image to Base64",
    mainKeyword: "image to base64",
    secondaryKeywords: [
      "convert image to base64",
      "jpg to base64",
      "png to base64",
      "base64 image encoder",
      "image base64 converter online",
    ],
    urlSlug: "/image-to-base64",
    imageAltText: "Image to Base64 tool converting an uploaded image into a Base64 string",
  },
  "/base64-to-image": {
    toolName: "Base64 to Image",
    mainKeyword: "base64 to image",
    secondaryKeywords: [
      "convert base64 to image",
      "base64 to jpg",
      "base64 to png",
      "decode base64 image",
      "base64 image decoder online",
    ],
    urlSlug: "/base64-to-image",
    imageAltText: "Base64 to Image tool rendering an image from a Base64 string",
  },
  "/security": {
    toolName: "Security Tools",
    mainKeyword: "security tools online",
    secondaryKeywords: [
      "developer security tools",
      "privacy friendly tools",
      "secure utilities",
      "security checklist tools",
      "security tools free",
    ],
    urlSlug: "/security",
    imageAltText: "Security tools page with links to security utilities",
  },
  "/vault": {
    toolName: "Session Vault",
    mainKeyword: "session vault",
    secondaryKeywords: [
      "temporary notes vault",
      "session storage vault",
      "save snippets in browser",
      "local vault tool",
      "private session vault",
    ],
    urlSlug: "/vault",
    imageAltText: "Session vault tool page for storing temporary snippets in the browser",
  },
  "/pro-image-tool": {
    toolName: "Pro Image Studio",
    mainKeyword: "batch image compressor online",
    secondaryKeywords: [
      "watermark image online free",
      "remove exif data from photos",
      "bulk image resizer",
      "sharpen image online",
      "pro image optimization tool",
      "batch convert jpg to webp",
      "secure image processing in browser",
      "before after image comparison tool",
    ],
    urlSlug: "/pro-image-tool",
    imageAltText: "Pro Image Studio with batch queue, watermark controls, and before/after slider",
    seoTitle: "Pro Image Studio - Batch Compress, Watermark & Resize",
    metaDescription: "Professional batch image processing. Compress, resize, and watermark images online. Remove EXIF metadata and sharpen photos instantly. Secure and free.",
    features: [
      "Batch image processing: optimize multiple photos at once",
      "Pro comparison slider: real-time before/after visual inspection",
      "Dynamic watermarking: add text branding to your images",
      "Enhance & Sharpen: boost clarity after compression",
      "Privacy first: strip EXIF metadata and process locally",
      "Smart presets: Web, Social, and Lossless optimization",
    ],
    locales: {
      hi: {
        toolName: "प्रो इमेज स्टूडियो",
        mainKeyword: "बैच इमेज कंप्रेसर ऑनलाइन",
        secondaryKeywords: ["फोटो पर वॉटरमार्क लगाएं", "इमेज का साइज बदलें", "एक्सिफ डेटा हटाएं", "प्रो फोटो एडिटिंग टूल"],
        seoTitle: "प्रो इमेज स्टूडियो - फोटो कंप्रेस और वॉटरमार्क करें",
        metaDescription: "प्रोफेशनल बैच इमेज प्रोसेसिंग। एक साथ कई फोटो कंप्रेस, रिसाइज और वॉटरमार्क करें। सुरक्षित और पूरी तरह फ्री।"
      },
      ru: {
        toolName: "Pro Image Studio",
        mainKeyword: "пакетное сжатие изображений",
        secondaryKeywords: ["добавить водяной знак на фото", "изменить размер картинки", "удалить метаданные фото", "профессиональное сжатие изображений"],
        seoTitle: "Pro Image Studio - Пакетное сжатие и водяные знаки",
        metaDescription: "Профессиональная пакетная обработка изображений. Сжимайте, изменяйте размер и добавляйте водяные знаки онлайн. Безопасно и бесплатно."
      }
    }
  },
};
