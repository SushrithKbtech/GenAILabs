import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Check, Calendar as CalendarIcon, Clock, User, CreditCard, Lock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Booking: React.FC = () => {
  const { data, addBooking } = useCMS();
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Initialize form data, checking if a service was passed via state
  const [formData, setFormData] = useState({
    serviceId: location.state?.serviceId || '',
    date: '',
    time: '',
    clientName: '',
    email: '',
    notes: ''
  });

  // If a service was pre-selected, auto-advance logic could go here, 
  // but usually better to let user confirm on step 1.
  
  const selectedService = data.services.find(s => s.id === formData.serviceId);
  const times = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4); // Move to payment
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate Payment API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    addBooking(formData);
    setIsProcessing(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-brand-950 py-24 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-lg shadow-2xl text-center">
           <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-white" />
           </div>
           <h2 className="text-3xl font-display font-bold text-white uppercase mb-4">Payment Successful</h2>
           <p className="text-slate-300 text-lg mb-8">Payment done, you are scheduled.</p>
           
           <div className="bg-slate-800 p-4 rounded-md mb-8 text-left">
              <p className="text-slate-400 text-xs uppercase font-bold mb-1">Service</p>
              <p className="text-white font-bold mb-3">{selectedService?.title}</p>
              
              <p className="text-slate-400 text-xs uppercase font-bold mb-1">Date & Time</p>
              <p className="text-white font-bold">{formData.date} at {formData.time}</p>
           </div>

           <button 
             onClick={() => navigate('/')}
             className="w-full bg-brand-600 text-white py-3 rounded-sm font-bold uppercase tracking-wide hover:bg-brand-700 transition-colors"
           >
             Return Home
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-950 py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl text-white uppercase tracking-tight mb-4">Book Your Session</h1>
          <p className="text-slate-400">Take the first step towards your goals.</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10 transform -translate-y-1/2"></div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= i ? 'bg-brand-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
              {step > i ? <Check size={20} /> : i}
            </div>
          ))}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 shadow-2xl">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-display font-bold text-white uppercase mb-6">Select a Service</h3>
              <div className="grid gap-4">
                {data.services.map(service => (
                  <button
                    key={service.id}
                    onClick={() => setFormData({...formData, serviceId: service.id})}
                    className={`flex items-center gap-4 p-4 rounded-md border text-left transition-all ${formData.serviceId === service.id ? 'border-brand-600 bg-brand-900/20' : 'border-slate-800 hover:border-slate-600'}`}
                  >
                    <img src={service.image} className="w-16 h-16 object-cover rounded-md" alt="" />
                    <div className="flex-1">
                      <h4 className="font-bold text-white">{service.title}</h4>
                      <p className="text-sm text-slate-400">{service.price}</p>
                    </div>
                    {formData.serviceId === service.id && <Check className="text-brand-600" />}
                  </button>
                ))}
              </div>
              <div className="flex justify-end mt-8">
                <button 
                  disabled={!formData.serviceId}
                  onClick={() => setStep(2)}
                  className="bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-sm font-bold uppercase"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-display font-bold text-white uppercase mb-6">Choose Date & Time</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                   <label className="block text-slate-400 mb-2 font-bold text-sm uppercase">Select Date</label>
                   <input 
                     type="date" 
                     className="w-full bg-slate-950 border border-slate-700 text-white p-4 rounded-sm focus:border-brand-600 focus:outline-none"
                     onChange={(e) => setFormData({...formData, date: e.target.value})}
                   />
                </div>
                <div>
                   <label className="block text-slate-400 mb-2 font-bold text-sm uppercase">Select Time</label>
                   <div className="grid grid-cols-2 gap-2">
                     {times.map(t => (
                       <button
                         key={t}
                         onClick={() => setFormData({...formData, time: t})}
                         className={`p-2 rounded-sm text-sm font-medium border ${formData.time === t ? 'bg-brand-600 border-brand-600 text-white' : 'border-slate-700 text-slate-300 hover:border-slate-500'}`}
                       >
                         {t}
                       </button>
                     ))}
                   </div>
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(1)} className="text-slate-400 hover:text-white font-bold uppercase">Back</button>
                <button 
                  disabled={!formData.date || !formData.time}
                  onClick={() => setStep(3)}
                  className="bg-brand-600 disabled:opacity-50 text-white px-8 py-3 rounded-sm font-bold uppercase"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleDetailsSubmit} className="space-y-6">
              <h3 className="text-2xl font-display font-bold text-white uppercase mb-6">Your Details</h3>
              
              <div className="bg-brand-900/20 p-4 rounded-sm border border-brand-900/50 mb-6 flex gap-4">
                 <div className="h-full bg-brand-600 w-1 rounded-full"></div>
                 <div className="text-sm text-slate-300">
                    <p className="font-bold text-white mb-1">{selectedService?.title}</p>
                    <p>{formData.date} at {formData.time}</p>
                    <p>{selectedService?.price}</p>
                 </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-slate-400 mb-2 font-bold text-sm uppercase">Full Name</label>
                  <input required type="text" className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-sm focus:border-brand-600 focus:outline-none" 
                    onChange={e => setFormData({...formData, clientName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-2 font-bold text-sm uppercase">Email Address</label>
                  <input required type="email" className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-sm focus:border-brand-600 focus:outline-none" 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-2 font-bold text-sm uppercase">Goals / Notes</label>
                  <textarea className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-sm focus:border-brand-600 focus:outline-none h-32" 
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button type="button" onClick={() => setStep(2)} className="text-slate-400 hover:text-white font-bold uppercase">Back</button>
                <button 
                  type="submit"
                  className="bg-brand-600 text-white px-8 py-3 rounded-sm font-bold uppercase w-full md:w-auto"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <h3 className="text-2xl font-display font-bold text-white uppercase mb-6">Secure Payment</h3>
              
              <div className="bg-slate-800 p-6 rounded-md mb-6 border border-slate-700">
                <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-4">
                  <span className="text-slate-300">Total Amount</span>
                  <span className="text-2xl font-bold text-white">{selectedService?.price}</span>
                </div>
                <div className="text-sm text-slate-400 flex items-center gap-2">
                  <Lock size={14} className="text-green-500" /> SSL Secure Transaction
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-slate-400 mb-2 font-bold text-sm uppercase">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 text-slate-500" size={20} />
                    <input 
                      type="text" 
                      placeholder="0000 0000 0000 0000"
                      required
                      className="w-full bg-slate-950 border border-slate-700 text-white p-3 pl-10 rounded-sm focus:border-brand-600 focus:outline-none" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-2 font-bold text-sm uppercase">Expiry</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY"
                      required
                      className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-sm focus:border-brand-600 focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-2 font-bold text-sm uppercase">CVC</label>
                    <input 
                      type="text" 
                      placeholder="123"
                      required
                      className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-sm focus:border-brand-600 focus:outline-none" 
                    />
                  </div>
                </div>
                 
                 <div>
                    <label className="block text-slate-400 mb-2 font-bold text-sm uppercase">Cardholder Name</label>
                    <input 
                      type="text" 
                      placeholder="Name on card"
                      required
                      className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-sm focus:border-brand-600 focus:outline-none" 
                    />
                 </div>
              </div>

              <div className="flex justify-between mt-8">
                <button type="button" onClick={() => setStep(3)} className="text-slate-400 hover:text-white font-bold uppercase">Back</button>
                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="bg-brand-600 disabled:opacity-50 text-white px-8 py-3 rounded-sm font-bold uppercase w-full md:w-auto flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                     <>Processing...</>
                  ) : (
                     <>Pay & Confirm</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};