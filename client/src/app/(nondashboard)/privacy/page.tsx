import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, Lock, Database, Users, Globe } from "lucide-react";
import FooterSection from "@/components/landing/FooterSection";
import Link from "next/link";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center">
            <Shield className="h-16 w-16 mx-auto mb-4 text-primary-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-primary-200 mt-4">Last updated: September 16, 2025</p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="space-y-8">
            
            {/* Introduction */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Eye className="h-6 w-6 text-primary-700 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    SwiftStay (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                  </p>
                  <p>
                    Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access or use our Service.
                  </p>
                  <p>
                    This Privacy Policy applies to all information we collect through our Service and any related services, sales, marketing, or events.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Database className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">2. Information We Collect</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  <p>We may collect personally identifiable information that you voluntarily provide to us when you:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Register for an account</li>
                    <li>Apply for a property rental</li>
                    <li>List a property for rent</li>
                    <li>Make a payment through our platform</li>
                    <li>Contact us for support</li>
                    <li>Subscribe to our newsletter</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mt-6">Types of Personal Information</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Name and contact information (email, phone, address)</li>
                    <li>Identity verification documents</li>
                    <li>Employment and income information</li>
                    <li>Payment and billing information</li>
                    <li>Property preferences and search history</li>
                    <li>Communication history with us and other users</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6">Automatically Collected Information</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Usage data and analytics</li>
                    <li>Cookies and tracking technologies</li>
                    <li>Location information (with your consent)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Users className="h-6 w-6 text-green-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">3. How We Use Your Information</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>We use the information we collect for various purposes, including:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Providing and maintaining our Service</li>
                    <li>Processing property rental applications</li>
                    <li>Facilitating communication between tenants and property managers</li>
                    <li>Processing payments and financial transactions</li>
                    <li>Sending you updates about your account and applications</li>
                    <li>Improving our Service and user experience</li>
                    <li>Detecting and preventing fraud or unauthorized access</li>
                    <li>Complying with legal obligations</li>
                    <li>Marketing and promotional communications (with your consent)</li>
                    <li>Providing customer support</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Globe className="h-6 w-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">4. How We Share Your Information</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>We may share your information in the following situations:</p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mt-6">With Other Users</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Property managers can view tenant application information</li>
                    <li>Tenants can view property manager contact information</li>
                    <li>Reviews and ratings may be visible to other users</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6">With Service Providers</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Payment processors (Razorpay) for transaction processing</li>
                    <li>Cloud hosting providers (AWS) for data storage</li>
                    <li>Analytics providers for service improvement</li>
                    <li>Customer support tools and services</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6">Legal Requirements</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>When required by law or legal process</li>
                    <li>To protect our rights and safety</li>
                    <li>To investigate fraud or security issues</li>
                    <li>In connection with business transfers or mergers</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Lock className="h-6 w-6 text-red-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">5. Data Security</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mt-6">Security Measures Include:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>SSL/TLS encryption for data transmission</li>
                    <li>Encrypted storage of sensitive information</li>
                    <li>Regular security audits and monitoring</li>
                    <li>Access controls and authentication</li>
                    <li>Staff training on data protection</li>
                    <li>Secure payment processing through Razorpay</li>
                  </ul>

                  <p className="mt-4">
                    However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee absolute security.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Your Privacy Rights</h2>
                <div className="space-y-4 text-gray-700">
                  <p>You have certain rights regarding your personal information:</p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mt-6">Access and Portability</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Request access to your personal information</li>
                    <li>Receive a copy of your data in a portable format</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6">Correction and Updates</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Update your account information at any time</li>
                    <li>Request correction of inaccurate information</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6">Deletion</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Delete your account and associated data</li>
                    <li>Request removal of specific information (subject to legal requirements)</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6">Marketing Communications</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Opt-out of marketing emails at any time</li>
                    <li>Manage your communication preferences</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Cookies and Tracking</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We use cookies and similar tracking technologies to enhance your experience on our Service. Cookies help us remember your preferences, analyze site traffic, and provide personalized content.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mt-6">Types of Cookies We Use:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                    <li><strong>Performance Cookies:</strong> Help us understand how you use our site</li>
                    <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                    <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                  </ul>

                  <p className="mt-4">
                    You can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our Service.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Data Retention</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mt-6">Retention Periods:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Account Information:</strong> Until account deletion plus 30 days</li>
                    <li><strong>Application Data:</strong> 7 years for legal compliance</li>
                    <li><strong>Payment Records:</strong> 7 years for tax and legal requirements</li>
                    <li><strong>Support Communications:</strong> 3 years</li>
                    <li><strong>Analytics Data:</strong> 2 years in aggregated form</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Services */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Third-Party Services</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Our Service may contain links to third-party websites and services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mt-6">Key Third-Party Integrations:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Razorpay:</strong> Payment processing (subject to Razorpay&apos;s privacy policy)</li>
                    <li><strong>AWS:</strong> Cloud hosting and storage services</li>
                    <li><strong>Google Analytics:</strong> Website analytics (anonymized data)</li>
                    <li><strong>Email Services:</strong> Transactional and marketing emails</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Children&apos;s Privacy</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Our Service is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                  </p>
                  <p>
                    If we become aware that we have collected personal information from children under 18 without verification of parental consent, we will take steps to remove that information from our servers.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* International Transfers */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">11. International Data Transfers</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and that appropriate safeguards are in place.
                  </p>
                  <p>
                    By using our Service, you consent to the transfer of your information to India and other countries where we or our service providers operate.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Changes to Privacy Policy */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">12. Changes to This Privacy Policy</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                  </p>
                  <p>
                    We encourage you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">13. Contact Us</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Email:</strong> privacy@swiftstay.com</p>
                    <p><strong>Phone:</strong> +91 98765 43210</p>
                    <p><strong>Address:</strong> Mumbai, Maharashtra, India</p>
                  </div>
                  <p>
                    For data protection inquiries, please include &quot;Privacy Policy&quot; in the subject line of your email.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions about your privacy?</h2>
          <p className="text-lg text-gray-600 mb-8">
            We&apos;re committed to transparency and protecting your personal information. Contact us with any privacy concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/terms"
              className="border-2 border-primary-700 text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 hover:text-white transition-colors"
            >
              View Terms of Service
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default PrivacyPage;