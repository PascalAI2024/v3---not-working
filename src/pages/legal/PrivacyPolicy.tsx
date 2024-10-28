import React from 'react';
import MainNav from '../../components/MainNav';
import Footer from '../../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MainNav />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <h2>1. Introduction</h2>
            <p>
              ViciNext ("we," "our," or "us") respects your privacy and is committed to protecting your personal data.
              This privacy policy explains how we collect, use, and protect your information when you use our services.
            </p>

            <h2>2. Information We Collect</h2>
            <ul>
              <li>Contact information (name, email, phone number)</li>
              <li>Usage data and analytics</li>
              <li>Call recordings and transcripts</li>
              <li>Performance metrics and statistics</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>
              We use your information to provide and improve our services, including:
            </p>
            <ul>
              <li>Operating and maintaining our platform</li>
              <li>Analyzing and improving performance</li>
              <li>Ensuring compliance with regulations</li>
              <li>Providing customer support</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access,
              alteration, disclosure, or destruction.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request transfer of your data</li>
            </ul>

            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@vicinext.com
              <br />
              Address: 123 Tech Street, Suite 100, San Francisco, CA 94105
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}