import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Blog: React.FC = () => {
  const { data } = useCMS();

  return (
    <div className="bg-brand-950 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="font-display font-bold text-5xl text-white uppercase tracking-tight mb-12 text-center">Training Log</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {data.posts.map(post => (
            <article key={post.id} className="bg-slate-900 border border-slate-800 rounded-sm overflow-hidden group">
              <div className="h-64 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-xs text-slate-500 uppercase font-bold mb-4">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                  <span className="text-brand-500">{post.category}</span>
                </div>
                <h2 className="font-display font-bold text-2xl text-white mb-4 group-hover:text-brand-500 transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-slate-400 mb-6">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="text-white font-bold uppercase text-sm border-b-2 border-brand-600 pb-1 hover:text-brand-500 transition-colors">Read Article</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};