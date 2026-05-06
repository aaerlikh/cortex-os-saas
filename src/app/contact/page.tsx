'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Send, Loader } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-lg p-8 rounded-2xl h-fit"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">Get In Touch</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-accent-primary mb-2">📧 Email</h3>
                <p className="text-secondary mb-1">
                  <a href="mailto:contact@erlikh.ai" className="hover:text-accent-primary transition-colors">
                    contact@erlikh.ai
                  </a>
                </p>
                <p className="text-sm text-tertiary">General inquiries</p>
              </div>

              <div>
                <h3 className="font-semibold text-accent-primary mb-2">🆘 Support</h3>
                <p className="text-secondary mb-1">
                  <a href="mailto:support@erlikh.ai" className="hover:text-accent-primary transition-colors">
                    support@erlikh.ai
                  </a>
                </p>
                <p className="text-sm text-tertiary">Technical help & issues</p>
              </div>

              <div>
                <h3 className="font-semibold text-accent-primary mb-2">💼 Sales</h3>
                <p className="text-secondary mb-1">
                  <a href="mailto:sales@erlikh.ai" className="hover:text-accent-primary transition-colors">
                    sales@erlikh.ai
                  </a>
                </p>
                <p className="text-sm text-tertiary">Enterprise & partnerships</p>
              </div>

              <div>
                <h3 className="font-semibold text-accent-primary mb-2">⚖️ Legal</h3>
                <p className="text-secondary mb-1">
                  <a href="mailto:legal@erlikh.ai" className="hover:text-accent-primary transition-colors">
                    legal@erlikh.ai
                  </a>
                </p>
                <p className="text-sm text-tertiary">Legal & compliance</p>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h3 className="font-semibold text-accent-primary mb-2">📍 Location</h3>
                <p className="text-secondary">Moscow, Russia</p>
                <p className="text-sm text-tertiary">
                  Mon - Fri: 10:00 - 18:00 MSK
                </p>
              </div>

              <div className="bg-accent-primary/10 border border-accent-primary/20 rounded-lg p-4">
                <p className="text-sm text-secondary">
                  ✨ Average response time: <strong className="text-accent-primary">within 24 hours</strong>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-lg p-8 rounded-2xl"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">Send us a Message</h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-lg font-semibold text-primary mb-2">Message Sent!</h3>
                <p className="text-secondary">
                  Thanks for reaching out. We'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="input-base w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="input-base w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    required
                    className="input-base w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message (max 1000 characters)"
                    maxLength={1000}
                    rows={5}
                    required
                    className="input-base w-full resize-none"
                  />
                  <p className="text-xs text-tertiary mt-1">
                    {formData.message.length}/1000
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3 font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-xs text-tertiary text-center">
                  We respect your privacy. Check our{' '}
                  <Link href="/privacy" className="text-accent-primary hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            )}
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-lg p-8 rounded-2xl mt-8"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: 'How quickly will you respond?',
                a: 'We aim to respond within 24 hours for general inquiries and 4 hours for support issues.',
              },
              {
                q: 'Do you offer phone support?',
                a: 'Yes, phone support is available for enterprise customers. Contact our sales team for details.',
              },
              {
                q: 'What are your business hours?',
                a: 'We operate Monday to Friday, 10:00 - 18:00 MSK. Emergency support available 24/7 for enterprise customers.',
              },
              {
                q: 'How do I report a bug?',
                a: 'Please email support@erlikh.ai with detailed steps to reproduce the issue and your system information.',
              },
            ].map((item, idx) => (
              <div key={idx} className="glass-sm p-4 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">{item.q}</h3>
                <p className="text-secondary text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
