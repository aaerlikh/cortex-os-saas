'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0f1430] to-[#151b35] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-lg p-8 rounded-2xl"
        >
          <h1 className="text-4xl font-bold text-primary mb-8">Privacy Policy</h1>

          <div className="space-y-8 text-secondary leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">1. Introduction</h2>
              <p>
                Erlikh.ai ("Company", "we", "our", or "us") operates the Cortex OS platform. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">2. Information Collection and Use</h2>
              <p className="mb-4">We collect several different types of information for various purposes to provide and improve our Service to you:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Personal Data:</strong> Email address, name, phone number, billing address</li>
                <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, time spent, referral source</li>
                <li><strong>Cookies & Tracking:</strong> Session data, preferences, analytics</li>
                <li><strong>Payment Information:</strong> Processed through YooKassa (PCI-DSS compliant)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">3. Use of Data</h2>
              <p>Erlikh.ai uses the collected data for various purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>To provide and maintain the Service</li>
                <li>To notify you about changes to the Service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information to improve the Service</li>
                <li>To monitor the usage of the Service</li>
                <li>To detect, prevent and address technical and security issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">4. Security of Data</h2>
              <p>
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">5. Third-Party Services</h2>
              <p className="mb-4">
                Our Service may contain links to third-party sites that are not operated by us. This Privacy Policy does not apply to third-party sites, and we are not responsible for their privacy practices. We encourage you to review their privacy policies.
              </p>
              <div className="mt-4 p-4 glass rounded-lg text-sm">
                <p><strong>Payment Processing:</strong> YooKassa (compliant with Russian payment regulations)</p>
                <p><strong>Authentication:</strong> NextAuth.js + Google OAuth</p>
                <p><strong>Analytics:</strong> Google Analytics (anonymized)</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">6. Data Retention</h2>
              <p>
                Erlikh.ai will retain your Personal Data only for as long as necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">8. Compliance with Russian Law</h2>
              <p>
                This Service complies with the Russian Federal Law No. 152-FZ "On Personal Data". All data processing is conducted in accordance with applicable Russian data protection regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">9. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the bottom of this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">10. Contact Us</h2>
              <div className="mt-4 p-4 glass rounded-lg">
                <p className="mb-2">If you have any questions about this Privacy Policy, please contact us at:</p>
                <p><strong>Email:</strong> privacy@erlikh.ai</p>
                <p><strong>Address:</strong> Moscow, Russia</p>
              </div>
            </section>

            <div className="border-t border-white/10 pt-8 mt-8 text-sm text-tertiary">
              <p>Last updated: May 6, 2026</p>
              <p>© 2026 Erlikh.ai. All rights reserved.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
