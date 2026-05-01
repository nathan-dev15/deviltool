/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
// import { AuthProvider } from './context/AuthContext';
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './i18n/I18nContext';

// Lazy load pages (Named exports require the .then() wrapper)
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const JsonFormatter = lazy(() => import('./pages/JsonTools/JsonFormatter').then(m => ({ default: m.JsonFormatter })));
const JsonValidator = lazy(() => import('./pages/JsonTools/JsonValidator').then(m => ({ default: m.JsonValidator })));
const JsonMinifier = lazy(() => import('./pages/JsonTools/JsonMinifier').then(m => ({ default: m.JsonMinifier })));
const JsonToTypescriptGenerator = lazy(() => import('./pages/JsonTools/JsonToTypescriptGenerator').then(m => ({ default: m.JsonToTypescriptGenerator })));
const UuidGenerator = lazy(() => import('./pages/UuidGenerator').then(m => ({ default: m.UuidGenerator })));
const TextCaseConverter = lazy(() => import('./pages/TextCaseConverter').then(m => ({ default: m.TextCaseConverter })));
const JsonPrettyTool = lazy(() => import('./pages/JsonTools/JsonPretty').then(m => ({ default: m.JsonPrettyTool })));
const JsonToCsvTool = lazy(() => import('./pages/JsonTools/JsonToCsvTool').then(m => ({ default: m.JsonToCsvTool })));
const JsonToXmlTool = lazy(() => import('./pages/JsonTools/JsonToXmlTool').then(m => ({ default: m.JsonToXmlTool })));
const JsonToYamlTool = lazy(() => import('./pages/JsonTools/JsonToYamlTool').then(m => ({ default: m.JsonToYamlTool })));
const JsonToHtmlTableTool = lazy(() => import('./pages/JsonTools/JsonToHtmlTableTool').then(m => ({ default: m.JsonToHtmlTableTool })));
const JsonCompareTool = lazy(() => import('./pages/JsonTools/JsonCompareTool').then(m => ({ default: m.JsonCompareTool })));
const JsonSortKeysTool = lazy(() => import('./pages/JsonTools/JsonSortKeysTool').then(m => ({ default: m.JsonSortKeysTool })));
const Base64EncodeTool = lazy(() => import('./pages/EDTools/Base64EncodeTool').then(m => ({ default: m.Base64EncodeTool })));
const Base64DecodeTool = lazy(() => import('./pages/EDTools/Base64DecodeTool').then(m => ({ default: m.Base64DecodeTool })));
const UrlEncodeTool = lazy(() => import('./pages/EDTools/UrlEncodeTool').then(m => ({ default: m.UrlEncodeTool })));
const UrlDecodeTool = lazy(() => import('./pages/EDTools/UrlDecodeTool').then(m => ({ default: m.UrlDecodeTool })));
const HtmlEncodeDecodeTool = lazy(() => import('./pages/EDTools/HtmlEncodeDecodeTool').then(m => ({ default: m.HtmlEncodeDecodeTool })));
const JwtDecoderTool = lazy(() => import('./pages/EDTools/JwtDecoderTool').then(m => ({ default: m.JwtDecoderTool })));
const TextBase64Tool = lazy(() => import('./pages/EDTools/TextBase64Tool').then(m => ({ default: m.TextBase64Tool })));
const UnicodeConverterTool = lazy(() => import('./pages/EDTools/UnicodeConverterTool').then(m => ({ default: m.UnicodeConverterTool })));
const StringComparison = lazy(() => import('./pages/StringComparison').then(m => ({ default: m.StringComparison })));
const PasswordGenerator = lazy(() => import('./pages/PasswordGenerator').then(m => ({ default: m.PasswordGenerator })));
const WordCounter = lazy(() => import('./pages/WordCounter').then(m => ({ default: m.WordCounter })));
const SqlFormatter = lazy(() => import('./pages/SqlFormatter').then(m => ({ default: m.SqlFormatter })));
const AgeCalculator = lazy(() => import('./pages/AgeCalculator').then(m => ({ default: m.AgeCalculator })));
const CoupleAgeCalculator = lazy(() => import('./pages/CoupleAgeCalculator').then(m => ({ default: m.CoupleAgeCalculator })));
const GstCalculator = lazy(() => import('./pages/GstCalculator').then(m => ({ default: m.GstCalculator })));
const EmiCalculator = lazy(() => import('./pages/EmiCalculator').then(m => ({ default: m.EmiCalculator })));
const TimeBetweenDates = lazy(() => import('./pages/TimeBetweenDates').then(m => ({ default: m.TimeBetweenDates })));
const ImageToBase64 = lazy(() => import('./pages/JsonTools/ImageToBase64').then(m => ({ default: m.ImageToBase64 })));
const Base64ToImage = lazy(() => import('./pages/Base64ToImage').then(m => ({ default: m.Base64ToImage })));
const ImageSizeConverterTool = lazy(() => import('./pages/ImageTools/ImageSizeConverterTool').then(m => ({ default: m.ImageSizeConverterTool })));
const ImageCompressor = lazy(() => import('./pages/ImageCompressor').then(m => ({ default: m.ImageCompressor })));
const Security = lazy(() => import('./pages/Security').then(m => ({ default: m.Security })));
const SessionVault = lazy(() => import('./pages/SessionVault').then(m => ({ default: m.SessionVault })));
const ProImageTool = lazy(() => import('./pages/ImageTools/ProImageTool').then(m => ({ default: m.ProImageTool })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })));
const Disclaimer = lazy(() => import('./pages/Disclaimer').then(m => ({ default: m.Disclaimer })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));
const Guides = lazy(() => import('./pages/Guides').then(m => ({ default: m.Guides })));
const WhatIsJson = lazy(() => import('./pages/guides/WhatIsJson').then(m => ({ default: m.WhatIsJson })));
const Base64Explained = lazy(() => import('./pages/guides/Base64Explained').then(m => ({ default: m.Base64Explained })));
const ImageCompressionGuide = lazy(() => import('./pages/guides/ImageCompressionGuide').then(m => ({ default: m.ImageCompressionGuide })));
const StrongPasswordGuide = lazy(() => import('./pages/guides/StrongPasswordGuide').then(m => ({ default: m.StrongPasswordGuide })));

