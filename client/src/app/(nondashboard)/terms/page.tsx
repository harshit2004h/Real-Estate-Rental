import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Scale, Shield, AlertTriangle } from "lucide-react";
import FooterSection from "@/components/landing/FooterSection";
import Link from "next/link";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center">
            <Scale className="h-16 w-16 mx-auto mb-4 text-primary-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Please read these terms carefully before using SwiftStay. By using our service, you agree to these terms.
            </p>
            <p className="text-sm text-primary-200 mt-4">Last updated: September 16, 2025</p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="space-y-8">
            
            {/* Agreement Section */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <FileText className="h-6 w-6 text-primary-700 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">1. Agreement to Terms</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    By accessing and using SwiftStay (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                  <p>
                    These Terms of Service (&quot;Terms&quot;) govern your use of our website located at swiftstay.com (the &quot;Service&quot;) operated by SwiftStay (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
                  </p>
                  <p>
                    Our Privacy Policy also governs your use of the Service and explains how we collect, safeguard and disclose information that results from your use of our web pages.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* User Accounts */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">2. User Accounts</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
                  </p>
                  <p>
                    You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you without appropriate authorization.
                  </p>
                  <p>
                    We reserve the right to refuse service, terminate accounts, remove or edit content in our sole discretion.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Platform Usage */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Platform Usage</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    SwiftStay provides a platform that connects property managers with prospective tenants. We facilitate the rental process but are not a party to any rental agreements between users.
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">For Tenants:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>You may search and apply for properties listed on our platform</li>
                    <li>You must provide accurate information in your applications</li>
                    <li>You are responsible for communicating directly with property managers</li>
                    <li>You must comply with all lease terms agreed upon with property managers</li>
                  </ul>
                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">For Property Managers:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>You may list properties and manage rental applications</li>
                    <li>You must ensure all property information is accurate and up-to-date</li>
                    <li>You are responsible for compliance with local housing laws and regulations</li>
                    <li>You must respond to tenant applications in a timely manner</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Payments and Fees */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Payments and Fees</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Our platform integrates with Razorpay for payment processing. By using our payment services, you agree to Razorpay&apos;s terms and conditions.
                  </p>
                  <p>
                    We may charge transaction fees for payment processing. All fees will be clearly disclosed before any transaction is processed.
                  </p>
                  <p>
                    Refunds are subject to the terms agreed upon between tenants and property managers. SwiftStay does not guarantee refunds but will assist in dispute resolution when possible.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Prohibited Uses */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">5. Prohibited Uses</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>You may not use our Service:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>To violate any international, federal, provincial or state regulations, rules, laws, or local ordinances</li>
                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>To submit false or misleading information</li>
                    <li>To upload or transmit viruses or any other type of malicious code</li>
                    <li>To collect or track the personal information of others</li>
                    <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                    <li>For any obscene or immoral purpose</li>
                    <li>To interfere with or circumvent the security features of the Service</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Intellectual Property Rights</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    The Service and its original content, features and functionality are and will remain the exclusive property of SwiftStay and its licensors. The Service is protected by copyright, trademark, and other laws.
                  </p>
                  <p>
                    You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Service without our express written consent.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimers */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Shield className="h-6 w-6 text-yellow-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">7. Disclaimers</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    SwiftStay acts as an intermediary platform and does not own, manage, or control any of the properties listed. We are not responsible for the accuracy of property listings or the conduct of users.
                  </p>
                  <p>
                    The information on this website is provided on an &quot;as is&quot; basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms.
                  </p>
                  <p>
                    We do not warrant that the Service will be uninterrupted, timely, secure, or error-free. We do not warrant the results that may be obtained from the use of the Service.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Limitation of Liability</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    In no event shall SwiftStay, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.
                  </p>
                  <p>
                    Our total liability to you for any damages shall not exceed the amount paid by you to us in the twelve (12) months preceding the event giving rise to the liability.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Termination</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.
                  </p>
                  <p>
                    Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, you may simply discontinue using the Service.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Governing Law</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    These Terms shall be interpreted and governed by the laws of India, without regard to its conflict of law provisions.
                  </p>
                  <p>
                    Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra, India.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Changes to Terms</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                  </p>
                  <p>
                    By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">12. Contact Information</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p>Email: legal@swiftstay.com</p>
                    <p>Phone: +91 98765 43210</p>
                    <p>Address: Mumbai, Maharashtra, India</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions about our Terms?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our legal team is here to help clarify any questions you may have about these terms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/privacy"
              className="border-2 border-primary-700 text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 hover:text-white transition-colors"
            >
              View Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default TermsPage;