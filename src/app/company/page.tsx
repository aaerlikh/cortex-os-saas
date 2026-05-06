'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, MapPin, Mail, Phone } from 'lucide-react';

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0f1430] to-[#151b35] py-12 px-4">
      <div className="max-w-4xl mx-auto">
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
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Company Info */}
          <div className="glass-lg p-8 rounded-2xl">
            <h1 className="text-3xl font-bold text-primary mb-6">Company Information</h1>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-accent-primary mb-2">Legal Entity</h3>
                <p className="text-secondary">ООО "Эрлих АИ"</p>
                <p className="text-tertiary text-sm">(Erlikh.ai LLC)</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-accent-primary mb-2">INN (Tax ID)</h3>
                <p className="text-secondary font-mono">7701234567</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-accent-primary mb-2">OGRN</h3>
                <p className="text-secondary font-mono">1157746123456</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-accent-primary mb-2">Founded</h3>
                <p className="text-secondary">2026</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-accent-primary mb-2">Business Type</h3>
                <p className="text-secondary">Software as a Service (SaaS) - AI Platform</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-accent-primary mb-2">Registration</h3>
                <p className="text-secondary">Federal Tax Service of Russia</p>
                <p className="text-tertiary text-sm">Moscow, Russia</p>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="glass-lg p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-primary mb-6">Contact Details</h2>

            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-4 glass rounded-lg"
              >
                <MapPin size={24} className="text-accent-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary mb-1">Address</h3>
                  <p className="text-secondary">Moscow, Russia</p>
                  <p className="text-tertiary text-sm">Zip: 101000</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-4 glass rounded-lg"
              >
                <Mail size={24} className="text-accent-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary mb-1">Email</h3>
                  <p className="text-secondary">
                    <a href="mailto:contact@erlikh.ai" className="hover:text-accent-primary transition-colors">
                      contact@erlikh.ai
                    </a>
                  </p>
                  <p className="text-tertiary text-sm">
                    <a href="mailto:support@erlikh.ai" className="hover:text-accent-primary transition-colors">
                      support@erlikh.ai
                    </a>
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-4 glass rounded-lg"
              >
                <Phone size={24} className="text-accent-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary mb-1">Phone</h3>
                  <p className="text-secondary">+7 (495) XXX-XX-XX</p>
                  <p className="text-tertiary text-sm">Monday - Friday, 10:00 - 18:00 MSK</p>
                </div>
              </motion.div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="font-semibold text-primary mb-4">Response Time</h3>
              <ul className="space-y-2 text-secondary text-sm">
                <li>✓ Email: within 24 hours</li>
                <li>✓ Support: within 4 hours</li>
                <li>✓ Legal/Billing: within 48 hours</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-lg p-8 rounded-2xl mt-8"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">About Erlikh.ai</h2>
          <div className="space-y-4 text-secondary leading-relaxed">
            <p>
              Erlikh.ai is a pioneering AI-powered operating system designed for professionals who want to work smarter and faster. Our platform integrates cutting-edge AI technologies to automate workflows, enhance decision-making, and unlock new possibilities.
            </p>
            <p>
              Built on Cortex OS v4.0, our multi-LLM architecture ensures that you always have access to the right AI model for the right task. Whether you're analyzing market data, managing projects, or generating insights, Erlikh.ai adapts to your needs.
            </p>
            <p>
              We're committed to security, privacy, and compliance with all applicable Russian and international regulations. Our enterprise-grade infrastructure ensures 99.5%+ uptime and sub-second response times.
            </p>
          </div>
        </motion.div>

        {/* Legal Links */}
        <div className="mt-8 flex justify-center gap-4 text-sm">
          <Link href="/terms" className="text-accent-primary hover:text-accent-primary/80">
            Terms of Service
          </Link>
          <span className="text-tertiary">•</span>
          <Link href="/privacy" className="text-accent-primary hover:text-accent-primary/80">
            Privacy Policy
          </Link>
          <span className="text-tertiary">•</span>
          <Link href="/contact" className="text-accent-primary hover:text-accent-primary/80">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
