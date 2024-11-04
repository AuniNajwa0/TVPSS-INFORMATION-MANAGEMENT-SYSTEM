import React from 'react';
import { ArrowRight, BookOpen, Users, Calendar, Mail, Sparkles, GraduationCap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-orange-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-orange-600 to-pink-600 text-white">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8" />
            <span className="text-xl font-bold">BrightMinds Academy</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-orange-200">Home</a>
            <a href="#" className="hover:text-orange-200">About</a>
            <a href="#" className="hover:text-orange-200">Programs</a>
            <a href="#" className="hover:text-orange-200">Admissions</a>
            <a href="#" className="hover:text-orange-200">Contact</a>
          </div>
          <Button variant="secondary" className="hidden md:block bg-white text-orange-600 hover:bg-orange-100">
            Student Portal
          </Button>
        </nav>

        <div className="container mx-auto px-6 py-20">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Where Curiosity Meets Excellence
            </h1>
            <p className="text-xl mb-8 text-orange-100">
              Discover a world of possibilities in our innovative learning environment.
            </p>
            <div className="space-x-4">
              <Button variant="secondary" size="lg" className="bg-white text-orange-600 hover:bg-orange-100">
                Begin Your Journey
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-orange-500">
                Virtual Tour
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/50 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Sparkles className="h-12 w-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-orange-900">Innovative Learning</h3>
                <p className="text-orange-700">
                  Experience education reimagined through cutting-edge teaching methods and technology.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/50 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-orange-900">Excellence in Education</h3>
                <p className="text-orange-700">
                  Join a community dedicated to academic excellence and personal growth.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/50 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-orange-900">Diverse Community</h3>
                <p className="text-orange-700">
                  Thrive in an inclusive environment that celebrates diversity and collaboration.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-pink-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-orange-200">Student Success Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">2500+</div>
              <div className="text-orange-200">Active Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">180+</div>
              <div className="text-orange-200">Expert Faculty</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">60+</div>
              <div className="text-orange-200">Unique Programs</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-orange-900">
            Transform Your Future with Us
          </h2>
          <Button size="lg" className="bg-gradient-to-r from-orange-600 to-pink-600 text-white hover:from-orange-700 hover:to-pink-700">
            Apply Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-900 text-orange-200">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
              <p className="text-sm">
                BrightMinds Academy is dedicated to nurturing young minds and fostering a love for learning.
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Academic Programs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Student Life</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>500 Education Drive</li>
                <li>Innovation City, ST 54321</li>
                <li>Phone: (555) 123-4567</li>
                <li>Email: hello@brightminds.edu</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Stay Connected</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 w-full rounded-l focus:outline-none text-orange-900 bg-orange-100 placeholder-orange-400"
                />
                <Button variant="secondary" className="rounded-l-none bg-orange-600 hover:bg-orange-700 text-white">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-orange-800 mt-8 pt-8 text-sm text-center">
            © 2024 BrightMinds Academy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