// PDF Tools
const PdfEditor = lazy(() => import('./pages/PdfTools/PdfEditor').then(m => ({ default: m.PdfEditor })));
const CreatePdf = lazy(() => import('./pages/PdfTools/CreatePdf').then(m => ({ default: m.CreatePdf })));
const MergePdf = lazy(() => import('./pages/PdfTools/MergePdf').then(m => ({ default: m.MergePdf })));
const SplitPdf = lazy(() => import('./pages/PdfTools/SplitPdf').then(m => ({ default: m.SplitPdf })));
const AddFilesToPdf = lazy(() => import('./pages/PdfTools/AddFilesToPdf').then(m => ({ default: m.AddFilesToPdf })));
const CompressPdf = lazy(() => import('./pages/PdfTools/CompressPdf').then(m => ({ default: m.CompressPdf })));
const PdfToWord = lazy(() => import('./pages/PdfTools/PdfToWord').then(m => ({ default: m.PdfToWord })));
const ImageToPdf = lazy(() => import('./pages/PdfTools/ImageToPdf').then(m => ({ default: m.ImageToPdf })));

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <HelmetProvider>
          <Router>
            <Layout>
              <Suspense fallback={
                <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                  <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 animate-pulse">Initializing Laboratory...</p>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/pdf" element={<Home />} />
                  <Route path="/calculator" element={<Home />} />

                  {/* PDF Tools */}
                  <Route path="/pdf/editor" element={<PdfEditor />} />
                  <Route path="/pdf/create" element={<CreatePdf />} />
                  <Route path="/pdf/merge" element={<MergePdf />} />
                  <Route path="/pdf/split" element={<SplitPdf />} />
                  <Route path="/pdf/add-files" element={<AddFilesToPdf />} />
                  <Route path="/pdf/compress" element={<CompressPdf />} />
                  <Route path="/pdf-to-word" element={<PdfToWord />} />
                  <Route path="/image-to-pdf" element={<ImageToPdf />} />
                  <Route path="/json-formatter" element={<JsonFormatter />} />
                  <Route path="/json-validator" element={<JsonValidator />} />
                  <Route path="/json-minifier" element={<JsonMinifier />} />
                  <Route path="/json-to-typescript" element={<JsonToTypescriptGenerator />} />
                  <Route path="/json-pretty-print" element={<JsonPrettyTool />} />
                  <Route path="/json-to-csv" element={<JsonToCsvTool />} />
                  <Route path="/json-to-xml" element={<JsonToXmlTool />} />
                  <Route path="/json-to-yaml" element={<JsonToYamlTool />} />
                  <Route path="/json-to-html-table" element={<JsonToHtmlTableTool />} />
                  <Route path="/json-compare" element={<JsonCompareTool />} />
                  <Route path="/json-sort-keys" element={<JsonSortKeysTool />} />
                  <Route path="/base64-encode" element={<Base64EncodeTool />} />
                  <Route path="/base64-decode" element={<Base64DecodeTool />} />
                  <Route path="/url-encode" element={<UrlEncodeTool />} />
                  <Route path="/url-decode" element={<UrlDecodeTool />} />
                  <Route path="/html-encode" element={<HtmlEncodeDecodeTool />} />

                  <Route path="/jwt-decoder" element={<JwtDecoderTool />} />
                  <Route path="/text-to-base64" element={<TextBase64Tool />} />
                  <Route path="/unicode-converter" element={<UnicodeConverterTool />} />

                  <Route path="/string-comparison" element={<StringComparison />} />
                  <Route path="/text-case-converter" element={<TextCaseConverter />} />
                  <Route path="/password-generator" element={<PasswordGenerator />} />
                  <Route path="/uuid-generator" element={<UuidGenerator />} />
                  <Route path="/word-counter" element={<WordCounter />} />
                  <Route path="/sql-formatter" element={<SqlFormatter />} />
                  <Route path="/age-calculator" element={<AgeCalculator />} />
                  <Route path="/couple-age-calculator" element={<CoupleAgeCalculator />} />
                  <Route path="/gst-calculator" element={<GstCalculator />} />
                  <Route path="/emi-calculator" element={<EmiCalculator />} />
                  <Route path="/time-between-dates" element={<TimeBetweenDates />} />
                  <Route path="/image-to-base64" element={<ImageToBase64 />} />
                  <Route path="/base64-to-image" element={<Base64ToImage />} />
                  <Route path="/image-size-converter" element={<ImageSizeConverterTool />} />
                  <Route path="/image-compressor" element={<ImageCompressor />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/vault" element={<SessionVault />} />
                  <Route path="/pro-image-tool" element={<ProImageTool />} />

                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/disclaimer" element={<Disclaimer />} />
                  <Route path="/tools" element={<Home />} />

                  <Route path="/guides" element={<Guides />} />
                  <Route path="/guides/what-is-json" element={<WhatIsJson />} />
                  <Route path="/guides/base64-encoding-explained" element={<Base64Explained />} />
                  <Route path="/guides/image-compression-guide" element={<ImageCompressionGuide />} />
                  <Route path="/guides/strong-password-guide" element={<StrongPasswordGuide />} />

                  {/* Fallback to NotFound */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Layout>
          </Router>
        </HelmetProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
