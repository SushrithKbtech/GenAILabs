import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Programs: React.FC = () => {
  const { data } = useCMS();

  return (
    <div className="bg-brand-950 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="font-display font-bold text-5xl md:text-6xl text-white uppercase tracking-tight mb-6">Our Programs</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">From elite athlete preparation to complete lifestyle transformations, we have the protocol for you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.services.map(service => (
            <div key={service.id} className="bg-slate-900 border border-slate-800 rounded-sm overflow-hidden hover:border-brand-600 transition-colors flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-brand-600 text-white text-xs font-bold px-3 py-1 uppercase rounded-sm">
                  {service.category}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="font-display font-bold text-2xl text-white mb-2">{service.title}</h3>
                <p className="text-brand-500 font-bold text-xl mb-6">{service.price}</p>
                <p className="text-slate-400 mb-6">{service.description}</p>
                
                <ul className="space-y-3 mb-8 flex-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <Check size={18} className="text-brand-600 mt-1 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  to="/book" 
                  state={{ serviceId: service.id }}
                  className="block w-full bg-white text-brand-900 text-center py-3 rounded-sm font-bold uppercase tracking-wide hover:bg-brand-600 hover:text-white transition-colors"
                >
                  Select Program
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};