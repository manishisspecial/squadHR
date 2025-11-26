import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Users, 
  Calendar, 
  Clock, 
  DollarSign, 
  FileText, 
  Star, 
  Check,
  BarChart3,
  Shield,
  Zap,
  Globe
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Users,
      title: 'Employee Management',
      description: 'Comprehensive employee database with profiles, departments, and organizational hierarchy.',
    },
    {
      icon: Calendar,
      title: 'Leave Management',
      description: 'Streamlined leave requests, approvals, and tracking with real-time balance updates.',
    },
    {
      icon: Clock,
      title: 'Attendance Tracking',
      description: 'Automated clock in/out system with detailed attendance reports and analytics.',
    },
    {
      icon: DollarSign,
      title: 'Payroll Processing',
      description: 'Automated payroll calculations, payslip generation, and financial reporting.',
    },
    {
      icon: FileText,
      title: 'Document Management',
      description: 'Secure document storage and management for all employee-related files.',
    },
    {
      icon: Star,
      title: 'Performance Reviews',
      description: 'Comprehensive performance evaluation system with ratings and feedback.',
    },
  ];

  const benefits = [
    'Streamlined HR operations',
    'Real-time analytics and insights',
    'Secure and compliant',
    'Mobile-responsive design',
    'Easy to use interface',
    '24/7 availability',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SquadHR
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Features
              </a>
              <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Benefits
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Pricing
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium hidden sm:block"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fadeIn">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Zap className="h-4 w-4 mr-2" />
              All-in-One HR Solution
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Manage Your Workforce
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                With Ease
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Complete HR management platform designed to streamline your operations, 
              boost productivity, and empower your team. Everything you need in one place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                to="/register"
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 rounded-xl bg-white text-gray-700 font-semibold text-lg border-2 border-gray-200 hover:border-blue-300 transition-all shadow-lg hover:shadow-xl"
              >
                Sign In
              </Link>
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features to manage your entire HR ecosystem
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group p-8 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all transform hover:-translate-y-1 animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slideIn">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Why Choose SquadHR?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Transform your HR operations with our comprehensive platform designed for modern businesses.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit}
                    className="flex items-center space-x-3 animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <Check className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-lg text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-scaleIn">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Analytics Dashboard</p>
                        <p className="text-sm text-gray-600">Real-time insights</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-indigo-50">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-8 w-8 text-indigo-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Secure & Compliant</p>
                        <p className="text-sm text-gray-600">Enterprise-grade security</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-purple-50">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-8 w-8 text-purple-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Cloud-Based</p>
                        <p className="text-sm text-gray-600">Access from anywhere</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your organization. All plans include a 14-day free trial.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="rounded-2xl bg-white border-2 border-gray-200 p-8 hover:border-blue-300 transition-all transform hover:-translate-y-2 shadow-lg hover:shadow-xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                <p className="text-gray-600 mb-6">Perfect for small teams</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">$29</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Up to 10 employees</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Employee Management</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Leave Management</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Attendance Tracking</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Basic Reports</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Email Support</span>
                </li>
              </ul>
              <Link
                to="/register"
                className="block w-full text-center px-6 py-3 rounded-lg bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Professional Plan - Featured */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white transform scale-105 shadow-2xl relative">
              <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-bl-lg rounded-tr-2xl text-xs font-bold">
                MOST POPULAR
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <p className="text-blue-100 mb-6">Best for growing companies</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold">$79</span>
                  <span className="text-blue-100 ml-2">/month</span>
                </div>
                <p className="text-sm text-blue-100 mt-2">Up to 50 employees</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                  <span>Everything in Starter</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                  <span>Payroll Processing</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                  <span>Performance Reviews</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                  <span>Advanced Analytics</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                  <span>Document Management</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                  <span>Priority Support</span>
                </li>
              </ul>
              <Link
                to="/register"
                className="block w-full text-center px-6 py-3 rounded-lg bg-white text-blue-600 font-semibold hover:bg-gray-50 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="rounded-2xl bg-white border-2 border-gray-200 p-8 hover:border-blue-300 transition-all transform hover:-translate-y-2 shadow-lg hover:shadow-xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-6">For large organizations</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">Custom</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Unlimited employees</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Everything in Professional</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Custom Integrations</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Dedicated Account Manager</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Custom Reports & Dashboards</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">SSO & Advanced Security</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">24/7 Phone Support</span>
                </li>
              </ul>
              <Link
                to="/register"
                className="block w-full text-center px-6 py-3 rounded-lg bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              All plans include a <span className="font-semibold text-blue-600">14-day free trial</span>. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Transform Your HR?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of companies using SquadHR to streamline their HR operations.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 rounded-xl bg-white text-blue-600 font-semibold text-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-xl"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">SquadHR</span>
              </div>
              <p className="text-sm">
                Complete HR management solution for modern businesses.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 SquadHR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

