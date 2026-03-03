import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ChevronRight, Star, CheckCircle, Trophy, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const { data } = useCMS();
  // Create a copy before sorting to avoid mutating state directly
  const sections = [...data.pages.home.sections].sort((a, b) => a.order - b.order);

  const renderSection = (section: any) => {
    if (!section.isVisible) return null;

    switch (section.type) {
      case 'hero':
        return (
          <section key={section.id} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img src={section.image} alt="Hero" className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/50 to-transparent" />
            </div>
            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
              <h1 className="font-display font-black text-6xl md:text-8xl uppercase tracking-tighter mb-6 text-white leading-tight">
                {section.title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto font-light">
                {section.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/book" className="bg-brand-600 text-white px-8 py-4 rounded-sm font-bold font-display text-xl uppercase tracking-wide hover:bg-brand-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-brand-900/50">
                  Start Transformation
                </Link>
                <Link to="/programs" className="border-2 border-slate-500 text-white px-8 py-4 rounded-sm font-bold font-display text-xl uppercase tracking-wide hover:border-brand-500 hover:text-brand-500 transition-all">
                  View Programs
                </Link>
              </div>
            </div>
          </section>
        );

      case 'features':
        return (
          <section key={section.id} className="py-24 bg-brand-950">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tight text-white mb-4">{section.title}</h2>
                <p className="text-slate-400 text-xl">{section.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Trophy, title: 'Expert Coaching', desc: 'Certified elite trainers with proven track records.' },
                  { icon: CheckCircle, title: 'Custom Plans', desc: 'Tailored nutrition and training based on your biology.' },
                  { icon: Users, title: 'Community', desc: 'Join a brotherhood of driven individuals.' }
                ].map((f, i) => (
                  <div key={i} className="bg-slate-900/50 p-8 border border-slate-800 hover:border-brand-600 transition-colors rounded-sm group">
                    <f.icon className="h-12 w-12 text-brand-600 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="font-display font-bold text-2xl text-white mb-4 uppercase">{f.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'services':
        return (
          <section key={section.id} className="py-24 bg-slate-900">
            <div className="max-w-7xl mx-auto px-4">
               <div className="flex justify-between items-end mb-12">
                 <div>
                    <h2 className="font-display font-bold text-4xl uppercase tracking-tight text-white mb-2">{section.title}</h2>
                    <p className="text-slate-400 text-lg">{section.subtitle}</p>
                 </div>
                 <Link to="/programs" className="hidden md:flex items-center text-brand-500 font-bold uppercase tracking-wide hover:text-brand-400">View All <ChevronRight size={20} /></Link>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {data.services.slice(0, 3).map(service => (
                   <div key={service.id} className="group relative overflow-hidden rounded-sm bg-brand-950 border border-slate-800">
                     <div className="h-64 overflow-hidden">
                       <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     </div>
                     <div className="p-8">
                       <span className="text-brand-500 font-bold text-sm uppercase tracking-wider mb-2 block">{service.category}</span>
                       <h3 className="font-display font-bold text-2xl text-white mb-4">{service.title}</h3>
                       <p className="text-slate-400 mb-6 line-clamp-2">{service.description}</p>
                       <div className="flex justify-between items-center border-t border-slate-800 pt-6">
                         <span className="text-white font-bold text-lg">{service.price}</span>
                         <Link to="/book" className="text-brand-500 font-bold uppercase text-sm hover:text-white transition-colors">Book Now</Link>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </section>
        );

        case 'transformations':
            return (
              <section key={section.id} className="py-24 bg-brand-950">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="text-center mb-16">
                    <h2 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tight text-white mb-4">{section.title}</h2>
                    <p className="text-slate-400 text-xl">{section.subtitle}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {data.testimonials.map((t) => (
                        <div key={t.id} className="bg-slate-900 p-6 rounded-sm border border-slate-800 flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/3 shrink-0">
                                <img src={t.beforeImage || 'https://picsum.photos/200/200'} alt="Before" className="w-full h-32 object-cover rounded-sm mb-2 opacity-70" />
                                <div className="text-center text-xs text-slate-500 uppercase font-bold">Transformation</div>
                            </div>
                            <div>
                                <div className="flex text-brand-500 mb-2">
                                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                                </div>
                                <h4 className="font-bold text-white text-xl mb-1">{t.result}</h4>
                                <p className="text-slate-400 italic mb-4">"{t.quote}"</p>
                                <div className="text-slate-500 font-bold uppercase text-sm">- {t.clientName}</div>
                            </div>
                        </div>
                    ))}
                  </div>
                </div>
              </section>
            );

      case 'cta':
        return (
          <section key={section.id} className="py-24 bg-brand-600 text-white text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
             <div className="relative z-10 max-w-4xl mx-auto px-4">
               <h2 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter mb-8">{section.title}</h2>
               <p className="text-xl md:text-2xl mb-10 opacity-90">{section.subtitle}</p>
               <Link to="/book" className="inline-block bg-white text-brand-600 px-10 py-4 rounded-sm font-bold font-display text-xl uppercase tracking-wide hover:bg-slate-100 transition-colors shadow-2xl">
                 Schedule Consultation
               </Link>
             </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-brand-950">
      {sections.map(renderSection)}
    </div>
  );
};