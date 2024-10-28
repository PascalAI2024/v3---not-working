import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Shield, Award, Users, Globe, Zap } from 'lucide-react';
import MainNav from '../../components/MainNav';
import Footer from '../../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About ViciNext</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing call center operations with AI-powered intelligence and cutting-edge technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Phone className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Calling</h3>
            <p className="text-gray-600">
              AI-powered call distribution and intelligent routing for maximum efficiency.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <Shield className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Platform</h3>
            <p className="text-gray-600">
              Enterprise-grade security with end-to-end encryption and compliance.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <Award className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Assurance</h3>
            <p className="text-gray-600">
              Real-time monitoring and AI-driven quality assessment.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <Users className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Team Management</h3>
            <p className="text-gray-600">
              Comprehensive tools for managing and optimizing team performance.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <Globe className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Global Scale</h3>
            <p className="text-gray-600">
              Support for international operations with multi-language capabilities.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <Zap className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Integration</h3>
            <p className="text-gray-600">
              Quick setup and seamless integration with existing systems.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-8">
            At ViciNext, we're committed to transforming call center operations through innovative AI technology. 
            Our mission is to empower businesses with intelligent communication tools that enhance customer 
            experiences and drive operational excellence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                Continuously developing cutting-edge solutions that push industry boundaries.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                Maintaining the highest standards in service quality and performance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Focus</h3>
              <p className="text-gray-600">
                Prioritizing customer success through dedicated support and solutions.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Call Center?</h2>
          <div className="flex justify-center space-x-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Contact Sales
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}