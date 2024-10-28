import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Shield, BarChart2, Users, ChevronRight, Star, Award, Globe,
  Brain, Bot, LineChart, Zap, Target, Sparkles, GitBranch, MessageSquare
} from 'lucide-react';
import MainNav from '../../components/MainNav';
import Footer from '../../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <MainNav />

      <main>
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-white mb-8">
              Next-Generation<br />
              <span className="text-indigo-400">AI-Powered Call Center</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Transform your call center with AI-driven insights, predictive analytics, and intelligent project management.
            </p>
            <div className="flex justify-center space-x-6">
              <Link to="/login" className="bg-indigo-500 text-white px-8 py-3 rounded-lg hover:bg-indigo-600 transition-colors flex items-center">
                Get Started <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="#features" className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg hover:border-gray-500 hover:text-white transition-colors">
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* AI Features Grid */}
        <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">AI-Powered Intelligence</h2>
            <p className="mt-4 text-gray-400">Harness the power of artificial intelligence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'Real-time Analysis',
                description: 'Live sentiment analysis and conversation insights during calls.'
              },
              {
                icon: Bot,
                title: 'Smart Routing',
                description: 'AI-powered call distribution based on agent skills and lead profiles.'
              },
              {
                icon: LineChart,
                title: 'Predictive Analytics',
                description: 'Forecast conversion rates and optimize call strategies.'
              },
              {
                icon: Zap,
                title: 'Automated Insights',
                description: 'AI-generated recommendations for performance improvement.'
              },
              {
                icon: Target,
                title: 'Performance Optimization',
                description: 'Continuous learning system that adapts to your success patterns.'
              },
              {
                icon: Sparkles,
                title: 'Smart Scripting',
                description: 'AI-optimized call scripts that adapt in real-time.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 transform hover:scale-105 transition-all">
                <feature.icon className="h-12 w-12 text-indigo-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Project Management Section */}
        <div className="bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white">Intelligent Project Management</h2>
              <p className="mt-4 text-gray-400">Streamline operations with AI-assisted project tracking</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: GitBranch,
                  title: 'Task Automation',
                  description: 'AI-powered task assignment and progress tracking'
                },
                {
                  icon: Users,
                  title: 'Team Collaboration',
                  description: 'Integrated communication and resource management'
                },
                {
                  icon: BarChart2,
                  title: 'Performance Analytics',
                  description: 'Real-time metrics and predictive insights'
                },
                {
                  icon: MessageSquare,
                  title: 'Smart Reporting',
                  description: 'Automated reports with AI-generated insights'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6">
                  <feature.icon className="h-12 w-12 text-indigo-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-800 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Active Users', value: '10,000+' },
                { label: 'AI Insights/Day', value: '1M+' },
                { label: 'Success Rate', value: '98%' },
                { label: 'ROI Increase', value: '45%' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-indigo-400 mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Trusted by Industry Leaders</h2>
            <p className="mt-4 text-gray-400">See how AI is transforming call centers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The AI insights have revolutionized our approach to customer engagement. Our conversion rates are up 40%.",
                author: "Sarah Johnson",
                title: "Sales Director, TechCorp"
              },
              {
                quote: "Project management with AI-powered insights has streamlined our operations and improved team efficiency.",
                author: "Michael Chen",
                title: "Operations Manager, GlobalSales"
              },
              {
                quote: "Real-time sentiment analysis and smart routing have transformed our customer experience metrics.",
                author: "Emily Rodriguez",
                title: "Call Center Manager, LeadGen Pro"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">{testimonial.quote}</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}