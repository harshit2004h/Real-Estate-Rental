"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Search, Home, CreditCard, Users, Shield, HelpCircle } from "lucide-react";
import FooterSection from "@/components/landing/FooterSection";
import Link from "next/link";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 pb-4 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        <ChevronDown className={`h-5 w-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQPage = () => {
  const faqCategories = [
    {
      title: "Getting Started",
      icon: Home,
      color: "bg-blue-100 text-blue-700",
      faqs: [
        {
          question: "What is SwiftStay?",
          answer: "SwiftStay is a comprehensive real estate rental platform that connects tenants with property managers. We provide tools for property search, application management, lease tracking, and secure payment processing."
        },
        {
          question: "How do I create an account?",
          answer: "Click the 'Sign Up' button in the top navigation. You can register as either a tenant (looking for properties) or a property manager (listing properties). Follow the registration process and verify your email to get started."
        },
        {
          question: "Is SwiftStay free to use?",
          answer: "Yes, creating an account and browsing properties is completely free for tenants. Property managers can also create accounts and list properties. We may charge small transaction fees for payment processing."
        },
        {
          question: "What areas does SwiftStay cover?",
          answer: "SwiftStay currently focuses on major cities across India, with plans to expand to more locations. You can search for properties by city or use our map-based search to find rentals in your preferred area."
        }
      ]
    },
    {
      title: "Property Search & Applications",
      icon: Search,
      color: "bg-green-100 text-green-700",
      faqs: [
        {
          question: "How do I search for properties?",
          answer: "Use our advanced search feature on the homepage or search page. You can filter by location, price range, property type, number of bedrooms, amenities, and more. Our interactive map also lets you explore properties by area."
        },
        {
          question: "How do I apply for a property?",
          answer: "Once you find a property you like, click on it to view details, then click 'Apply Now'. You'll need to fill out an application form with your personal information, employment details, and references."
        },
        {
          question: "Can I apply for multiple properties?",
          answer: "Yes, you can apply for as many properties as you like. Track all your applications in your tenant dashboard, where you can see the status of each application."
        },
        {
          question: "How long does the application process take?",
          answer: "Application processing times vary by property manager, but typically take 1-3 business days. You'll receive notifications about your application status via email and in your dashboard."
        },
        {
          question: "What documents do I need for an application?",
          answer: "Common documents include ID proof, income verification (salary slips, bank statements), employment letter, and references. Specific requirements may vary by property manager."
        }
      ]
    },
    {
      title: "Payments & Pricing",
      icon: CreditCard,
      color: "bg-purple-100 text-purple-700",
      faqs: [
        {
          question: "How do I make rental payments?",
          answer: "Once your lease is approved, you can make payments directly through our platform using Razorpay. We support credit cards, debit cards, UPI, and net banking."
        },
        {
          question: "Is the payment process secure?",
          answer: "Yes, all payments are processed through Razorpay, which uses industry-standard encryption and security measures. We never store your payment information on our servers."
        },
        {
          question: "When are rental payments due?",
          answer: "Payment due dates are specified in your lease agreement. You'll receive reminders before payments are due, and you can set up automatic payments for convenience."
        },
        {
          question: "What payment methods are accepted?",
          answer: "We accept all major credit and debit cards, UPI payments, net banking, and digital wallets through our Razorpay integration."
        },
        {
          question: "Can I get a receipt for my payments?",
          answer: "Yes, you'll automatically receive digital receipts for all payments. You can download and print receipts from your tenant dashboard at any time."
        }
      ]
    },
    {
      title: "For Property Managers",
      icon: Users,
      color: "bg-orange-100 text-orange-700",
      faqs: [
        {
          question: "How do I list a property?",
          answer: "Create a property manager account, verify your details, then use the 'Add New Property' feature in your dashboard. Include high-quality photos, detailed descriptions, and accurate pricing information."
        },
        {
          question: "How much does it cost to list properties?",
          answer: "Listing properties on SwiftStay is free. We may charge a small percentage fee only when you successfully rent out a property and receive payments through our platform."
        },
        {
          question: "How do I manage applications?",
          answer: "Use your manager dashboard to view all applications for your properties. You can review tenant details, approve or reject applications, and communicate with potential tenants."
        },
        {
          question: "Can I manage multiple properties?",
          answer: "Yes, you can list and manage unlimited properties through your manager dashboard. Each property has its own application tracking and lease management tools."
        },
        {
          question: "How do I receive rental payments?",
          answer: "Rental payments are processed through Razorpay and transferred to your registered bank account according to your chosen payout schedule (weekly, bi-weekly, or monthly)."
        }
      ]
    },
    {
      title: "Account & Security",
      icon: Shield,
      color: "bg-red-100 text-red-700",
      faqs: [
        {
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the sign-in page, enter your email address, and follow the instructions in the reset email we send you."
        },
        {
          question: "How do I update my profile information?",
          answer: "Go to your dashboard and click on 'Settings' to update your personal information, contact details, and preferences."
        },
        {
          question: "Is my personal information safe?",
          answer: "Yes, we use enterprise-grade security measures to protect your data. We comply with data protection regulations and never share your personal information without your consent."
        },
        {
          question: "Can I delete my account?",
          answer: "Yes, you can delete your account from the Settings page. Note that this action is permanent and cannot be undone. Make sure to complete any ongoing leases or applications first."
        },
        {
          question: "How do I contact support?",
          answer: "You can reach our support team through the Contact page, email us at support@swiftstay.com, or use the chat feature in your dashboard."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center">
            <HelpCircle className="h-16 w-16 mx-auto mb-4 text-primary-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Find answers to common questions about using SwiftStay. Can&apos;t find what you&apos;re looking for? Contact our support team.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="border-none shadow-lg">
                <CardContent className="p-0">
                  {/* Category Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-lg ${category.color} mr-4`}>
                        <category.icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                    </div>
                  </div>
                  
                  {/* FAQ Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => (
                        <FAQItem key={faqIndex} question={faq.question} answer={faq.answer} />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our support team is here to help. Reach out to us and we&apos;ll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors"
            >
              Contact Support
            </Link>
            <a
              href="mailto:testdesk.personal@gmail.com"
              className="border-2 border-primary-700 text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 hover:text-white transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default FAQPage;