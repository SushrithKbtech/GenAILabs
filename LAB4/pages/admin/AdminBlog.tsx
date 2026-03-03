import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Plus, Trash2, Search, FileText } from 'lucide-react';

export const AdminBlog: React.FC = () => {
  const { data, addPost, deletePost } = useCMS();
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'Alex Mercer',
    category: 'Training',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    slug: ''
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newPost.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    addPost({
      ...newPost,
      date: new Date().toISOString().split('T')[0],
      slug
    });
    setShowForm(false);
    setNewPost({ title: '', excerpt: '', content: '', author: 'Alex Mercer', category: 'Training', image: '', slug: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Blog Management</h2>
          <p className="text-slate-400">Create and manage content for the training log.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-sm font-bold flex items-center gap-2"
        >
          <Plus size={18} /> New Article
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 mb-8 animate-fade-in">
          <h3 className="font-bold text-white mb-4 uppercase">Write New Article</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 text-xs font-bold uppercase mb-1">Title</label>
                <input required type="text" className="w-full bg-slate-950 border border-slate-700 text-white p-2 rounded focus:outline-none focus:border-brand-600" 
                  value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-slate-500 text-xs font-bold uppercase mb-1">Category</label>
                <select className="w-full bg-slate-950 border border-slate-700 text-white p-2 rounded focus:outline-none focus:border-brand-600"
                  value={newPost.category} onChange={e => setNewPost({...newPost, category: e.target.value})}
                >
                  <option>Training</option>
                  <option>Nutrition</option>
                  <option>Recovery</option>
                  <option>Mindset</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-slate-500 text-xs font-bold uppercase mb-1">Excerpt (Short Description)</label>
              <input required type="text" className="w-full bg-slate-950 border border-slate-700 text-white p-2 rounded focus:outline-none focus:border-brand-600" 
                value={newPost.excerpt} onChange={e => setNewPost({...newPost, excerpt: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-slate-500 text-xs font-bold uppercase mb-1">Content</label>
              <textarea required className="w-full h-32 bg-slate-950 border border-slate-700 text-white p-2 rounded focus:outline-none focus:border-brand-600" 
                value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})}
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white px-4 py-2">Cancel</button>
              <button type="submit" className="bg-brand-600 text-white px-6 py-2 rounded-sm font-bold uppercase">Publish Post</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {data.posts.map(post => (
          <div key={post.id} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-lg group hover:border-brand-600/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded bg-slate-800 flex items-center justify-center text-slate-600">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{post.title}</h3>
                <div className="flex gap-3 text-xs text-slate-500 uppercase font-bold">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                  <span>{post.author}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => deletePost(post.id)}
                className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                title="Delete Post"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
        {data.posts.length === 0 && <div className="text-center text-slate-500 py-12">No posts found. Start writing!</div>}
      </div>
    </div>
  );
};