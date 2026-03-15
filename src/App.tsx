/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
// import { AuthProvider } from './context/AuthContext';
import { Home } from './pages/Home';
import { JsonFormatter } from './pages/JsonTools/JsonFormatter';
import { JsonValidator } from './pages/JsonTools/JsonValidator';
import { JsonMinifier } from './pages/JsonTools/JsonMinifier';
import { JsonPrettyTool } from './pages/JsonTools/JsonPretty';
import { JsonToCsvTool } from './pages/JsonTools/JsonToCsvTool';
import { JsonToXmlTool } from './pages/JsonTools/JsonToXmlTool';
import { JsonToYamlTool } from './pages/JsonTools/JsonToYamlTool';
import { JsonToHtmlTableTool } from './pages/JsonTools/JsonToHtmlTableTool';
import { JsonCompareTool } from './pages/JsonTools/JsonCompareTool';
import { HelmetProvider } from "react-helmet-async";
import { StringComparison } from './pages/StringComparison';
import { PasswordGenerator } from './pages/PasswordGenerator';
import { WordCounter } from './pages/WordCounter';
import { SqlFormatter } from './pages/SqlFormatter';
import { AgeCalculator } from './pages/AgeCalculator';
import { TimeBetweenDates } from './pages/TimeBetweenDates';
import { ImageToBase64 } from './pages/JsonTools/ImageToBase64';
import { Base64ToImage } from './pages/Base64ToImage';
import { ImageCompressor } from './pages/ImageCompressor';
import { Security } from './pages/Security';
import { SessionVault } from './pages/SessionVault';
import { JsonToTypescriptGenerator } from './pages/JsonTools/JsonToTypescriptGenerator';
import { JsonSortKeysTool } from './pages/JsonTools/JsonSortKeysTool';
import { Base64EncodeTool } from './pages/EDTools/Base64EncodeTool';
import { Base64DecodeTool } from './pages/EDTools/Base64DecodeTool';
import { UrlEncodeTool } from './pages/EDTools/UrlEncodeTool';
import { UrlDecodeTool } from './pages/EDTools/UrlDecodeTool';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/json-formatter" element={<JsonFormatter />} />
             <Route path="/json-validator" element={<JsonValidator />} />
<Route path="/json-minifier" element={<JsonMinifier />} />
<Route path="/json-to-typescript" element={<JsonToTypescriptGenerator />}/>
            <Route path="/json-pretty-print" element={<JsonPrettyTool />}/>
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


            <Route path="/string-comparison" element={<StringComparison />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/word-counter" element={<WordCounter />} />
            <Route path="/sql-formatter" element={<SqlFormatter />} />
            <Route path="/age-calculator" element={<AgeCalculator />} />
            <Route path="/time-between-dates" element={<TimeBetweenDates />} />
            <Route path="/image-to-base64" element={<ImageToBase64 />} />
            <Route path="/base64-to-image" element={<Base64ToImage />} />
            <Route path="/image-compressor" element={<ImageCompressor />} />
            <Route path="/security" element={<Security />} />
            <Route path="/vault" element={<SessionVault />} />
            {/* Fallback to home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
    </Router>
  );
}
