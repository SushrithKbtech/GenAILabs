import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-brand-950 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="font-display font-black text-5xl text-white uppercase tracking-tight mb-4">Get In Touch</h1>
          <p className="text-slate-400 text-xl">Have questions about our programs? Ready to commit?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="space-y-12">
            <div className="bg-slate-900 p-8 rounded-lg border border-slate-800">
              <h3 className="font-display font-bold text-2xl text-white uppercase mb-8">Contact Info</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-900/20 p-3 rounded-md text-brand-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase mb-1">Location</h4>
                    <p className="text-slate-400">Iron District Gym<br/>123 Muscle Blvd, Suite 100<br/>Metro City, ST 90210</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-brand-900/20 p-3 rounded-md text-brand-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase mb-1">Email</h4>
                    <p className="text-slate-400">coaching@fitforge.com</p>
                    <p className="text-slate-400">support@fitforge.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-900/20 p-3 rounded-md text-brand-600">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase mb-1">Phone</h4>
                    <p className="text-slate-400">+1 (555) 123-4567</p>
                    <p className="text-slate-500 text-sm">Mon-Fri, 9am - 5pm EST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-lg border border-slate-800">
              <h3 className="font-display font-bold text-2xl text-white uppercase mb-6">Gym Hours</h3>
              <ul className="space-y-3">
                <li className="flex justify-between text-slate-300 border-b border-slate-800 pb-2">
                  <span>Mon - Fri</span>
                  <span className="font-bold text-white">5:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between text-slate-300 border-b border-slate-800 pb-2">
                  <span>Saturday</span>
                  <span className="font-bold text-white">7:00 AM - 8:00 PM</span>
                </li>
                <li className="flex justify-between text-slate-300">
                  <span>Sunday</span>
                  <span className="font-bold text-white">8:00 AM - 6:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-slate-900 p-8 rounded-lg border border-slate-800">
            <h3 className="font-display font-bold text-2xl text-white uppercase mb-8">Send a Message</h3>
            
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="bg-green-500/10 p-4 rounded-full text-green-500 mb-6">
                  <Send size={48} />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                <p className="text-slate-400">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">First Name</label>
                    <input required type="text" className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-sm focus:border-brand-600 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Last Name</label>
                    <input required type="text" className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-sm focus:border-brand-600 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Email Address</label>
                  <input required type="email" className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-sm focus:border-brand-600 focus:outline-none" />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Subject</label>
                  <select className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-sm focus:border-brand-600 focus:outline-none">
                    <option>General Inquiry</option>
                    <option>Personal Training</option>
                    <option>Online Coaching</option>
                    <option>Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Message</label>
                  <textarea required className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-sm focus:border-brand-600 focus:outline-none h-32"></textarea>
                </div>

                <button type="submit" className="w-full bg-brand-600 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wide hover:bg-brand-700 transition-colors">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};