import React from 'react';
import { Save, Globe, Lock, Bell } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Platform Settings</h2>
        <p className="text-slate-400">Configure general site options and preferences.</p>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* General Settings */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
            <div className="p-2 bg-brand-900/20 rounded text-brand-600">
              <Globe size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">General Information</h3>
              <p className="text-slate-500 text-sm">Basic site identity and SEO defaults.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-500 text-xs font-bold uppercase mb-2">Site Name</label>
              <input type="text" defaultValue="FitForge Performance" className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded focus:outline-none focus:border-brand-600" />
            </div>
            <div>
              <label className="block text-slate-500 text-xs font-bold uppercase mb-2">Contact Email</label>
              <input type="email" defaultValue="admin@fitforge.com" className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded focus:outline-none focus:border-brand-600" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-slate-500 text-xs font-bold uppercase mb-2">Meta Description</label>
              <textarea defaultValue="High-performance fitness coaching platform." className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded focus:outline-none focus:border-brand-600 h-24"></textarea>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
            <div className="p-2 bg-brand-900/20 rounded text-brand-600">
              <Bell size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Notifications</h3>
              <p className="text-slate-500 text-sm">Manage how you receive alerts.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Email me when a new booking is received</span>
              <input type="checkbox" defaultChecked className="accent-brand-600 h-5 w-5" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Email me on contact form submissions</span>
              <input type="checkbox" defaultChecked className="accent-brand-600 h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button className="flex items-center gap-2 bg-brand-600 text-white px-8 py-3 rounded-sm font-bold uppercase hover:bg-brand-700 transition-colors">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};