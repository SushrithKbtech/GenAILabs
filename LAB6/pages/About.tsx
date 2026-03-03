import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Target, Shield, Zap, Instagram, Twitter, Linkedin } from 'lucide-react';

export const About: React.FC = () => {
  const { data } = useCMS();
  const leadTrainer = data.trainers[0];

  return (
    <div className="bg-brand-950 min-h-screen">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517931524326-bdd55a541177?auto=format&fit=crop&q=80&w=1920" 
            alt="Gym Background" 
            className="w-full h-full object-cover opacity-10" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/80 to-brand-950"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display font-black text-6xl md:text-8xl text-white uppercase tracking-tighter mb-8">
            We Don't Just Train.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-red-600">We Forge.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            FitForge Performance was born from a dissatisfaction with the fitness industry. We rejected the fluff, the fake gurus, and the "quick fix" culture. We built a sanctuary for those who value science, hard work, and measurable progress.
          </p>
        </div>
      </section>

      {/* Trainer Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-brand-600/20 rounded-sm transform -rotate-3"></div>
                <img 
                  src={leadTrainer.image} 
                  alt={leadTrainer.name} 
                  className="relative rounded-sm shadow-2xl w-full"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="font-display font-bold text-4xl text-white uppercase mb-2">Meet The Head Coach</h2>
              <h3 className="text-2xl text-brand-500 font-bold mb-6">{leadTrainer.name}</h3>
              <div className="prose prose-invert prose-lg text-slate-400 mb-8">
                <p>{leadTrainer.bio}</p>
                <p>
                  Alex believes that strength is the foundation of a healthy life. Having competed at the national level in powerlifting, he understands what it takes to push the human body to its limits—and how to recover from it.
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                {leadTrainer.specialties.map(spec => (
                    <div key={spec} className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-brand-600 rounded-full"></div>
                        <span className="text-white font-medium uppercase tracking-wide">{spec}</span>
                    </div>
                ))}
              </div>

              <div className="flex gap-4">
                 <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-3 border border-slate-700 rounded-full text-slate-400 hover:text-white hover:border-brand-600 transition-colors"><Instagram /></a>
                 <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-3 border border-slate-700 rounded-full text-slate-400 hover:text-white hover:border-brand-600 transition-colors"><Twitter /></a>
                 <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 border border-slate-700 rounded-full text-slate-400 hover:text-white hover:border-brand-600 transition-colors"><Linkedin /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl text-white uppercase mb-4">Our Core Philosophy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 p-8 border border-slate-800 rounded-lg">
                <Target className="text-brand-600 h-10 w-10 mb-6" />
                <h3 className="text-xl font-bold text-white uppercase mb-4">Precision</h3>
                <p className="text-slate-400">No guesswork. Every rep, every macro, every minute of rest is calculated for optimal adaptation.</p>
            </div>
            <div className="bg-slate-900/50 p-8 border border-slate-800 rounded-lg">
                <Shield className="text-brand-600 h-10 w-10 mb-6" />
                <h3 className="text-xl font-bold text-white uppercase mb-4">Integrity</h3>
                <p className="text-slate-400">We don't sell magic pills. We sell hard work and honest feedback. We hold you to the highest standard.</p>
            </div>
            <div className="bg-slate-900/50 p-8 border border-slate-800 rounded-lg">
                <Zap className="text-brand-600 h-10 w-10 mb-6" />
                <h3 className="text-xl font-bold text-white uppercase mb-4">Intensity</h3>
                <p className="text-slate-400">To change the body, you must challenge it. We teach you how to train with true intensity and focus.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};