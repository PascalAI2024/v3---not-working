import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="text-xl font-bold text-gray-900">ViciNext</Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using ViciNext's services, you agree to be bound by these Terms of Service
            and all applicable laws and regulations. If you do not agree with any of these terms, you
            are prohibited from using or accessing our services.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily access and use ViciNext's services for personal,
            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </p>

          <h2>3. Service Description</h2>
          <p>
            ViciNext provides AI-powered call center and communication solutions. Our services include:
          </p>
          <ul>
            <li>Predictive dialing capabilities</li>
            <li>AI-driven analytics and insights</li>
            <li>Call recording and monitoring</li>
            <li>Performance tracking and reporting</li>
          </ul>

          <h2>4. User Obligations</h2>
          <p>
            Users of ViciNext services agree to:
          </p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of their account credentials</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Use the services in a professional and ethical manner</li>
          </ul>

          <h2>5. Data Privacy</h2>
          <p>
            Our data collection and usage practices are outlined in our Privacy Policy. By using our
            services, you agree to our data handling practices as described in the Privacy Policy.
          </p>

          <h2>6. Service Availability</h2>
          <p>
            While we strive for 99.9% uptime, we do not guarantee uninterrupted access to our services.
            We reserve the right to modify, suspend, or discontinue any part of our services at any time.
          </p>

          <h2>7. Payment Terms</h2>
          <p>
            Paid services are billed in advance on a subscription basis. No refunds will be issued for
            partial use of services. All fees are exclusive of applicable taxes.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            All content, features, and functionality of ViciNext services are owned by ViciNext and
            are protected by international copyright, trademark, and other intellectual property laws.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            ViciNext shall not be liable for any indirect, incidental, special, consequential, or
            punitive damages resulting from your use or inability to use our services.
          </p>

          <h2>10. Termination</h2>
          <p>
            We reserve the right to terminate or suspend access to our services immediately, without
            prior notice, for any conduct that we believe violates these Terms of Service or is
            harmful to other users, us, or third parties.
          </p>

          <h2>11. Contact Information</h2>
          <p>
            Questions about the Terms of Service should be sent to us at legal@vicinext.com.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}