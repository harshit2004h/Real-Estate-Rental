import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import FooterSection from "@/components/landing/FooterSection";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Whether you&apos;re a tenant looking for your next home or a property manager wanting to list your properties, we&apos;re here to help.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">Chandigarh, India</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91 94736 32979</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">testdesk.work@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Sat - Sun: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <MessageCircle className="h-6 w-6 text-primary-700 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                  </div>
                  
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Enter your first name"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Enter your last name"
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="What is this message about?"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        className="w-full"
                      />
                    </div>
                    
                    <Button className="w-full bg-primary-700 hover:bg-primary-800 text-white">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions. Can&apos;t find what you&apos;re looking for? Contact us directly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">How do I search for properties?</h3>
                <p className="text-gray-600 text-sm">
                  Use our advanced search filters to find properties by location, price, amenities, and more.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">How do I apply for a property?</h3>
                <p className="text-gray-600 text-sm">
                  Click on any property and use the &quot;Apply Now&quot; button to submit your application online.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Is the payment process secure?</h3>
                <p className="text-gray-600 text-sm">
                  Yes, we use Razorpay for secure payment processing with industry-standard encryption.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Can property managers list for free?</h3>
                <p className="text-gray-600 text-sm">
                  Property managers can create accounts and list their properties on our platform.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">How do I track my applications?</h3>
                <p className="text-gray-600 text-sm">
                  Use your tenant dashboard to view all your applications and their current status.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Need more help?</h3>
                <p className="text-gray-600 text-sm">
                  Visit our comprehensive FAQ page or contact our support team directly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default ContactPage;