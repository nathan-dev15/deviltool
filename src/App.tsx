/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import { Home } from './pages/Home';
import { JsonFormatter } from './pages/JsonFormatter';
import { JsonValidator } from './pages/JsonValidator';
import { JsonMinifier } from './pages/JsonMinifier';
import { JsonPrettyTool } from './pages/JsonPretty';
import { JsonToCsvTool } from './pages/JsonToCsvTool';
import { HelmetProvider } from "react-helmet-async";
import { StringComparison } from './pages/StringComparison';
import { PasswordGenerator } from './pages/PasswordGenerator';
import { WordCounter } from './pages/WordCounter';
import { SqlFormatter } from './pages/SqlFormatter';
import { AgeCalculator } from './pages/AgeCalculator';
import { TimeBetweenDates } from './pages/TimeBetweenDates';
import { ImageToBase64 } from './pages/ImageToBase64';
import { ImageCompressor } from './pages/ImageCompressor';
import { Security } from './pages/Security';
import { SessionVault } from './pages/SessionVault';
import { JsonToTypescriptGenerator } from './pages/JsonToTypescriptGenerator';


export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/json-formatter" element={<JsonFormatter />} />
             <Route path="/json-validator" element={<JsonValidator />} />
<Route path="/json-minifier" element={<JsonMinifier />} />
<Route path="/json-to-typescript" element={<JsonToTypescriptGenerator />}/>
            <Route path="/json-pretty-print" element={<JsonPrettyTool />}/>
             <Route path="/json-to-csv" element={<JsonToCsvTool />}/>
        
            <Route path="/string-comparison" element={<StringComparison />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/word-counter" element={<WordCounter />} />
            <Route path="/sql-formatter" element={<SqlFormatter />} />
            <Route path="/age-calculator" element={<AgeCalculator />} />
            <Route path="/time-between-dates" element={<TimeBetweenDates />} />
            <Route path="/image-to-base64" element={<ImageToBase64 />} />
            <Route path="/image-compressor" element={<ImageCompressor />} />
            <Route path="/security" element={<Security />} />
            <Route path="/vault" element={<SessionVault />} />
            {/* Fallback to home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

