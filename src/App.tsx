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

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/json-formatter" element={<JsonFormatter />} />
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

