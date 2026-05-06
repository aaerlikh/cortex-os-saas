'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-primary mb-8">Terms of Service</h1>

          <div className="space-y-8 text-secondary leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Cortex OS platform (hereinafter "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">2. Use License</h2>
              <p className="mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on Erlikh.ai's Cortex OS for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile, reverse engineer, disassemble, or hacking into any code</li>
                <li>Transferring the materials to another person or "mirroring" on any other server</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">3. Disclaimer</h2>
              <p>
                The materials on Erlikh.ai's Cortex OS are provided on an "as is" basis. Erlikh.ai makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">4. Limitations</h2>
              <p>
                In no event shall Erlikh.ai or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Cortex OS.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on Cortex OS could include technical, typographical, or photographic errors. Erlikh.ai does not warrant that any of the materials on its Service are accurate, complete, or current. Erlikh.ai may make changes to the materials contained on its Service at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">6. Materials on Third Party Sites</h2>
              <p>
                Erlikh.ai has not reviewed all of the sites linked to its Service and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Erlikh.ai of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">7. Modifications</h2>
              <p>
                Erlikh.ai may revise these terms of service for its Service at any time without notice. By using this Service, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of Russia, and you irrevocably submit to the exclusive jurisdiction of the courts in Moscow.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">9. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 p-4 glass rounded-lg">
                <p><strong>Email:</strong> legal@erlikh.ai</p>
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
