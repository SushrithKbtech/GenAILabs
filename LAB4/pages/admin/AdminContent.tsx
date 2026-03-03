import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Eye, EyeOff, Edit2, Save, X } from 'lucide-react';

export const AdminContent: React.FC = () => {
  const { data, updateSection, toggleSectionVisibility } = useCMS();
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  // Fix: Create a shallow copy before sorting to avoid mutating state
  const sections = [...data.pages.home.sections].sort((a, b) => a.order - b.order);

  const startEdit = (section: any) => {
    setEditingSection(section.id);
    setEditForm({ title: section.title, subtitle: section.subtitle });
  };

  const saveEdit = (sectionId: string) => {
    updateSection('home', sectionId, editForm);
    setEditingSection(null);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Homepage Content Manager</h2>
        <p className="text-slate-400">Manage sections, visibility, and text content for the landing page.</p>
      </div>

      <div className="space-y-6">
        {sections.map(section => (
          <div key={section.id} className={`bg-slate-950 border rounded-lg p-6 transition-colors ${section.isVisible ? 'border-slate-800' : 'border-slate-800 opacity-60'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="bg-slate-800 text-xs font-bold px-2 py-1 rounded text-slate-400 uppercase tracking-wide">{section.type}</span>
                <span className="font-bold text-lg text-white capitalize">{section.id} Section</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleSectionVisibility('home', section.id)}
                  className={`p-2 rounded hover:bg-slate-800 transition-colors ${section.isVisible ? 'text-green-500' : 'text-slate-500'}`}
                  title="Toggle Visibility"
                >
                  {section.isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
                <button 
                  onClick={() => startEdit(section)}
                  className="p-2 rounded hover:bg-slate-800 text-brand-500 transition-colors"
                  title="Edit Content"
                >
                  <Edit2 size={20} />
                </button>
              </div>
            </div>

            {editingSection === section.id ? (
              <div className="space-y-4 bg-slate-900 p-4 rounded border border-slate-700">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Title</label>
                  <input 
                    type="text" 
                    value={editForm.title || ''} 
                    onChange={e => setEditForm({...editForm, title: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 text-white p-2 rounded focus:border-brand-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Subtitle</label>
                  <textarea 
                    value={editForm.subtitle || ''} 
                    onChange={e => setEditForm({...editForm, subtitle: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 text-white p-2 rounded focus:border-brand-600 outline-none h-24"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button onClick={() => setEditingSection(null)} className="flex items-center gap-2 px-3 py-1 text-slate-400 hover:text-white text-sm">
                    <X size={14} /> Cancel
                  </button>
                  <button onClick={() => saveEdit(section.id)} className="flex items-center gap-2 px-3 py-1 bg-brand-600 text-white rounded text-sm font-bold">
                    <Save size={14} /> Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <h4 className="text-xs text-slate-500 font-bold uppercase mb-1">Current Title</h4>
                    <p className="text-white font-medium">{section.title}</p>
                 </div>
                 <div>
                    <h4 className="text-xs text-slate-500 font-bold uppercase mb-1">Current Subtitle</h4>
                    <p className="text-slate-400 text-sm truncate">{section.subtitle}</p>
                 </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};