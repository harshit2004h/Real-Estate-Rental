import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie, Settings, Shield, Eye } from "lucide-react";
import FooterSection from "@/components/landing/FooterSection";
import Link from "next/link";

const CookiesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center">
            <Cookie className="h-16 w-16 mx-auto mb-4 text-primary-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Learn about how we use cookies and similar technologies to improve your experience on SwiftStay.
            </p>
            <p className="text-sm text-primary-200 mt-4">Last updated: September 16, 2025</p>
          </div>
        </div>
      </section>

      {/* Cookie Policy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="space-y-8">
            
            {/* What are Cookies */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Eye className="h-6 w-6 text-primary-700 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">1. What are Cookies?</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better browsing experience by remembering your preferences and understanding how you use our site.
                  </p>
                  <p>
                    Cookies contain information that is transferred to your device&apos;s storage. They allow us to recognize your device and store some information about your preferences or past actions.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Cookies */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Settings className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">2. How We Use Cookies</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>We use cookies for several purposes:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>To enable essential website functionality</li>
                    <li>To remember your login status and preferences</li>
                    <li>To analyze website traffic and user behavior</li>
                    <li>To personalize your experience</li>
                    <li>To improve our services and user interface</li>
                    <li>To provide relevant advertisements</li>
                    <li>To ensure website security</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Types of Cookies */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Types of Cookies We Use</h2>
                <div className="space-y-6 text-gray-700">
                  
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                    <p>
                      These cookies are necessary for the website to function properly. They enable basic functions like page navigation, 
                      access to secure areas, and authentication. The website cannot function properly without these cookies.
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Examples:</strong> Session management, user authentication, security tokens
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Cookies</h3>
                    <p>
                      These cookies collect information about how visitors use our website, such as which pages are visited most often. 
                      This data helps us improve the website&apos;s performance and user experience.
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Examples:</strong> Google Analytics, page load times, error tracking
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Functional Cookies</h3>
                    <p>
                      These cookies allow the website to remember choices you make and provide enhanced, more personal features. 
                      They may be set by us or by third-party providers whose services we use.
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Examples:</strong> Language preferences, search filters, saved favorites
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Marketing Cookies</h3>
                    <p>
                      These cookies track your browsing habits to display relevant advertisements. They may be used to build a profile 
                      of your interests and show you relevant ads on other websites.
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Examples:</strong> Targeted advertising, social media integration, remarketing
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Cookies */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Third-Party Cookies</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Some cookies are placed by third-party services that appear on our pages. We have no control over these cookies, 
                    and they are subject to the respective third party&apos;s privacy policies.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mt-6">Third-Party Services We Use:</h3>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900">Google Analytics</h4>
                      <p className="text-sm text-gray-600">Website analytics and performance monitoring</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900">Razorpay</h4>
                      <p className="text-sm text-gray-600">Secure payment processing</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900">AWS CloudFront</h4>
                      <p className="text-sm text-gray-600">Content delivery and performance optimization</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900">Social Media</h4>
                      <p className="text-sm text-gray-600">Social sharing and integration features</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Managing Cookies */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Shield className="h-6 w-6 text-green-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">5. Managing Your Cookie Preferences</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    You have several options for managing cookies:
                  </p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mt-6">Browser Settings</h3>
                  <p>
                    Most web browsers allow you to control cookies through their settings preferences. You can:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Delete all cookies</li>
                    <li>Block all cookies</li>
                    <li>Allow all cookies</li>
                    <li>Block third-party cookies</li>
                    <li>Clear all cookies when you close the browser</li>
                  </ul>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <h4 className="font-semibold text-yellow-800">Important Note:</h4>
                    <p className="text-yellow-700 text-sm">
                      Disabling cookies may limit your ability to use certain features of our website. Some pages may not display correctly, 
                      and you may need to log in again each time you visit.
                    </p>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6">Browser-Specific Instructions</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold">Google Chrome</h4>
                      <p className="text-sm">Settings → Privacy and security → Cookies and other site data</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Mozilla Firefox</h4>
                      <p className="text-sm">Options → Privacy & Security → Cookies and Site Data</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Safari</h4>
                      <p className="text-sm">Preferences → Privacy → Block cookies</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Microsoft Edge</h4>
                      <p className="text-sm">Settings → Site permissions → Cookies and data storage</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cookie Consent */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Cookie Consent</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    When you first visit our website, we may ask for your consent to use cookies. You can choose to accept or decline 
                    non-essential cookies. Essential cookies will always be used as they are necessary for the website to function.
                  </p>
                  <p>
                    You can change your cookie preferences at any time by clearing your browser cookies or contacting us directly.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Updates to Cookie Policy */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Updates to This Cookie Policy</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, 
                    legal, or regulatory reasons. Please revisit this page regularly to stay informed about our use of cookies.
                  </p>
                  <p>
                    Any changes will be posted on this page with an updated revision date.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Contact Us</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Email:</strong> testdesk.personal@gmail.com</p>
                    <p><strong>Phone:</strong> +91 98765 43210</p>
                    <p><strong>Address:</strong> Chandigarh, India</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions about cookies?</h2>
          <p className="text-lg text-gray-600 mb-8">
            We&apos;re here to help you understand how we use cookies and how you can manage them.
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

export default CookiesPage;