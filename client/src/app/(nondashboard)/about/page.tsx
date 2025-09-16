import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Code,
  Database,
  Server,
  Globe,
  Search,
  Shield,
} from "lucide-react";
import FooterSection from "@/components/landing/FooterSection";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About SwiftStay
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Revolutionizing the real estate rental experience with modern
              technology and user-centric design.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                SwiftStay is designed to simplify the process of finding and
                renting properties. Our platform connects tenants with property
                managers through an intuitive, feature-rich application that
                makes property rental seamless and efficient.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We believe that finding the perfect home should be exciting, not
                stressful. That&apos;s why we&apos;ve built a comprehensive
                platform that handles everything from property search to lease
                management and payment processing.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <h3 className="text-2xl font-bold text-primary-700">500+</h3>
                  <p className="text-gray-600">Properties Listed</p>
                </div>
                <div className="text-center p-4 bg-secondary-50 rounded-lg">
                  <h3 className="text-2xl font-bold text-secondary-700">
                    1000+
                  </h3>
                  <p className="text-gray-600">Happy Tenants</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/landing-discover-bg.jpg"
                alt="Modern apartment building"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-primary-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Search</h3>
                <p className="text-gray-600">
                  Advanced filtering and map-based search to find properties
                  that match your exact needs and preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-secondary-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Real-time Updates
                </h3>
                <p className="text-gray-600">
                  Get instant notifications about new properties, application
                  status, and important updates.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
                <p className="text-gray-600">
                  Integrated payment processing with Razorpay ensures secure and
                  hassle-free transactions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Meet the Developer
          </h2>
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 relative overflow-hidden rounded-full">
                    <Image
                      src="/Harshit.jpg"
                      fill
                      className="object-cover"
                      alt="Developer"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Harshit</h3>
                  <p className="text-primary-600 font-medium">
                    Full Stack Developer
                  </p>
                  <div className="flex justify-center space-x-4 mt-4">
                    <a
                      href="https://github.com/harshit2004h"
                      className="text-gray-600 hover:text-primary-600"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/harshit-srivastava-4876001b4"
                      className="text-gray-600 hover:text-primary-600"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="mailto:hsriv@gmail.com"
                      className="text-gray-600 hover:text-primary-600"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <p className="text-gray-700 mb-4">
                    Hi! I&apos;m Harshit, a passionate full-stack developer with
                    expertise in modern web technologies. SwiftStay represents
                    my commitment to creating practical, user-friendly
                    applications that solve real-world problems.
                  </p>
                  <p className="text-gray-700 mb-6">
                    With experience in React, Next.js, Node.js, and cloud
                    technologies, I&apos;ve built SwiftStay from the ground up
                    to provide a seamless rental experience for both tenants and
                    property managers.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>India</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>hsriv@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Built With Modern Technology
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Code className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
              <p className="text-sm text-gray-600">
                Next.js, React, TypeScript, Tailwind CSS
              </p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Server className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Backend</h3>
              <p className="text-sm text-gray-600">
                Node.js, Express, Prisma ORM
              </p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <Database className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Database</h3>
              <p className="text-sm text-gray-600">PostgreSQL, Redis Cache</p>
            </div>

            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <Globe className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Cloud</h3>
              <p className="text-sm text-gray-600">
                AWS Amplify, AWS RDS, AWS S3, AWS Lambda
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Next Home?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of users who trust SwiftStay for their rental needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Searching
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default AboutPage;
