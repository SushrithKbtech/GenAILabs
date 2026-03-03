import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { Calendar, User, ArrowLeft } from 'lucide-react';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useCMS();
  
  const post = data.posts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="bg-brand-950 min-h-screen py-24">
      <article className="max-w-4xl mx-auto px-4">
        <Link to="/blog" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" /> Back to Log
        </Link>
        
        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm text-slate-500 uppercase font-bold mb-6">
            <span className="bg-brand-900/30 text-brand-500 px-3 py-1 rounded-sm">{post.category}</span>
            <span className="flex items-center gap-1"><Calendar size={16} /> {post.date}</span>
            <span className="flex items-center gap-1"><User size={16} /> {post.author}</span>
          </div>
          <h1 className="font-display font-black text-4xl md:text-6xl text-white uppercase leading-tight mb-8">
            {post.title}
          </h1>
        </div>

        <div className="h-96 w-full rounded-lg overflow-hidden mb-12 border border-slate-800">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-invert prose-lg max-w-none text-slate-300">
           {post.content.split('\n').map((paragraph, index) => (
             <p key={index} className="mb-6 leading-relaxed">
               {paragraph}
             </p>
           ))}
        </div>

        {/* Author Box */}
        <div className="mt-16 bg-slate-900 p-8 rounded-lg border border-slate-800 flex items-center gap-6">
           <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center font-bold text-2xl text-slate-500 shrink-0">
             {post.author.charAt(0)}
           </div>
           <div>
             <h4 className="text-white font-bold uppercase mb-1">Written by {post.author}</h4>
             <p className="text-slate-400 text-sm">Expert fitness contributor and coach at FitForge Performance.</p>
           </div>
        </div>
      </article>
    </div>
  );
};