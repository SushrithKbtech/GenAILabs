import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Star, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Transformations: React.FC = () => {
  const { data } = useCMS();

  return (
    <div className="bg-brand-950 min-h-screen py-24">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-20">
        <div className="inline-block p-3 rounded-full bg-brand-900/20 mb-6">
           <Trophy className="text-brand-600 h-8 w-8" />
        </div>
        <h1 className="font-display font-black text-5xl md:text-7xl text-white uppercase tracking-tighter mb-6">
          Hall of <span className="text-brand-600">Gains</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          These aren't just photos. They are proof of discipline, science, and the FitForge method. Real people, real work, undeniable results.
        </p>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {data.testimonials.map((t) => (
            <div key={t.id} className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 hover:border-brand-600 transition-all duration-300 group shadow-2xl">
              <div className="flex flex-col sm:flex-row h-full">
                {/* Images */}
                <div className="w-full sm:w-1/2 relative group-hover:scale-105 transition-transform duration-700">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 relative">
                      <img src={t.beforeImage || 'https://picsum.photos/300/400'} alt="Before" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 uppercase rounded-sm">Before</div>
                    </div>
                    <div className="w-1/2 relative border-l border-white/20">
                      <img src={t.afterImage || 'https://picsum.photos/301/400'} alt="After" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 right-2 bg-brand-600 text-white text-xs font-bold px-2 py-1 uppercase rounded-sm">After</div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8 sm:w-1/2 flex flex-col justify-center">
                  <div className="flex text-brand-500 mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-2 uppercase">{t.clientName}</h3>
                  <div className="inline-block bg-brand-900/30 text-brand-400 text-sm font-bold px-3 py-1 rounded-sm mb-6 uppercase">
                    {t.result}
                  </div>
                  <p className="text-slate-400 italic mb-6 leading-relaxed">"{t.quote}"</p>
                  <Link to="/book" className="inline-flex items-center text-white font-bold uppercase text-sm group-hover:text-brand-500 transition-colors">
                    Start Your Journey <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center bg-slate-900 p-12 rounded-lg border border-slate-800">
          <h2 className="font-display font-bold text-3xl text-white uppercase mb-4">You Could Be Next</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">We accept a limited number of transformation clients each month to ensure quality control.</p>
          <Link to="/book" className="bg-brand-600 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wide hover:bg-brand-700 transition-colors">
            Apply For Coaching
          </Link>
        </div>
      </div>
    </div>
  );
};