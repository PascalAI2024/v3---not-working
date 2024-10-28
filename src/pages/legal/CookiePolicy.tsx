import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="text-xl font-bold text-gray-900">ViciNext</Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
        
        <div className="prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you
            visit our website. They are widely used to make websites work more efficiently and provide
            information to the owners of the site.
          </p>

          <h2>2. How We Use Cookies</h2>
          <p>
            We use cookies for the following purposes:
          </p>
          <ul>
            <li>Authentication and security</li>
            <li>Preferences and settings</li>
            <li>Analytics and performance</li>
            <li>Marketing and advertising</li>
          </ul>

          <h2>3. Types of Cookies We Use</h2>
          <h3>Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function properly. They enable core
            functionality such as security, network management, and accessibility.
          </p>

          <h3>Analytics Cookies</h3>
          <p>
            We use analytics cookies to understand how visitors interact with our website, helping us
            improve our services and user experience.
          </p>

          <h3>Functionality Cookies</h3>
          <p>
            These cookies enable enhanced functionality and personalization, such as remembering your
            preferences and settings.
          </p>

          <h3>Marketing Cookies</h3>
          <p>
            These cookies track your online activity to help advertisers deliver more relevant
            advertising or to limit how many times you see an advertisement.
          </p>

          <h2>4. Cookie Management</h2>
          <p>
            Most web browsers allow you to control cookies through their settings preferences.
            However, limiting cookies may impact your experience of our website.
          </p>

          <h2>5. Third-Party Cookies</h2>
          <p>
            We may use third-party services that use cookies. These services include:
          </p>
          <ul>
            <li>Google Analytics</li>
            <li>HubSpot</li>
            <li>Intercom</li>
            <li>LinkedIn Insights</li>
          </ul>

          <h2>6. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. We encourage you to periodically
            review this page for the latest information about our cookie practices.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at:
            <br />
            Email: privacy@vicinext.com
            <br />
            Address: 123 Tech Street, Suite 100, San Francisco, CA 94105
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}